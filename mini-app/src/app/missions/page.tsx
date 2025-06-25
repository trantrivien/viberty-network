"use client";

import AuthGuard from "@/components/AuthGuard";
import VibertyLogo from "@/components/icons/VibertyLogo";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { Globe } from "@/components/magicui/globe";
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";

export default function MissionsPage() {
  return (
    <AuthGuard>
      <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6 flex flex-col items-center">
        <VelocityScroll>Coming Soon</VelocityScroll>
        <Globe className="top-28 z-10 " />
        <div className="z-100 w-[100px] absolute top-[250px] !drop-shadow-lg">
          <VibertyLogo />
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
