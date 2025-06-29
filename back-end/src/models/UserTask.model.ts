export interface UserTask {
    user_task_id: number;
    user_id: number;
    task_id: number;
    status: 'pending' | 'completed' | 'expired';
    completed_at?: Date | null;
  }
  