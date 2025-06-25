import { Router } from 'express';
import authRoutes from './authRoutes';
import miningRoutes from './miningRoutes';
import itemRoutes from './itemRoutes';
import taskRoutes from './taskRoutes';
import notificationRoutes from './notificationRoutes';
import swaggerRoutes from './swaggerRoutes';
import web3authRoutes from './web3authRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/mining', miningRoutes);
router.use('/items', itemRoutes);
router.use('/tasks', taskRoutes);
router.use('/notifications', notificationRoutes);
router.use('/docs', swaggerRoutes)
router.use('/web3-auth', web3authRoutes)

export default router;