"use client";

import ScreenLoading from "@/components/ScreenLoading";

import { connectUser } from "@/lib/services/authService";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ConnectButton, useActiveWallet } from "thirdweb/react";
import { client } from "./client";

export default function Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const wallet = useActiveWallet();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  const login = async () => {
    const address = wallet?.getAccount()?.address ?? "";
    const chainId = wallet?.getChain()?.id;
    if (!address || !chainId) throw new Error("Wallet not connected");
    await connectUser(address, chainId)
      .then((res) => {
        router.push('/home');
        console.log("✅ Logged in as:", res.user.username);
      })
      .catch((err) => {
        console.error("❌ Connect failed:", err.message);
      });
  };

  useEffect(() => {
    if (wallet?.getAccount()?.address) {
      login();
    }
  }, [wallet?.id]);
  return (
    <div>
      <ScreenLoading />
      {!isLoading && (
        <div className="btn_connect">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <ConnectButton
              client={client}
              theme="dark"
              connectButton={{
                label: "Sign in to VIBERTY",
                className: "custom_btn_connect",
              }}
              autoConnect
              connectModal={{
                title: "Sign in to VIBERTY",
                titleIcon: "/assets/images/main_logo.png",
                size: "compact",
              }}
            />
          </motion.div>
        </div>
      )}
    </div>
  );
}
