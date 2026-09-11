import express from 'express';
import { completeArticle, getCompletedArticles } from '../controllers/readingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/:id/complete', protect, completeArticle);
router.get('/completed/list', protect, getCompletedArticles);

export default router;
