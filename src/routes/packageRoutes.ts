import { Router } from 'express';
import {
  getPackages,
  getPackageBySlug,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage
} from '../controllers/packageController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', getPackages);
router.get('/:slug', getPackageBySlug);
router.get('/id/:id', getPackageById);

// Protected routes (Admin only)
router.post('/', protect, authorize('admin'), createPackage);
router.put('/:id', protect, authorize('admin'), updatePackage);
router.delete('/:id', protect, authorize('admin'), deletePackage);

export default router;

