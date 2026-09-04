import express from 'express';
import { body } from 'express-validator';
import {
  getCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate,
} from '../controllers/certificateController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

const certificateValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('issuer').trim().notEmpty().withMessage('Issuer is required'),
  body('issueDate').notEmpty().withMessage('Issue date is required'),
];

// Public
router.get('/', getCertificates);

// Private/Admin
router.post('/', protect, adminOnly, certificateValidation, createCertificate);
router.put('/:id', protect, adminOnly, updateCertificate);
router.delete('/:id', protect, adminOnly, deleteCertificate);

export default router;
