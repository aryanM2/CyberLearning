import User from '../models/User.js';
import Article from '../models/Article.js';
import Challenge from '../models/Challenge.js';
import Submission from '../models/Submission.js';
import ReadingProgress from '../models/ReadingProgress.js';
import XPTransaction from '../models/XPTransaction.js';
import { successResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * @desc    Get aggregated platform metrics for Admin Analytics dashboard
 * @route   GET /api/v1/admin/analytics
 * @access  Private/Admin
 */
export const getAdminAnalytics = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments({});
  const totalArticles = await Article.countDocuments({});
  const totalChallenges = await Challenge.countDocuments({});
  const totalSubmissions = await Submission.countDocuments({});
  const solvedSubmissions = await Submission.countDocuments({ isCorrect: true });
  const completedArticles = await ReadingProgress.countDocuments({ completed: true });

  // Sum of total XP distributed
  const xpAggregate = await User.aggregate([
    { $group: { _id: null, totalXP: { $sum: '$xp' } } },
  ]);
  const totalXpDistributed = xpAggregate.length > 0 ? xpAggregate[0].totalXP : 0;

  // Active users in last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const activeUsers7Days = await User.countDocuments({ lastActiveDate: { $gte: sevenDaysAgo } });

  // Article count by category
  const articleCategories = await Article.aggregate([
    { $group: { _id: '$category', count: { $sum: 1 } } },
  ]);

  return successResponse(res, 200, 'Admin analytics metrics fetched successfully', {
    totalUsers,
    totalArticles,
    totalChallenges,
    totalSubmissions,
    solvedSubmissions,
    completedArticles,
    totalXpDistributed,
    activeUsers7Days,
    articleCategories,
  });
});
