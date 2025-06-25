import { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { ItemController } from '../controllers/itemController';

const router = Router();
const itemController = new ItemController();
/**
 * @swagger
 * /api/items:
 *   get:
 *     summary: Get all available items
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: List of items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   mining_rate_boost:
 *                     type: number
 */
router.get('/', authenticateToken, itemController.getItems);

router.get('/', authenticateToken, itemController.getItems);

/**
 * @swagger
 * /api/items/purchase:
 *   post:
 *     summary: Purchase an item
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - item_id
 *             properties:
 *               item_id:
 *                 type: number
 *                 example: 1
 *     responses:
 *       200:
 *         description: Item purchased successfully
 *       400:
 *         description: Insufficient balance
 *       404:
 *         description: Item not found
 *       401:
 *         description: Unauthorized
 */
router.post('/purchase', authenticateToken, itemController.purchaseItem);

export default router;