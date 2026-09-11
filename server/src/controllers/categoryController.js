import Category from '../models/Category.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * @desc    Get all categories
 * @route   GET /api/v1/categories
 * @access  Public
 */
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  return successResponse(res, 200, 'Categories fetched successfully', categories);
});

/**
 * @desc    Create new category (Admin)
 * @route   POST /api/v1/categories
 * @access  Private/Admin
 */
export const createCategory = asyncHandler(async (req, res) => {
  const { name, description, icon } = req.body;

  if (!name) {
    return errorResponse(res, 400, 'Category name is required');
  }

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const existing = await Category.findOne({ slug });
  if (existing) {
    return errorResponse(res, 400, 'Category with this name already exists');
  }

  const category = await Category.create({
    name,
    slug,
    description: description || '',
    icon: icon || 'Shield',
  });

  return successResponse(res, 201, 'Category created successfully', category);
});
