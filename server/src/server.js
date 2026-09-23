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
    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@nextgen-sec.com').toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || 'NextGenAdmin#2026';

    let adminUser = await User.findOne({ email: adminEmail }).select('+password');

    if (!adminUser) {
      adminUser = await User.create({
        name: 'Enterprise Security Admin',
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
      });
      console.log(`[Admin Security] Created new dedicated Admin account: ${adminUser.email}`);
    } else {
      // Ensure role is admin and update password if needed
      adminUser.role = 'admin';
      adminUser.password = adminPassword;
      await adminUser.save();
      console.log(`[Admin Security] Synchronized dedicated Admin account credentials: ${adminUser.email}`);
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
