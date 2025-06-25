import { Pool } from 'mysql2/promise';
import { Item } from '../types/item';

export class ItemModel {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async findById(id: number): Promise<Item | null> {
    const connection = await this.pool.getConnection();
    try {
      const [rows] = await connection.query('SELECT * FROM items WHERE id = ?', [id]);
      return (rows as Item[])[0] || null;
    } finally {
      connection.release();
    }
  }

  async findAll(): Promise<Item[]> {
    const connection = await this.pool.getConnection();
    try {
      const [rows] = await connection.query('SELECT * FROM items');
      return rows as Item[];
    } finally {
      connection.release();
    }
  }
}