import Reward from '../models/Reward.js';
import RewardRedemption from '../models/RewardRedemption.js';
import User from '../models/User.js';
import XPTransaction from '../models/XPTransaction.js';
import Activity from '../models/Activity.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * @desc    Get all available rewards & user redemptions
 * @route   GET /api/v1/rewards
 * @access  Public / Private
 */
export const getRewards = asyncHandler(async (req, res) => {
  const rewards = await Reward.find({}).sort({ xpCost: 1 });

  let myRedemptions = [];
  if (req.user) {
    myRedemptions = await RewardRedemption.find({ user: req.user.id })
      .populate('reward')
      .sort({ createdAt: -1 });
  }

  return successResponse(res, 200, 'Rewards fetched successfully', {
    rewards,
    myRedemptions,
  });
});

/**
 * @desc    Redeem a reward with user XP
 * @route   POST /api/v1/rewards/:id/redeem
 * @access  Private
 */
export const redeemReward = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const reward = await Reward.findById(id);
  if (!reward) {
    return errorResponse(res, 404, 'Reward item not found');
  }

  if (reward.stock <= 0) {
    return errorResponse(res, 400, 'This item is currently out of stock');
  }

  const user = await User.findById(userId);
  if (user.xp < reward.xpCost) {
    return errorResponse(res, 400, `Insufficient XP. You need ${reward.xpCost} XP but only have ${user.xp} XP`);
  }

  // Deduct XP atomically
  user.xp -= reward.xpCost;
  await user.save({ validateBeforeSave: false });

  // Decrement stock
  reward.stock -= 1;
  await reward.save({ validateBeforeSave: false });

  // Generate code
  const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
  const redemptionCode = (reward.codeFormat || 'CYBER-XXXX-XXXX').replace('XXXX', randomHex);

  // Create Redemption record
  const redemption = await RewardRedemption.create({
    user: userId,
    reward: id,
    xpSpent: reward.xpCost,
    redemptionCode: redemptionCode,
    status: 'completed',
  });

  // Log XP transaction (deduction)
  await XPTransaction.create({
    user: userId,
    amount: -reward.xpCost,
    source: 'reward',
    description: `Redeemed reward: ${reward.title}`,
  });

  // Log Activity
  await Activity.create({
    user: userId,
    type: 'reward_redeemed',
    title: `Redeemed: ${reward.title}`,
    xpEarned: -reward.xpCost,
  });

  return successResponse(res, 200, `Successfully redeemed ${reward.title}!`, {
    redemption,
    code: redemptionCode,
    updatedXP: user.xp,
  });
});

/**
 * @desc    Create reward item (Admin)
 * @route   POST /api/v1/rewards
 * @access  Private/Admin
 */
export const createReward = asyncHandler(async (req, res) => {
  const reward = await Reward.create(req.body);
  return successResponse(res, 201, 'Reward created successfully', reward);
});

/**
 * @desc    Update reward item (Admin)
 * @route   PUT /api/v1/rewards/:id
 * @access  Private/Admin
 */
export const updateReward = asyncHandler(async (req, res) => {
  const reward = await Reward.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!reward) {
    return errorResponse(res, 404, 'Reward not found');
  }
  return successResponse(res, 200, 'Reward updated successfully', reward);
});

/**
 * @desc    Delete reward item (Admin)
 * @route   DELETE /api/v1/rewards/:id
 * @access  Private/Admin
 */
export const deleteReward = asyncHandler(async (req, res) => {
  const reward = await Reward.findByIdAndDelete(req.params.id);
  if (!reward) {
    return errorResponse(res, 404, 'Reward not found');
  }
  return successResponse(res, 200, 'Reward deleted successfully');
});
