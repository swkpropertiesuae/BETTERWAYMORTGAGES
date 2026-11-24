'use client';
// Adapted from 21st.dev "Framer Carousel" (uilayout.contact/framer-carousel): spring-animated slide track with
// prev/next buttons and a pill progress indicator. Adds autoplay (paused on hover/focus and under reduced motion),
// swipe/drag, captions and RTL support.
import { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type Slide = { src: string; srcSet?: string; alt: string; title: string; text?: string };

export default function PhotoCarousel({ slides, label, prev = 'Previous slide', next = 'Next slide', rtl = false }: { slides: Slide[]; label: string; prev?: string; next?: string; rtl?: boolean }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const start = useRef(0);
  const x = useMotionValue(0);
  const reduce = useReducedMotion();
  const dir = rtl ? 1 : -1;
  const last = slides.length - 1;

  useEffect(() => {
    const w = box.current?.offsetWidth || 1;
    const c = animate(x, dir * index * w, reduce ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 32 });
    return () => c.stop();
  }, [index, x, dir, reduce]);

  useEffect(() => {
    if (paused || reduce) return;
    const t = setInterval(() => setIndex((i) => (i >= last ? 0 : i + 1)), 5200);
    return () => clearInterval(t);
  }, [paused, reduce, last]);

  const go = (i: number) => setIndex(Math.max(0, Math.min(last, i)));
  return (
    <section className="hm-carousel" aria-roledescription="carousel" aria-label={label} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div className="hm-carousel__view" ref={box}>
        <motion.div
          className="hm-carousel__track"
          style={{ x }}
          onPointerDown={(e) => { start.current = e.clientX; }}
          onPointerUp={(e) => { const d = e.clientX - start.current; if (Math.abs(d) > 50) go(index + (d < 0 ? -dir : dir)); }}
        >
          {slides.map((s, i) => (
            <figure key={s.src} className="hm-carousel__slide" role="group" aria-roledescription="slide" aria-label={`${i + 1} / ${slides.length}`} aria-hidden={i !== index}>
              <img src={s.src} srcSet={s.srcSet} sizes="(min-width: 1300px) 1200px, 100vw" alt={s.alt} draggable={false} loading={i === 0 ? 'eager' : 'lazy'} />
              <figcaption><b>{s.title}</b>{s.text && <span>{s.text}</span>}</figcaption>
            </figure>
          ))}
        </motion.div>
        <button type="button" className="hm-carousel__nav hm-carousel__nav--prev" onClick={() => go(index - 1)} disabled={index === 0} aria-label={prev}>{rtl ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}</button>
        <button type="button" className="hm-carousel__nav hm-carousel__nav--next" onClick={() => go(index + 1)} disabled={index === last} aria-label={next}>{rtl ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}</button>
        <div className="hm-carousel__dots">
          {slides.map((s, i) => <button key={s.src} type="button" aria-label={`${i + 1}: ${s.title}`} aria-current={i === index} onClick={() => go(i)} />)}
        </div>
      </div>
    </section>
  );
}
