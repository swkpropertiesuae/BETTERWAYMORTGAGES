import type { Metadata } from 'next';
import HomeExperience from '@/components/home/HomeExperience';
import { JsonLd } from '@/components/ui';
import { I18N } from '@/data/i18n';
import { speakablePageSchema } from '@/lib/seo-schema';

export const metadata: Metadata = {
  title: 'Hipotecas en Dubái y EAU — Compara 24 Bancos | Betterway Mortgages',
  description:
    'Asesoría hipotecaria independiente en Dubái: compara 24 bancos con licencia en EAU, calcula el 4 % DLD y visualiza cuotas en EUR, USD, GBP o AED.',
  alternates: {
    canonical: '/es',
    languages: { 'en-AE': '/', 'ar-AE': '/ar', ru: '/ru', 'zh-Hans': '/zh', fr: '/fr', es: '/es', 'x-default': '/' },
  },
  openGraph: { locale: 'es_ES', url: '/es' },
};

export default function SpanishLandingPage() {
  return (
    <>
      <HomeExperience />
      <JsonLd data={speakablePageSchema('/es', 'Hipotecas en Dubái y EAU | Betterway Mortgages', I18N.es.hero.subtitle)} />
    </>
  );
}
