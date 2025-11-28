const express = require('express');
const router = express.Router();
const { pool } = require('../db/pool');

// Helper para combinar fecha+hora
function combineFechaHora(fecha, hora) {
  return new Date(`${fecha}T${hora}:00`).toISOString();
}

// POST /turnos
router.post('/', async (req, res) => {
  try {
    let { fecha_turno, fecha, hora,
      paciente_nombre, paciente_apellido, paciente_email, paciente_telefono,
      obra_social_id, medico_id, motivo } = req.body;

    if (!fecha_turno) {
      if (!fecha || !hora) return res.status(400).json({ error: 'fecha_turno o (fecha + hora) requeridos' });
      fecha_turno = combineFechaHora(fecha, hora);
    }

    if (!paciente_nombre || !paciente_apellido || !paciente_email || !medico_id) {
      return res.status(400).json({ error: 'faltan campos requeridos' });
    }

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
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'DB error' });
  }
});

// GET /turnos (filtros opcionales)
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

// PUT /turnos/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
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
  try {
    const { rows } = await pool.query(sql, values);
    if (!rows.length) return res.status(404).json({ error: 'turno no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'DB error' });
  }
});

// DELETE /turnos/:id
router.delete('/:id', async (req, res) => {
  try {
    const { rows } = await pool.query('DELETE FROM turnos WHERE id = $1 RETURNING *', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'turno no encontrado' });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

module.exports = router;