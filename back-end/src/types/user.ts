export interface User {
    id: number;
    wallet_address: string;
    username?: string;
    balance: number;
    referral_code: string;
    referred_by?: string;
    created_at: Date;
    updated_at: Date;
  }