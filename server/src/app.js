import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import routes from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { errorResponse } from './utils/apiResponse.js';

const app = express();

// Security HTTP headers
app.use(helmet());

// CORS configuration
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
app.use(
  cors({
    origin: [corsOrigin, 'http://localhost:3000', 'http://localhost:5173'],
    credentials: true,
  })
);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 200 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes',
  },
});
app.use('/api', limiter);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount API routes
app.use('/api/v1', routes);

// 404 Route Handler
app.use((req, res) => {
  return errorResponse(res, 404, `Route ${req.originalUrl} not found`);
});

// Global Error Handler
app.use(errorHandler);

export default app;
