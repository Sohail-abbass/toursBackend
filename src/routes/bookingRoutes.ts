import { Router } from 'express';
import {
  // getBookings,
  // getBookingById,
  createBooking,
  updateBooking,
  // deleteBooking,
  getBookingStats
} from '../controllers/bookingController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

// Public routes
router.post('/', createBooking);

// Protected routes (Admin only)
router.get('/stats', protect, authorize('admin'), getBookingStats);

// router.get('/', protect, authorize('admin', 'staff'), getBookings);

// router.get('/:id', protect, authorize('admin', 'staff'), getBookingById);

router.put('/:id', protect, authorize('admin', 'staff'), updateBooking);

// router.delete('/:id', protect, authorize('admin'), deleteBooking);

export default router;

