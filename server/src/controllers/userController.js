import User from '../models/User.js';
import Activity from '../models/Activity.js';
import ReadingProgress from '../models/ReadingProgress.js';
import Submission from '../models/Submission.js';
import { calculateLevel } from '../config/levelConfig.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * @desc    Get current user profile with calculated level info & stats
 * @route   GET /api/v1/users/profile
 * @access  Private
 */
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return errorResponse(res, 404, 'User not found');
  }

  const levelInfo = calculateLevel(user.xp);

  // Fetch recent activity
  const activities = await Activity.find({ user: user._id })
    .sort({ timestamp: -1 })
    .limit(10);

  // Stats
  const completedArticlesCount = await ReadingProgress.countDocuments({ user: user._id, completed: true });
  const solvedChallengesCount = await Submission.countDocuments({ user: user._id, isCorrect: true });

  return successResponse(res, 200, 'User profile fetched successfully', {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      bio: user.bio,
      xp: user.xp,
      level: user.level,
      streak: user.streak,
      badges: user.badges,
      createdAt: user.createdAt,
    },
    levelInfo,
    stats: {
      completedArticlesCount,
      solvedChallengesCount,
    },
    activities,
  });
});

/**
 * @desc    Update profile info (name, email, bio, avatar)
 * @route   PUT /api/v1/users/profile
 * @access  Private
 */
export const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, email, bio, avatar } = req.body;
  const user = await User.findById(req.user.id);

  if (!user) {
    return errorResponse(res, 404, 'User not found');
  }

  if (name) user.name = name;
  if (bio !== undefined) user.bio = bio;
  if (avatar !== undefined) user.avatar = avatar;

  if (email && email.toLowerCase() !== user.email.toLowerCase()) {
    const emailExists = await User.findOne({ 
      email: email.toLowerCase(), 
      _id: { $ne: user._id } 
    });
    if (emailExists) {
      return errorResponse(res, 400, 'This email address is already in use by another account');
    }
    user.email = email.toLowerCase();
  }

  await user.save();

  return successResponse(res, 200, 'Profile updated successfully', {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      bio: user.bio,
      xp: user.xp,
      level: user.level,
      streak: user.streak,
      badges: user.badges,
    },
  });
});
