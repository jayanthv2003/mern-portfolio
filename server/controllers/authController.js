import asyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc    Authenticate admin & get token
// @route   POST /api/auth/login
// @access  Public
export const loginAdmin = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array().map((e) => e.msg).join(', '));
  }

  const { email, password } = req.body;

  // password has `select: false` in the schema, so explicitly request it
  const user = await User.findOne({ email }).select('+password');

  if (user && (await user.matchPassword(password))) {
    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      },
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Get currently logged in admin profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
  // req.user is set by the `protect` middleware
  res.json({ success: true, data: req.user });
});
