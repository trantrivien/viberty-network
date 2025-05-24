import React from 'react';

const VibertyLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 366.63 319.8"
    {...props}
  >
    <defs>
      <radialGradient
        id="radial-gradient"
        cx="183.32"
        cy="159.9"
        fx="183.32"
        fy="159.9"
        r="172.01"
        gradientTransform="translate(324.87 -94.96) rotate(68.01) scale(1 1.42)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#fff33b" />
        <stop offset="0.04" stopColor="#fee62d" />
        <stop offset="0.12" stopColor="#fdd51b" />
        <stop offset="0.2" stopColor="#fdca0f" />
        <stop offset="0.29" stopColor="#fdc70c" />
        <stop offset="1" stopColor="#fbb041" />
        <stop offset="1" stopColor="#f3903f" />
      </radialGradient>
    </defs>
    <g>
      <path
        fill="url(#radial-gradient)"
        d="m365.44,13.12l-28.16,48.83-106.82,184.91-11.41,19.74-24.35,42.2-3.82,6.62c-3.38,5.83-11.8,5.83-15.18,0l-28.21-48.83L29.36,61.94,1.19,13.12C-2.19,7.28,2.02,0,8.78,0h51.28c3.11,0,6.01,1.67,7.59,4.39l33.21,57.56,74.84,129.55c3.38,5.83,11.8,5.83,15.14.04l3.86-6.62,63.39-109.81c3.38-5.83-.83-13.16-7.59-13.16h-121.74c-3.11,0-6.01-1.67-7.59-4.39l-25.66-44.44c-3.33-5.83.88-13.12,7.59-13.12h254.75c6.76,0,10.97,7.28,7.59,13.12Z"
      />
    </g>
  </svg>
);

export default VibertyLogo;
