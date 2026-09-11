import User from '../models/User.js';
import XPTransaction from '../models/XPTransaction.js';
import Activity from '../models/Activity.js';
import { calculateLevel } from '../config/levelConfig.js';

/**
 * Award XP to a user, update level if threshold crossed, create audit transaction & activity log
 */
export const awardXP = async (userId, amount, source, description) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  const oldXP = user.xp || 0;
  const oldLevel = user.level || 1;
  const newXP = oldXP + amount;

  // Calculate level based on new total XP
  const levelInfo = calculateLevel(newXP);
  const leveledUp = levelInfo.level > oldLevel;

  // Update user XP & level
  user.xp = newXP;
  user.level = levelInfo.level;
  await user.save({ validateBeforeSave: false });

  // Create immutable XP Transaction log
  await XPTransaction.create({
    user: userId,
    amount,
    source,
    description,
  });

  // Create Activity log
  await Activity.create({
    user: userId,
    type: `${source}_gained`,
    title: description,
    xpEarned: amount,
  });

  return {
    success: true,
    xpAwarded: amount,
    totalXP: user.xp,
    level: user.level,
    leveledUp,
    oldLevel,
    newLevel: user.level,
    levelInfo,
  };
};
