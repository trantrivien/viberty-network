// models/Dashboard.model.ts

export interface DashboardData {
  totalUsers: number;
  totalTransactions: number;
  totalMined: number;
  totalItemsPurchased: number;
  topUsers: {
    user_id: number;
    username: string | null;
    amount: number;
  }[];
}
