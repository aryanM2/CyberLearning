import Article from '../models/Article.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * @desc    Get all articles (with filtering, search, pagination)
 * @route   GET /api/v1/articles
 * @access  Public
 */
export const getArticles = asyncHandler(async (req, res) => {
  const { category, difficulty, search, page = 1, limit = 20 } = req.query;

  const query = { isPublished: true };

  if (category && category !== 'All') {
    query.category = category;
  }

  if (difficulty && difficulty !== 'All') {
    query.difficulty = difficulty;
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { excerpt: { $regex: search, $options: 'i' } },
      { tags: { $regex: search, $options: 'i' } },
    ];
  }

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const skip = (pageNum - 1) * limitNum;

  const total = await Article.countDocuments(query);
  const articles = await Article.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limitNum);

  return successResponse(res, 200, 'Articles fetched successfully', articles, {
    total,
    page: pageNum,
    pages: Math.ceil(total / limitNum),
  });
});

/**
 * @desc    Get single article by ID or slug
 * @route   GET /api/v1/articles/:id
 * @access  Public
 */
export const getArticleById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  let article;
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    article = await Article.findById(id);
  } else {
    article = await Article.findOne({ slug: id });
  }

  if (!article) {
    return errorResponse(res, 404, 'Article not found');
  }

  // Increment views
  article.views += 1;
  await article.save({ validateBeforeSave: false });

  return successResponse(res, 200, 'Article fetched successfully', article);
});

/**
 * @desc    Create new article (Admin)
 * @route   POST /api/v1/articles
 * @access  Private/Admin
 */
export const createArticle = asyncHandler(async (req, res) => {
  const { title, excerpt, content, category, difficulty, readTime, xpReward, tags } = req.body;

  if (!title || !excerpt || !content || !category) {
    return errorResponse(res, 400, 'Please provide title, excerpt, content, and category');
  }

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  const article = await Article.create({
    title,
    slug,
    excerpt,
    content,
    category,
    difficulty: difficulty || 'Beginner',
    readTime: readTime || '5 min read',
    xpReward: xpReward || 50,
    tags: tags || [],
  });

  return successResponse(res, 201, 'Article created successfully', article);
});

/**
 * @desc    Update article (Admin)
 * @route   PUT /api/v1/articles/:id
 * @access  Private/Admin
 */
export const updateArticle = asyncHandler(async (req, res) => {
  const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!article) {
    return errorResponse(res, 404, 'Article not found');
  }

  return successResponse(res, 200, 'Article updated successfully', article);
});

/**
 * @desc    Delete article (Admin)
 * @route   DELETE /api/v1/articles/:id
 * @access  Private/Admin
 */
export const deleteArticle = asyncHandler(async (req, res) => {
  const article = await Article.findByIdAndDelete(req.params.id);

  if (!article) {
    return errorResponse(res, 404, 'Article not found');
  }

  return successResponse(res, 200, 'Article deleted successfully');
});
