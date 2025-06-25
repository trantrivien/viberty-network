import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { refreshTokenHandler } from '../middleware/authMiddleware';

const router = Router();
const authController = new AuthController();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', refreshTokenHandler);
router.post('/connect', authController.connect);

export default router;