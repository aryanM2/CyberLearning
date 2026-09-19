import express from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import articleRoutes from './articleRoutes.js';
import readingRoutes from './readingRoutes.js';
import challengeRoutes from './challengeRoutes.js';
import achievementRoutes from './achievementRoutes.js';
import leaderboardRoutes from './leaderboardRoutes.js';
import rewardRoutes from './rewardRoutes.js';
import adminRoutes from './adminRoutes.js';
import { successResponse } from '../utils/apiResponse.js';

const router = express.Router();

// Health Check Endpoint
router.get('/health', (req, res) => {
  return successResponse(res, 200, 'CyberLearning API is online and healthy', {
    status: 'UP',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

// Route Modules
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/articles', articleRoutes);
router.use('/reading', readingRoutes);
router.use('/challenges', challengeRoutes);
router.use('/achievements', achievementRoutes);
router.use('/leaderboard', leaderboardRoutes);
router.use('/rewards', rewardRoutes);
router.use('/admin', adminRoutes);

export default router;

