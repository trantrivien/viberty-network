export interface Task {
    id: number;
    title: string;
    description?: string;
    reward_amount: number;
    type: 'like_video' | 'subscribe_youtube' | 'follow_x' | 'other';
    external_link?: string;
    created_at: Date;
  }