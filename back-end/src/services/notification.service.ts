import { db } from '../config/database';

export const createNotification = async (user_id: number, title: string, message: string) => {
  await db.query(
    `INSERT INTO notifications (user_id, title, message) VALUES (?, ?, ?)`,
    [user_id, title, message]
  );
};

export const getUserNotifications = async (user_id: number) => {
  const [rows] = await db.query(
    `SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC`,
    [user_id]
  );
  return rows;
};
