import api from './client'

export async function get<T = any>(url: string, params?: any): Promise<T> {
  const res = await api.get<T>(url, { params })
  return res.data
}

export async function post<T = any>(url: string, data?: any): Promise<T> {
  const res = await api.post<T>(url, data)
  return res.data
}

export async function put<T = any>(url: string, data?: any): Promise<T> {
  const res = await api.put<T>(url, data)
  return res.data
}

export async function del<T = any>(url: string, params?: any): Promise<T> {
  const res = await api.delete<T>(url, { params })
  return res.data
}
