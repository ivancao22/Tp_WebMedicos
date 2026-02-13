const { body, validationResult } = require('express-validator');

// Validaciones minimas para POST/PATCH de obra social
const obraValidator = [
  body('nombre')
    .exists().withMessage('nombre es requerido')
    .bail()
    .isString().withMessage('nombre debe ser texto')
    .trim()
    .notEmpty().withMessage('nombre no puede estar vacío'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: errors.array().map(e => e.msg).join(', ') });
    next();
  }
];

// validaciones minimas para POST de turno
const turnoCreateValidator = [

  body('fecha_turno').optional().isISO8601().withMessage('fecha_turno tiene formato incorrecto'),
  body('fecha').optional().isISO8601().withMessage('fecha debe ser YYYY-MM-DD'),
  body('hora').optional().matches(/^\d{2}:\d{2}$/).withMessage('hora debe ser HH:MM'),
  body('paciente_nombre').exists().withMessage('paciente_nombre es requerido').bail().isString().trim().notEmpty(),
  body('paciente_apellido').exists().withMessage('paciente_apellido es requerido').bail().isString().trim().notEmpty(),
  body('paciente_email').exists().withMessage('paciente_email es requerido').bail().isEmail().withMessage('email inválido'),
  body('medico_id').exists().withMessage('medico_id es requerido').bail().isInt().withMessage('medico_id debe ser entero'),
  (req, res, next) => {
    // revisr que haya enviado fecha y hora para el turno
    if (!req.body.fecha_turno && !(req.body.fecha && req.body.hora)) {
      return res.status(400).json({ error: 'fecha_turno o (fecha + hora) requeridos' });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: errors.array().map(e => e.msg).join(', ') });
    next();
  }
];

// Validaciones minimas para PUT /turnos/:id 
const turnoUpdateValidator = [
  body().custom(value => {

    const allowed = ['fecha_turno', 'estado', 'confirmado_por', 'cancelado_por', 'motivo', 'paciente_telefono'];
    const keys = Object.keys(value || {});
    if (!keys.length) throw new Error('no updates provided');
    const hasAllowed = keys.some(k => allowed.includes(k));
    if (!hasAllowed) throw new Error('no valid fields to update');
    return true;
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: errors.array().map(e => e.msg).join(', ') });
    next();
  }
];

module.exports = { obraValidator, turnoCreateValidator, turnoUpdateValidator };