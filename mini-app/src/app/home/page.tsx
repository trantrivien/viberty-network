"use client";

import AuthGuard from "@/components/AuthGuard";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import Miner from "@/components/Miner";
import MiningClientMVP from "@/components/Miner/MiningClientMVP";
import ProgressBar from "@/components/ProgressBar";
import { useMiningStore } from "@/store/useMiningStore";
import { motion } from "framer-motion";
import React from "react";

export default function HomePage() {
  const { timeLeft, isActive } = useMiningStore();

  return (
    <AuthGuard>
      <main className="home_page bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center justify-center px-4 relative max-w-screen overflow-hidden    ">
        <motion.div
          className="fixed top-0 p-3 flex flex-row justify-between items-center header z-100 min-w-[375px]"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex justify-between h-full w-full mt-10">
            <div className="btn_news_container_left">
              <button className="w-full h-full m-auto flex flex-col justify-center items-center ">
                <img
                  src="/assets/images/mission.webp"
                  alt="ref"
                  className="w-[50%] glow-img "
                />
                <p className=" font-bold text-[12px] ">Mission</p>
              </button>
            </div>

            <div className="progress-container flex flex-col items-center gap-2">
              <div className="flex flex-col items-center gap-0">
                <span className="text-2xl font-bold glow-text leading-none">
                  VIBERTY
                </span>
                <span className="text-xs text-muted-foreground !text-black">
                  NETWORK
                </span>
              </div>

              <div className="mt-1 text-xs h-[10px]">{timeLeft}</div>
              <ProgressBar />
            </div>

            <div className="btn_news_container_right">
              <button className="w-full h-full m-auto flex flex-col justify-center items-center">
                <img
                  src="/assets/images/ref.png"
                  alt="ref"
                  className="w-[50%] glow-img "
                />
                <p className=" font-bold  text-[12px]">Reff</p>
              </button>
            </div>
          </div>
        </motion.div>
        <div className="min-h-[500px] w-full flex flex-col items-center justify-center">
          <div className="m-x-auto z-10 mt-[90px]">
            <Miner isOpen={isActive} />
          </div>
          <MiningClientMVP />
        </div>

        <FlickeringGrid
          className=" fixed inset-0 z-0 [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
          squareSize={4}
          gridGap={6}
          color="#FFD801"
          maxOpacity={0.5}
          flickerChance={0.3}
          height={1000}
        />
      </main>
    </AuthGuard>
  );
}
