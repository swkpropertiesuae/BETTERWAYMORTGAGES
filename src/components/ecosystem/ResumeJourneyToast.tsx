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
import { SPRING_INSTITUTIONAL } from '@/components/ui/MotionPrimitives';

/**
 * Contextual Swiss resume banner — renders ONLY when a visitor leaves /get-started mid-flow (steps 1–4).
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
  const r = 17;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct / 100);

  return (
    <AnimatePresence>
      <motion.div
        key="bw-resume-toast"
        initial={reduce ? false : { opacity: 0, y: 18, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? undefined : { opacity: 0, y: 14, scale: 0.97 }}
        transition={reduce ? { duration: 0 } : SPRING_INSTITUTIONAL}
        className="holo-resume-toast"
        role="region"
        aria-label="Resume mortgage readiness check"
      >
        <div className="relative grid h-10 w-10 shrink-0 place-items-center">
          <svg className="-rotate-90 h-10 w-10" viewBox="0 0 42 42" aria-hidden="true">
            <circle cx="21" cy="21" r={r} fill="none" stroke="#e3e7ee" strokeWidth="3" />
            <circle
              cx="21"
              cy="21"
              r={r}
              fill="none"
              stroke="#0e6954"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={offset}
            />
          </svg>
          <span className="num absolute text-[9.5px] font-bold text-[#070e1a]">{pct}%</span>
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-xs font-bold text-[#070e1a]">Resume Mortgage Dossier</p>
          <p className="truncate text-[11px] text-[#4a5568]">Step {saved.step + 1} of 6 saved</p>
        </div>

        <Link
          href={`/get-started?q=${saved.step}`}
          aria-label="Continue mortgage readiness wizard"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-[#070e1a] text-white transition hover:bg-[#0e6954]"
        >
          <ArrowRight size={15} />
        </Link>

        <button
          type="button"
          aria-label="Dismiss saved progress"
          onClick={() => {
            setDismissed(true);
            clearSavedJourney();
          }}
          className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-[#4a5568] transition hover:bg-[#f7f8fa] hover:text-[#070e1a] cursor-pointer"
        >
          <X size={14} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
