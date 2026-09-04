import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
      maxlength: 150,
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      maxlength: 2000,
    },
    read: {
      // has the admin viewed this message in the dashboard?
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
