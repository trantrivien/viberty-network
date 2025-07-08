import { create } from 'zustand';
import { Transaction } from '@/types';
import { PaginationMeta } from '@/types/common';

type TransactionStore = {
  transactions: Transaction[];
  setTransactions: (txs: Transaction[]) => void;
  addTransaction: (tx: Transaction) => void;
  meta: PaginationMeta | null
  setMeta: (meta: PaginationMeta) => void
};

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [],
  meta: null,
  setMeta: (meta) => set({ meta }),
  setTransactions: (txs) => set({ transactions: txs }),
  addTransaction: (tx) =>
    set((state) => ({ transactions: [...state.transactions, tx] })),
}));
