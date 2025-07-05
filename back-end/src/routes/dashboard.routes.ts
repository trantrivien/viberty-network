import { Router } from 'express';
import * as dashboardController from '../controllers/dashboard.controller';
import { requireAuth, requireRole } from '../middleware/auth.middleware';

const router = Router();

router.get('/', requireAuth, requireRole('admin'), dashboardController.getDashboard);

export default router;
