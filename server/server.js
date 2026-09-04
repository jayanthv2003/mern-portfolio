import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { apiLimiter } from './middleware/rateLimiter.js';

import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import certificateRoutes from './routes/certificateRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

dotenv.config();
connectDB();

const app = express();

// ---- Security & core middleware ----
app.use(helmet()); // sets secure HTTP headers
app.use(express.json({ limit: '10kb' })); // parse JSON bodies, limit payload size
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS - only allow the configured client origin(s)
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173').split(',');
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Apply general rate limiting to all API routes
app.use('/api', apiLimiter);

// ---- Health check ----
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'API is running', timestamp: new Date().toISOString() });
});

// ---- Routes ----
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/contact', contactRoutes);

// ---- 404 + error handling (must be last) ----
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

export default app;
