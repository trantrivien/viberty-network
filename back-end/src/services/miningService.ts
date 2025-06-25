import { Pool, RowDataPacket } from 'mysql2/promise';
import { MiningSession } from '../types/mining';
import { ApiError } from '../utils/response';

interface MiningSessionResult extends RowDataPacket, MiningSession {}

export class MiningService {
  async startMining(userId: number, pool: Pool) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const [activeSessions] = await connection.query<MiningSessionResult[]>(
        'SELECT * FROM mining_sessions WHERE user_id = ? AND status = "active"',
        [userId]
      );
      if (activeSessions.length > 0) {
        throw new ApiError(400, 'Active mining session exists');
      }

      const [userItems] = await connection.query<RowDataPacket[]>(
        'SELECT SUM(i.mining_rate_boost) as total_boost FROM user_items ui JOIN items i ON ui.item_id = i.id WHERE ui.user_id = ?',
        [userId]
      );
      const miningRate = 1.00 + (userItems[0].total_boost || 0);

      const startTime = new Date();
      const endTime = new Date(startTime.getTime() + 8 * 60 * 60 * 1000);

      await connection.query(
        'INSERT INTO mining_sessions (user_id, start_time, end_time, mining_rate) VALUES (?, ?, ?, ?)',
        [userId, startTime, endTime, miningRate]
      );

      await connection.commit();
      return { miningRate, endTime };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  async claimRewards(userId: number, pool: Pool) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const [sessions] = await connection.query<MiningSessionResult[]>(
        'SELECT * FROM mining_sessions WHERE user_id = ? AND status = "active" AND end_time <= NOW()',
        [userId]
      );
      if (sessions.length === 0) {
        throw new ApiError(400, 'No claimable sessions');
      }

      const session = sessions[0];
      const hours = (Number((new Date(session.end_time))) - Number(new Date(session.start_time))) / (1000 * 60 * 60);
      const reward = hours * session.mining_rate;

      await connection.query(
        'UPDATE users SET balance = balance + ? WHERE id = ?',
        [reward, userId]
      );

      await connection.query(
        'UPDATE mining_sessions SET status = "expired" WHERE id = ?',
        [session.id]
      );

      await connection.query(
        'INSERT INTO notifications (user_id, message) VALUES (?, ?)',
        [userId, `You claimed ${reward} coins from mining!`]
      );

      await connection.commit();
      return { reward };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}