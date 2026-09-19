import User from '../models/User.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * @desc    Get list of all registered users (Admin)
 * @route   GET /api/v1/admin/users
 * @access  Private/Admin
 */
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
    .select('-password')
    .sort({ createdAt: -1 });

  return successResponse(res, 200, 'Users list fetched successfully', users);
});

/**
 * @desc    Update user role or profile (Admin)
 * @route   PUT /api/v1/admin/users/:id
 * @access  Private/Admin
 */
export const updateUserRole = asyncHandler(async (req, res) => {
  const { role, name, email } = req.body;
  const user = await User.findById(req.params.id);

  if (!user) {
    return errorResponse(res, 404, 'User not found');
  }

  if (role) user.role = role;
  if (name) user.name = name;
  if (email) user.email = email;

  await user.save();

  return successResponse(res, 200, 'User updated successfully', {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
});

/**
 * @desc    Delete user account (Admin)
 * @route   DELETE /api/v1/admin/users/:id
 * @access  Private/Admin
 */
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return errorResponse(res, 404, 'User not found');
  }

  return successResponse(res, 200, 'User deleted successfully');
});
