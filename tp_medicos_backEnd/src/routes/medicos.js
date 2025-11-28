const express = require('express');
const router = express.Router();
const { pool } = require('../db/pool');

// GET /medicos
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT id, nombre, apellido, especialidad, estado, email, telefono FROM medicos ORDER BY nombre');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

module.exports = router;