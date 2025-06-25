import { Pool } from 'mysql2/promise';
import { MiningSession } from '../types/mining';

export class MiningSessionModel {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async findActiveByUserId(userId: number): Promise<MiningSession[]> {
    const connection = await this.pool.getConnection();
    try {
      const [rows] = await connection.query(
        'SELECT * FROM mining_sessions WHERE user_id = ? AND status = "active"',
        [userId]
      );
      return rows as MiningSession[];
    } finally {
      connection.release();
    }
  }

  async findClaimableByUserId(userId: number): Promise<MiningSession[]> {
    const connection = await this.pool.getConnection();
    try {
      const [rows] = await connection.query(
        'SELECT * FROM mining_sessions WHERE user_id = ? AND status = "active" AND end_time <= NOW()',
        [userId]
      );
      return rows as MiningSession[];
    } finally {
      connection.release();
    }
  }

  async create(session: Omit<MiningSession, 'id'>): Promise<void> {
    const connection = await this.pool.getConnection();
    try {
      await connection.query(
        'INSERT INTO mining_sessions (user_id, start_time, end_time, mining_rate, status) VALUES (?, ?, ?, ?, ?)',
        [session.user_id, session.start_time, session.end_time, session.mining_rate, session.status]
      );
    } finally {
      connection.release();
    }
  }

  async updateStatus(id: number, status: 'active' | 'expired'): Promise<void> {
    const connection = await this.pool.getConnection();
    try {
      await connection.query('UPDATE mining_sessions SET status = ? WHERE id = ?', [status, id]);
    } finally {
      connection.release();
    }
  }
}