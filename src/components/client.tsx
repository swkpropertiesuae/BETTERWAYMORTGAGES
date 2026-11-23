'use client';
// Interactive conversion widgets used by server pages, interconnected with Betterway OS.
import { useEffect, useState, type ReactNode } from 'react';
import { AlertCircle, ArrowRight, CalendarClock, CheckCircle2, Mail } from 'lucide-react';
import { waLink, SITE } from '@/data/site';
import { submitWebsiteLeadToOs } from '@/lib/os-interconnect';

type GstSlot = { label: string; iso: string };

/** Compute upcoming working-hour slots strictly in Asia/Dubai (GST, UTC+4) on the client to prevent SSR hydration drift. */
function computeUpcomingGstSlots(): GstSlot[] {
  const out: GstSlot[] = [];
  const nowMs = Date.now();
  const gstOffsetMs = 4 * 60 * 60 * 1000;
  const cursor = new Date(nowMs + gstOffsetMs);
  cursor.setUTCMinutes(cursor.getUTCMinutes() < 30 ? 30 : 60, 0, 0);

  const todayKey = new Date(nowMs + gstOffsetMs).toISOString().slice(0, 10);
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  while (out.length < 6) {
    cursor.setUTCMinutes(cursor.getUTCMinutes() + 30);
    const h = cursor.getUTCHours();
    const dow = cursor.getUTCDay();
    if (dow === 0 || h < 9 || h >= 19) {
      if (h >= 19 || dow === 0) cursor.setUTCDate(cursor.getUTCDate() + 1);
      cursor.setUTCHours(8, 30, 0, 0);
      continue;
    }
    const dayKey = cursor.toISOString().slice(0, 10);
    const dayLabel = dayKey === todayKey ? 'Today' : weekdays[dow];
    const hour12 = h % 12 || 12;
    const ampm = h >= 12 ? 'PM' : 'AM';
    const min = String(cursor.getUTCMinutes()).padStart(2, '0');
    const trueUtcIso = new Date(cursor.getTime() - gstOffsetMs).toISOString();
    out.push({ label: `${dayLabel} ${hour12}:${min} ${ampm}`, iso: trueUtcIso });
  }
  return out;
}

/** Live consultation slot picker: computes Asia/Dubai working-hour slots client-side and submits directly to Betterway OS (/api/os/leads). */
export function SlotPicker() {
  const [slots, setSlots] = useState<GstSlot[]>([]);
  const [pick, setPick] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [busy, setBusy] = useState(false);
  const [booked, setBooked] = useState<{ syncedToOs: boolean; referenceCode: string; slot: string } | null>(null);

  useEffect(() => {
    const computed = computeUpcomingGstSlots();
    setSlots(computed);
    if (computed[0]) setPick(computed[0].label);
  }, []);

  const inputCls =
    'mt-1 w-full rounded-btn border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none focus:border-teal';

  if (booked) {
    const mailHref = waLink(`Hi Betterway, consultation request (${booked.referenceCode}) for ${booked.slot}. Name: ${name}, Phone: ${phone}.`);
    return (
      <div className="card space-y-4">
        <div className="flex items-start gap-2.5">
          {booked.syncedToOs ? (
            <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-teal" />
          ) : (
            <AlertCircle size={20} className="mt-0.5 shrink-0 text-warn" />
          )}
          <div>
            <p className="font-semibold text-navy">
              {booked.syncedToOs ? 'Consultation slot queued in Betterway OS' : 'Slot reference prepared — confirm via email'}
            </p>
            <p className="num text-xs text-slate">
              {booked.slot} GST · Ref: {booked.referenceCode}
            </p>
          </div>
        </div>
        <p className="text-xs leading-relaxed text-slate">
          {booked.syncedToOs
            ? 'A high-priority callback task has been created for our Dubai advisory desk.'
            : 'Our live OS intake could not be reached right now. Tap below to send your preferred slot directly to our desk.'}
        </p>
        <div className="flex flex-wrap gap-2">
          <a href={mailHref} rel="noopener" className="btn btn-primary !min-h-10 !py-2 text-xs">
            <Mail size={14} /> {booked.syncedToOs ? 'Send email copy' : 'Send slot via email'}
          </a>
          <button
            type="button"
            onClick={() => setBooked(null)}
            className="btn btn-ghost !min-h-10 !py-2 text-xs cursor-pointer"
          >
            Choose another time
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      className="card"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!name.trim() || !phone.trim()) return;
        setBusy(true);
        try {
          const chosen = pick ?? 'Next available GST slot';
          const res = await submitWebsiteLeadToOs({
            name,
            phone,
            topic: 'Consultation Slot Booking',
            preferredSlot: chosen,
            sourcePage: typeof window !== 'undefined' ? window.location.pathname : '/contact',
          });
          setBooked({ syncedToOs: res.syncedToOs, referenceCode: res.referenceCode, slot: chosen });
        } finally {
          setBusy(false);
        }
      }}
    >
      <p className="flex items-center gap-2 font-semibold text-navy">
        <CalendarClock size={18} className="text-teal" /> Request a consultation (GST)
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {slots.length === 0
          ? Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="h-9 animate-pulse rounded-full bg-mist" aria-hidden="true" />
            ))
          : slots.map((s) => (
              <button
                key={s.iso}
                type="button"
                aria-pressed={pick === s.label}
                className={`chip cursor-pointer ${pick === s.label ? 'chip-on' : ''}`}
                onClick={() => setPick(s.label)}
              >
                {s.label}
              </button>
            ))}
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="text-xs font-medium text-navy">
          Your name
          <input required autoComplete="name" className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
        </label>
        <label className="text-xs font-medium text-navy">
          Mobile number
          <input required type="tel" autoComplete="tel" className={inputCls} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+971 50 ..." />
        </label>
      </div>
      <p className="mt-3 text-xs text-slate">Choose a preferred GST time. An advisor confirms availability directly.</p>
      <button type="submit" disabled={busy} className="btn btn-primary mt-4 w-full cursor-pointer">
        <CalendarClock size={16} /> {busy ? 'Scheduling in Betterway OS…' : pick ? `Book ${pick}` : 'Request a time'}
      </button>
    </form>
  );
}

