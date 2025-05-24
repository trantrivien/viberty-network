import { create } from 'zustand';

interface MiningStore {
  isActive: boolean;
  timeLeft: string;
  minedAmount: number;
  miningRate: number;
  items: string[];
  startTime?: string;
  endTime?: string;
  setStartTime: (t: string) => void;
  setEndTime: (t: string) => void;
  setIsActive: (active: boolean) => void;
  setTimeLeft: (time: string) => void;
  setMinedAmount: (amount: number) => void;
  setMiningRate: (rate: number) => void;
  setItems: (items: string[]) => void;
  resetMining: () => void;
}

export const useMiningStore = create<MiningStore>((set) => ({
  isActive: false,
  timeLeft: '',
  minedAmount: 0,
  miningRate: 10,
  items: [],
  startTime: undefined,
  endTime: undefined,
  setStartTime: (t) => set({ startTime: t }),
  setEndTime: (t) => set({ endTime: t }),
  setIsActive: (active) => set({ isActive: active }),
  setTimeLeft: (time) => set({ timeLeft: time }),
  setMinedAmount: (amount) => set({ minedAmount: amount }),
  setMiningRate: (rate) => set({ miningRate: rate }),
  setItems: (items) => set({ items }),
  resetMining: () =>
    set({
      isActive: false,
      timeLeft: '',
      minedAmount: 0,
      miningRate: 10,
      items: [],  
    }),
}));
