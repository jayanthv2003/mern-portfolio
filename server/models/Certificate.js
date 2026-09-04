import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Certificate title is required'],
      trim: true,
    },
    issuer: {
      type: String,
      required: [true, 'Issuing organization is required'],
      trim: true,
    },
    issueDate: {
      type: Date,
      required: [true, 'Issue date is required'],
    },
    credentialId: {
      type: String,
      trim: true,
    },
    credentialUrl: {
      type: String,
      trim: true,
      match: [/^https?:\/\/.+/, 'Credential URL must be valid'],
    },
    image: {
      type: String, // certificate thumbnail/badge URL
      default: '',
    },
  },
  { timestamps: true }
);

const Certificate = mongoose.model('Certificate', certificateSchema);

export default Certificate;
