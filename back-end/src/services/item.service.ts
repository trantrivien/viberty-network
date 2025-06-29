import { db } from '../config/database';
import { Item } from '../models/Item.model';
import { UserItem } from '../models/UserItem.model';

// Admin
export const getAllItems = async (): Promise<Item[]> => {
  const [rows] = await db.query('SELECT * FROM items');
  return rows as Item[];
};

export const createItem = async (data: Partial<Item>) => {
  const {
    name, description, type, price, mining_speed_boost = 0, reward_amount = 0, duration, image_url,
  } = data;
  await db.query(
    `INSERT INTO items (name, description, type, price, mining_speed_boost, reward_amount, duration, image_url)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, description, type, price, mining_speed_boost, reward_amount, duration, image_url]
  );
};

export const updateItem = async (id: number, data: Partial<Item>) => {
  const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
  const values = Object.values(data);
  await db.query(`UPDATE items SET ${fields} WHERE item_id = ?`, [...values, id]);
};

export const deleteItem = async (id: number) => {
  await db.query('DELETE FROM items WHERE item_id = ?', [id]);
};

// User
export const buyItem = async (userId: number, itemId: number) => {
    const [rows] = await db.query('SELECT * FROM items WHERE item_id = ?', [itemId]);
    const item = (rows as Item[])[0];
    if (!item) throw new Error('Item not found');

  // Check user balance
  const [userRows] = await db.query('SELECT * FROM users WHERE user_id = ?', [userId]);
  const user = (userRows as any[])[0];
  if (!user) throw new Error('User not found');

  const expires_at = item.duration
    ? new Date(Date.now() + item.duration * 3600 * 1000)
    : null;

  await db.query('UPDATE users SET amount = amount - ? WHERE user_id = ?', [item.price, userId]);

  await db.query(
    `INSERT INTO user_items (user_id, item_id, activated_at, expires_at)
     VALUES (?, ?, CURRENT_TIMESTAMP, ?)`,
    [userId, itemId, expires_at]
  );
};

export const getUserItems = async (userId: number): Promise<UserItem[]> => {
  const [rows] = await db.query(
    `SELECT ui.*, i.name, i.description, i.type, i.image_url
     FROM user_items ui
     JOIN items i ON i.item_id = ui.item_id
     WHERE ui.user_id = ?`,
    [userId]
  );
  return rows as UserItem[];
};
