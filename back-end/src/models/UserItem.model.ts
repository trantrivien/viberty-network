export interface UserItem {
    user_item_id: number;
    user_id: number;
    item_id: number;
    purchase_date: Date;
    activated_at: Date;
    expires_at: Date | null;
  }
  