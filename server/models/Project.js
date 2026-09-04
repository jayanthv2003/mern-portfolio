import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
      maxlength: 1000,
    },
    technologies: {
      // e.g. ["React", "Node.js", "MongoDB"]
      type: [String],
      required: [true, 'At least one technology is required'],
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: 'At least one technology must be provided',
      },
    },
    githubLink: {
      type: String,
      trim: true,
      match: [/^https?:\/\/.+/, 'GitHub link must be a valid URL'],
    },
    liveDemoLink: {
      type: String,
      trim: true,
      match: [/^https?:\/\/.+/, 'Live demo link must be a valid URL'],
    },
    image: {
      // URL to the project screenshot (hosted image, e.g. Cloudinary/Imgur link)
      type: String,
      default: '',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      // lets the admin control display order on the site
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', projectSchema);

export default Project;
