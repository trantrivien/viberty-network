import { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { TaskController } from '../controllers/taskController';

const router = Router();
const taskController = new TaskController();

router.get('/', authenticateToken, taskController.getTasks);
router.post('/complete', authenticateToken, taskController.completeTask);

export default router;