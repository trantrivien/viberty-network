import { Request, Response, NextFunction } from 'express';
import { ItemService } from '../services/itemService';
import { sendResponse } from '../utils/response';

export class ItemController {
  private itemService: ItemService;

  constructor() {
    this.itemService = new ItemService();
  }

  getItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const items = await this.itemService.getItems(req.app.get('dbPool'));
      sendResponse(res, 200, items);
    } catch (error) {
      next(error);
    }
  };

  purchaseItem = async (req: any, res: Response, next: NextFunction) => {
    try {
      const { item_id } = req.body;
      const userId = req.user.userId;
      await this.itemService.purchaseItem(userId, item_id, req.app.get('dbPool'));
      sendResponse(res, 200, null, 'Item purchased successfully');
    } catch (error) {
      next(error);
    }
  };
}