import { get, post } from '@/lib/api/request'
import type { Transaction } from '@/types'
import { PaginatedResponse } from '@/types/common'
export interface TransactionQueryParams {
  page?: number
  limit?: number
  search?: string
}
/**
 * Get current user's transactions
 */
export async function getMyTransactions(): Promise<Transaction[]> {
  try {
    const res = await get('/transactions/my')
    return res
  } catch (error) {
    console.error('Get my transactions failed:', error)
    throw error
  }
}

/**
 * Get all transactions (admin)
 */
export async function getAllTransactions( params: TransactionQueryParams = {}): Promise<PaginatedResponse<Transaction>> {
  try {
    const query = new URLSearchParams()
    if (params.page) query.append('page', params.page.toString())
    if (params.limit) query.append('limit', params.limit.toString())
    if (params.search) query.append('search', params.search)

    const res = await get(`/transactions/all?${query.toString()}`)
    return res
  } catch (error) {
    console.error('Get all transactions failed:', error)
    throw error
  }
}

/**
 * Search transactions by wallet address
 */
export async function searchTransactions(wallet: string): Promise<Transaction[]> {
  try {
    const res = await get('/transactions', { wallet })
    return res
  } catch (error) {
    console.error('Search transactions failed:', error)
    throw error
  }
}

/**
 * Transfer money to another user
 */
export async function transfer(to_wallet_address: string, amount: number): Promise<{ message: string }> {
  try {
    const res = await post('/transactions/transfer', {
      to_wallet_address,
      amount,
    })
    return res
  } catch (error) {
    console.error('Transfer failed:', error)
    throw error
  }
}

/**
 * Admin top-up or withdraw
 */
export async function adminTransaction(params: {
  user_id: number
  amount: number
  type: 'admin_topup' | 'admin_withdraw'
  description?: string
}): Promise<{ message: string }> {
  try {
    const res = await post('/transactions/admin', params)
    return res
  } catch (error) {
    console.error('Admin transaction failed:', error)
    throw error
  }
}
