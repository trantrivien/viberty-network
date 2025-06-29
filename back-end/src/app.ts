import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import itemRoutes from './routes/item.routes';
import miningRoutes from './routes/mining.routes';
import taskRoutes from './routes/task.routes';
import transactionRoutes from './routes/transaction.routes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import notificationRoutes from './routes/notification.routes';
import uploadRoutes from './routes/upload.routes';

import './cron/mining.cron';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/mining', miningRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;