export interface Item {
    id: number;
    name: string;
    description?: string;
    price: number;
    mining_rate_boost: number;
    created_at: Date;
  }