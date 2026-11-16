'use client';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

/* Page-wide wordmark that rises into place as the page ends (both templates' footer wordmark). */
export default function Wordmark({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end 70%'] });
  const y = useTransform(scrollYProgress, [0, 1], ['45%', '0%']);
  return (
    <div ref={ref} className="bw-wordmark" aria-hidden="true">
      <motion.span style={reduce ? undefined : { y }}>{text}</motion.span>
    </div>
  );
}
