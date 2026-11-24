'use client';
// Adapted from 21st.dev "Hero Video Dialog" (dillionverma/hero-video-dialog): poster with an animated play
// button that opens a spring-animated lightbox. Plays a self-hosted MP4 instead of an iframe.
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Play, X } from 'lucide-react';

export default function VideoDialog({ src, poster, alt, label, closeLabel = 'Close video', caption }: { src: string; poster: string; alt: string; label: string; closeLabel?: string; caption?: string }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, [open]);
  return (
    <div className="hm-video">
      <button type="button" className="hm-video__thumb" onClick={() => setOpen(true)} aria-label={label}>
        <img src={poster} alt={alt} width={1920} height={1080} loading="lazy" />
        <span className="hm-video__play" aria-hidden="true"><span><Play size={26} fill="currentColor" /></span></span>
        {caption && <span className="hm-video__caption">{caption}</span>}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div className="hm-video__overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} role="dialog" aria-modal="true" aria-label={label}>
            <motion.div
              className="hm-video__frame"
              initial={reduce ? { opacity: 0 } : { scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { scale: 0.6, opacity: 0 }}
              transition={reduce ? { duration: 0 } : { type: 'spring', damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button type="button" className="hm-video__close" onClick={() => setOpen(false)} aria-label={closeLabel}><X size={18} /></button>
              <video src={src} poster={poster} controls autoPlay muted playsInline loop />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
