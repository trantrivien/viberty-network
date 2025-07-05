import { db } from '../config/database';
import { SafeUser, User } from '../models/User.model';

export const getAllUsers = async (): Promise<SafeUser[]> => {
  const [rows] = await db.query('SELECT * FROM users');
  return rows as SafeUser[];
};

export const getUserById = async (userId: number): Promise<SafeUser | null> => {
  const [rows] = await db.query('SELECT * FROM users WHERE user_id = ?', [userId]);
  const user = (rows as User[])[0];

  if (!user) return null;

  const { password, ...safeUser } = user;
  return safeUser;
};
export const updateUserById = async (userId: number, data: Partial<SafeUser>): Promise<void> => {
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
