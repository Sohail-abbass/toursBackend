import { Router } from 'express';
import tourRoutes from './tourRoutes';
import packageRoutes from './packageRoutes';
import bookingRoutes from './bookingRoutes';
import destinationRoutes from './destinationRoutes';
import authRoutes from './authRoutes';
import contactRoutes from './contactRoutes';

const router = Router();

router.use('/tours', tourRoutes);
router.use('/packages', packageRoutes);
router.use('/bookings', bookingRoutes);
router.use('/destinations', destinationRoutes);
router.use('/auth', authRoutes);
router.use('/', contactRoutes); // POST /api/contact

export default router;

