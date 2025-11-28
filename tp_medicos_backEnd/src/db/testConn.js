const { Pool } = require('pg');
const fs = require('fs');

console.log('>>> testConn.js arrancando');
console.log('cwd:', process.cwd());
console.log('credenciales.env existe?', fs.existsSync('credenciales.env'));

require('dotenv').config({ path: './credenciales.env' });
console.log('Después de dotenv.config(), process.env.DATABASE_URL=', process.env.DATABASE_URL ? '[PRESENT]' : '[MISSING]');

(async () => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  try {
    console.log('Intentando query SELECT NOW() ...');
    const res = await pool.query('SELECT NOW()');
    console.log('DB connected, now():', res.rows[0]);
  } catch (err) {
    console.error('DB connection error:', err.message || err);
    process.exitCode = 1;
  } finally {
    await pool.end();
    console.log('Pool cerrado, testConn.js finalizado');
  }
})();