import { get, post, put, del } from '@/lib/api/request'
import { Item, UserItem } from '@/types/item'

/**
 * Get all items
 */
export async function getAllItems(): Promise<Item[]> {
  try {
    const res = await get('/items')
    return res
  } catch (error: any) {
    console.error('Get all items error:', error)
    throw error
  }
}

/**
 * Create a new item
 */
export async function createItem(data: Item): Promise<{ message: string }> {
  try {
    const res = await post('/items', data)
    return res.data
  } catch (error: any) {
    console.error('Create item error:', error)
    throw error
  }
}

/**
 * Update an item
 */
export async function updateItem(id: number, data: Item): Promise<{ message: string }> {
  try {
    const res = await put(`/items/${id}`, data)
    return res.data
  } catch (error: any) {
    console.error(`Update item ${id} error:`, error)
    throw error
  }
}

/**
 * Delete an item
 */
export async function deleteItem(id?: number): Promise<{ message: string }> {
  try {
    const res = await del(`/items/${id}`)
    return res.data
  } catch (error: any) {
    console.error(`Delete item ${id} error:`, error)
    throw error
  }
}

/**
 * Buy an item
 */
export async function buyItem(item_id: number): Promise<{ message: string }> {
  try {
    const res = await post('/items/buy', { item_id })
    return res.data
  } catch (error: any) {
    console.error(`Buy item ${item_id} error:`, error)
    throw error
  }
}

/**
 * Get user's items
 */
export async function getMyItems(): Promise<UserItem[]> {
  try {
    const res = await get('/items/my')
    return res.data
  } catch (error: any) {
    console.error('Get user items error:', error)
    throw error
  }
}
