'use client';

import { useEffect, useRef } from 'react';

export default function GamePage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (!iframeRef.current || !token) return;

    const postToken = () => {
      iframeRef.current?.contentWindow?.postMessage(
        { type: 'SET_TOKEN', token },
        '*' // ⚠️ phải đúng domain game
      );
    };

    iframeRef.current.addEventListener('load', postToken);
    return () => iframeRef.current?.removeEventListener('load', postToken);
  }, [token]);

  return (
    <iframe
      ref={iframeRef}
      src="http://localhost:5173"
      className="w-screen h-screen border-none pb-[50px]"
      sandbox="allow-scripts allow-same-origin"
    />
  );
}
