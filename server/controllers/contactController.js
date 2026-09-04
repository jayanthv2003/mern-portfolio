import asyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import Contact from '../models/Contact.js';
import sendEmail from '../utils/sendEmail.js';

// @desc    Submit the contact form (saves to DB + emails the owner)
// @route   POST /api/contact
// @access  Public
export const submitContact = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array().map((e) => e.msg).join(', '));
  }

  const { name, email, subject, message } = req.body;

  const contact = await Contact.create({ name, email, subject, message });

  // Try to send the email notification, but don't fail the request if
  // email sending has an issue - the message is already safely saved.
  try {
    await sendEmail({
      to: process.env.EMAIL_RECEIVER,
      replyTo: email,
      subject: `New portfolio message: ${subject}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    });
  } catch (emailError) {
    console.error('Email notification failed:', emailError.message);
  }

  res.status(201).json({
    success: true,
    message: 'Message sent successfully. Thank you for reaching out!',
    data: contact,
  });
});

// @desc    Get all contact messages (admin dashboard)
// @route   GET /api/contact
// @access  Private/Admin
export const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json({ success: true, count: contacts.length, data: contacts });
});

// @desc    Mark a message as read
// @route   PUT /api/contact/:id/read
// @access  Private/Admin
export const markContactRead = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    { read: true },
    { new: true }
  );

  if (!contact) {
    res.status(404);
    throw new Error('Message not found');
  }

  res.json({ success: true, data: contact });
});

// @desc    Delete a contact message
// @route   DELETE /api/contact/:id
// @access  Private/Admin
export const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error('Message not found');
  }

  await contact.deleteOne();

  res.json({ success: true, message: 'Message deleted', data: { _id: req.params.id } });
});
