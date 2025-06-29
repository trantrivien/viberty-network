import { db } from '../config/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.model';

export const registerAdmin = async (username: string, email: string, password: string) => {
  const hashed = await bcrypt.hash(password, 10);
  const [rows] = await db.query('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)', [
    username,
    email,
    hashed,
    'admin',
  ]);
  return rows;
};

export const loginAdmin = async (username: string, password: string): Promise<User> => {
  const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
  const users = rows as User[];
  const user = users[0];
  if (!user) throw new Error('User not found');
  const match = await bcrypt.compare(password, user.password || '');
  if (!match) throw new Error('Invalid credentials');
  return user;
};

export const walletLogin = async (wallet_address: string): Promise<User> => {
  const [rows] = await db.query('SELECT * FROM users WHERE wallet_address = ?', [wallet_address]);
  const users = rows as User[];
  if (users.length > 0) return users[0];
  const [insertResult] = await db.query('INSERT INTO users (wallet_address, role) VALUES (?, ?)', [wallet_address, 'user']);
  const [newUserRows] = await db.query('SELECT * FROM users WHERE wallet_address = ?', [wallet_address]);
  return (newUserRows as User[])[0];
};

export const saveRefreshToken = async (user_id: number, token: string) => {
  const expires_at = new Date(Date.now() + 7 * 86400000);
  await db.query('INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)', [user_id, token, expires_at]);
};

export const generateTokens = async (user: User) => {
  const accessToken = jwt.sign({ userId: user.user_id, role: user.role }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: '15m',
  });
  const refreshToken = jwt.sign({ userId: user.user_id }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: '7d',
  });
  await saveRefreshToken(user.user_id, refreshToken);
  return { accessToken, refreshToken };
};

export const verifyRefreshToken = async (token: string): Promise<User> => {
  // Xác thực token bằng JWT
  const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as { userId: number };

  // Kiểm tra token có trong DB
  const [rows] = await db.query('SELECT * FROM refresh_tokens WHERE token = ?', [token]);
  if ((rows as any[]).length === 0) {
    throw new Error('Refresh token not found or expired');
  }

  // Lấy thông tin user từ user_id
  const [userRows] = await db.query('SELECT * FROM users WHERE user_id = ?', [payload.userId]);
  const user = (userRows as User[])[0];
  if (!user) throw new Error('User not found');

  return user;
};
