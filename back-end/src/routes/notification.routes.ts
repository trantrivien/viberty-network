import { Router } from 'express';
import * as notiController from '../controllers/notification.controller';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();
router.use(requireAuth);

router.get('/', notiController.getMyNotifications);
export default router;
