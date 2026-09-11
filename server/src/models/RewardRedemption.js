import mongoose from 'mongoose';

const rewardRedemptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reward: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reward',
      required: true,
    },
    xpSpent: {
      type: Number,
      required: true,
    },
    redemptionCode: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'cancelled'],
      default: 'completed',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('RewardRedemption', rewardRedemptionSchema);
