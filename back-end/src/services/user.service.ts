import { db } from '../config/database';
import { User } from '../models/User.model';

export const getAllUsers = async (): Promise<User[]> => {
  const [rows] = await db.query('SELECT * FROM users');
  return rows as User[];
};

export const getUserById = async (userId: number): Promise<User | null> => {
  const [rows] = await db.query('SELECT * FROM users WHERE user_id = ?', [userId]);
  return (rows as User[])[0] || null;
};

export const updateUserById = async (userId: number, data: Partial<User>): Promise<void> => {
  const fields = Object.keys(data)
    .map(key => `${key} = ?`)
    .join(', ');
  const values = Object.values(data);
  await db.query(`UPDATE users SET ${fields} WHERE user_id = ?`, [...values, userId]);
};

export const deleteUser = async (userId: number): Promise<void> => {
  await db.query('DELETE FROM users WHERE user_id = ?', [userId]);
};

export const blockUser = async (userId: number, block: boolean): Promise<void> => {
  await db.query('UPDATE users SET is_banned = ? WHERE user_id = ?', [block, userId]);
};
