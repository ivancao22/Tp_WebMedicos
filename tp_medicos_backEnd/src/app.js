const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());

// Configuración CORS para desarrollo: permitir localhost:3000 y localhost:3001
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) return callback(null, true);
    return callback(new Error('CORS policy: Origin not allowed'), false);
  },
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization','Accept'],
  credentials: true,
}));



// health, lo utilice solo para ver si mi api estaba activa 
app.get('/health', (_, res) => {
  res.json({ ok: true });
});

// rutas
const authRouter = require('./routes/auth');
const medicosRouter = require('./routes/medicos');
const obrasRouter = require('./routes/obras');
const turnosRouter = require('./routes/turnos');

app.use('/auth', authRouter);
app.use('/medicos', medicosRouter);
app.use('/obras', obrasRouter);
app.use('/turnos', turnosRouter);

// Cargo documentacion en swagger
require('./swagger')(app);

// Manejo de errores mínimo para no exponer el error/stack trace en produccion
app.use((err, req, res, next) => {
  console.error(err);
  const isProd = process.env.NODE_ENV === 'production';
  res.status(err.statusCode || 500).json({
    error: err.message || 'Server error',
    ...(isProd ? {} : { stack: err.stack }),
  });
});

module.exports = app;