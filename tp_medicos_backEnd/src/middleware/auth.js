const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

// requireAuth: solo comprueba token y attach user al req
function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'missing authorization header' });
  const parts = auth.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ error: 'invalid authorization header' });
  try {
    const payload = jwt.verify(parts[1], JWT_SECRET);
    req.user = payload; // payload contiene sub (user id), rol, username
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'invalid token' });
  }
}

// requireRole: fábrica que verifica rol mínimo
function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'not authenticated' });
    if (!allowedRoles.includes(req.user.rol)) {
      return res.status(403).json({ error: 'forbidden' });
    }
    next();
  };
}

module.exports = { requireAuth, requireRole };