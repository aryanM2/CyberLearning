import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/db.js';
import User from './models/User.js';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

// Ensure company admin account exists on startup
const initAdminAccount = async () => {
  try {
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@nextgen-sec.com';
      const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123456';
      
      const newAdmin = await User.create({
        name: 'Company Security Admin',
        email: adminEmail.toLowerCase(),
        password: adminPassword,
        role: 'admin',
      });
      console.log(`[Admin Security] Created initial company admin: ${newAdmin.email}`);
    } else {
      console.log(`[Admin Security] Active company admin found: ${adminExists.email}`);
    }
  } catch (err) {
    console.error(`[Admin Security Error] ${err.message}`);
  }
};

// Connect to Database and start server
const startServer = async () => {
  await connectDB();
  await initAdminAccount();

  app.listen(PORT, () => {
    console.log(`[CyberLearning Server] Running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
};

startServer();
