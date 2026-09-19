import Achievement from '../models/Achievement.js';
import UserAchievement from '../models/UserAchievement.js';
import ReadingProgress from '../models/ReadingProgress.js';
import Submission from '../models/Submission.js';
import User from '../models/User.js';
import { awardXP } from './xpService.js';

export const checkAndUnlockAchievements = async (userId) => {
  const user = await User.findById(userId);
  if (!user) return [];

  // Calculate current user metrics
  const articlesReadCount = await ReadingProgress.countDocuments({ user: userId, completed: true });
  const challengesSolvedCount = await Submission.countDocuments({ user: userId, isCorrect: true });

  const metrics = {
    articles_read: articlesReadCount,
    challenges_solved: challengesSolvedCount,
    streak_days: user.streak || 0,
    total_xp: user.xp || 0,
  };

  const allAchievements = await Achievement.find({});
  const existingUserAchievements = await UserAchievement.find({ user: userId });
  const unlockedAchievementIds = new Set(existingUserAchievements.map(ua => ua.achievement.toString()));

  const newlyUnlocked = [];

  for (const achievement of allAchievements) {
    if (unlockedAchievementIds.has(achievement._id.toString())) {
      continue; // already unlocked
    }

    const currentVal = metrics[achievement.requirementType] || 0;
    if (currentVal >= achievement.requirementThreshold) {
      // Unlock achievement
      await UserAchievement.create({
        user: userId,
        achievement: achievement._id,
      });

      // Add badge to user's badges array if not already present
      if (!user.badges.includes(achievement.title)) {
        user.badges.push(achievement.title);
        await user.save({ validateBeforeSave: false });
      }

      // Award bonus XP for unlock
      if (achievement.xpReward > 0) {
        await awardXP(
          userId,
          achievement.xpReward,
          'achievement',
          `Unlocked achievement: ${achievement.title}`
        );
      }

      newlyUnlocked.push(achievement);
    }
  }

  return newlyUnlocked;
};
