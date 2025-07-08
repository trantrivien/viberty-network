import { get, put, del } from '@/lib/api/request';
import { PaginatedResponse } from '@/types/common';
import type { User } from '@/types/user';

export interface GetAllUsersParams {
    page?: number;
    limit?: number;
    search?: string;
    role?: 'user' | 'admin';
    is_banned?: boolean;
}
/**
 * Get all users (admin only)
 */
export async function getAllUsers(params: GetAllUsersParams = {}): Promise<PaginatedResponse<User>> {
    try {
        const query = new URLSearchParams();

        if (params.page) query.append('page', String(params.page));
        if (params.limit) query.append('limit', String(params.limit));
        if (params.search) query.append('search', params.search);
        if (params.role) query.append('role', params.role);
        if (params.is_banned !== undefined) query.append('is_banned', String(params.is_banned));

        const url = `/users?${query.toString()}`;
        const res = await get(url);
        return res;
    } catch (error) {
        console.error('Get all users error:', error);
        throw error;
    }
}

/**
 * Get current user's profile
 */
export async function getMyProfile(): Promise<User> {
    try {
        return await get('/users/me');
    } catch (error) {
        console.error('Get profile error:', error);
        throw error;
    }
}

/**
 * Update current user's profile
 */
export async function updateMyProfile(data: Partial<User>): Promise<{ message: string }> {
    try {
        return await put('/users/me', data);
    } catch (error) {
        console.error('Update profile error:', error);
        throw error;
    }
}

/**
 * Update another user (admin)
 */
export async function updateUser(id: number, data: Partial<User>): Promise<{ message: string }> {
    try {
        return await put(`/users/${id}`, data);
    } catch (error) {
        console.error(`Update user ${id} error:`, error);
        throw error;
    }
}

/**
 * Delete a user (admin)
 */
export async function deleteUser(id: number): Promise<{ message: string }> {
    try {
        return await del(`/users/${id}`);
    } catch (error) {
        console.error(`Delete user ${id} error:`, error);
        throw error;
    }
}

/**
 * Block or unblock a user (admin)
 */
export async function blockUser(id: number, block: boolean): Promise<{ message: string }> {
    try {
        return await put(`/users/${id}/block`, { block });
    } catch (error) {
        console.error(`Block/unblock user ${id} error:`, error);
        throw error;
    }
}
