import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { errorResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * Protect routes - require valid JWT token
 */
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return errorResponse(res, 401, 'Not authorized. Token is missing.');
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'cyberlearning_jwt_super_secret_key_2026'
    );
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return errorResponse(res, 401, 'User associated with token no longer exists.');
    }

    if (!user.isActive) {
      return errorResponse(res, 403, 'Your account has been deactivated. Please contact support.');
    }

    req.user = user;
    next();
  } catch (err) {
    return errorResponse(res, 401, 'Not authorized. Invalid or expired token.');
  }
});

/**
 * Authorize user roles (e.g., 'admin')
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return errorResponse(
        res,
        403,
        `User role '${req.user?.role || 'unknown'}' is not authorized to access this route.`
      );
    }
    next();
  };
};
