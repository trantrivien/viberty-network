"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "react-hot-toast";

import { QueryClient } from "@tanstack/react-query";

import "@/styles/globals.css";
import { usePathname } from "next/navigation";
import { ThirdwebProvider } from "thirdweb/react";
import BottomNav from "../components/BottomNav";

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
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <title>Viberty Network</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body className="font-orbitron">
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
