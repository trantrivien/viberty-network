import { Request, Response } from 'express';
import * as dashboardService from '../services/dashboard.service';

export const getDashboard = async (_req: Request, res: Response) => {
  const data = await dashboardService.getDashboardData();
  res.json(data);
};
