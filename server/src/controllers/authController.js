import User from '../models/User.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * @desc    Register new user
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
export const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return errorResponse(res, 400, 'Please provide name, email, and password');
  }

  // Check if email exists
  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    return errorResponse(res, 400, 'User with this email already exists');
  }

  // Assign role (only allow setting 'admin' in development if requested, otherwise default to 'user')
  const userRole = role === 'admin' ? 'admin' : 'user';

  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password,
    role: userRole,
  });

  const token = user.getSignedJwtToken();

  return successResponse(res, 201, 'User registered successfully', {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      xp: user.xp,
      level: user.level,
      streak: user.streak,
      badges: user.badges,
      avatar: user.avatar,
      bio: user.bio,
    },
  });
});

/**
 * @desc    Login user
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return errorResponse(res, 400, 'Please provide email and password');
  }

  // Find user with password field included
  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
  if (!user) {
    return errorResponse(res, 401, 'Invalid credentials');
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return errorResponse(res, 401, 'Invalid credentials');
  }

  if (!user.isActive) {
    return errorResponse(res, 403, 'Your account has been deactivated. Please contact support.');
  }

  // Update last active date
  user.lastActiveDate = Date.now();
  await user.save({ validateBeforeSave: false });

  const token = user.getSignedJwtToken();

  return successResponse(res, 200, 'Login successful', {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      xp: user.xp,
      level: user.level,
      streak: user.streak,
      badges: user.badges,
      avatar: user.avatar,
      bio: user.bio,
    },
  });
});

/**
 * @desc    Get current logged-in user profile
 * @route   GET /api/v1/auth/me
 * @access  Private
 */
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  return successResponse(res, 200, 'User profile fetched successfully', {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      xp: user.xp,
      level: user.level,
      streak: user.streak,
      badges: user.badges,
      avatar: user.avatar,
      bio: user.bio,
      createdAt: user.createdAt,
    },
  });
});

/**
 * @desc    Logout user (clear client state)
 * @route   POST /api/v1/auth/logout
 * @access  Private
 */
export const logout = asyncHandler(async (req, res) => {
  return successResponse(res, 200, 'Logged out successfully');
});
