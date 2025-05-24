import { motion } from "framer-motion";
import React from "react";

interface IMinerProps {
  isOpen?: boolean;
}

export default function Miner({ isOpen }: IMinerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <div className=" relative max-w-[328px] min-w-[328px]">
        <div
          className={`${
            isOpen ? "brightness-[1]" : "brightness-[0.5]"
          }  transition delay-300 duration-300 ease-in-out   filter`}
        >
          <img
            src="/assets/images/miner_on.png"
            alt="Miner"
            className={`glow-img  `}
          />
        </div>
        <div className=" opacity-100">
          <div
            className={`absolute w-[85px] bottom-[145px] h-[47px] left-[23px] transition delay-300 duration-300 ease-in-out  ${
              isOpen ? "opcity-100" : " opacity-0"
            }`}
          >
            <img
              src="/assets/images/fan.gif"
              alt="Fan"
              className="w-full h-full glow-img"
            />
          </div>
          <div
            className={` absolute w-[86px] bottom-[145px] h-[47px]  right-[26px] transition delay-300 duration-300 ease-in-out  ${
              isOpen ? "opcity-100" : " opacity-0"
            }`}
          >
            <img
              src="/assets/images/fan.gif"
              alt="Fan"
              className="w-full h-full glow-img"
            />
          </div>

          <div
            className={` absolute w-[95px] bottom-[60px] h-[47px] left-[17px] transition delay-300 duration-300 ease-in-out  ${
              isOpen ? "opcity-100" : " opacity-0"
            }`}
          >
            <img
              src="/assets/images/fan.gif"
              alt="Fan"
              className="w-full h-full glow-img"
            />
          </div>
          <div
            className={` absolute w-[95px] bottom-[58px] h-[48px] right-[26px] transition delay-300 duration-300 ease-in-out  ${
              isOpen ? "opcity-100" : " opacity-0"
            }`}
          >
            <img
              src="/assets/images/fan.gif"
              alt="Fan"
              className="w-full h-full glow-img"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
