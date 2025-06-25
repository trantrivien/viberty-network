import { Pool } from 'mysql2/promise';

export class UserTaskModel {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async findByUserAndTask(userId: number, taskId: number): Promise<any> {
    const connection = await this.pool.getConnection();
    try {
      const [rows] = await connection.query(
        'SELECT * FROM user_tasks WHERE user_id = ? AND task_id = ?',
        [userId, taskId]
      );
      return (rows as any[])[0] || null;
    } finally {
      connection.release();
    }
  }

  async create(userId: number, taskId: number): Promise<void> {
    const connection = await this.pool.getConnection();
    try {
      await connection.query(
        'INSERT INTO user_tasks (user_id, task_id, status, completed_at) VALUES (?, ?, "completed", NOW())',
        [userId, taskId]
      );
    } finally {
      connection.release();
    }
  }

  async updateStatus(userId: number, taskId: number, status: 'pending' | 'completed'): Promise<void> {
    const connection = await this.pool.getConnection();
    try {
      await connection.query(
        'UPDATE user_tasks SET status = ?, completed_at = NOW() WHERE user_id = ? AND task_id = ?',
        [status, userId, taskId]
      );
    } finally {
      connection.release();
    }
  }
}