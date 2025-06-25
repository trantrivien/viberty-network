
export default function GameLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="w-full h-full bg-black overflow-hidden">
        {children}
      </div>
    );
  }
  