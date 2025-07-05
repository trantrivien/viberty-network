export interface Item {
    item_id: number
    name: string
    description: string
    type: 'booster' | 'skin' | 'other'
    price: number
    mining_speed_boost: number
    reward_amount: number
    duration?: number | null
    image_url?: string | null
    created_at: string
  }
  
  export interface UserItem {
    user_item_id: number
    user_id: number
    item_id: number
    purchase_date: string
    activated_at: string
    expires_at?: string | null
  }
  