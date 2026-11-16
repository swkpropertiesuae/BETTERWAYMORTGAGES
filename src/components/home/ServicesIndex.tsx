'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export type ServiceItem = {
  tag: string; name: string; body: string; href: string;
  img: string; srcSet: string; alt: string; w: number; h: number;
  facts: readonly (readonly [string, string])[];
};

/* Numbered index of mortgage routes; the preview image follows the active row (agency-template services index). */
export default function ServicesIndex({ items }: { items: ServiceItem[] }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const cur = items[active];
  return (
    <div className="bw-svc">
      <ol className="bw-svc__list">
        {items.map((s, i) => (
          <li key={s.name} className={i === active ? 'is-active' : ''} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}>
            <Link href={s.href} className="bw-svc__row">
              <span className="bw-index">0{i + 1}</span>
              <span className="bw-svc__title">{s.name}</span>
              <span className="bw-svc__tag">{s.tag}</span>
              <ArrowUpRight size={20} className="bw-svc__arrow" aria-hidden="true" />
            </Link>
            <div className="bw-svc__more"><div>
              <p>{s.body}</p>
              <dl>{s.facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
            </div></div>
          </li>
        ))}
      </ol>
      <div className="bw-svc__preview bw-window" aria-hidden="true">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={cur.img}
            src={cur.img} srcSet={cur.srcSet} sizes="(min-width: 960px) 40vw, 100vw" alt="" width={cur.w} height={cur.h}
            initial={reduce ? false : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}
