import express from 'express';
import {
  getRewards,
  redeemReward,
  createReward,
  updateReward,
  deleteReward,
} from '../controllers/rewardController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getRewards);
router.post('/:id/redeem', protect, redeemReward);

// Admin routes
router.post('/', protect, authorize('admin'), createReward);
router.put('/:id', protect, authorize('admin'), updateReward);
router.delete('/:id', protect, authorize('admin'), deleteReward);

export default router;
