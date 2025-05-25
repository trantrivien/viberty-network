import { cn } from "@/lib/utils";
import * as React from "react";
import LogoMain from 'public/logo-main.png'
import Image, { StaticImageData } from "next/image";

export const LogoLg = ({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <div className="svg-container">
       <Image
          className="relative h-full w-auto object-contain"
          src={LogoMain}
          alt={'logo main'}
        />
    </div>
  );
};
