import { Router } from 'express';
import {
  getTours,
  getTourBySlug,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
  getFeaturedTours
} from '../controllers/tourController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', getTours);
router.get('/featured', getFeaturedTours);
router.get('/:slug', getTourBySlug);
router.get('/id/:id', getTourById);

// Protected routes (Admin only)
router.post('/', protect, authorize('admin'), createTour);
router.put('/:id', protect, authorize('admin'), updateTour);
router.delete('/:id', protect, authorize('admin'), deleteTour);

export default router;

