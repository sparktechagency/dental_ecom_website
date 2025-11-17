"use client";
import { useEffect, useRef, useState } from "react";

const CountUp = ({ endValue, finalText, speed = 50 }) => {
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

    const timer = setInterval(() => {
      start += Math.ceil(endValue / 50);
      if (start >= endValue) {
        clearInterval(timer);
        setShowFinal(true);
      } else {
        setCount(start);
      }
    }, speed);
  };

  return (
    <div ref={ref}>
      <p className="text-6xl font-bold">
        {showFinal ? finalText : count}
      </p>
    </div>
  );
};

export default CountUp;
