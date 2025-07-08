// stores/useUserStore.ts

import { create } from 'zustand';
import type { User } from '@/types/user';

interface ProfileStore {
    setProfile: (profile: User) => void;
    profile: User;
}

export const useProfileStore = create<ProfileStore>((set) => ({
    profile: {} as Omit<User, 'pasword'>,
    setProfile: (profile) => set({ profile: profile }),
}));
