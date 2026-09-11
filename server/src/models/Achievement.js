import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: 'Trophy',
    },
    category: {
      type: String,
      enum: ['Learning', 'Challenges', 'Streak', 'XP', 'Community'],
      default: 'Learning',
    },
    xpReward: {
      type: Number,
      default: 100,
    },
    requirementType: {
      type: String, // e.g. 'articles_read', 'challenges_solved', 'streak_days', 'total_xp'
      required: true,
    },
    requirementThreshold: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Achievement', achievementSchema);
