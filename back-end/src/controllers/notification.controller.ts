import { Request, Response } from "express";
import * as notiService from "../services/notification.service";

export const getMyNotifications = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const userId = req.user.userId;
    const data = await notiService.getUserNotifications(userId);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
