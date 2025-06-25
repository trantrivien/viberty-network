import { Request, Response, NextFunction } from 'express';
import { NotificationService } from '../services/notificationService';
import { sendResponse } from '../utils/response';

export class NotificationController {
  private notificationService: NotificationService;

  constructor() {
    this.notificationService = new NotificationService();
  }

  getNotifications = async (req: any, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.userId;
      const notifications = await this.notificationService.getNotifications(userId, req.app.get('dbPool'));
      sendResponse(res, 200, notifications);
    } catch (error) {
      next(error);
    }
  };

  markAsRead = async (req: any, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.userId;
      const notificationId = parseInt(req.params.id);
      await this.notificationService.markAsRead(userId, notificationId, req.app.get('dbPool'));
      sendResponse(res, 200, null, 'Notification marked as read');
    } catch (error) {
      next(error);
    }
  };
}