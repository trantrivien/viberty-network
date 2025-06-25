import { Request, Response, NextFunction } from 'express';
import { MiningService } from '../services/miningService';
import { sendResponse } from '../utils/response';

export class MiningController {
  private miningService: MiningService;

  constructor() {
    this.miningService = new MiningService();
  }

  startMining = async (req: any, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.userId;
      const result = await this.miningService.startMining(userId, req.app.get('dbPool'));
      sendResponse(res, 200, result, 'Mining session started');
    } catch (error) {
      next(error);
    }
  };

  claimRewards = async (req: any, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.userId;
      const result = await this.miningService.claimRewards(userId, req.app.get('dbPool'));
      sendResponse(res, 200, result, 'Rewards claimed successfully');
    } catch (error) {
      next(error);
    }
  };
}