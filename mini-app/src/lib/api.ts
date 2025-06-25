// lib/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
  withCredentials: true, // để gửi cookie (JWT, refreshToken)
});

type GetOptions = {
  url: string;
  params?: Record<string, any>;
  headers?: Record<string, string>;
};

export async function get<T = any>({ url, params, headers }: GetOptions): Promise<T> {
  try {
    const response = await api.get<T>(url, {
      params,
      headers,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error.message);
  }
}

type PostOptions = {
  url: string;
  data?: Record<string, any>;
  headers?: Record<string, string>;
};

export async function post<T = any>({ url, data, headers }: PostOptions | any): Promise<T> {
  try {
    const response = await api.post<T>(url, data ?? {}, {
      headers,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error.message);
  }
}

export default api;
