export interface User {
    user_id: number;
    wallet_address?: string;
    username?: string;
    email?: string;
    phone?: string;
    amount: number;
    is_banned: boolean;
    role: 'user' | 'admin';
    created_at: Date;
    updated_at: Date;
    
  }
  