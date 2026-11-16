import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = { title: 'Client Workflow & Checklist Guide', robots: { index: false, follow: false } };

export default function Page() {
  return (
    <section className="bg-mist py-20">
      <div className="wrap max-w-md">
        <div className="card !p-8 text-center">
          <img src="/brand/icon-gold.svg" alt="" width={56} height={56} className="mx-auto h-14 w-14" />
          <h1 className="mt-5 text-2xl font-semibold">Client workflow &amp; checklists</h1>
          <p className="mt-3 text-sm leading-relaxed text-slate">
            Live client login, UAE PASS authentication and online document uploads are not enabled on this public website. Browse our standard UAE transaction stages and closing checklists below, or contact an advisor directly.
          </p>
          <Link href="/portal/dashboard" className="btn btn-ghost mt-6 w-full">
            View transaction workflow <ArrowRight size={16} />
          </Link>
          <Link href="/contact" className="btn btn-primary mt-3 w-full">
            Contact an advisor
          </Link>
        </div>
      </div>
    </section>
  );
}
