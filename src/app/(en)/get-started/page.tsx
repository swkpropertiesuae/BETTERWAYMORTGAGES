import { Suspense } from 'react';
import type { Metadata } from 'next';
import PreApprovalWizard from '@/components/ecosystem/PreApprovalWizard';

export const metadata: Metadata = {
  title: 'Start Your UAE Mortgage Readiness Check | Betterway Mortgages',
  description:
    'Interactive 6-step Dubai & UAE mortgage eligibility wizard. Check your CBUAE 50% DBR headroom, itemised 4% DLD closing costs, and 24-bank comparison blueprint.',
  alternates: { canonical: '/get-started' },
};

export default function GetStartedPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-transparent" />}>
      <PreApprovalWizard />
    </Suspense>
  );
}
