import snapshot from '@/data/eibor-snapshot.json';

/** Server-rendered SVG line chart of verified CBUAE 1M / 3M / 6M EIBOR history. */
export default function EiborChart() {
  const rows = snapshot.history.slice(-20);
  const W = 760;
  const H = 280;
  const P = { l: 44, r: 16, t: 16, b: 32 };
  const all = rows.flatMap((d) => [d.oneMonth, d.threeMonth, d.sixMonth]);
  const min = Math.floor(Math.min(...all) * 10) / 10 - 0.05;
  const max = Math.ceil(Math.max(...all) * 10) / 10;
  const x = (i: number) => P.l + (i * (W - P.l - P.r)) / Math.max(1, rows.length - 1);
  const y = (v: number) => P.t + ((max - v) * (H - P.t - P.b)) / Math.max(0.1, max - min);
  const line = (k: 'oneMonth' | 'threeMonth' | 'sixMonth') =>
    rows.map((d, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(d[k]).toFixed(1)}`).join('');
  const series = [
    { k: 'threeMonth' as const, name: '3M EIBOR', cls: 'stroke-teal', w: 3 },
    { k: 'sixMonth' as const, name: '6M EIBOR', cls: 'stroke-navy', w: 1.75 },
    { k: 'oneMonth' as const, name: '1M EIBOR', cls: 'stroke-slate', w: 1.75 },
  ];
  const ticks = Array.from({ length: 5 }, (_, i) => min + ((max - min) * i) / 4);
  const last = rows[rows.length - 1];
  return (
    <figure className="rounded-card border border-line bg-white p-4 sm:p-6">
      <div className="mb-3 flex flex-wrap gap-4 text-sm">
        {series.map((s) => (
          <span key={s.k} className="flex items-center gap-2">
            <span className={`h-0.5 w-5 ${s.k === 'threeMonth' ? 'bg-teal' : s.k === 'sixMonth' ? 'bg-navy' : 'bg-slate'}`} />
            {s.name} <b className="num">{last[s.k].toFixed(2)}%</b>
          </span>
        ))}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={`Published CBUAE EIBOR snapshot to ${last.date}`}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={P.l} x2={W - P.r} y1={y(t)} y2={y(t)} className="stroke-line" />
            <text x={P.l - 8} y={y(t) + 4} textAnchor="end" className="fill-slate text-[11px]">
              {t.toFixed(2)}
            </text>
          </g>
        ))}
        {rows.map((d, i) => i % 5 === 0 && (
          <text key={d.date} x={x(i)} y={H - 10} textAnchor="middle" className="fill-slate text-[11px]">
            {d.date}
          </text>
        ))}
        {series.map((s) => (
          <path key={s.k} d={line(s.k)} fill="none" strokeWidth={s.w} strokeLinejoin="round" strokeLinecap="round" className={s.cls} />
        ))}
        <circle cx={x(rows.length - 1)} cy={y(last.threeMonth)} r={5} className="fill-teal" />
      </svg>
      <figcaption className="mt-2 text-xs text-slate">
        Published CBUAE EIBOR fixings through {last.date}. Public benchmark only, not a mortgage offer.
      </figcaption>
    </figure>
  );
}
