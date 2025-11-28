const { Pool } = require('pg');
require('dotenv').config({ path: './credenciales.env' });

// Crea y exporta un pool reutilizable para todo el app.
// No se hace pool.end() aquí: las rutas y el servidor lo usan durante todo el ciclo de vida.
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

pool.on('error', (err) => {
  console.error('Unexpected idle client error', err);
});

module.exports = { pool };