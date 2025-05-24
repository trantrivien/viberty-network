// components/MiningClientMVP.tsx
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { NumberTicker } from "../magicui/number-ticker";
import { ShimmerButton } from "../ShimmerButton";
import { useMiningStore } from "@/store/useMiningStore";
import { MINING_DURATION, MINING_RATE } from "@/constants";

export default function MiningClientMVP() {
  const {
    setTimeLeft,
    isActive,
    setIsActive,
    minedAmount,
    setMinedAmount,
    miningRate,

    setEndTime,
  } = useMiningStore();

  useEffect(() => {
    const saved = localStorage.getItem("mining");
    if (saved) {
      const data = JSON.parse(saved);
      const now = Date.now();
      const end = new Date(data.endTime).getTime();
      const endTime = new Date(end).toISOString();
      if (now < end) {
        setIsActive(true);
        updateTimeLeft(end - now);
        setEndTime(endTime);
      } else {
        setIsActive(false);
        setMinedAmount(data.minedAmount);
      }
    }
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      const data = JSON.parse(localStorage.getItem("mining") || "{}");

      const now = Date.now();
      const start = new Date(data.startTime).getTime();
      const end = new Date(data.endTime).getTime();

      const totalDuration = end - start;
      const elapsed = now - start;
      const remaining = end - now;

      if (remaining <= 0) {
        // Đào xong
        const amount = data.miningRate * 24; // 24 giờ
        const total = data.minedAmount + amount;

        const updated = {
          ...data,
          isActive: false,
          minedAmount: total,
        };
        localStorage.setItem("mining", JSON.stringify(updated));

        setIsActive(false);
        setMinedAmount(total);
        setTimeLeft("--:--");
        clearInterval(interval);
        return;
      }

      const hoursPassed = elapsed / (1000 * 60 * 60);
      const amount = data.miningRate * hoursPassed;
      const total = data.minedAmount + amount;
      setMinedAmount(parseFloat(total.toFixed(6)));

      // Update time left
      updateTimeLeft(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  const updateTimeLeft = (diff: number) => {
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    setTimeLeft(`${hours}:${minutes}:${seconds}`);
  };

  const startMining = () => {
    const now = Date.now();
    const end = now + MINING_DURATION;
    const endTime = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    const data = {
      isActive: true,
      startTime: new Date(now).toISOString(),
      endTime: new Date(end).toISOString(),
      miningRate: MINING_RATE,
      minedAmount: minedAmount,
    };
    setEndTime(endTime);
    localStorage.setItem("mining", JSON.stringify(data));
    setIsActive(true);
    updateTimeLeft(MINING_DURATION);
  };

  return (
    <div className="z-100">
      <AnimatePresence mode="wait">
        <motion.div
          key="mining-ui"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="speed-container  flex items-center justify-center gap-2 z-10"
        >
          <div className=" glow-text">
            <img
              src="/assets/icons/fan_gpu.svg"
              alt="ref"
              className="w-[20px] glow-img "
            />
          </div>
          <NumberTicker value={miningRate} decimalPlaces={2} />
          <span>V/h</span>
        </motion.div>
        <motion.div
          key="mining-ui-amount"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="mined-container">
            <img src="/assets/icons/logo.png" className="glow-img  " />
            <NumberTicker
              value={minedAmount ?? 0}
              decimalPlaces={4}
              className="glow-text text-white font-bold flex items-center justify-center w-full h-full "
            />
          </div>
        </motion.div>

        {!isActive && (
          <motion.div
            key="start-button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="miner-button bottom-[100] neon-border z-100"
          >
            <ShimmerButton className="bg-primary" onClick={startMining}>
              <span className="whitespace-pre-wrap text-center text-sm font-bold leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                Start Mine
              </span>
            </ShimmerButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
