import { cn } from "@/lib/utils";
import * as React from "react";

export const Logo = ({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
    width={50}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 29.27 25.53"
  >
    <defs>
      <radialGradient
        id="radial-gradient"
        cx="14.63"
        cy="12.77"
        fx="14.63"
        fy="12.77"
        r="13.73"
        gradientTransform="translate(25.93 -7.58) rotate(68.01) scale(1 1.42)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#fff33b" />
        <stop offset=".04" stopColor="#fee62d" />
        <stop offset=".12" stopColor="#fdd51b" />
        <stop offset=".2" stopColor="#fdca0f" />
        <stop offset=".29" stopColor="#fdc70c" />
        <stop offset="1" stopColor="#fbb041" />
        <stop offset="1" stopColor="#f3903f" />
      </radialGradient>
      <style>
        {`
          .cls-1 {
            fill: url(#radial-gradient);
          }
        `}
      </style>
    </defs>
    <g data-name="Layer 1">
      <path
        className="cls-1"
        d="m29.17,1.05l-2.25,3.9-8.53,14.76-.91,1.58-1.94,3.37-.3.53c-.27.47-.94.47-1.21,0l-2.25-3.9L2.34,4.95.1,1.05C-.17.58.16,0,.7,0h4.09c.25,0,.48.13.61.35l2.65,4.59,5.97,10.34c.27.47.94.47,1.21,0l.31-.53,5.06-8.77c.27-.47-.07-1.05-.61-1.05h-9.72c-.25,0-.48-.13-.61-.35l-2.05-3.55c-.27-.47.07-1.05.61-1.05h20.34c.54,0,.88.58.61,1.05Z"
      />
    </g>
  </svg>
  );
};
