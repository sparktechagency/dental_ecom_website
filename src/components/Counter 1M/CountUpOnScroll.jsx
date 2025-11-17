"use client";
import { useEffect, useRef, useState } from "react";

const CountUpToMillion = () => {
  const [count, setCount] = useState(0);
  const [showFinal, setShowFinal] = useState(false);
  const ref = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          startCounting();
        }
      },
      { threshold: 0.6 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  const startCounting = () => {
    let start = 0;
    const end = 1000000;
    const duration = 2000;
    const step = 10000;

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        clearInterval(timer);
        setShowFinal(true); 
      } else {
        setCount(start);
      }
    }, duration / (end / step));
  };

  return (
    <div ref={ref}>
      <p className="text-6xl font-bold">
        {showFinal ? "1M+" : count.toLocaleString()}
      </p>
    </div>
  );
};

export default CountUpToMillion;
