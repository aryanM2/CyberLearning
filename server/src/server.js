import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/db.js';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to Database and start server
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`[CyberLearning Server] Running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
};

startServer();
