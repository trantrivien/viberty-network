export interface Task {
    task_id?: number
    title: string
    description?: string | any
    type: 'daily' | 'weekly' | 'fixed'
    reward: number
    reward_type: 'money' | 'mining_speed'
    image_url?: string | any
    start_date?: string | any
    end_date?: string | any
    created_by: number
    created_at?: string | any
    status?: 'pending' | 'completed' | 'expired'
  }
  
  export interface UserTask {
    user_task_id: number
    user_id: number
    task_id: number
    status: 'pending' | 'completed' | 'expired'
    completed_at?: string | null
  }
  