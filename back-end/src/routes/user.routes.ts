// src/routes/user.routes.ts
import { Router } from 'express';
import {
  getAllUsers,
  getMyProfile,
  updateMyProfile,
  updateUser,
  deleteUser,
  blockUser,
} from '../controllers/user.controller';
import { requireAuth, requireRole } from '../middleware/auth.middleware';
import createUploader from '../middleware/upload';

const router = Router();

// Admin APIs
router.get('/', requireAuth, requireRole('admin'), getAllUsers);
router.put('/:id', requireAuth, requireRole('admin'), updateUser);
router.delete('/:id', requireAuth, requireRole('admin'), deleteUser);
router.put('/:id/block', requireAuth, requireRole('admin'), blockUser);

// User APIs
router.get('/me', requireAuth, getMyProfile);
router.put('/me', requireAuth , updateMyProfile);


export default router;
