import { get, post } from '@/lib/api/request';
import { Mining } from '@/types';
import { DashboardData } from '@/types/dashboard';

/**
 * getDashboard
 */
export async function getDashboard(): Promise<DashboardData> {
    try {
        const res = await get('/dashboard');
        return res;
    } catch (error: any) {
        console.error('Get Dashboard Error:', error);
        throw error;
    }
}

