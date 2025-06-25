import { Router } from 'express';
import {swaggerSpec} from '../swagger'
const swaggerUi = require('swagger-ui-express');

const router = Router();

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;