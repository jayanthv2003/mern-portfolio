import express from 'express';
import { body } from 'express-validator';
import {
  submitContact,
  getContacts,
  markContactRead,
  deleteContact,
} from '../controllers/contactController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import { contactLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

const contactValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('A valid email is required'),
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
];

// Public
router.post('/', contactLimiter, contactValidation, submitContact);

// Private/Admin
router.get('/', protect, adminOnly, getContacts);
router.put('/:id/read', protect, adminOnly, markContactRead);
router.delete('/:id', protect, adminOnly, deleteContact);

export default router;
