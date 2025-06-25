export interface MiningSession {
    id: number;
    user_id: number;
    start_time: Date;
    end_time: Date;
    mining_rate: number;
    status: 'active' | 'expired';
  }