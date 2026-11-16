'use client';
import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import { interpolateCount } from '@/lib/hero-showcase';

export default function StatCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState<number>(value);

  useEffect(() => {
    if (!inView || reduce) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    const duration = 880;
    const start = performance.now();
    setDisplay(0);

    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setDisplay(interpolateCount(value, progress));
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix ? <sup>{suffix}</sup> : null}
    </span>
  );
}
