import { post, get } from '@/lib/api/request';

export async function logout() {
    await post('/auth/logout');
    if (typeof window !== 'undefined') {
        window.location.href = '/login';
    }
}

// Refresh token
export async function refreshAccessToken() {
    const res = await post('/auth/refresh');
}

export async function register(username: string, password?: string) {
    try {
        const registerResult = await post('/admin/register', {
            username: username,
            password: password,
        });
        return registerResult;
    } catch (err: any) {
        if (!err.message.includes('409')) {
            throw err;
        }
    }
}

export async function login(username: string, password: string) {
    const response = await post('/admin/login-admin', { username, password });
    const { token, refresh_token } = response.data;
    document.cookie = `access_token=${token}; path=/; max-age=86400`;
    document.cookie = `refresh_token=${refresh_token}; path=/; max-age=604800`; // 7 ngày
    localStorage.setItem('access_token', token);
    localStorage.setItem('refresh_token', refresh_token);

    return {
      token,
    };
}
