require('dotenv').config({ path: './credenciales.env' }); // ajusta si tu env file tiene otro nombre
const sg = require('@sendgrid/mail');
sg.setApiKey(process.env.SENDGRID_API_KEY);

async function main() {
  try {
    const msg = {
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_FROM,
      from: process.env.EMAIL_FROM,
      subject: 'Prueba SendGrid desde test_send.js',
      html: '<p>Prueba de envío desde script independiente</p>'
    };
    const res = await sg.send(msg);
    console.log('Respuesta SendGrid:', res && res.length ? res[0].statusCode : 'OK', res && res[0] && res[0].headers ? res[0].headers : '');
  } catch (err) {
    console.error('Error al enviar vía SendGrid:', JSON.stringify(err?.response?.body || err.message || err, null, 2));
  }
}

main();