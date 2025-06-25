import { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { NotificationController } from '../controllers/notificationController';

const router = Router();
const notificationController = new NotificationController();

router.get('/', authenticateToken, notificationController.getNotifications);
router.post('/:id/read', authenticateToken, notificationController.markAsRead);

export default router;