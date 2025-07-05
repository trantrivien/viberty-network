import { create } from 'zustand';
import { UserItem } from '@/types';

type UserItemStore = {
  userItems: UserItem[];
  setUserItems: (items: UserItem[]) => void;
};

export const useUserItemStore = create<UserItemStore>((set) => ({
  userItems: [],
  setUserItems: (items) => set({ userItems: items }),
  
}));
