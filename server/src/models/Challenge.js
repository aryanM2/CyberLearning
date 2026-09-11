import mongoose from 'mongoose';

const challengeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Challenge title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    category: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard', 'Expert'],
      default: 'Easy',
    },
    type: {
      type: String,
      enum: ['mcq', 'flag', 'scenario'],
      default: 'mcq',
    },
    xpReward: {
      type: Number,
      default: 100,
    },
    options: [
      {
        type: String,
      },
    ],
    correctOption: {
      type: Number, // 0-indexed for MCQ
    },
    flagSolution: {
      type: String, // String for flag/ctf challenges
      select: false,
    },
    scenarioQuestion: {
      type: String,
    },
    hint: {
      type: String,
      default: '',
    },
    solvedCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Challenge', challengeSchema);
