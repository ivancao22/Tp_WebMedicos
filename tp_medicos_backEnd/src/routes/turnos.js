const express = require('express');
const router = express.Router();
const { pool } = require('../db/pool');
const { turnoCreateValidator, turnoUpdateValidator } = require('../middleware/validators');

//
// SendGrid setup (opcional; si no está configurado, los mails se loguean y no se envían)
//
let sgMail = null;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || null;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || null;
const EMAIL_FROM = process.env.EMAIL_FROM || null;

if (SENDGRID_API_KEY) {
  try {
    sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(SENDGRID_API_KEY);
  } catch (e) {
    console.warn('SendGrid library not available or failed to init:', e.message || e);
    sgMail = null;
  }
}

// Helper para combinar fecha+hora
function combineFechaHora(fecha, hora) {
  return new Date(`${fecha}T${hora}:00`).toISOString();
}

// Helper: enviar email usando SendGrid (si está configurado)
async function sendMailSendGrid(to, subject, html) {
  if (!sgMail) {
    console.log('SendGrid not configured — skipping send to', to);
    return;
  }
  try {
    await sgMail.send({
      to,
      from: EMAIL_FROM || ADMIN_EMAIL,
      subject,
      html,
    });
    console.log('SendGrid: email sent to', to);
  } catch (err) {
    console.error('SendGrid send error to', to, err?.response?.body || err.message || err);
  }
}

