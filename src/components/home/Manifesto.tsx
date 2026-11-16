'use client';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';

function Word({ w, p, a, b }: { w: string; p: MotionValue<number>; a: number; b: number }) {
  const o = useTransform(p, [a, b], [0.14, 1]);
  return <motion.span style={{ opacity: o }}>{w} </motion.span>;
}

/* Statement that fills in word by word as you scroll (agency-template manifesto). */
export default function Manifesto({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 55%'] });
  const words = text.split(' ');
  return (
    <p ref={ref} className="bw-manifesto" aria-label={text}>
      {words.map((w, i) =>
        reduce ? <span key={i}>{w} </span> : <Word key={i} w={w} p={scrollYProgress} a={i / words.length} b={Math.min(1, (i + 1.5) / words.length)} />,
      )}
    </p>
  );
}
