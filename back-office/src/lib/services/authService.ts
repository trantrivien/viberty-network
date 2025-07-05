import { post } from '@/lib/api/request'

export async function register(username: string, email: string, password: string) {
  try {
    const res = await post('/auth/register', { username, email, password })
    return res
  } catch (error: any) {
    // optional: toast.error('Đăng ký thất bại')
    console.error('Register failed:', error)
    throw error
  }
}

export async function login(username: string, password: string) {
  try {
    const response = await post('/auth/login', { username, password })
    const { accessToken } = response

    document.cookie = `access_token=${accessToken}; path=/; max-age=86400`
    localStorage.setItem('access_token', accessToken)
    

    return { accessToken }
  } catch (error: any) {
    console.error('Login failed:', error)
    throw error
  }
}

export async function walletLogin(wallet_address: string) {
  try {
    const response = await post('/auth/wallet-login', { wallet_address })
    const { accessToken } = response

    document.cookie = `access_token=${accessToken}; path=/; max-age=86400`
    localStorage.setItem('access_token', accessToken)

    return { accessToken }
  } catch (error: any) {
    console.error('Wallet login failed:', error)
    throw error
  }
}

export async function refreshAccessToken() {
  try {
    const res = await post('/auth/refresh-token')
    const { accessToken } = res

    document.cookie = `access_token=${accessToken}; path=/; max-age=86400`
    localStorage.setItem('access_token', accessToken)

    return { accessToken }
  } catch (error: any) {
    console.error('Refresh token failed:', error)
    throw error
  }
}

export async function logout() {
  try {
    await post('/auth/logout') // Nếu backend có
  } catch (err) {
    console.warn('Logout error:', err)
  }

  document.cookie = 'access_token=; Max-Age=0; path=/'
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')

  if (typeof window !== 'undefined') {
    window.location.href = '/signin'
  }
}
