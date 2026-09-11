import mongoose from 'mongoose';

const xpTransactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    source: {
      type: String,
      enum: ['article', 'challenge', 'streak', 'achievement', 'reward', 'admin_adjustment'],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('XPTransaction', xpTransactionSchema);
