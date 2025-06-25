import { Request, Response, NextFunction } from 'express';
import { TaskService } from '../services/taskService';
import { sendResponse } from '../utils/response';

export class TaskController {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  getTasks = async (req: any, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.userId;
      const tasks = await this.taskService.getTasks(userId, req.app.get('dbPool'));
      sendResponse(res, 200, tasks);
    } catch (error) {
      next(error);
    }
  };

  completeTask = async (req: any, res: Response, next: NextFunction) => {
    try {
      const { task_id } = req.body;
      const userId = req.user.userId;
      const result = await this.taskService.completeTask(userId, task_id, req.app.get('dbPool'));
      sendResponse(res, 200, result, 'Task completed successfully');
    } catch (error) {
      next(error);
    }
  };
}