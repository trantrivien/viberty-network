import { Request, Response } from 'express';
import * as miningService from '../services/mining.service';

export const startMining = async (req: Request, res: Response) => {
  const user_id = req.user!.userId;
  try {
    await miningService.startMining(user_id);
    res.json({ message: 'Mining started or resumed. Reward granted.' });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const stopMining = async (req: Request, res: Response) => {
  const user_id = req.user!.userId;
  await miningService.stopMining(user_id);
  res.json({ message: 'Mining stopped' });
};

export const getActiveMiners = async (req: Request, res: Response) => {
  const miners = await miningService.getActiveMiners();
  res.json(miners);
};
