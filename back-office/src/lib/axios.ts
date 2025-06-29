import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, 
})

api.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const res = await api.post('/auth/refresh-token')
        localStorage.setItem('accessToken', res.data.accessToken)
        api.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`
        return api(originalRequest)
      } catch {
        window.location.href = '/' 
      }
    }
    return Promise.reject(error)
  }
)

api.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api
