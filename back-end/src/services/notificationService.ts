import { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { Notification } from '../types/notification';
import { ApiError } from '../utils/response';

interface NotificationResult extends RowDataPacket, Notification {}

export class NotificationService {
  async getNotifications(userId: number, pool: Pool) {
    const connection = await pool.getConnection();
    try {
      const [notifications] = await connection.query<NotificationResult[]>(
        'SELECT * FROM notifications WHERE user_id = ? ORDER BY sent_at DESC',
        [userId]
      );
      return notifications;
    } finally {
      connection.release();
    }
  }

  async markAsRead(userId: number, notificationId: number, pool: Pool) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query<ResultSetHeader>(
        'UPDATE notifications SET status = "read" WHERE id = ? AND user_id = ?',
        [notificationId, userId]
      );
      if (result.affectedRows === 0) {
        throw new ApiError(404, 'Notification not found');
      }
    } finally {
      connection.release();
    }
  }
}