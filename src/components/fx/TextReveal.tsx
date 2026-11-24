'use client';
// Adapted from 21st.dev "Text Reveal" (ddoemonn/text-reveal): staggered blur-and-slide word reveal on scroll.
// Restyled to inherit brand typography; reduced motion renders the text instantly.
import { Fragment, useMemo, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';

const EASE = [0.23, 1, 0.32, 1] as const;
const HIDDEN = { opacity: 0, y: 12, filter: 'blur(8px)' } as const;
const SHOWN = { opacity: 1, y: 0, filter: 'blur(0px)' } as const;

export default function TextReveal({ text, className = '', stagger = 0.05, delay = 0 }: { text: string; className?: string; stagger?: number; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const words = useMemo(() => text.trim().split(/\s+/), [text]);
  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <Fragment key={i}>
            {i > 0 && ' '}
            <motion.span
              className="inline-block"
              initial={reduced ? false : HIDDEN}
              animate={inView || reduced ? SHOWN : HIDDEN}
              transition={reduced ? { duration: 0 } : { duration: 0.6, ease: EASE, delay: delay + i * stagger }}
            >
              {w}
            </motion.span>
          </Fragment>
        ))}
      </span>
    </span>
  );
}
