import asyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import Project from '../models/Project.js';

// @desc    Get all projects (public, sorted for display)
// @route   GET /api/projects
// @access  Public
export const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find().sort({ order: 1, createdAt: -1 });
  res.json({ success: true, count: projects.length, data: projects });
});

// @desc    Get single project by id
// @route   GET /api/projects/:id
// @access  Public
export const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }
  res.json({ success: true, data: project });
});

// @desc    Create a project
// @route   POST /api/projects
// @access  Private/Admin
export const createProject = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array().map((e) => e.msg).join(', '));
  }

  const { title, description, technologies, githubLink, liveDemoLink, image, featured, order } =
    req.body;

  const project = await Project.create({
    title,
    description,
    technologies,
    githubLink,
    liveDemoLink,
    image,
    featured,
    order,
  });

  res.status(201).json({ success: true, data: project });
});

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private/Admin
export const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.json({ success: true, data: updated });
});

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  await project.deleteOne();

  res.json({ success: true, message: 'Project removed', data: { _id: req.params.id } });
});
