import { get, put, del } from '@/lib/api/request'
import type { User } from '@/types/user'

/**
 * Get all users (admin only)
 */
export async function getAllUsers(): Promise<User[]> {
  try {
    return await get('/users')
  } catch (error) {
    console.error('Get all users error:', error)
    throw error
  }
}

/**
 * Get current user's profile
 */
export async function getMyProfile(): Promise<User> {
  try {
    return await get('/users/me')
  } catch (error) {
    console.error('Get profile error:', error)
    throw error
  }
}

/**
 * Update current user's profile
 */
export async function updateMyProfile(data: Partial<User>): Promise<{ message: string }> {
  try {
    return await put('/users/me', data)
  } catch (error) {
    console.error('Update profile error:', error)
    throw error
  }
}

/**
 * Update another user (admin)
 */
export async function updateUser(id: number, data: Partial<User>): Promise<{ message: string }> {
  try {
    return await put(`/users/${id}`, data)
  } catch (error) {
    console.error(`Update user ${id} error:`, error)
    throw error
  }
}

/**
 * Delete a user (admin)
 */
export async function deleteUser(id: number): Promise<{ message: string }> {
  try {
    return await del(`/users/${id}`)
  } catch (error) {
    console.error(`Delete user ${id} error:`, error)
    throw error
  }
}

/**
 * Block or unblock a user (admin)
 */
export async function blockUser(id: number, block: boolean): Promise<{ message: string }> {
  try {
    return await put(`/users/${id}/block`, { block })
  } catch (error) {
    console.error(`Block/unblock user ${id} error:`, error)
    throw error
  }
}
