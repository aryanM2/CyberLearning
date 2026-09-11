import mongoose from 'mongoose';

const readingProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    article: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Article',
      required: true,
    },
    completed: {
      type: Boolean,
      default: true,
    },
    completedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

readingProgressSchema.index({ user: 1, article: 1 }, { unique: true });

export default mongoose.model('ReadingProgress', readingProgressSchema);
