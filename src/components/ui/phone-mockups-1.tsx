'use client';

import React from 'react';
import {
  ImageItem,
  PhoneCarousel,
} from '@/components/ui/phone-mockups-1-utils/phone-carousel';

const betterwayScreens: ImageItem[] = [
  {
    src: '/images/phone-screens/screen-1-rates.webp',
    alt: 'Betterway Mortgages 24-Bank Written Offer Matrix on iPhone',
    label: '01 · 24-Bank Written Matrix',
  },
  {
    src: '/images/phone-screens/screen-2-dbr.webp',
    alt: 'Betterway CBUAE 50% DBR & Credit Card 5% Limit Simulator on iPhone',
    label: '02 · CBUAE 50% DBR & 5% Card Check',
  },
  {
    src: '/images/phone-screens/screen-3-dld.webp',
    alt: 'Betterway 4% DLD & Cash-to-Close Fee Breakdown on iPhone',
    label: '03 · 4% DLD & Closing Cash Sheet',
  },
  {
    src: '/images/phone-screens/screen-4-vault.webp',
    alt: 'BetterVault Live Form F to DLD Trustee Transfer Tracker on iPhone',
    label: '04 · BetterVault Live DLD Tracking',
  },
];

export default function PhoneMockupBasic({ className }: { className?: string }) {
  return <PhoneCarousel images={betterwayScreens} className={className} />;
}
