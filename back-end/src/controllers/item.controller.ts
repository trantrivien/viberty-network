import { Request, Response } from 'express';
import * as itemService from '../services/item.service';

export const getAllItems = async (req: Request, res: Response) => {
  const items = await itemService.getAllItems();
  res.json(items);
};

export const createItem = async (req: Request, res: Response) => {
  await itemService.createItem(req.body);
  res.status(201).json({ message: 'Item created' });
};

export const updateItem = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await itemService.updateItem(id, req.body);
  res.json({ message: 'Item updated' });
};

export const deleteItem = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await itemService.deleteItem(id);
  res.json({ message: 'Item deleted' });
};

export const buyItem = async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { item_id } = req.body;
  try {
    await itemService.buyItem(userId, item_id);
    res.json({ message: 'Item purchased' });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const getUserItems = async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const items = await itemService.getUserItems(userId);
  res.json(items);
};
