import { Pool } from 'mysql2/promise';
import { User } from '../types/user';

export class UserModel {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async findById(id: number): Promise<User | null> {
    const connection = await this.pool.getConnection();
    try {
      const [rows] = await connection.query('SELECT * FROM users WHERE id = ?', [id]);
      return (rows as User[])[0] || null;
    } finally {
      connection.release();
    }
  }

  async findByWalletAddress(wallet_address: string): Promise<User | null> {
    const connection = await this.pool.getConnection();
    try {
      const [rows] = await connection.query('SELECT * FROM users WHERE wallet_address = ?', [wallet_address]);
      return (rows as User[])[0] || null;
    } finally {
      connection.release();
    }
  }

  async updateBalance(id: number, balance: number): Promise<void> {
    const connection = await this.pool.getConnection();
    try {
      await connection.query('UPDATE users SET balance = ? WHERE id = ?', [balance, id]);
    } finally {
      connection.release();
    }
  }
}