"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "react-hot-toast";

import { QueryClient } from "@tanstack/react-query";
import { Orbitron } from "next/font/google";

import BottomNav from "@/components/BottomNav";
import "@/styles/globals.css";
import { usePathname } from "next/navigation";
import { ThirdwebProvider } from "thirdweb/react";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  const pathname = usePathname();

  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body className={orbitron.className}>
        <ThirdwebProvider>
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
          <BottomNav />
          <Toaster position="top-center" reverseOrder={false} />
        </ThirdwebProvider>
      </body>
    </html>
  );
}
