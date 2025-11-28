const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors({ origin: ['http://localhost:3000'] }));

// health
app.get('/health', (_, res) => {
  res.json({ ok: true });
});

// Montar rutas
const authRouter = require('./routes/auth');
const medicosRouter = require('./routes/medicos');
const obrasRouter = require('./routes/obras');
const turnosRouter = require('./routes/turnos');

app.use('/auth', authRouter);
app.use('/medicos', medicosRouter);
app.use('/obras', obrasRouter);
app.use('/turnos', turnosRouter);

// Manejo de errores mínimo
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({ error: err.message || 'Server error' });
});

module.exports = app;