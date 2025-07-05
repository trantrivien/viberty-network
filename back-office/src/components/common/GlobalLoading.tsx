'use client'

import { useLoadingStore } from '@/stores/useLoadingStore';

export default function GlobalLoading() {
    const isLoading = useLoadingStore((state) => state.isLoading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 top-0 left-0 bg-black bg-opacity-10 z-[100] flex items-center justify-center opacity-[0.8]">
      <div className="text-white">Loading...</div>
    </div>
  );
}
