'use client';
// Adapted from 21st.dev "Modal" (ddoemonn/modal): portal dialog with focus trap, scroll lock, Escape and backdrop
// dismissal, spring entrance. Rendered in place at the end of <body> instead of a portal. Shown once per session after a delay or on desktop exit intent.
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, X } from 'lucide-react';

const KEY = 'bw-popup-seen';
const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),[tabindex]:not([tabindex="-1"])';

export type LeadPopupCopy = { label: string; title: string; body: string; points: string[]; cta: string; ctaHref: string; secondary: string; secondaryHref: string; close: string; note: string };

export default function LeadPopup({ copy, delayMs = 25000 }: { copy: LeadPopupCopy; delayMs?: number }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const id = useId();

  const show = useCallback(() => {
    try { if (sessionStorage.getItem(KEY) === '1') return; sessionStorage.setItem(KEY, '1'); } catch { /* storage blocked: still show once */ }
    setOpen(true);
  }, []);

  useEffect(() => {
    setMounted(true);
    const t = setTimeout(show, delayMs);
    const since = Date.now();
    const exit = (e: MouseEvent) => { if (!e.relatedTarget && e.clientY <= 0 && window.innerWidth >= 1024 && Date.now() - since > 8000) show(); };
    document.addEventListener('mouseout', exit);
    return () => { clearTimeout(t); document.removeEventListener('mouseout', exit); };
  }, [show, delayMs]);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const first = panel.current?.querySelector<HTMLElement>(FOCUSABLE);
    (first ?? panel.current)?.focus({ preventScroll: true });
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key !== 'Tab' || !panel.current) return;
      const items = Array.from(panel.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!items.length) return;
      const [a, z] = [items[0], items[items.length - 1]];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    };
    document.addEventListener('keydown', key);
    return () => { document.body.style.overflow = overflow; document.removeEventListener('keydown', key); prev?.focus?.({ preventScroll: true }); };
  }, [open]);

  if (!mounted) return null;
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="hm-pop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.2 }} onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${id}-t`}
            tabIndex={-1}
            className="hm-pop__panel"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 8 }}
            transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }}
          >
            <div className="hm-pop__media"><img src="/images/keys-handover-1536.webp" alt="" width={1536} height={864} /></div>
            <div className="hm-pop__body">
              <button type="button" className="hm-pop__x" onClick={() => setOpen(false)} aria-label={copy.close}><X size={16} /></button>
              <span className="hm-label">{copy.label}</span>
              <h2 id={`${id}-t`}>{copy.title}</h2>
              <p>{copy.body}</p>
              <ul>{copy.points.map((p) => <li key={p}>{p}</li>)}</ul>
              <div className="hm-pop__actions">
                <a href={copy.ctaHref} className="hm-btn" rel="noopener">{copy.cta}<span className="hm-btn__tile" aria-hidden="true"><ArrowRight size={16} /></span></a>
                <a href={copy.secondaryHref} className="hm-btn hm-btn--ghost">{copy.secondary}</a>
              </div>
              <small>{copy.note}</small>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
