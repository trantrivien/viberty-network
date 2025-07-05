import { create } from 'zustand';
import { Mining } from '@/types';

type MiningStore = {
  mining: Mining | null;
  setMining: (mining: Mining) => void;
};

export const useMiningStore = create<MiningStore>((set) => ({
  mining: null,
  setMining: (mining) => set({ mining }),
}));
