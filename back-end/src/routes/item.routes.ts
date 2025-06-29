import { Router } from 'express';
import * as itemController from '../controllers/item.controller';
import { requireAuth, requireRole } from '../middleware/auth.middleware';

const router = Router();

// Admin
router.get('/', requireAuth, itemController.getAllItems);
router.post('/', requireAuth, requireRole('admin'), itemController.createItem);
router.put('/:id', requireAuth, requireRole('admin'), itemController.updateItem);
router.delete('/:id', requireAuth, requireRole('admin'), itemController.deleteItem);

// User
router.post('/buy', requireAuth, requireRole('user'), itemController.buyItem);
router.get('/my', requireAuth, requireRole('user'), itemController.getUserItems);

export default router;
