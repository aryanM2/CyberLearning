import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/cyberlearning');
    console.log(`[MongoDB] Connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error(`[MongoDB Error] ${error.message}`);
    // Don't exit in development if DB connection fails, allow server to run with warnings
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};
