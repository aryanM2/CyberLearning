import Achievement from '../models/Achievement.js';
import UserAchievement from '../models/UserAchievement.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { checkAndUnlockAchievements } from '../services/achievementService.js';

/**
 * @desc    Get all achievements with user unlock status
 * @route   GET /api/v1/achievements
 * @access  Public / Private
 */
export const getAchievements = asyncHandler(async (req, res) => {
  if (req.user) {
    // Attempt automatic check & unlock
    await checkAndUnlockAchievements(req.user.id);
  }

  const achievements = await Achievement.find({}).sort({ createdAt: 1 });

  let userUnlockedMap = new Map();
  if (req.user) {
    const userAch = await UserAchievement.find({ user: req.user.id });
    userAch.forEach(ua => {
      userUnlockedMap.set(ua.achievement.toString(), ua.unlockedAt);
    });
  }

  const result = achievements.map(ach => ({
    id: ach._id,
    _id: ach._id,
    title: ach.title,
    description: ach.description,
    icon: ach.icon,
    category: ach.category,
    xpReward: ach.xpReward,
    requirementType: ach.requirementType,
    requirementThreshold: ach.requirementThreshold,
    unlocked: userUnlockedMap.has(ach._id.toString()),
    unlockedAt: userUnlockedMap.get(ach._id.toString()) || null,
  }));

  return successResponse(res, 200, 'Achievements fetched successfully', result);
});

/**
 * @desc    Create achievement (Admin)
 * @route   POST /api/v1/achievements
 * @access  Private/Admin
 */
export const createAchievement = asyncHandler(async (req, res) => {
  const achievement = await Achievement.create(req.body);
  return successResponse(res, 201, 'Achievement created successfully', achievement);
});

/**
 * @desc    Update achievement (Admin)
 * @route   PUT /api/v1/achievements/:id
 * @access  Private/Admin
 */
export const updateAchievement = asyncHandler(async (req, res) => {
  const achievement = await Achievement.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!achievement) {
    return errorResponse(res, 404, 'Achievement not found');
  }
  return successResponse(res, 200, 'Achievement updated successfully', achievement);
});

/**
 * @desc    Delete achievement (Admin)
 * @route   DELETE /api/v1/achievements/:id
 * @access  Private/Admin
 */
export const deleteAchievement = asyncHandler(async (req, res) => {
  const achievement = await Achievement.findByIdAndDelete(req.params.id);
  if (!achievement) {
    return errorResponse(res, 404, 'Achievement not found');
  }
  return successResponse(res, 200, 'Achievement deleted successfully');
});
