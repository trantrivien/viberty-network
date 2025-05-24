import React from "react";
import { FlickeringGrid } from "./magicui/flickering-grid";
import Image from "next/image";
import { TypingAnimation } from "./magicui/typing-animation";
import { HyperText } from "./magicui/hyper-text";
import VibertyLogo from "./icons/VibertyLogo";
import { Ripple } from "./magicui/ripple";
import { SparklesText } from "./magicui/sparkles-text";
import { motion } from "framer-motion";
export default function ScreenLoading() {
  return (
    <div className="screen-loading">
      <motion.div
        className="z-10000"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 12,
          duration: 0.7
        }}
      >
        <div className="logo">
          <VibertyLogo />
        </div>
      </motion.div>

      <motion.div
        key="start-button"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="z-100 flex justify-center flex-col items-center"
      >
        <SparklesText
          colors={{ first: "#ffb30091", second: "#ffb300" }}
          className="text-white text-[30px] z-[1000]"
        >
          VIBERTY
        </SparklesText>
        <div>
          <TypingAnimation
            startOnView
            className="text-white text-sm mt-[-10px]"
          >
            NETWORK
          </TypingAnimation>
        </div>
      </motion.div>
      <Ripple className="ripple-loading" />
    </div>
  );
}
