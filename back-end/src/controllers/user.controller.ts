import { Request, Response } from 'express';
import * as userService from '../services/user.service';

export const getAllUsers = async (req: Request, res: Response) => {
  const {
    page = 1,
    limit = 10,
    role,
    is_banned,
    search
  } = req.query;

  const pageNum = Number(page);
  const limitNum = Number(limit);

  const result = await userService.getAllUsers({
    page: pageNum,
    limit: limitNum,
    role: role as string,
    is_banned: is_banned === 'true' ? true : is_banned === 'false' ? false : undefined,
    search: search as string
  });

  res.json(result);
};
export const getMyProfile = async (req: Request, res: Response) => {
  const user = await userService.getUserById(req.user!.userId);
  res.json(user);
};

export const updateMyProfile = async (req: Request, res: Response) => {
  await userService.updateUserById(req.user!.userId, req.body);
  res.json({ message: 'Profile updated' });
};

export const updateUser = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  await userService.updateUserById(userId, req.body);
  res.json({ message: 'User updated' });
};

export const deleteUser = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  await userService.deleteUser(userId);
  res.json({ message: 'User deleted' });
};

export const blockUser = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  const { block } = req.body;
  await userService.blockUser(userId, block);
  res.json({ message: block ? 'User blocked' : 'User unblocked' });
};
