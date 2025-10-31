"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function TopProgress() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    // Trigger progress on path change
    setActive(true);
    setKey((k) => k + 1); // restart animation
    const done = setTimeout(() => setActive(false), 600); // auto-complete
    return () => clearTimeout(done);
  }, [pathname]);

  return (
    <div className="pointer-events-none fixed top-0 left-0 right-0 z-[9999] h-0">
      <div
        key={key}
        className={`h-1 bg-[#136BFB] shadow-[0_0_10px_#136BFB] origin-left ${
          active ? "animate-[progress_0.6s_ease-out_forwards]" : "w-0"
        }`}
        style={{ borderRadius: 2 }}
      />
      <style jsx global>{`
        @keyframes progress {
          0% { width: 0%; opacity: 1; }
          80% { width: 85%; opacity: 1; }
          100% { width: 100%; opacity: 1; }
        }
      `}</style>
    </div>
  );
}
