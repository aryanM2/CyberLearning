import User from '../models/User.js';

export const updateStreak = async (userId) => {
  const user = await User.findById(userId);
  if (!user) return;

  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];

  if (!user.lastActiveDate) {
    user.streak = 1;
    user.lastActiveDate = now;
    await user.save({ validateBeforeSave: false });
    return user.streak;
  }

  const lastActiveStr = new Date(user.lastActiveDate).toISOString().split('T')[0];

  if (todayStr === lastActiveStr) {
    // Already active today
    return user.streak;
  }

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  if (lastActiveStr === yesterdayStr) {
    // Consecutive day activity!
    user.streak = (user.streak || 0) + 1;
  } else {
    // Missed one or more days, reset streak
    user.streak = 1;
  }

  user.lastActiveDate = now;
  await user.save({ validateBeforeSave: false });

  return user.streak;
};