/** Lead form: submits directly to Betterway OS (/api/os/leads) with honest sync status, advisor/partner attribution & email fallback. */
export function LeadForm({
  topic = 'Mortgage enquiry',
  partnerMode = false,
}: {
  topic?: string;
  partnerMode?: boolean;
}) {
  const [f, setF] = useState({
    name: '',
    phone: '',
    email: '',
    residency: 'Expat resident',
    goal: 'Buy a ready home',
    price: '',
    agencyName: '',
    reraOrn: '',
    reraBrn: '',
  });
  const [partnerRef, setPartnerRef] = useState<string | undefined>(undefined);
  const [advisorNote, setAdvisorNote] = useState<string | undefined>(undefined);
  const [busy, setBusy] = useState(false);
  const [synced, setSynced] = useState<{
    syncedToOs: boolean;
    referenceCode: string;
    assignedAdvisor?: { name: string; designation: string };
    osPortalUrl: string;
  } | null>(null);

  useEffect(() => {
    try {
      const sp = new URLSearchParams(window.location.search);
      const ref = sp.get('ref') || sessionStorage.getItem('bw_partner_ref') || undefined;
      if (ref) {
        setPartnerRef(ref);
        sessionStorage.setItem('bw_partner_ref', ref);
      }
      const adv = sp.get('advisor') || undefined;
      if (adv) setAdvisorNote(adv);
    } catch {
      /* ignore */
    }
  }, []);

  const effectiveTopic = advisorNote ? `${topic} — Requested Specialist: ${advisorNote}` : topic;
  const msg = [
    effectiveTopic,
    `Name: ${f.name}`,
    `Phone: ${f.phone}`,
    `Email: ${f.email || 'TBC'}`,
    partnerMode ? `Agency: ${f.agencyName || 'TBC'} | ORN: ${f.reraOrn || 'TBC'} | BRN: ${f.reraBrn || 'TBC'}` : `Residency: ${f.residency}`,
    !partnerMode ? `Goal: ${f.goal}` : '',
    !partnerMode ? `Property value: ${f.price || 'TBC'}` : '',
    partnerRef ? `Referral code: ${partnerRef}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  const field =
    'mt-1.5 w-full rounded-btn border border-line bg-white px-3.5 py-3 text-[15px] text-ink outline-none focus:border-teal';

  if (synced) {
    return (
      <div className="card space-y-4">
        <div className="flex items-center gap-2.5 text-navy">
          {synced.syncedToOs ? (
            <CheckCircle2 size={22} className="shrink-0 text-teal" />
          ) : (
            <AlertCircle size={22} className="shrink-0 text-warn" />
          )}
          <div>
            <p className="text-base font-semibold text-navy">
              {synced.syncedToOs ? 'Enquiry registered in Betterway OS' : 'Enquiry prepared — complete handoff via email'}
            </p>
            <p className="num text-xs text-slate">Reference: {synced.referenceCode}</p>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-slate">
          {synced.syncedToOs ? (
            <>
              Your profile has been routed to our Dubai advisory desk
              {synced.assignedAdvisor ? ` (${synced.assignedAdvisor.name})` : ''}. You can also open the Client Portal or keep an email copy.
            </>
          ) : (
            <>
              Our live OS endpoint could not confirm immediate sync. Please tap <strong>Send via email</strong> below so our Dubai desk receives your enquiry right away.
            </>
          )}
        </p>
        <div className="flex flex-wrap gap-3 pt-1">
          {synced.syncedToOs ? (
            <>
              <a href={synced.osPortalUrl} className="btn btn-primary">
                Open Betterway OS Portal <ArrowRight size={15} />
              </a>
              <a
                href={`mailto:${SITE.email}?subject=${encodeURIComponent(`${effectiveTopic} (${synced.referenceCode})`)}&body=${encodeURIComponent(msg)}`}
                className="btn btn-ghost"
              >
                Open email copy
              </a>
            </>
          ) : (
            <a
              href={`mailto:${SITE.email}?subject=${encodeURIComponent(`${effectiveTopic} (${synced.referenceCode})`)}&body=${encodeURIComponent(msg)}`}
              className="btn btn-primary"
            >
              <Mail size={15} /> Send via email now
            </a>
          )}
        </div>
        <button
          type="button"
          onClick={() => setSynced(null)}
          className="text-xs text-slate underline hover:text-navy cursor-pointer"
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
            topic: effectiveTopic,
            partnerRef,
            sourcePage: typeof window !== 'undefined' ? window.location.pathname : '/contact',
          });
          setSynced(res);
        } finally {
          setBusy(false);
        }
      }}
    >
      {advisorNote && (
        <div className="rounded-2xl border border-brass/35 bg-teal-50 px-4 py-2.5 text-xs font-medium text-navy">
          Routing enquiry with specialist preference: <strong>{advisorNote}</strong>
        </div>
      )}
      {partnerRef && (
        <div className="rounded-2xl border border-line bg-mist px-4 py-2 text-xs text-slate">
          Partner attribution active: <code className="font-mono font-semibold text-navy">{partnerRef}</code>
        </div>
      )}

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

      {partnerMode ? (
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="text-sm font-medium text-navy sm:col-span-3">
            Brokerage / agency name
            <input required className={field} value={f.agencyName} onChange={(e) => setF({ ...f, agencyName: e.target.value })} placeholder="e.g. SWK Properties LLC" />
          </label>
          <label className="text-sm font-medium text-navy sm:col-span-2">
            RERA ORN
            <input required className={field} value={f.reraOrn} onChange={(e) => setF({ ...f, reraOrn: e.target.value })} placeholder="e.g. ORN-51517" />
          </label>
          <label className="text-sm font-medium text-navy">
            RERA BRN
            <input className={field} value={f.reraBrn} onChange={(e) => setF({ ...f, reraBrn: e.target.value })} placeholder="e.g. BRN-12345" />
          </label>
        </div>
      ) : (
        <>
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
        </>
      )}

      <button type="submit" disabled={busy} className="btn btn-primary cursor-pointer">
        {busy ? 'Syncing with Betterway OS…' : partnerMode ? 'Submit Partner Application to Betterway OS' : 'Submit to Betterway OS'}
      </button>
      <p className="text-xs text-slate">
        Routes directly to Betterway OS CRM under UAE PDPL consent, or{' '}
        <a className="text-teal underline" href={`mailto:${SITE.email}?subject=${encodeURIComponent(effectiveTopic)}&body=${encodeURIComponent(msg)}`}>
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
          <button key={x} type="button" aria-pressed={t === x} className={`chip cursor-pointer ${t === x ? 'chip-on' : ''}`} onClick={() => setT(x)}>
            {x}
          </button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">{items.filter((i) => t === 'All' || i.tags.includes(t)).map((i) => i.node)}</div>
    </>
  );
}
