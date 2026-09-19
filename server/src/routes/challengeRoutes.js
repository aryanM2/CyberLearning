import express from 'express';
import {
  getChallenges,
  getChallengeById,
  submitChallenge,
  createChallenge,
  updateChallenge,
  deleteChallenge,
} from '../controllers/challengeController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getChallenges);
router.get('/:id', getChallengeById);
router.post('/:id/submit', protect, submitChallenge);

// Admin routes
router.post('/', protect, authorize('admin'), createChallenge);
router.put('/:id', protect, authorize('admin'), updateChallenge);
router.delete('/:id', protect, authorize('admin'), deleteChallenge);

export default router;
