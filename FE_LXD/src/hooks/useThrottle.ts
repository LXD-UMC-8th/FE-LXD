import { useEffect, useState, useRef } from "react";

export function useThrottle<T>(value: T, interval: number): T {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRun = useRef(Date.now());
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const now = Date.now();
    const sinceLast = now - lastRun.current;

    if (sinceLast >= interval) {
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
      setThrottledValue(value);
      lastRun.current = now;
    } else if (!timer.current) {
      timer.current = setTimeout(() => {
        setThrottledValue(value);
        lastRun.current = Date.now();
        timer.current = null;
      }, interval - sinceLast);
    }

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
    };
  }, [value, interval]);

  return throttledValue;
}
