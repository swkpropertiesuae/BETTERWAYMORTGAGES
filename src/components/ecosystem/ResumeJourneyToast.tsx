'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, X } from 'lucide-react';
import {
  buildJourneyDossier,
  clearSavedJourney,
  loadSavedJourney,
  type JourneyState,
} from '@/lib/journey';
import { SPRING_SNAPPY } from '@/components/ui/MotionPrimitives';

/**
 * Exact UseHolo persistent "Pick up where you left off" progress bar.
 * Appears automatically whenever a buyer has started /get-started and navigates away.
 */
export default function ResumeJourneyToast() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [saved, setSaved] = useState<JourneyState | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const sync = () => {
      const s = loadSavedJourney();
      setSaved(s && s.step >= 1 && s.step < 5 ? s : null);
    };
    sync();
    window.addEventListener('betterway:journey-updated', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('betterway:journey-updated', sync);
      window.removeEventListener('storage', sync);
    };
  }, [pathname]);

  if (pathname === '/get-started' || dismissed || !saved) return null;

  const dossier = buildJourneyDossier(saved);
  const pct = dossier.completionPct;
  const r = 18;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct / 100);

  return (
    <AnimatePresence>
      <motion.div
        key="holo-resume-toast"
        initial={reduce ? false : { opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? undefined : { opacity: 0, y: 18, scale: 0.96 }}
        transition={reduce ? { duration: 0 } : SPRING_SNAPPY}
        className="holo-resume-toast"
        role="region"
        aria-label="Resume mortgage readiness check"
      >
        {/* SVG Circular Progress Ring matching UseHolo */}
        <div className="relative grid h-11 w-11 shrink-0 place-items-center">
          <svg className="-rotate-90 h-11 w-11" viewBox="0 0 44 44" aria-hidden="true">
            <circle cx="22" cy="22" r={r} fill="none" stroke="#e5e7eb" strokeWidth="3.5" />
            <circle
              cx="22"
              cy="22"
              r={r}
              fill="none"
              stroke="#179373"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={offset}
            />
          </svg>
          <span className="num absolute text-[10px] font-bold text-[#121217]">{pct}%</span>
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-sm font-bold text-[#121217]">Pick up where you left off</p>
          <p className="truncate text-xs text-[#6c6c89]">
            Your Betterway mortgage dossier is waiting (Step {saved.step + 1} of 6)
          </p>
        </div>

        <Link
          href={`/get-started?q=${saved.step}`}
          aria-label="Continue mortgage readiness wizard"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] bg-[#121217] text-white transition hover:bg-[#179373]"
        >
          <ArrowRight size={17} />
        </Link>

        <button
          type="button"
          aria-label="Dismiss saved progress"
          onClick={() => {
            setDismissed(true);
            clearSavedJourney();
          }}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[#6c6c89] transition hover:bg-[#f3f4f6] hover:text-[#121217] cursor-pointer"
        >
          <X size={15} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
