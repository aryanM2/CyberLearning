import express from 'express';
import { getAllUsers, updateUserRole, deleteUser } from '../controllers/adminController.js';
import { getAdminAnalytics } from '../controllers/analyticsController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply protect & admin authorization to all admin routes
router.use(protect);
router.use(authorize('admin'));

router.get('/users', getAllUsers);
router.put('/users/:id', updateUserRole);
router.delete('/users/:id', deleteUser);
router.get('/analytics', getAdminAnalytics);

export default router;
