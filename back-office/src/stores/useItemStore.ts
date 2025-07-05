import { create } from 'zustand';
import { Item } from '@/types';

type ItemStore = {
  items: Item[];
  setItems: (items: Item[]) => void;
  addItem: (item: Item) => void;
  updateItem: (id: number, updates: Partial<Item>) => void;
  removeItem: (id: number) => void;
};

export const useItemStore = create<ItemStore>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  updateItem: (id, updates) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.item_id === id ? { ...i, ...updates } : i
      ),
    })),
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.item_id !== id) })),
}));
