import axios from "axios";
import { logout } from "../services/authService";
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api"
const api = axios.create({
  baseURL: baseURL,
  withCredentials: true, // Để gửi kèm cookie (access & refresh token)
});

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}[] = [];

const processQueue = (error: any, token?: string) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (token) resolve(token);
    else reject(error);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: () => resolve(api(originalRequest)),
          reject: (err) => reject(err),
        });
      });
    }

    isRefreshing = true;

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-token`,
        {},
        { withCredentials: true }
      );

      processQueue(null);
      return api(originalRequest); 
    } catch (refreshError) {
      processQueue(refreshError);
      logout()
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
