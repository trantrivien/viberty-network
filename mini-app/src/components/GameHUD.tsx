'use client'

import { useGameStore } from '@/store/useGameStore'

export default function GameHUD() {
  const coins = useGameStore((state) => state.coins)
  const power = useGameStore((state) => state.power)

  return (
    <div className="fixed top-4 left-4 z-50 bg-black/70 text-white px-4 py-2 rounded-xl shadow-lg">
      <div className="flex items-center gap-4 text-sm sm:text-base">
        <div className="flex items-center gap-1">
          🪙 <span className="font-bold">{coins}</span> Coins
        </div>
        <div className="flex items-center gap-1">
          💥 <span className="font-bold">{power}</span> Power
        </div>
      </div>
    </div>
  )
}
