import Challenge from '../models/Challenge.js';
import Submission from '../models/Submission.js';
import { awardXP } from '../services/xpService.js';
import { updateStreak } from '../services/streakService.js';
import { checkAndUnlockAchievements } from '../services/achievementService.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * @desc    Get all challenges (filtering by category/difficulty) with user completion status
 * @route   GET /api/v1/challenges
 * @access  Public / Private
 */
export const getChallenges = asyncHandler(async (req, res) => {
  const { category, difficulty, search } = req.query;
  const query = {};

  if (category && category !== 'All') query.category = category;
  if (difficulty && difficulty !== 'All') query.difficulty = difficulty;
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  const challenges = await Challenge.find(query).sort({ createdAt: -1 });

  // If user is authenticated, map solved status
  let solvedIds = new Set();
  if (req.user) {
    const userSubmissions = await Submission.find({ user: req.user.id, isCorrect: true }).select('challenge');
    solvedIds = new Set(userSubmissions.map(s => s.challenge.toString()));
  }

  const result = challenges.map(ch => ({
    id: ch._id,
    _id: ch._id,
    title: ch.title,
    description: ch.description,
    category: ch.category,
    difficulty: ch.difficulty,
    type: ch.type,
    xpReward: ch.xpReward,
    solvedCount: ch.solvedCount,
    solved: solvedIds.has(ch._id.toString()),
    hint: ch.hint,
    options: ch.options,
    scenarioQuestion: ch.scenarioQuestion,
  }));

  return successResponse(res, 200, 'Challenges fetched successfully', result);
});

/**
 * @desc    Get single challenge detail
 * @route   GET /api/v1/challenges/:id
 * @access  Public / Private
 */
export const getChallengeById = asyncHandler(async (req, res) => {
  const challenge = await Challenge.findById(req.params.id);
  if (!challenge) {
    return errorResponse(res, 404, 'Challenge not found');
  }

  let isSolved = false;
  if (req.user) {
    const sub = await Submission.findOne({ user: req.user.id, challenge: challenge._id, isCorrect: true });
    isSolved = !!sub;
  }

  return successResponse(res, 200, 'Challenge detail fetched successfully', {
    id: challenge._id,
    _id: challenge._id,
    title: challenge.title,
    description: challenge.description,
    category: challenge.category,
    difficulty: challenge.difficulty,
    type: challenge.type,
    xpReward: challenge.xpReward,
    options: challenge.options,
    scenarioQuestion: challenge.scenarioQuestion,
    hint: challenge.hint,
    solvedCount: challenge.solvedCount,
    solved: isSolved,
  });
});

/**
 * @desc    Submit answer to a challenge
 * @route   POST /api/v1/challenges/:id/submit
 * @access  Private
 */
export const submitChallenge = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { selectedOption, flag, answer } = req.body;
  const userId = req.user.id;

  const challenge = await Challenge.findById(id).select('+flagSolution');
  if (!challenge) {
    return errorResponse(res, 404, 'Challenge not found');
  }

  // Check if already solved
  const existingSolved = await Submission.findOne({ user: userId, challenge: id, isCorrect: true });

  let isCorrect = false;
  let feedbackMessage = '';

  if (challenge.type === 'mcq') {
    isCorrect = parseInt(selectedOption, 10) === challenge.correctOption;
    feedbackMessage = isCorrect ? 'Correct option selected!' : 'Incorrect option. Try again!';
  } else if (challenge.type === 'flag') {
    isCorrect = (flag || '').trim() === (challenge.flagSolution || '').trim();
    feedbackMessage = isCorrect ? 'Flag captured successfully!' : 'Invalid flag. Double check your payload!';
  } else if (challenge.type === 'scenario') {
    // Scenario check - string inclusion or keyword matching
    const normalizedInput = (answer || '').toLowerCase().trim();
    isCorrect = normalizedInput.length > 5;
    feedbackMessage = isCorrect ? 'Scenario analysis accepted!' : 'Response inadequate. Provide detailed analysis.';
  }

  // Record submission
  const submittedAnswer = flag || answer || String(selectedOption !== undefined ? selectedOption : '');
  await Submission.create({
    user: userId,
    challenge: id,
    userSolution: submittedAnswer || 'N/A',
    answerSubmitted: submittedAnswer || 'N/A',
    isCorrect,
    xpEarned: isCorrect ? (challenge.xpReward || 100) : 0,
  });

  if (!isCorrect) {
    return errorResponse(res, 400, feedbackMessage, { isCorrect: false });
  }

  // If already solved previously, don't re-award XP
  if (existingSolved) {
    return successResponse(res, 200, 'Correct! (Already solved previously)', {
      isCorrect: true,
      alreadySolved: true,
    });
  }

  // Increment challenge solved count
  challenge.solvedCount = (challenge.solvedCount || 0) + 1;
  await challenge.save({ validateBeforeSave: false });

  // Update streak
  await updateStreak(userId);

  // Award XP
  const xpReward = challenge.xpReward || 100;
  const xpResult = await awardXP(
    userId,
    xpReward,
    'challenge',
    `Solved lab challenge: ${challenge.title}`
  );

  // Check achievement unlocks
  const unlockedAchievements = await checkAndUnlockAchievements(userId);

  return successResponse(res, 200, `Challenge Solved! +${xpReward} XP earned`, {
    isCorrect: true,
    alreadySolved: false,
    xpAwarded: xpReward,
    totalXP: xpResult.totalXP,
    level: xpResult.level,
    leveledUp: xpResult.leveledUp,
    levelInfo: xpResult.levelInfo,
    unlockedAchievements,
  });
});

/**
 * @desc    Create challenge (Admin)
 * @route   POST /api/v1/challenges
 * @access  Private/Admin
 */
export const createChallenge = asyncHandler(async (req, res) => {
  const challenge = await Challenge.create(req.body);
  return successResponse(res, 201, 'Challenge created successfully', challenge);
});

/**
 * @desc    Update challenge (Admin)
 * @route   PUT /api/v1/challenges/:id
 * @access  Private/Admin
 */
export const updateChallenge = asyncHandler(async (req, res) => {
  const challenge = await Challenge.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!challenge) {
    return errorResponse(res, 404, 'Challenge not found');
  }
  return successResponse(res, 200, 'Challenge updated successfully', challenge);
});

/**
 * @desc    Delete challenge (Admin)
 * @route   DELETE /api/v1/challenges/:id
 * @access  Private/Admin
 */
export const deleteChallenge = asyncHandler(async (req, res) => {
  const challenge = await Challenge.findByIdAndDelete(req.params.id);
  if (!challenge) {
    return errorResponse(res, 404, 'Challenge not found');
  }
  return successResponse(res, 200, 'Challenge deleted successfully');
});
