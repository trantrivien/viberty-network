export interface User {
  user_id: number;
  wallet_address?: string;
  username?: string;
  email?: string;
  phone?: string;
  password?: string;
  amount: number;
  is_banned: boolean;
  role: 'user' | 'admin';
  created_at: Date;
  updated_at: Date;
  image_url?: string;
  is_mining?: boolean;
  total_mined?: number;
}

export type SafeUser = Omit<User, 'password'>;
