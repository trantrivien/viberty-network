import { db } from '../config/database';
import { Mining } from '../models/Mining.model';

const MAX_MINING_HOURS = 24;

export const getMiningStatus = async (user_id: number): Promise<Mining | null> => {
  const [rows] = await db.query('SELECT * FROM mining WHERE user_id = ?', [user_id]);
  const result = (rows as Mining[])[0];
  return result || null;
};

export const startMining = async (user_id: number) => {
  const mining = await getMiningStatus(user_id);
  const now = new Date();

  if (mining && mining.is_mining) {
    throw new Error('Mining already in progress');
  }

  const elapsedMs = mining ? now.getTime() - new Date(mining.last_mined_at).getTime() : 0;
  const elapsedHours = Math.min(MAX_MINING_HOURS, elapsedMs / (1000 * 60 * 60));

  const reward = mining ? mining.mining_speed * elapsedHours : 0;

  await db.query('UPDATE users SET amount = amount + ? WHERE user_id = ?', [reward, user_id]);

  if (mining) {
    await db.query(
      `UPDATE mining 
       SET is_mining = true, last_mined_at = ?, total_mined = total_mined + ?, updated_at = NOW()
       WHERE user_id = ?`,
      [now, reward, user_id]
    );
  } else {
    await db.query(
      `INSERT INTO mining (user_id, mining_speed, last_mined_at, total_mined, is_mining)
       VALUES (?, ?, ?, ?, ?)`,
      [user_id, 1.0, now, 0, true]
    );
  }
};

export const stopMining = async (user_id: number) => {
  await db.query('UPDATE mining SET is_mining = false WHERE user_id = ?', [user_id]);
};

export const getActiveMiners = async (): Promise<Mining[]> => {
  const [rows] = await db.query('SELECT * FROM mining WHERE is_mining = true');
  return rows as Mining[];
};
