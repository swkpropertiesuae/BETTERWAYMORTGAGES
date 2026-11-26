'use client';

import React, { useMemo } from 'react';
import { useLocaleCurrency } from '@/components/LocaleCurrencyContext';
import {
  ImageItem,
  PhoneCarousel,
} from '@/components/ui/phone-mockups-1-utils/phone-carousel';

export default function PhoneMockupBasic({ className }: { className?: string }) {
  const { ext } = useLocaleCurrency();

  const screens: ImageItem[] = useMemo(
    () => [
      {
        src: '/images/phone-screens/screen-1-rates.webp',
        alt: 'Betterway Mortgages 24-Bank Written Offer Matrix on iPhone',
        label: ext.phoneLabels[0],
      },
      {
        src: '/images/phone-screens/screen-2-dbr.webp',
        alt: 'Betterway CBUAE 50% DBR & Credit Card 5% Limit Simulator on iPhone',
        label: ext.phoneLabels[1],
      },
      {
        src: '/images/phone-screens/screen-3-dld.webp',
        alt: 'Betterway 4% DLD & Cash-to-Close Fee Breakdown on iPhone',
        label: ext.phoneLabels[2],
      },
      {
        src: '/images/phone-screens/screen-4-vault.webp',
        alt: 'BetterVault Live Form F to DLD Trustee Transfer Tracker on iPhone',
        label: ext.phoneLabels[3],
      },
    ],
    [ext.phoneLabels],
  );

  return <PhoneCarousel images={screens} className={className} />;
}
