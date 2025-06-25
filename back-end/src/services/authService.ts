import { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { ApiError } from "../utils/response";

interface RegisterData {
  wallet_address: string;
  username?: string;
  referral_code?: string;
  referred_by?: string;
}

interface UserIdResult extends RowDataPacket {
  id: number;
}

export class AuthService {
  async register(data: RegisterData, pool: Pool) {
    const { wallet_address, username, referred_by } = data;
    const connection = await pool.getConnection();
    const userReferralCode = Math.random()
      .toString(36)
      .substring(2, 12)
      .toUpperCase();

    try {
      await connection.beginTransaction();

      const [result] = await connection.query<ResultSetHeader>(
        "INSERT INTO users (wallet_address, username, referral_code, referred_by) VALUES (?, ?, ?, ?)",
        [wallet_address, username, userReferralCode, referred_by]
      );

      if (referred_by) {
        const [referrerRows] = await connection.query<UserIdResult[]>(
          "SELECT id FROM users WHERE referral_code = ?",
          [referred_by]
        );
        if (referrerRows.length > 0) {
          await connection.query(
            "INSERT INTO referrals (referrer_id, referred_id, reward_amount) VALUES (?, ?, ?)",
            [referrerRows[0].id, result.insertId, 10.0]
          );
          await connection.query(
            "UPDATE users SET balance = balance + ? WHERE id = ?",
            [10.0, referrerRows[0].id]
          );
        }
      }

      await connection.commit();
      const token = jwt.sign({ userId: result.insertId }, env.jwtSecret);
      return { token, userId: result.insertId };
    } catch (error) {
      await connection.rollback();
      throw new ApiError(500, "Registration failed");
    } finally {
      connection.release();
    }
  }

  async login(wallet_address: string, pool: Pool) {
    const connection = await pool.getConnection();
    try {
      const [users] = await connection.query<UserIdResult[]>(
        "SELECT id FROM users WHERE wallet_address = ?",
        [wallet_address]
      );

      const user = (users as any)[0];

      // 2. Lấy items của user
      const [items] = await connection.query(
        "SELECT * FROM items WHERE user_id = ?",
        [users[0].id]
      );

      // 3. Lấy tasks của user
      const [tasks] = await connection.query(
        "SELECT * FROM tasks WHERE user_id = ?",
        [users[0].id]
      );

      // 4. Lấy mining sessions của user
      const [sessions] = await connection.query(
        "SELECT * FROM mining_sessions WHERE user_id = ?",
        [users[0].id]
      );

      if (users.length === 0) {
        throw new ApiError(404, "User not found");
      }

      const token = jwt.sign({ userId: users[0].id }, env.jwtSecret);
      return {
        token,
        userId: users[0].id,
        userInfo: users,
        items: items,
        tasks: tasks,
        sessions: sessions,
      };
    } catch (error) {
      throw error;
    } finally {
      connection.release();
    }
  }

  async connect(wallet_address: string, chain_id: number, pool: Pool,  referred_by:string) {
    const connection = await pool.getConnection();
  
    try {
      // Kiểm tra xem user đã tồn tại chưa
      const [existingUsers] = await connection.query<any[]>(
        "SELECT * FROM users WHERE wallet_address = ?",
        [wallet_address]
      );

      let userId: number;
  
      if (existingUsers.length === 0) {
        const username = `user-${wallet_address.slice(2, 8)}`;
        const referral_code = Math.random().toString(36).substring(2, 12).toUpperCase();
  
        const [result] = await connection.query<ResultSetHeader>(
          "INSERT INTO users (wallet_address, username, referral_code, referred_by) VALUES (?, ?, ?, ?)",
          [wallet_address, username, referral_code, referred_by]
        );
  
        userId = result.insertId;
      } else {
        userId = existingUsers[0].id;
  
        if (!existingUsers[0].chain_id || existingUsers[0].chain_id !== chain_id) {
          await connection.query(
            "UPDATE users SET chain_id = ? WHERE id = ?",
            [chain_id, userId]
          );
        }
      }
  
      // Truy vấn lại toàn bộ thông tin user sau khi chắc chắn đã tồn tại
      const [userInfo] :any= await connection.query(
        "SELECT * FROM users WHERE id = ?",
        [userId]
      );
  
      const [items] = await connection.query(
        `SELECT items.* 
         FROM items 
         JOIN user_items ON items.id = user_items.item_id 
         WHERE user_items.user_id = ?`,
        [userId]
      );
  
      const [tasks] = await connection.query(
        `SELECT tasks.*, user_tasks.status, user_tasks.completed_at
         FROM tasks
         JOIN user_tasks ON tasks.id = user_tasks.task_id
         WHERE user_tasks.user_id = ?`,
        [userId]
      );
  
      const [sessions] = await connection.query(
        "SELECT * FROM mining_sessions WHERE user_id = ?",
        [userId]
      );
  
      // Tạo token
      const accessToken = jwt.sign({ userId }, env.jwtAccessSecret, { expiresIn: '15m' });
      const refreshToken = jwt.sign({ userId }, env.jwtRefreshSecret, { expiresIn: '7d' });
  
      return {
        access_token: accessToken,
        refresh_token: refreshToken,
        user: userInfo[0],
        items,
        tasks,
        sessions,
      };
    } catch (error) {
      throw new ApiError(500, "Connect failed");
    } finally {
      connection.release();
    }
  }
  
}
