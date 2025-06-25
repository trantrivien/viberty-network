export interface Notification {
    id: number;
    user_id: number;
    message: string;
    sent_at: Date;
    status: 'sent' | 'read';
  }