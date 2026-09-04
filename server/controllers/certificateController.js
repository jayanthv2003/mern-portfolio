import asyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import Certificate from '../models/Certificate.js';

// @desc    Get all certificates
// @route   GET /api/certificates
// @access  Public
export const getCertificates = asyncHandler(async (req, res) => {
  const certificates = await Certificate.find().sort({ issueDate: -1 });
  res.json({ success: true, count: certificates.length, data: certificates });
});

// @desc    Create a certificate
// @route   POST /api/certificates
// @access  Private/Admin
export const createCertificate = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array().map((e) => e.msg).join(', '));
  }

  const certificate = await Certificate.create(req.body);
  res.status(201).json({ success: true, data: certificate });
});

// @desc    Update a certificate
// @route   PUT /api/certificates/:id
// @access  Private/Admin
export const updateCertificate = asyncHandler(async (req, res) => {
  const certificate = await Certificate.findById(req.params.id);

  if (!certificate) {
    res.status(404);
    throw new Error('Certificate not found');
  }

  const updated = await Certificate.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.json({ success: true, data: updated });
});

// @desc    Delete a certificate
// @route   DELETE /api/certificates/:id
// @access  Private/Admin
export const deleteCertificate = asyncHandler(async (req, res) => {
  const certificate = await Certificate.findById(req.params.id);

  if (!certificate) {
    res.status(404);
    throw new Error('Certificate not found');
  }

  await certificate.deleteOne();

  res.json({ success: true, message: 'Certificate removed', data: { _id: req.params.id } });
});
