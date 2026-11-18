import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowUpRight, Info } from 'lucide-react';
import { SITE } from '@/data/site';

/** Shared chrome for /portal/* and /partners/* reference views, interconnected with Betterway OS. */
export default function AppShell({ title, nav, active, children }: { title: string; sub?: string; nav: [string, string][]; active: string; children: ReactNode }) {
  const isPartner = active.startsWith('/partners');
  const liveOsHref = isPartner ? SITE.osPartnerHubUrl : SITE.osPortalUrl;
  return (
    <div className="bg-mist">
      <div className="border-b border-line bg-white">
        <div className="wrap flex flex-wrap items-center justify-between gap-3 py-3 text-sm">
          <p className="flex items-center gap-2 text-slate">
            <Info size={15} className="text-teal" /> Connected with Betterway OS. Browse the workflow guide below or launch the live portal.
          </p>
          <a href={liveOsHref} className="inline-flex items-center gap-1.5 font-semibold text-navy hover:text-teal text-xs">
            Launch Live {isPartner ? 'Partner Hub' : 'Client Portal'} on OS <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
      <div className="wrap grid gap-8 py-10 lg:grid-cols-[220px_1fr]">
        <aside>
          <p className="eyebrow mb-4">{title}</p>
          <nav className="flex gap-1 overflow-x-auto lg:flex-col" aria-label={title}>
            {nav.map(([l, h]) => (
              <Link
                key={h}
                href={h}
                aria-current={active === h ? 'page' : undefined}
                className={`whitespace-nowrap rounded-btn px-3 py-2.5 text-sm font-medium ${active === h ? 'bg-navy text-white' : 'text-slate hover:bg-white hover:text-navy'}`}
              >
                {l}
              </Link>
            ))}
          </nav>
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}

export const PORTAL_NAV: [string, string][] = [
  ['Overview', '/portal/dashboard'],
  ['Document checklist', '/portal/vault'],
  ['Closing checklist', '/portal/closing-pack'],
  ['Refinance review', '/portal/homeowner-radar'],
  ['Portal access', '/portal/login'],
];
export const HUB_NAV: [string, string][] = [
  ['Partner programme', '/partners'],
  ['Referral workflow', '/partners/dashboard'],
  ['Calculator links', '/partners/co-branded-tools'],
  ['Commercial terms', '/partners/payouts'],
  ['Enquire', '/partners/register'],
];
