const jwt = require('jsonwebtoken');

function authAdmin(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, 'yourSecretKey');
    if (decoded.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}

module.exports = authAdmin;