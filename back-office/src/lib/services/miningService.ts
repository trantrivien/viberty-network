import { get, post } from '@/lib/api/request';
import { Mining } from '@/types';

/**
 * Start or resume mining
 */
export async function startMining(): Promise<{ message: string }> {
    try {
        const res = await post('/mining/start');
        return res.data;
    } catch (error: any) {
        console.error('Start mining error:', error);
        throw error;
    }
}

/**
 * Stop mining
 */
export async function stopMining(): Promise<{ message: string }> {
    try {
        const res = await post('/mining/stop');
        return res.data;
    } catch (error: any) {
        console.error('Stop mining error:', error);
        throw error;
    }
}

/**
 * Get list of active miners
 */
export async function getActiveMiners(): Promise<Mining[]> {
    try {
        const res = await get('/mining/active');
        return res.data;
    } catch (error: any) {
        console.error('Get active miners error:', error);
        throw error;
    }
}
