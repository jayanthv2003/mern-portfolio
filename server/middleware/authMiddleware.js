import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

/**
 * Protects a route: requires a valid JWT in the Authorization header
 * (format: "Bearer <token>"). Attaches the authenticated user to req.user.
 */
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer')) {
    try {
      token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user (without password) to the request for downstream handlers
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        res.status(401);
        throw new Error('Not authorized, user no longer exists');
      }

      return next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed or expired');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token provided');
  }
});

/**
 * Restricts a route to admin role only. Must be used after `protect`.
 */
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  res.status(403);
  throw new Error('Not authorized as an admin');
};
