"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBolt, FaBullseye, FaUsers, FaWallet } from "react-icons/fa";

const navItems = [
  { path: "/home", icon: FaBolt, label: "Mine" },
  { path: "/shop", icon: FaWallet, label: "Shop" },
  { path: "/game", icon: FaBullseye, label: "Game" },
  { path: "/friends", icon: FaUsers, label: "Friends" },
];

const BottomNav = () => {
  const pathname = usePathname();

  return (
    <motion.div
      className="fixed top-0 p-3 flex flex-row justify-between items-center header z-100 min-w-[375px]"
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeIn" }}
    >
      <div className="bottom_nav fixed bottom-0 border-t border-primary/20 shadow-lg safe-area-bottom z-50">
        <nav className="fixed bottom-0 left-0 right-0  bg-white border-t shadow-md rounded-t-2xl px-2 z-50">
          <ul className="flex justify-around items-center h-16">
            {navItems.map(({ path, icon: Icon, label }) => {
              const isActive = pathname.startsWith(path);
              return (
                <li className={isActive ? "active" : ""} key={path}>
                  <Link
                    href={path}
                    className="flex flex-col items-center justify-center text-sm"
                  >
                    <Icon />
                    <span>{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </motion.div>
  );
};

export default BottomNav;
