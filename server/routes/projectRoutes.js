import express from 'express';
import { body } from 'express-validator';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

const projectValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('technologies').isArray({ min: 1 }).withMessage('At least one technology is required'),
];

// Public
router.get('/', getProjects);
router.get('/:id', getProjectById);

// Private/Admin
router.post('/', protect, adminOnly, projectValidation, createProject);
router.put('/:id', protect, adminOnly, updateProject);
router.delete('/:id', protect, adminOnly, deleteProject);

export default router;
