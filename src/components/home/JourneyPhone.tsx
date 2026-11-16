'use client';
import { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';

export type Step = { title: string; body: string; screen: { head: string; rows: readonly (readonly [string, string])[] } };

/* Steps on the left light up at mid-screen; the sticky phone on the right shows that step (app-template call phone). */
export default function JourneyPhone({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset.i))),
      { rootMargin: '-45% 0px -45% 0px' },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const s = steps[active].screen;
  return (
    <div className="bw-jp">
      <ol className="bw-jp__list">
        {steps.map((st, i) => (
          <li key={st.title} data-i={i} ref={(el) => { refs.current[i] = el; }} className={i === active ? 'is-active' : ''}>
            <span className="bw-index">0{i + 1}</span>
            <h3>{st.title}</h3>
            <p>{st.body}</p>
          </li>
        ))}
      </ol>
      <div className="bw-jp__stick" aria-hidden="true">
        <div className="bw-phone">
          <div className="bw-phone__notch" />
          <div className="bw-phone__screen">
            <div className="bw-phone__bar"><span>Step 0{active + 1} of {steps.length}</span><i style={{ width: `${((active + 1) / steps.length) * 100}%` }} /></div>
            <h4 key={active}>{s.head}</h4>
            <ul key={`r${active}`}>
              {s.rows.map(([k, v], i) => (
                <li key={k} style={{ ['--i' as string]: i }}><Check size={14} /><span>{k}</span><b>{v}</b></li>
              ))}
            </ul>
            <p className="bw-phone__foot">Indicative guide. Your bank’s written offer is binding.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
