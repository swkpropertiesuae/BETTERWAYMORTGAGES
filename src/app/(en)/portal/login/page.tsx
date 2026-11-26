import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Lock, ShieldCheck } from 'lucide-react';
import { SITE } from '@/data/site';

export const metadata: Metadata = { title: 'BetterVault — Client & Advisor Portal Access', robots: { index: false, follow: false } };

export default function Page() {
  return (
    <section className="bw-page-spacer bg-transparent py-20">
      <div className="wrap max-w-md">
        <div className="card !p-8 text-center">
          <img
            src="/brand/logo-stacked-light.png"
            alt="Betterway Mortgages"
            width={1000}
            height={759}
            className="mx-auto h-28 w-auto object-contain"
          />
          <h1 className="mt-5 text-2xl font-semibold">BetterVault &amp; BetterCore Access</h1>
          <p className="mt-3 text-sm leading-relaxed text-slate">
            Access your encrypted document vault, CBUAE Key Facts Statement (KFS) sign-off, 5-stage mortgage progression tracker, or internal advisor workspace on BetterCore.
          </p>
          <a href={SITE.osPortalUrl} className="btn btn-primary mt-6 w-full">
            <Lock size={15} /> Open BetterVault Client Room <ArrowRight size={16} />
          </a>
          <a href={SITE.osPartnerHubUrl} className="btn btn-ghost mt-3 w-full">
            Open BetterHub (RERA Agencies)
          </a>
          <a href={SITE.osLoginUrl} className="btn btn-ghost mt-3 w-full">
            <ShieldCheck size={15} /> BetterCore Staff Sign-In
          </a>
          <Link href="/portal/dashboard" className="mt-4 inline-block text-xs text-slate underline hover:text-navy">
            Browse public transaction workflow guide
          </Link>
        </div>
      </div>
    </section>
  );
}
