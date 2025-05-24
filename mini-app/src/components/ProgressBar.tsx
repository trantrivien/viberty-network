import { useMiningStore } from '@/store/useMiningStore';
import { useEffect, useState } from 'react';

export default function ProgressBar() {
  const { endTime } = useMiningStore();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!endTime) return;

    const interval = setInterval(() => {
      const total = 24 * 60 * 60 * 1000;
      const now = Date.now();
      const end = new Date(endTime).getTime();
      const passed = total - (end - now);
      const percent = Math.min((passed / total) * 100, 100);
      setProgress(percent);
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);
  
  return (
    <div className="w-full !h-[12px] bg-secondary/50 rounded-full overflow-hidden neon-border border-2">
    <div style={{ width: `${progress}%`,}} className={`h-full progress-bar`}></div>
  </div>
  );
}
