export interface Item {
    item_id: number;
    name: string;
    description: string;
    type: 'booster' | 'skin' | 'other';
    price: number;
    mining_speed_boost: number;
    reward_amount: number;
    duration?: number | null;
    image_url?: string | null;
    created_at: string; // ISO date-time string
  }
  
  export interface Transaction {
    transaction_id?: number | null;
    from_user_id?: number | null;
    to_user_id?: number | null;
    amount: number;
    type: 'transfer' | 'game_reward' | 'purchase' | 'task_reward' | 'mining_reward' | 'admin_topup' | 'admin_withdraw';
    description?: string | null;
    created_at?: string | null; // ISO date-time string
  }
  
  export interface Mining {
    mining_id: number;
    user_id: number;
    mining_speed: number;
    last_mined_at: string; // ISO date-time string
    total_mined: number;
    is_mining: boolean;
    created_at: string;
    updated_at: string;
  }
  
  export interface UserItem {
    user_item_id: number;
    user_id: number;
    item_id: number;
    purchase_date: string;
    activated_at: string;
    expires_at?: string | null;
  }
  
  export interface Task {
    task_id?: number;
    title: string;
    description?: string | null;
    type: 'daily' | 'weekly' | 'fixed';
    reward: number;
    reward_type: 'money' | 'mining_speed';
    image_url?: string ;
    start_date?: string | null;
    end_date?: string | null;
    created_by: number;
    created_at?: string | null;
    status?: 'pending' | 'completed' | 'expired' | null;
  }
  
  export interface UserTask {
    user_task_id: number;
    user_id: number;
    task_id: number;
    status: 'pending' | 'completed' | 'expired';
    completed_at?: string | null;
  }
  
  export interface Notification {
    notification_id: number;
    user_id: number;
    title: string;
    message: string;
    created_at: string;
  }
  