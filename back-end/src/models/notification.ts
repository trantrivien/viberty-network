import { Pool } from 'mysql2/promise';
import { Notification } from '../types/notification';

export class NotificationModel {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async findByUserId(userId: number): Promise<Notification[]> {
    const connection = await this.pool.getConnection();
    try {
      const [rows] = await connection.query(
        'SELECT * FROM notifications WHERE user_id = ? ORDER BY sent_at DESC',
        [userId]
      );
      return rows as Notification[];
    } finally {
      connection.release();
    }
  }

  async create(userId: number, message: string): Promise<void> {
    const connection = await this.pool.getConnection();
    try {
      await connection.query(
        'INSERT INTO notifications (user_id, message, sent_at) VALUES (?, ?, NOW())',
        [userId, message]
      );
    } finally {
      connection.release();
    }
  }

  async updateStatus(id: number, userId: number, status: 'sent' | 'read'): Promise<void> {
    const connection = await this.pool.getConnection();
    try {
      await connection.query(
        'UPDATE notifications SET status = ? WHERE id = ? AND user_id = ?',
        [status, id, userId]
      );
    } finally {
      connection.release();
    }
  }
}