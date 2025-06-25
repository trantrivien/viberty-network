import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: any;
  items: any[];
  tasks: any[];
  sessions: any[];
  setAuth: (data: {
    access_token: string;
    refresh_token: string;
    user: any;
    items: any[];
    tasks: any[];
    sessions: any[];
  }) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      items: [],
      tasks: [],
      sessions: [],
      setAuth: ({
        access_token,
        refresh_token,
        user,
        items,
        tasks,
        sessions,
      }) =>
        set({
          accessToken: access_token,
          refreshToken: refresh_token,
          user,
          items,
          tasks,
          sessions,
        }),
      clearAuth: () =>
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          items: [],
          tasks: [],
          sessions: [],
        }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
