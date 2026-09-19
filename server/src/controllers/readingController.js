import ReadingProgress from '../models/ReadingProgress.js';
import Article from '../models/Article.js';
import { awardXP } from '../services/xpService.js';
import { updateStreak } from '../services/streakService.js';
import { checkAndUnlockAchievements } from '../services/achievementService.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * @desc    Mark article completed for user & award XP
 * @route   POST /api/v1/articles/:id/complete
 * @access  Private
 */
export const completeArticle = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const article = await Article.findById(id);
  if (!article) {
    return errorResponse(res, 404, 'Article not found');
  }

  // Check if already completed
  const existingProgress = await ReadingProgress.findOne({ user: userId, article: id });
  if (existingProgress) {
    return errorResponse(res, 400, 'Article already completed');
  }

  // Record reading completion
  await ReadingProgress.create({
    user: userId,
    article: id,
    completed: true,
  });

  // Update daily activity streak
  await updateStreak(userId);

  // Award XP via XP engine
  const xpReward = article.xpReward || 50;
  const xpResult = await awardXP(
    userId,
    xpReward,
    'article',
    `Completed article: ${article.title}`
  );

  // Check achievement unlocks
  const unlockedAchievements = await checkAndUnlockAchievements(userId);

  return successResponse(res, 200, `Article completed! +${xpReward} XP earned`, {
    articleId: id,
    xpAwarded: xpReward,
    totalXP: xpResult.totalXP,
    level: xpResult.level,
    leveledUp: xpResult.leveledUp,
    levelInfo: xpResult.levelInfo,
    unlockedAchievements,
  });
});

/**
 * @desc    Get all completed article IDs for current user
 * @route   GET /api/v1/articles/completed
 * @access  Private
 */
export const getCompletedArticles = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const progressList = await ReadingProgress.find({ user: userId, completed: true }).select('article completedAt');

  return successResponse(res, 200, 'Completed articles fetched successfully', progressList);
});
