"use client";

import ScreenLoading from "@/components/ScreenLoading";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ConnectButton,
  useConnectedWallets,
  useActiveWallet,
} from "thirdweb/react";
import { client } from "./client";
import { motion } from "framer-motion";

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

  useEffect(() => {
    if (wallet?.id) {
      router.push("/home");
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
