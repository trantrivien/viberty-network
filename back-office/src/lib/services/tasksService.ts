import { get, post, put, del } from '@/lib/api/request'
import type { Task, UserTask } from '@/types/task'

/**
 * Get tasks of current user (có thể lọc theo status)
 */
export async function getUserTasks(status?: 'pending' | 'completed' | 'expired'): Promise<UserTask[]> {
  try {
    return await get('/tasks', status ? { status } : undefined)
  } catch (error) {
    console.error('Get user tasks failed:', error)
    throw error
  }
}

/**
 * Create a new task (admin)
 */
export async function createTask(data: any): Promise<{ message: string }> {
  try {
    return await post('/tasks', data)
  } catch (error) {
    console.error('Create task failed:', error)
    throw error
  }
}

/**
 * Get all tasks (admin)
 */
export async function getAllTasks(): Promise<Task[]> {
  try {
    return await get('/tasks/all')
  } catch (error) {
    console.error('Get all tasks failed:', error)
    throw error
  }
}

/**
 * Update a task by ID (admin)
 */
export async function updateTask(id: number, data: Task): Promise<{ message: string }> {
  try {
    return await put(`/tasks/${id}`, data)
  } catch (error) {
    console.error(`Update task ${id} failed:`, error)
    throw error
  }
}

/**
 * Delete a task by ID (admin)
 */
export async function deleteTask(id?: number): Promise<{ message: string }> {
  try {
    return await del(`/tasks/${id}`)
  } catch (error) {
    console.error(`Delete task ${id} failed:`, error)
    throw error
  }
}

/**
 * Complete a task by ID (user action)
 */
export async function completeTask(id: number): Promise<{ message: string }> {
  try {
    return await post(`/tasks/${id}/complete`)
  } catch (error) {
    console.error(`Complete task ${id} failed:`, error)
    throw error
  }
}
