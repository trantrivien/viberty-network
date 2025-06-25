import { Pool, RowDataPacket } from 'mysql2/promise';
import { Task } from '../types/task';
import { ApiError } from '../utils/response';

interface TaskResult extends RowDataPacket, Task {}

export class TaskService {
  async getTasks(userId: number, pool: Pool) {
    const connection = await pool.getConnection();
    try {
      const [tasks] = await connection.query<TaskResult[]>(
        'SELECT t.* FROM tasks t LEFT JOIN user_tasks ut ON t.id = ut.task_id AND ut.user_id = ? WHERE ut.id IS NULL OR ut.status = "pending"',
        [userId]
      );
      return tasks;
    } finally {
      connection.release();
    }
  }

  async completeTask(userId: number, taskId: number, pool: Pool) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const [tasks] = await connection.query<TaskResult[]>(
        'SELECT * FROM tasks WHERE id = ?',
        [taskId]
      );
      if (tasks.length === 0) {
        throw new ApiError(404, 'Task not found');
      }

      const task = tasks[0];
      const [userTasks] = await connection.query<RowDataPacket[]>(
        'SELECT * FROM user_tasks WHERE user_id = ? AND task_id = ?',
        [userId, taskId]
      );

      if (userTasks.length === 0) {
        await connection.query(
          'INSERT INTO user_tasks (user_id, task_id, status, completed_at) VALUES (?, ?, "completed", NOW())',
          [userId, taskId]
        );
      } else {
        await connection.query(
          'UPDATE user_tasks SET status = "completed", completed_at = NOW() WHERE user_id = ? AND task_id = ?',
          [userId, taskId]
        );
      }

      await connection.query(
        'UPDATE users SET balance = balance + ? WHERE id = ?',
        [task.reward_amount, userId]
      );

      await connection.query(
        'INSERT INTO notifications (user_id, message) VALUES (?, ?)',
        [userId, `You earned ${task.reward_amount} coins from completing "${task.title}"!`]
      );

      await connection.commit();
      return { reward: task.reward_amount };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}