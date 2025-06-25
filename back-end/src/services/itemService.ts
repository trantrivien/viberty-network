import { Pool, RowDataPacket } from 'mysql2/promise';
import { Item } from '../types/item';
import { ApiError } from '../utils/response';

interface ItemResult extends RowDataPacket, Item {}

export class ItemService {
  async getItems(pool: Pool) {
    const connection = await pool.getConnection();
    try {
      const [items] = await connection.query<ItemResult[]>('SELECT * FROM items');
      return items;
    } finally {
      connection.release();
    }
  }

  async purchaseItem(userId: number, itemId: number, pool: Pool) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const [items] = await connection.query<ItemResult[]>(
        'SELECT * FROM items WHERE id = ?',
        [itemId]
      );
      if (items.length === 0) {
        throw new ApiError(404, 'Item not found');
      }

      const item = items[0];
      const [users] = await connection.query<RowDataPacket[]>(
        'SELECT balance FROM users WHERE id = ?',
        [userId]
      );
      if (users[0].balance < item.price) {
        throw new ApiError(400, 'Insufficient balance');
      }

      await connection.query(
        'UPDATE users SET balance = balance - ? WHERE id = ?',
        [item.price, userId]
      );

      await connection.query(
        'INSERT INTO user_items (user_id, item_id) VALUES (?, ?)',
        [userId, itemId]
      );

      await connection.query(
        'INSERT INTO notifications (user_id, message) VALUES (?, ?)',
        [userId, `You purchased ${item.name}!`]
      );

      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}