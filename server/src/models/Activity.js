import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String, // 'article_completed', 'challenge_solved', 'streak_gained', 'achievement_unlocked', 'reward_redeemed'
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    xpEarned: {
      type: Number,
      default: 0,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Activity', activitySchema);
