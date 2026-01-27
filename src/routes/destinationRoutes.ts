import { Router } from 'express';
import {
  getDestinations,
  getDestinationBySlug,
  createDestination,
  updateDestination,
  deleteDestination,
  getFeaturedDestinations
} from '../controllers/destinationController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', getDestinations);
router.get('/featured', getFeaturedDestinations);
router.get('/:slug', getDestinationBySlug);

// Protected routes (Admin only)
router.post('/', protect, authorize('admin'), createDestination);
router.put('/:id', protect, authorize('admin'), updateDestination);
router.delete('/:id', protect, authorize('admin'), deleteDestination);

export default router;

