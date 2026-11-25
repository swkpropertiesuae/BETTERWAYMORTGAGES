'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { X } from 'lucide-react';
import { SPRING_SNAPPY } from '@/components/ui/MotionPrimitives';

export default function DisclosureToast() {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem('bw-toast') === '0';
    } catch {}
    if (dismissed) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const onScroll = () => {
      if (window.scrollY > 520) {
        setShow(true);
        window.removeEventListener('scroll', onScroll);
        timer = setTimeout(() => {
          setShow(false);
          try {
            sessionStorage.setItem('bw-toast', '0');
          } catch {}
        }, 7000);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (timer) clearTimeout(timer);
    };
  }, []);

  const dismiss = () => {
    setShow(false);
    try {
      sessionStorage.setItem('bw-toast', '0');
    } catch {}
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="bw-disclosure-toast"
          initial={reduce ? false : { opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? undefined : { opacity: 0, y: 18, scale: 0.96 }}
          transition={reduce ? { duration: 0 } : SPRING_SNAPPY}
          className="bw-toast"
          role="note"
          aria-label="Regulatory notice"
        >
          <img
            src="/brand/icon.png"
            alt=""
            width={24}
            height={24}
            className="mt-0.5 h-6 w-6 shrink-0 object-contain"
          />
          <p>
            Betterway Mortgages is a mortgage adviser, not a bank. Lending decisions, rates and final offers are made by
            the lender.
          </p>
          <button type="button" onClick={dismiss} aria-label="Dismiss notice" className="rounded-full p-1 transition hover:bg-white/10">
            <X size={15} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
