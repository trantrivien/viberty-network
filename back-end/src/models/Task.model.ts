export interface Task {
    task_id?: number;
    title: string;
    description?: string;
    type: 'daily' | 'weekly' | 'fixed';
    reward: number;
    reward_type: 'money' | 'mining_speed';
    image_url?: string;
    start_date?: Date;
    end_date?: Date;
    created_by: number;
    created_at?: Date;
    status?: 'pending' | 'completed' | 'expired';
  }
  