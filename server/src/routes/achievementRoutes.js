import express from 'express';
import {
  getAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} from '../controllers/achievementController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAchievements);

// Admin routes
router.post('/', protect, authorize('admin'), createAchievement);
router.put('/:id', protect, authorize('admin'), updateAchievement);
router.delete('/:id', protect, authorize('admin'), deleteAchievement);

export default router;
