export interface RefreshToken {
    token_id: number;
    user_id: number;
    token: string;
    expires_at: Date;
    created_at: Date;
  }