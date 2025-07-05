import { create } from 'zustand';
import { Transaction } from '@/types';

type TransactionStore = {
  transactions: Transaction[];
  setTransactions: (txs: Transaction[]) => void;
  addTransaction: (tx: Transaction) => void;
};

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [],
  setTransactions: (txs) => set({ transactions: txs }),
  addTransaction: (tx) =>
    set((state) => ({ transactions: [...state.transactions, tx] })),
}));
