import { Request, Response } from 'express';
import * as taskService from '../services/task.service';

export const getAllTasks = async (_req: Request, res: Response) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getUserTasks = async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { status } = req.query;
  try {
    const tasks = await taskService.getUserTasks(userId, status as string);
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const newTask = req.body;
    await taskService.createTask(newTask);
    res.status(201).json({ message: 'Task created' });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const taskId = parseInt(req.params.id);
    const updates = req.body;
    await taskService.updateTask(taskId, updates);
    res.json({ message: 'Task updated' });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const taskId = parseInt(req.params.id);
    await taskService.deleteTask(taskId);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const completeTask = async (req: Request, res: Response) => {
  try {
    const taskId = parseInt(req.params.id);
    const userId = req.user!.userId;
    const result = await taskService.completeTask(userId, taskId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};