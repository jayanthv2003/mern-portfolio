import express from 'express';
import { body } from 'express-validator';
import { loginAdmin, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { loginLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post(
  '/login',
  loginLimiter,
  [
    body('email').isEmail().withMessage('A valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  loginAdmin
);

router.get('/me', protect, getMe);

export default router;
