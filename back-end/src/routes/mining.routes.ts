import { Router } from 'express';
import * as miningController from '../controllers/mining.controller';
import { requireAuth, requireRole } from '../middleware/auth.middleware';

const router = Router();

// User
router.post('/start', requireAuth, requireRole('user'), miningController.startMining);
router.post('/stop', requireAuth, requireRole('user'), miningController.stopMining);

// Admin
router.get('/active', requireAuth, requireRole('admin'), miningController.getActiveMiners);

export default router;
