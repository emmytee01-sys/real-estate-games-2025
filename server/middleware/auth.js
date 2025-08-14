const jwt = require('jsonwebtoken');

// Admin authentication middleware
const authenticateAdmin = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    // Check if user is admin
    if (!decoded.isAdmin) {
      return res.status(403).json({ error: 'Access denied. Admin privileges required.' });
    }
    
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token.' });
  }
};

// Optional authentication (for public routes that can show admin data if authenticated)
const optionalAuth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      req.admin = decoded;
    }
    
    next();
  } catch (error) {
    // Continue without authentication
    next();
  }
};

// Generate admin token
const generateAdminToken = (adminData) => {
  return jwt.sign(
    { 
      id: adminData.id, 
      email: adminData.email, 
      isAdmin: true 
    },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '24h' }
  );
};

module.exports = {
  authenticateAdmin,
  optionalAuth,
  generateAdminToken
}; 