import { Router } from 'express';
import * as txController from '../controllers/transaction.controller';
import { requireAuth, requireRole } from '../middleware/auth.middleware';

const router = Router();

router.use(requireAuth);

// User routes
router.get('/my', txController.getUserTransactions);
router.post('/transfer', requireRole('user'), txController.transfer);

// Admin routes
router.get('/all', requireRole('admin'), txController.getAllTransactions);
router.post('/admin', requireRole('admin'), txController.adminTopupOrWithdraw);

export default router;
