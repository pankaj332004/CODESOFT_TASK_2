const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { getDbStatus } = require('../config/db');
const { memoryUsers } = require('../services/authService');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'supersecret_quizmaker_jwt_key_2026'
      );

      const dbStatus = getDbStatus();
      if (dbStatus.isConnected) {
        req.user = await User.findById(decoded.id).select('-password');
      } else {
        // Fallback store
        const user = memoryUsers.find((u) => u._id === decoded.id);
        if (user) {
          const { password, ...safeUser } = user;
          req.user = safeUser;
        }
      }

      if (!req.user) {
        return res.status(401).json({ message: 'User not found or token invalid' });
      }

      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

const optionalAuth = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'supersecret_quizmaker_jwt_key_2026'
      );

      const dbStatus = getDbStatus();
      if (dbStatus.isConnected) {
        req.user = await User.findById(decoded.id).select('-password');
      } else {
        const user = memoryUsers.find((u) => u._id === decoded.id);
        if (user) {
          const { password, ...safeUser } = user;
          req.user = safeUser;
        }
      }
    } catch (e) {
      // Ignore invalid token for optional auth
    }
  }
  next();
};

module.exports = { protect, optionalAuth };
