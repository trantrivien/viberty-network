import { User } from '@/types/user';
import { create } from 'zustand';

type UserStore = {
    user: User | null;
    listUser: User[] | [];
    setUser: (user: User) => void;
    setListUser: (listUser: User[]) => void;
    clearUser: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    listUser: [],
    setListUser: (listUser: User[]) => set({ listUser }),
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
}));
