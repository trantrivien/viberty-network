import { db } from '../config/database';
import { RowDataPacket } from 'mysql2';
import { DashboardData } from '../models/Dashboard.model';

type TopUser = {
  user_id: number;
  username: string | null;
  amount: number;
};

export const getDashboardData = async (): Promise<DashboardData> => {
  const [[usersRow]] = await db.query<(RowDataPacket & { totalUsers: number })[]>(
    `SELECT COUNT(*) AS totalUsers FROM users WHERE role = 'user'`
  );

  const [[transactionsRow]] = await db.query<(RowDataPacket & { totalTransactions: number })[]>(
    `SELECT COUNT(*) AS totalTransactions FROM transactions`
  );

  const [[minedRow]] = await db.query<(RowDataPacket & { totalMined: number | null })[]>(
    `SELECT SUM(total_mined) AS totalMined FROM mining`
  );

  const [[itemsRow]] = await db.query<(RowDataPacket & { totalItemsPurchased: number })[]>(
    `SELECT COUNT(*) AS totalItemsPurchased FROM user_items`
  );

  const [topUsers] = await db.query<(RowDataPacket & TopUser)[]>(
    `SELECT user_id, username, amount 
     FROM users 
     WHERE role = 'user' 
     ORDER BY amount DESC 
     LIMIT 5`
  );

  return {
    totalUsers: usersRow.totalUsers,
    totalTransactions: transactionsRow.totalTransactions,
    totalMined: minedRow.totalMined ?? 0,
    totalItemsPurchased: itemsRow.totalItemsPurchased,
    topUsers,
  };
};
