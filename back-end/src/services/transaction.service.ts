import { db } from '../config/database';
import { Transaction } from '../models/Transaction.model';

export const getUserTransactions = async (user_id: number): Promise<Transaction[]> => {
  const [rows] = await db.query(
    `SELECT * FROM transactions 
     WHERE (from_user_id = ? OR to_user_id = ?) 
     AND created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
     ORDER BY created_at DESC`, [user_id, user_id]
  );
  return rows as Transaction[];
};

export const getAllTransactions = async (): Promise<Transaction[]> => {
  const [rows] = await db.query(
    `SELECT * FROM transactions 
     WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
     ORDER BY created_at DESC`
  );
  return rows as Transaction[];
};

export const transfer = async (from_user_id: number, to_wallet_address: string, amount: number): Promise<void> => {
  const [toRows] = await db.query('SELECT * FROM users WHERE wallet_address = ?', [to_wallet_address]);
  if ((toRows as any[]).length === 0) throw new Error('Recipient not found');
  const toUser = (toRows as any[])[0];

  await db.query('START TRANSACTION');
  try {
    await db.query('UPDATE users SET amount = amount - ? WHERE user_id = ?', [amount, from_user_id]);
    await db.query('UPDATE users SET amount = amount + ? WHERE user_id = ?', [amount, toUser.user_id]);

    await db.query(
      `INSERT INTO transactions (from_user_id, to_user_id, amount, type, description)
       VALUES (?, ?, ?, 'transfer', 'User transferred money')`,
      [from_user_id, toUser.user_id, amount]
    );
    await db.query('COMMIT');
  } catch (err) {
    await db.query('ROLLBACK');
    throw err;
  }
};

export const adminTopupOrWithdraw = async (
  user_id: number,
  amount: number,
  type: 'admin_topup' | 'admin_withdraw',
  description?: string
): Promise<void> => {
  const amountChange = type === 'admin_topup' ? amount : -amount;
  await db.query('UPDATE users SET amount = amount + ? WHERE user_id = ?', [amountChange, user_id]);
  await db.query(
    `INSERT INTO transactions (from_user_id, to_user_id, amount, type, description)
     VALUES (NULL, ?, ?, ?, ?)`,
    [user_id, amount, type, description || null]
  );
};

export const searchTransactionsByWallet = async (wallet: string): Promise<Transaction[]> => {
    const [rows] = await db.query(
      `SELECT t.*
       FROM transactions t
       LEFT JOIN users u1 ON t.from_user_id = u1.user_id
       LEFT JOIN users u2 ON t.to_user_id = u2.user_id
       WHERE (u1.wallet_address = ? OR u2.wallet_address = ?)
       AND t.created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
       ORDER BY t.created_at DESC`,
      [wallet, wallet]
    );
    return rows as Transaction[];
  };