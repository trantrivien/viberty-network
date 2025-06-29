import { db } from '../config/database';
import dayjs from 'dayjs';
import { Task } from '../models/Task.model';
import { UserTask } from '../models/UserTask.model';

export const getAllTasks = async () => {
  const [rows] = await db.query('SELECT * FROM tasks');
  return rows as Task[];
};

export const getUserTasks = async (user_id: number, status?: string) => {
  const condition = status ? `AND ut.status = ?` : '';
  const params: any[] = [user_id];
  if (status) params.push(status);

  const [rows] = await db.query(
    `SELECT t.*, ut.status, ut.completed_at
     FROM user_tasks ut
     JOIN tasks t ON t.task_id = ut.task_id
     WHERE ut.user_id = ?
     ${condition}`,
    params
  );
  return rows as any[];
};

export const createTask = async (task: Task) => {
  const {
    title,
    description,
    type,
    reward,
    reward_type,
    image_url,
    start_date,
    end_date,
    created_by,
  } = task;
  const [rows] = await db.query(
    `INSERT INTO tasks (title, description, type, reward, reward_type, image_url, start_date, end_date, created_by)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [title, description, type, reward, reward_type, image_url, start_date, end_date, created_by]
  );
  return rows;
};

export const deleteTask = async (task_id: number) => {
  await db.query('DELETE FROM tasks WHERE task_id = ?', [task_id]);
};

export const updateTask = async (task_id: number, updates: Partial<Task>) => {
  const fields = Object.keys(updates).map((key) => `${key} = ?`).join(', ');
  const values = Object.values(updates);
  await db.query(`UPDATE tasks SET ${fields} WHERE task_id = ?`, [...values, task_id]);
};

export const completeTask = async (user_id: number, task_id: number) => {
  const [taskRows] = await db.query(`SELECT * FROM tasks WHERE task_id = ?`, [task_id]);
  const task = (taskRows as Task[])[0];
  if (!task) throw new Error('Task not found');

  const now = dayjs();
  if (task.start_date && now.isBefore(task.start_date)) throw new Error('Task chưa bắt đầu');
  if (task.end_date && now.isAfter(task.end_date)) {
    await db.query(`UPDATE user_tasks SET status = 'expired' WHERE user_id = ? AND task_id = ?`, [user_id, task_id]);
    throw new Error('Task đã hết hạn');
  }

  const [checkRows] = await db.query(`SELECT * FROM user_tasks WHERE user_id = ? AND task_id = ?`, [user_id, task_id]);
  const existing = (checkRows as UserTask[])[0];
  if (existing?.status === 'completed') throw new Error('Bạn đã hoàn thành task này');

  if (!existing) {
    await db.query(
      `INSERT INTO user_tasks (user_id, task_id, status, completed_at)
       VALUES (?, ?, 'completed', NOW())`,
      [user_id, task_id]
    );
  } else {
    await db.query(
      `UPDATE user_tasks SET status = 'completed', completed_at = NOW()
       WHERE user_id = ? AND task_id = ?`,
      [user_id, task_id]
    );
  }

  if (task.reward_type === 'money') {
    await db.query('UPDATE users SET amount = amount + ? WHERE user_id = ?', [task.reward, user_id]);
  } else if (task.reward_type === 'mining_speed') {
    await db.query('UPDATE mining SET mining_speed = mining_speed + ? WHERE user_id = ?', [task.reward, user_id]);
  }

  return { message: '🎉 Task completed. Reward granted!' };
};
