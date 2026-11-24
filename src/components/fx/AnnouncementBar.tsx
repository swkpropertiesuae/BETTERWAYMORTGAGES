'use client';
// Adapted from 21st.dev "Announcement Banner" (cnippet-dev/announcement-banner): dismissible bar with icon,
// message and call to action. Rotates brand messages with a motion cross-fade; dismissal is remembered per session.
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Megaphone, X } from 'lucide-react';

export type Announcement = { text: string; cta: string; href: string };
const KEY = 'bw-announce-dismissed';

export default function AnnouncementBar({ items, closeLabel = 'Dismiss announcement' }: { items: Announcement[]; closeLabel?: string }) {
  const [open, setOpen] = useState(false);
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => { try { setOpen(sessionStorage.getItem(KEY) !== '1'); } catch { setOpen(true); } }, []);
  useEffect(() => {
    if (!open || reduce || items.length < 2) return;
    const t = setInterval(() => setI((n) => (n + 1) % items.length), 5000);
    return () => clearInterval(t);
  }, [open, reduce, items.length]);
  const close = () => { setOpen(false); try { sessionStorage.setItem(KEY, '1'); } catch { /* storage blocked */ } };
  const a = items[i];
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div className="hm-announce" role="region" aria-label="Announcement" initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: reduce ? 0 : 0.3 }}>
          <div className="hm-announce__inner">
            <Megaphone size={15} aria-hidden="true" className="hm-announce__icon" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.p key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: reduce ? 0 : 0.35 }}>
                <span>{a.text}</span>
                <Link href={a.href}>{a.cta}<ArrowRight size={13} aria-hidden="true" /></Link>
              </motion.p>
            </AnimatePresence>
            <button type="button" onClick={close} aria-label={closeLabel}><X size={15} /></button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
