import { Pool } from 'mysql2/promise';
import { Task } from '../types/task';

export class TaskModel {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async findById(id: number): Promise<Task | null> {
    const connection = await this.pool.getConnection();
    try {
      const [rows] = await connection.query('SELECT * FROM tasks WHERE id = ?', [id]);
      return (rows as Task[])[0] || null;
    } finally {
      connection.release();
    }
  }

  async findAvailableForUser(userId: number): Promise<Task[]> {
    const connection = await this.pool.getConnection();
    try {
      const [rows] = await connection.query(
        'SELECT t.* FROM tasks t LEFT JOIN user_tasks ut ON t.id = ut.task_id AND ut.user_id = ? WHERE ut.id IS NULL OR ut.status = "pending"',
        [userId]
      );
      return rows as Task[];
    } finally {
      connection.release();
    }
  }
}