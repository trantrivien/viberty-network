"use client"

import { motion, useAnimation } from "framer-motion"
import { useDrag } from "@use-gesture/react"

export default function SlideButton() {
  const controls = useAnimation()

  const bind = useDrag(({ movement: [mx], down, cancel }) => {
    if (mx > 180) {
      console.log("Upgrade Miner Triggered")
      cancel()
    } else {
      controls.start({ x: down ? mx : 0 })
    }
  })

  return (
    <div className="relative w-full max-w-md h-14 bg-blue-900 rounded-full overflow-hidden">
      <div {...bind()} className="absolute left-0 top-0 h-full w-14">
        <motion.div
          animate={controls}
          className="h-full w-14 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold"
        >
          {'>>'}
        </motion.div>
      </div>
      <div className="text-white text-center leading-[56px] font-medium">
        Upgrade miner
      </div>
    </div>
  )
}
