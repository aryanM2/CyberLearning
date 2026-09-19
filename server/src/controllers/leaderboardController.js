import User from '../models/User.js';
import { successResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * @desc    Get global leaderboard ranked by XP
 * @route   GET /api/v1/leaderboard
 * @access  Public / Private
 */
export const getLeaderboard = asyncHandler(async (req, res) => {
  // Exclude admin users from leaderboard (leaderboard is strictly for learners)
  const users = await User.find({ role: { $ne: 'admin' } })
    .sort({ xp: -1 })
    .select('name avatar level xp streak badges role createdAt')
    .limit(100);

  const leaderboard = users.map((user, index) => ({
    rank: index + 1,
    id: user._id,
    _id: user._id,
    name: user.name,
    avatar: user.avatar || '',
    level: user.level,
    xp: user.xp,
    streak: user.streak,
    badgesCount: user.badges ? user.badges.length : 0,
    role: user.role,
  }));

  let currentUserRank = null;
  if (req.user && req.user.role !== 'admin') {
    const higherXpCount = await User.countDocuments({ role: { $ne: 'admin' }, xp: { $gt: req.user.xp || 0 } });
    currentUserRank = higherXpCount + 1;
  }

  return successResponse(res, 200, 'Leaderboard fetched successfully', {
    leaderboard,
    currentUserRank,
  });
});
