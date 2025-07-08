// stores/dashboardStore.ts
import { create } from 'zustand';
import axios from 'axios';
import { getDashboard } from '@/lib/services/dashboardService';
import { DashboardState } from '@/types/dashboard';



export const useDashboardStore = create<DashboardState>((set) => ({
  data: null,
  loading: false,
  error: null,
  fetchDashboard: async () => {
    set({ loading: true, error: null });
    try {
      const res = await getDashboard();
  
      set({ data: res, loading: false });
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch', loading: false });
    }
  },
}));
