import { Pool } from 'mysql2/promise';

export class UserItemModel {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async create(userId: number, itemId: number): Promise<void> {
    const connection = await this.pool.getConnection();
    try {
      await connection.query(
        'INSERT INTO user_items (user_id, item_id, purchased_at) VALUES (?, ?, NOW())',
        [userId, itemId]
      );
    } finally {
      connection.release();
    }
  }

  async getUserMiningBoost(userId: number): Promise<number> {
    const connection = await this.pool.getConnection();
    try {
      const [rows] = await connection.query(
        'SELECT SUM(i.mining_rate_boost) as total_boost FROM user_items ui JOIN items i ON ui.item_id = i.id WHERE ui.user_id = ?',
        [userId]
      );
      return (rows as any[])[0].total_boost || 0;
    } finally {
      connection.release();
    }
  }
}