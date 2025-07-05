import { db } from '../config/database';
import { RowDataPacket } from 'mysql2';
import { DashboardData } from '../models/Dashboard.model';

type TopUser = {
  user_id: number;
  username: string;
  amount: number;
};

export const getDashboardData = async (): Promise<DashboardData> => {
  const [[{ totalUsers }]] = await db.query<(RowDataPacket & { totalUsers: number })[]>(
    'SELECT COUNT(*) as totalUsers FROM users'
  );

  const [[{ totalTransactions }]] = await db.query<(RowDataPacket & { totalTransactions: number })[]>(
    'SELECT COUNT(*) as totalTransactions FROM transactions'
  );

  const [[{ totalMined }]] = await db.query<(RowDataPacket & { totalMined: number | null })[]>(
    'SELECT SUM(amount) as totalMined FROM mining'
  );

  const [[{ totalItemsPurchased }]] = await db.query<(RowDataPacket & { totalItemsPurchased: number })[]>(
    'SELECT COUNT(*) as totalItemsPurchased FROM user_items'
  );

  const [topUsers] = await db.query<(RowDataPacket & TopUser)[]>(
    `SELECT user_id, username, amount FROM users ORDER BY amount DESC LIMIT 5`
  );

  return {
    totalUsers,
    totalTransactions,
    totalMined: totalMined ?? 0,
    totalItemsPurchased,
    topUsers,
  };
};
