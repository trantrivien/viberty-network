import { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { MiningController } from '../controllers/miningController';

const router = Router();
const miningController = new MiningController();

router.post('/start', authenticateToken, miningController.startMining);
router.post('/claim', authenticateToken, miningController.claimRewards);

export default router;