// small helper to build a professional email wrapper (sin botones)
function emailWrapper({ title, introHtml, detailsRowsHtml }) {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1f2937; padding: 0; margin: 0;">
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f4f6fb; padding:32px 16px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 20px rgba(16,24,40,0.08);">
              <!-- Header -->
              <tr>
                <td style="padding:20px 28px; background: linear-gradient(90deg,#2563eb 0%, #3b82f6 100%); color: #fff;">
                  <h2 style="margin:0; font-size:20px; font-weight:700;">Consultorio Dr. Enrique Martínez</h2>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding:20px 28px;">
                  <h3 style="margin-top:0; color:#0f172a; font-size:18px;">${title}</h3>
                  <div style="color:#374151; font-size:15px; line-height:1.5; margin-bottom:12px;">
                    ${introHtml}
                  </div>

                  <!-- Details table -->
                  <table width="100%" cellpadding="6" cellspacing="0" role="presentation" style="border-collapse:collapse; margin-top:8px; margin-bottom:12px;">
                    ${detailsRowsHtml}
                  </table>

                  <p style="color:#475569; font-size:13px; margin-top:8px;">
                    Si necesitas cambiar o cancelar tu turno, respondé a este correo o contactanos por los datos al pie.
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding:16px 28px; background:#f8fafc; text-align:left;">
                  <div style="display:flex; flex-direction:column; gap:6px; color:#324151; font-size:14px;">
                    <div><strong>Contacto:</strong></div>
                    <div>
                      Teléfono: <a href="tel:+541198128764" style="color:#2563eb; text-decoration:none;">(+54) 11 9812-8764</a>
                    </div>
                    <div>
                      Email: <a href="mailto:drmartinez@gmail.com" style="color:#2563eb; font-weight:600; text-decoration:none;">drmartinez@gmail.com</a>
                    </div>
                    <div style="color:#94a3b8; font-size:12px; margin-top:8px;">
                      Consultorio Dr. Enrique Martínez — Por favor, no responda a este mail si no es respecto a su turno.
                    </div>
                  </div>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </div>
  `;
}

// small helper to build a details row (label/value)
function detailRow(label, value) {
  return `
    <tr>
      <td style="width:170px; color:#0f172a; font-weight:600; border-top:1px solid #eef2ff;">${label}</td>
      <td style="color:#374151; border-top:1px solid #eef2ff;">${value}</td>
    </tr>
  `;
}

// POST /turnos
router.post('/', turnoCreateValidator, async (req, res) => {
  try {
    let { fecha_turno, fecha, hora,
      paciente_nombre, paciente_apellido, paciente_email, paciente_telefono,
      obra_social_id, medico_id, motivo } = req.body;

    if (!fecha_turno) fecha_turno = combineFechaHora(fecha, hora);

    const start = new Date(fecha_turno).toISOString();

    // Verificar solapamiento simple (45 minutos)
    const overlapSql = `
      SELECT 1 FROM turnos
      WHERE medico_id = $1
        AND fecha_turno < ($2::timestamptz + interval '45 minutes')
        AND (fecha_turno + interval '45 minutes') > $2::timestamptz
      LIMIT 1
    `;
    const overlapRes = await pool.query(overlapSql, [medico_id, start]);
    if (overlapRes.rowCount > 0) {
      return res.status(409).json({ error: 'Horario no disponible para ese medico' });
    }

    const insertSql = `
      INSERT INTO turnos
        (paciente_nombre, paciente_apellido, paciente_email, paciente_telefono, obra_social_id, medico_id, fecha_turno, motivo)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *
    `;
    const values = [paciente_nombre, paciente_apellido, paciente_email, paciente_telefono, obra_social_id, medico_id, start, motivo];
    const { rows } = await pool.query(insertSql, values);
    const created = rows[0];

    // Responder inmediatamente
    res.status(201).json(created);

    // Enviar notificaciones en background (no bloquear la respuesta)
    (async () => {
      try {
        const fechaLegible = new Date(created.fecha_turno).toLocaleString();

        // 1) Admin (si está configurado)
        if (ADMIN_EMAIL) {
          const subjectAdmin = `Nuevo turno solicitado - ${paciente_nombre} ${paciente_apellido}`;
          const details = `
            ${detailRow('Paciente', `${paciente_nombre} ${paciente_apellido} (${paciente_email || 'sin email'})`)}
            ${detailRow('Fecha y hora', fechaLegible)}
            ${detailRow('Motivo', motivo || '-')}
          `;
          const htmlAdmin = emailWrapper({
            title: 'Nuevo turno solicitado',
            introHtml: `<p>Se ha generado un nuevo turno en la plataforma. A continuación los detalles:</p>`,
            detailsRowsHtml: details
          });
          await sendMailSendGrid(ADMIN_EMAIL, subjectAdmin, htmlAdmin);
        }

        // 2) Paciente (si proporcionó email) -> aviso de recepción de solicitud
        if (paciente_email) {
          const subjectPaciente = `Solicitud de turno recibida`;
          const details = `
            ${detailRow('Paciente', `${paciente_nombre} ${paciente_apellido}`)}
            ${detailRow('Fecha y hora', fechaLegible)}
            ${detailRow('Motivo', motivo || '-')}
            ${detailRow('Teléfono', paciente_telefono || '-')}
          `;
          const htmlPaciente = emailWrapper({
            title: 'Hemos recibido tu solicitud de turno',
            introHtml: `<p>Hola ${paciente_nombre},</p><p>Hemos recibido tu solicitud de turno. En breve confirmaremos la disponibilidad y te enviaremos otro correo cuando el turno sea confirmado.</p>`,
            detailsRowsHtml: details
          });
          await sendMailSendGrid(paciente_email, subjectPaciente, htmlPaciente);
        }

        // 3) Médico (si tiene email en tabla medicos) -> aviso de turno nuevo
        if (medico_id) {
          try {
            const { rows: medRows } = await pool.query('SELECT nombre, email FROM medicos WHERE id = $1 LIMIT 1', [medico_id]);
            if (medRows && medRows[0] && medRows[0].email) {
              const med = medRows[0];
              const subjectMed = `Nuevo turno solicitado para ${med.nombre}`;
              const details = `
                ${detailRow('Paciente', `${paciente_nombre} ${paciente_apellido} (${paciente_email || 'sin email'})`)}
                ${detailRow('Fecha y hora', fechaLegible)}
                ${detailRow('Motivo', motivo || '-')}
              `;
              const htmlMed = emailWrapper({
                title: `Nuevo turno asignado`,
                introHtml: `<p>Hola ${med.nombre},</p><p>Se ha solicitado un nuevo turno para tu agenda. Detalles a continuación:</p>`,
                detailsRowsHtml: details
              });
              await sendMailSendGrid(med.email, subjectMed, htmlMed);
            } else {
              console.log('Medico no tiene email o no encontrado, id:', medico_id);
            }
          } catch (err) {
            console.warn('Error consultando email del medico:', err.message || err);
          }
        }
      } catch (emailErr) {
        console.error('Error en notificaciones post-create:', emailErr);
      }
    })();

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'DB error' });
  }
});

// GET /turnos (filtros opcionales) - (mantener igual)
router.get('/', async (req, res) => {
  const { medico_id, desde, hasta } = req.query;
  try {
    let sql = 'SELECT * FROM turnos';
    const where = [];
    const params = [];
    if (medico_id) { params.push(medico_id); where.push(`medico_id = $${params.length}`); }
    if (desde) { params.push(desde); where.push(`fecha_turno >= $${params.length}`); }
    if (hasta) { params.push(hasta); where.push(`fecha_turno <= $${params.length}`); }
    if (where.length) sql += ' WHERE ' + where.join(' AND ');
    sql += ' ORDER BY fecha_turno ASC LIMIT 1000';
    const { rows } = await pool.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// GET /turnos/:id
router.get('/:id', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM turnos WHERE id = $1', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'turno no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// PUT /turnos/:id (con validación mínima)
// Detecta cambios de estado y notifica AL PACIENTE cuando cambia (confirmado o cancelado)
router.put('/:id', turnoUpdateValidator, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const { rows: beforeRows } = await pool.query('SELECT * FROM turnos WHERE id = $1 LIMIT 1', [id]);
    if (!beforeRows.length) return res.status(404).json({ error: 'turno no encontrado' });
    const before = beforeRows[0];
    const oldEstado = (before.estado || '').toString();

    const fields = [];
    const values = [];
    let idx = 1;
    for (const key in updates) {
      fields.push(`${key} = $${idx++}`);
      values.push(updates[key]);
    }
    if (!fields.length) return res.status(400).json({ error: 'no updates provided' });
    values.push(id);
    const sql = `UPDATE turnos SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`;

    const { rows } = await pool.query(sql, values);
    if (!rows.length) return res.status(404).json({ error: 'turno no encontrado' });
    const updated = rows[0];

    // responder al cliente con el registro actualizado
    res.json(updated);

    // Si cambió el estado, notificar SOLO al paciente
    (async () => {
      try {
        const newEstado = (updated.estado || '').toString();
        if (updates.estado && newEstado !== oldEstado) {
          const fechaLegible = new Date(updated.fecha_turno).toLocaleString();
          if (newEstado.toLowerCase() === 'confirmada' || newEstado.toLowerCase() === 'confirmado') {
            if (updated.paciente_email) {
              const subject = 'Tu turno ha sido confirmado';
              const details = `
                ${detailRow('Paciente', `${updated.paciente_nombre} ${updated.paciente_apellido}`)}
                ${detailRow('Fecha y hora', fechaLegible)}
                ${detailRow('Motivo', updated.motivo || '-')}
              `;
              const html = emailWrapper({
                title: 'Turno confirmado',
                introHtml: `<p>Hola ${updated.paciente_nombre},</p><p>Tu turno ha sido <strong>confirmado</strong>. A continuación los detalles:</p>`,
                detailsRowsHtml: details
              });
              await sendMailSendGrid(updated.paciente_email, subject, html);
            }
          } else if (newEstado.toLowerCase() === 'cancelada' || newEstado.toLowerCase() === 'cancelado') {
            if (updated.paciente_email) {
              const subject = 'Tu turno ha sido cancelado';
              const details = `
                ${detailRow('Paciente', `${updated.paciente_nombre} ${updated.paciente_apellido}`)}
                ${detailRow('Fecha y hora', fechaLegible)}
                ${detailRow('Motivo', updated.motivo || '-')}
              `;
              const html = emailWrapper({
                title: 'Turno cancelado',
                introHtml: `<p>Hola ${updated.paciente_nombre},</p><p>Tu turno ha sido <strong>cancelado</strong>. Si crees que esto es un error, contactanos:</p>`,
                detailsRowsHtml: details
              });
              await sendMailSendGrid(updated.paciente_email, subject, html);
            }
          }
        }
      } catch (notifErr) {
        console.error('Error en notificaciones post-update:', notifErr);
      }
    })();

    return;
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || 'DB error' });
  }
});

module.exports = router;