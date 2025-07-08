// stores/useUserStore.ts

import { create } from 'zustand'
import type { User } from '@/types/user'
import { PaginationMeta } from '@/types/common'

interface UserStore {
  listUser: User[]
  meta: PaginationMeta | null
  setMeta: (meta: PaginationMeta) => void
  setListUser: (users: User[]) => void
}

export const useUserStore = create<UserStore>((set) => ({
  listUser: [],
  meta: null,
  setListUser: (users) => set({ listUser: users }),
  setMeta: (meta) => set({ meta }),
}))
