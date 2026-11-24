'use client';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';

function Word({ w, em, p, a, b }: { w: string; em: boolean; p: MotionValue<number>; a: number; b: number }) {
  const o = useTransform(p, [a, b], [0.22, 1]);
  return (
    <motion.span style={{ opacity: o }}>
      {em ? <em>{w}</em> : w}{' '}
    </motion.span>
  );
}

/* Scroll-linked editorial manifesto statement supporting *italic bold* accents (matching Homy). */
export default function Manifesto({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 52%'] });

  const tokens = text.split(' ').map((raw) => {
    const m = raw.match(/^\*([^*]+)\*([.,!?:;]?)$/);
    if (m) return { w: m[1] + m[2], em: true };
    return { w: raw.replace(/\*/g, ''), em: false };
  });

  return (
    <p ref={ref} className="bw-manifesto" aria-label={text.replace(/\*/g, '')}>
      {tokens.map((t, i) =>
        reduce ? (
          <span key={i}>{t.em ? <em>{t.w}</em> : t.w} </span>
        ) : (
          <Word
            key={i}
            w={t.w}
            em={t.em}
            p={scrollYProgress}
            a={i / tokens.length}
            b={Math.min(1, (i + 1.8) / tokens.length)}
          />
        ),
      )}
    </p>
  );
}
