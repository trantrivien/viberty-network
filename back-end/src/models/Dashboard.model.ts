export interface DashboardData {
  totalUsers: number;
  totalTransactions: number;
  totalMined: number;
  totalItemsPurchased: number;
  topUsers: { user_id: number; username: string; amount: number }[];
}
