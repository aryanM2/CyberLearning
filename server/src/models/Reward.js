import mongoose from 'mongoose';

const rewardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: 'Gift',
    },
    xpCost: {
      type: Number,
      required: true,
      min: 1,
    },
    category: {
      type: String,
      enum: ['Merch', 'Voucher', 'Certification', 'Badge', 'Perk'],
      default: 'Voucher',
    },
    stock: {
      type: Number,
      default: 10,
    },
    codeFormat: {
      type: String,
      default: 'CYBER-XXXX-XXXX',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Reward', rewardSchema);
