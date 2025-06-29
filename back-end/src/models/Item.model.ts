export interface Item {
    item_id: number;
    name: string;
    description: string;
    type: 'booster' | 'skin' | 'other';
    price: number;
    mining_speed_boost: number;
    reward_amount: number;
    duration: number | null;
    image_url?: string;
    created_at: Date;
  }
  