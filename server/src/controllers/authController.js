import crypto from 'crypto';
import User from '../models/User.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendEmail } from '../utils/sendEmail.js';

/**
 * @desc    Register new user
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return errorResponse(res, 400, 'Please provide name, email, and password');
  }

  // Check if email exists
  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    return errorResponse(res, 400, 'User with this email already exists');
  }

  // Public registrations are strictly created with 'user' role.
  const userRole = 'user';

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
 * @desc    Forgot Password - Trigger Reset Email
 * @route   POST /api/v1/auth/forgotpassword
 * @access  Public
 */
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return errorResponse(res, 400, 'Please enter your registered email address');
  }

  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    return errorResponse(res, 404, 'No account found with that email address');
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  // Create reset URL
  const resetUrl = `${process.env.CORS_ORIGIN || 'http://localhost:5173'}/reset-password/${resetToken}`;

  const message = `You are receiving this email because a password reset was requested for your NextGen Securities account.\n\nPlease navigate to the following URL to reset your password:\n\n${resetUrl}\n\nThis link will expire in 10 minutes.\n\nIf you did not request a password reset, please ignore this email.`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0B101D; color: #FFFFFF; border-radius: 12px; border: 1px solid #1E293B;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #06B6D4; font-size: 24px; margin: 0;">NEXTGEN <span style="color: #FFFFFF;">SEC</span></h1>
        <p style="color: #9CA3AF; font-size: 12px; text-transform: uppercase; margin-top: 4px;">Password Reset Request</p>
      </div>
      <div style="background-color: #0F1626; padding: 24px; border-radius: 8px; border: 1px solid #1E293B;">
        <h2 style="color: #FFFFFF; font-size: 18px; margin-top: 0;">Hello ${user.name},</h2>
        <p style="color: #9CA3AF; font-size: 14px; line-height: 1.6;">
          You requested a password reset for your NextGen Securities Cybersecurity account. Click the button below to choose a new password:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background: linear-gradient(135deg, #06B6D4 0%, #2563EB 100%); color: #FFFFFF; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: bold; font-size: 14px; display: inline-block;">Reset Password Now</a>
        </div>
        <p style="color: #6B7280; font-size: 12px; line-height: 1.5;">
          If the button does not work, copy and paste this URL into your browser:<br/>
          <a href="${resetUrl}" style="color: #06B6D4;">${resetUrl}</a>
        </p>
        <p style="color: #9CA3AF; font-size: 12px; margin-top: 20px;">
          Note: This reset link will expire in <strong>10 minutes</strong>. If you did not request a password reset, please ignore this email.
        </p>
      </div>
      <div style="text-align: center; margin-top: 20px; color: #6B7280; font-size: 11px;">
        &copy; 2026 NextGen Securities Academy. All rights reserved.
      </div>
    </div>
  `;

  try {
    await sendEmail({
      email: user.email,
      subject: 'NextGen Securities Password Reset Request',
      message,
      html,
    });

    return successResponse(res, 200, 'Password reset instructions dispatched to your email address.', {
      resetUrl: resetUrl,
      resetToken: resetToken,
    });
  } catch (err) {
    console.error('Send email error:', err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return errorResponse(res, 500, 'Email could not be sent. Please try again later.');
  }
});

/**
 * @desc    Reset Password via Token
 * @route   PUT /api/v1/auth/resetpassword/:resettoken
 * @access  Public
 */
export const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;

  if (!password || password.length < 6) {
    return errorResponse(res, 400, 'Password must be at least 6 characters');
  }

  // Hash reset token from URL
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return errorResponse(res, 400, 'Invalid or expired password reset link');
  }

  // Set new password
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  const token = user.getSignedJwtToken();

  return successResponse(res, 200, 'Password successfully reset! You are now authenticated.', {
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
