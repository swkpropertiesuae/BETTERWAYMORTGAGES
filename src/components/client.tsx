'use client';
// Small interactive pieces used by server pages, interconnected with Betterway OS.
import { useMemo, useState, type ReactNode } from 'react';
import { MessageCircle, CalendarClock, CheckCircle2, ArrowRight } from 'lucide-react';
import { waLink, SITE } from '@/data/site';
import { submitWebsiteLeadToOs } from '@/lib/os-interconnect';

/** Live slot picker: next working-hour slots from now (GST), synced to Betterway OS. */
export function SlotPicker() {
  const slots = useMemo(() => {
    const out: { label: string; iso: string }[] = [];
    const now = new Date();
    const gst = new Date(now.getTime() + (now.getTimezoneOffset() + 240) * 60000);
    const d = new Date(gst);
    d.setMinutes(d.getMinutes() < 30 ? 30 : 60, 0, 0);
    while (out.length < 6) {
      d.setMinutes(d.getMinutes() + 30);
      const h = d.getHours();
      if (d.getDay() === 0 || h < 9 || h >= 19) {
        if (h >= 19 || d.getDay() === 0) {
          d.setDate(d.getDate() + 1);
        }
        d.setHours(8, 30, 0, 0);
        continue;
      }
      const day = d.toDateString() === gst.toDateString() ? 'Today' : d.toLocaleDateString('en-GB', { weekday: 'short' });
      out.push({ label: `${day} ${d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`, iso: d.toISOString() });
    }
    return out;
  }, []);
  const [pick, setPick] = useState<string | null>(null);
  return (
    <div className="card">
      <p className="flex items-center gap-2 font-semibold text-navy">
        <CalendarClock size={18} className="text-teal" /> Request a consultation (GST)
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {slots.map((s) => (
          <button key={s.iso} type="button" className={`chip ${pick === s.label ? 'chip-on' : ''}`} onClick={() => setPick(s.label)}>
            {s.label}
          </button>
        ))}
      </div>
      <p className="mt-3 text-xs text-slate">Choose a preferred time. An advisor will confirm availability.</p>
      <a
        href={waLink(`Hi Betterway, I'd like to book ${pick ?? 'a suitable consultation time'} at Al Nasr Plaza.`)}
        rel="noopener"
        className="btn btn-primary mt-5 w-full"
      >
        <MessageCircle size={16} /> {pick ? `Request ${pick}` : 'Request a time'}
      </a>
    </div>
  );
}

/** Lead form: submits directly to Betterway OS (/api/os/leads) and provides an instant reference code + email/WhatsApp handoff. */
export function LeadForm({ topic = 'Mortgage enquiry' }: { topic?: string }) {
  const [f, setF] = useState({
    name: '',
    phone: '',
    email: '',
    residency: 'Expat resident',
    goal: 'Buy a ready home',
    price: '',
  });
  const [busy, setBusy] = useState(false);
  const [synced, setSynced] = useState<{
    referenceCode: string;
    assignedAdvisor?: { name: string; designation: string };
    osPortalUrl: string;
  } | null>(null);

  const msg = `${topic}\nName: ${f.name}\nPhone: ${f.phone}\nEmail: ${f.email || 'TBC'}\nResidency: ${f.residency}\nGoal: ${f.goal}\nProperty value: ${f.price || 'TBC'}`;
  const field = 'mt-1.5 w-full rounded-btn border border-line bg-white px-3.5 py-3 text-[15px] text-ink outline-none focus:border-teal';

  if (synced) {
    return (
      <div className="card space-y-4">
        <div className="flex items-center gap-2.5 text-navy">
          <CheckCircle2 size={22} className="text-teal shrink-0" />
          <div>
            <p className="font-semibold text-base text-navy">Enquiry registered in Betterway OS</p>
            <p className="num text-xs text-slate">Reference: {synced.referenceCode}</p>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-slate">
          Your mortgage profile has been routed to our Dubai advisory desk
          {synced.assignedAdvisor ? ` (${synced.assignedAdvisor.name})` : ''}. You can also open the Client Portal or send a copy via email.
        </p>
        <div className="flex flex-wrap gap-3 pt-1">
          <a href={synced.osPortalUrl} className="btn btn-primary">
            Open Betterway OS Portal <ArrowRight size={15} />
          </a>
          <a
            href={`mailto:${SITE.email}?subject=${encodeURIComponent(`${topic} (${synced.referenceCode})`)}&body=${encodeURIComponent(msg)}`}
            className="btn btn-ghost"
          >
            Open email copy
          </a>
        </div>
        <button
          type="button"
          onClick={() => setSynced(null)}
          className="text-xs text-slate underline hover:text-navy"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      className="card grid gap-4"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        try {
          const res = await submitWebsiteLeadToOs({
            ...f,
            topic,
            sourcePage: typeof window !== 'undefined' ? window.location.pathname : '/contact',
          });
          setSynced(res);
        } finally {
          setBusy(false);
        }
      }}
    >
      <label className="text-sm font-medium text-navy">
        Full name
        <input required autoComplete="name" className={field} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-navy">
          Mobile number
          <input required type="tel" autoComplete="tel" inputMode="tel" className={field} value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} />
        </label>
        <label className="text-sm font-medium text-navy">
          Email address
          <input type="email" autoComplete="email" className={field} value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-navy">
          Residency
          <select className={field} value={f.residency} onChange={(e) => setF({ ...f, residency: e.target.value })}>
            {['Expat resident', 'UAE National', 'GCC National', 'Non-resident'].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium text-navy">
          Goal
          <select className={field} value={f.goal} onChange={(e) => setF({ ...f, goal: e.target.value })}>
            {['Buy a ready home', 'Off-plan handover', 'Switch bank', 'Equity release', 'Commercial'].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="text-sm font-medium text-navy">
        Approximate property value (AED)
        <input inputMode="numeric" className={field} value={f.price} onChange={(e) => setF({ ...f, price: e.target.value })} />
      </label>
      <button type="submit" disabled={busy} className="btn btn-primary">
        {busy ? 'Syncing with Betterway OS…' : 'Submit to Betterway OS'}
      </button>
      <p className="text-xs text-slate">
        Routes directly to Betterway OS CRM under UAE PDPL consent, or{' '}
        <a className="text-teal underline" href={`mailto:${SITE.email}?subject=${encodeURIComponent(topic)}&body=${encodeURIComponent(msg)}`}>
          open email draft
        </a>
        .
      </p>
    </form>
  );
}

/** Generic filter: renders children groups by tag. */
export function Filter({ items, tags }: { items: { tags: string[]; node: ReactNode }[]; tags: string[] }) {
  const [t, setT] = useState('All');
  return (
    <>
      <div className="mb-6 flex flex-wrap gap-2" role="toolbar" aria-label="Filter">
        {['All', ...tags].map((x) => (
          <button key={x} type="button" aria-pressed={t === x} className={`chip ${t === x ? 'chip-on' : ''}`} onClick={() => setT(x)}>
            {x}
          </button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">{items.filter((i) => t === 'All' || i.tags.includes(t)).map((i) => i.node)}</div>
    </>
  );
}
