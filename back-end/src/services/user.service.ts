import { db } from "../config/database";
import { SafeUser, User } from "../models/User.model";
import { RowDataPacket } from "mysql2";

interface GetUsersOptions {
  page?: number;
  limit?: number;
  role?: string;
  is_banned?: boolean;
  search?: string;
}

export const getAllUsers = async (options: GetUsersOptions) => {
  const { page = 1, limit = 10, role, is_banned, search } = options;

  const offset = (page - 1) * limit;

  const whereClauses: string[] = [];
  const params: any[] = [];

  if (role) {
    whereClauses.push("u.role = ?");
    params.push(role);
  }

  if (typeof is_banned === "boolean") {
    whereClauses.push("u.is_banned = ?");
    params.push(is_banned);
  }

  if (search) {
    whereClauses.push(
      `(u.username LIKE ? OR u.email LIKE ? OR u.phone LIKE ?)`
    );
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  const where = whereClauses.length
    ? `WHERE ${whereClauses.join(" AND ")}`
    : "";

  const [users] = await db.query<(RowDataPacket & SafeUser)[]>(
    `
    SELECT 
      u.user_id,
      u.wallet_address,
      u.username,
      u.email,
      u.phone,
      u.amount,
      u.is_banned,
      u.role,
      u.created_at,
      u.updated_at,
      u.image_url,
      m.is_mining,
      m.total_mined
    FROM users u
    LEFT JOIN mining m ON u.user_id = m.user_id
    ${where}
    ORDER BY u.created_at DESC
    LIMIT ? OFFSET ?
  `,
    [...params, limit, offset]
  );

  const [[{ total }]] = await db.query<(RowDataPacket & { total: number })[]>(
    `
    SELECT COUNT(*) as total FROM users u
    ${where}
  `,
    params
  );

  return {
    data: users,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};
export const getUserById = async (userId: number): Promise<SafeUser | null> => {
  const [rows] = await db.query<(RowDataPacket & User)[]>(
    `
    SELECT 
      u.user_id,
      u.wallet_address,
      u.username,
      u.email,
      u.phone,
      u.amount,
      u.is_banned,
      u.role,
      u.created_at,
      u.updated_at,
      m.is_mining,
      m.total_mined
    FROM users u
    LEFT JOIN mining m ON u.user_id = m.user_id
    WHERE u.user_id = ?
  `,
    [userId]
  );

  const user = rows[0];
  return user || null;
};

export const updateUserById = async (
  userId: number,
  data: Partial<SafeUser>
): Promise<void> => {
  const fields = Object.keys(data)
    .map((key) => `${key} = ?`)
    .join(", ");
  const values = Object.values(data);
  await db.query(`UPDATE users SET ${fields} WHERE user_id = ?`, [
    ...values,
    userId,
  ]);
};

export const deleteUser = async (userId: number): Promise<void> => {
  await db.query("DELETE FROM users WHERE user_id = ?", [userId]);
};

export const blockUser = async (
  userId: number,
  block: boolean
): Promise<void> => {
  await db.query("UPDATE users SET is_banned = ? WHERE user_id = ?", [
    block,
    userId,
  ]);
};
