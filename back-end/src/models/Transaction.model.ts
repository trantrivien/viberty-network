export type TransactionType = 'transfer' | 'game_reward' | 'purchase' | 'task_reward' | 'mining_reward' | 'admin_topup' | 'admin_withdraw';

export interface Transaction {
  transaction_id?: number;
  from_user_id?: number | null;
  to_user_id?: number | null;
  amount: number;
  type: TransactionType;
  description?: string;
  created_at?: Date;
}
