import { Router } from 'express';
import * as taskController from '../controllers/task.controller';
import { requireAuth, requireRole } from '../middleware/auth.middleware';

const router = Router();

router.get('/', requireAuth, requireRole('user'), taskController.getUserTasks);
router.post('/:id/complete', requireAuth, requireRole('user'), taskController.completeTask);

router.post('/', requireAuth, requireRole('admin'), taskController.createTask);
router.put('/:id', requireAuth, requireRole('admin'), taskController.updateTask);
router.delete('/:id', requireAuth, requireRole('admin'), taskController.deleteTask);
router.get('/all', requireAuth, requireRole('admin'), taskController.getAllTasks);

export default router;
