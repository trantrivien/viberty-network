'use client'

import { useGameStore } from '@/store/useGameStore'

type Props = {
    item: {
      id: string
      name: string
      description: string
      cost: number
      powerBoost: number
    }
    disabled?: boolean
    owned?: boolean
    onBuy: () => void
  }

export default function UpgradeItemCard({ item }: Props) {
  const { coins, buyUpgrade } = useGameStore()

  const handleBuy = () => {
    if (coins >= item.cost) {
      buyUpgrade(item)
    } else {
      alert('Not enough coins!')
    }
  }

  return (
    <div className="bg-[#1c1c1c] text-white p-4 rounded-xl border border-gray-700 hover:shadow-lg">
      <h3 className="text-lg font-bold">{item.name}</h3>
      <p className="text-sm text-gray-300 mb-2">{item.description}</p>
      <div className="flex justify-between items-center">
        <span>💰 {item.cost} | 💥 +{item.powerBoost}</span>
        <button
          onClick={handleBuy}
          className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 text-black rounded-md"
        >
          Buy
        </button>
      </div>
    </div>
  )
}
