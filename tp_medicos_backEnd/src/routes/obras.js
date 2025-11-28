const express = require('express');
const router = express.Router();
const { pool } = require('../db/pool');
const { requireAuth, requireRole } = require('../middleware/auth');

// GET /obras  -> listar obras sociales
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT id, nombre FROM obras_sociales ORDER BY nombre');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// POST /obras  -> crear (protegido)
router.post('/', requireAuth, requireRole('admin','secretaria'), async (req, res) => {
  const { nombre } = req.body;
  if (!nombre) return res.status(400).json({ error: 'nombre es requerido' });
  try {
    const { rows } = await pool.query(
      'INSERT INTO obras_sociales (nombre) VALUES ($1) RETURNING *',
      [nombre]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    if (err.code === '23505') return res.status(409).json({ error: 'obra social ya existe' });
    res.status(500).json({ error: 'DB error' });
  }
});

// PATCH /obras/:id  -> actualizar nombre (protegido)
router.patch('/:id', requireAuth, requireRole('admin','secretaria'), async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  if (!nombre) return res.status(400).json({ error: 'nombre es requerido' });
  try {
    const { rows } = await pool.query(
      'UPDATE obras_sociales SET nombre = $1 WHERE id = $2 RETURNING *',
      [nombre, id]
    );
    if (!rows.length) return res.status(404).json({ error: 'obra no encontrada' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    if (err.code === '23505') return res.status(409).json({ error: 'nombre duplicado' });
    res.status(500).json({ error: 'DB error' });
  }
});

// DELETE /obras/:id  -> eliminar (protegido)
router.delete('/:id', requireAuth, requireRole('admin','secretaria'), async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('DELETE FROM obras_sociales WHERE id = $1 RETURNING *', [id]);
    if (!rows.length) return res.status(404).json({ error: 'obra no encontrada' });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

module.exports = router;