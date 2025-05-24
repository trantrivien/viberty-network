import { create } from 'zustand'

type UpgradeItem = {
  id: string
  name: string
  description: string
  cost: number
  powerBoost: number
}

type GameState = {
  coins: number
  power: number
  upgrades: UpgradeItem[]
  mine: () => void
  buyUpgrade: (item: UpgradeItem) => void
}

export const useGameStore = create<GameState>((set) => ({
  coins: 0,
  power: 1,
  upgrades: [],
  
  mine: () => {
    set((state) => ({ coins: state.coins + state.power }))
  },

  buyUpgrade: (item) => {
    set((state) => {
      if (state.coins < item.cost) return state

      return {
        coins: state.coins - item.cost,
        power: state.power + item.powerBoost,
        upgrades: [...state.upgrades, item],
      }
    })
  },
}))
