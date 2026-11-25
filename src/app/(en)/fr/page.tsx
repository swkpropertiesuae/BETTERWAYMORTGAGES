import type { Metadata } from 'next';
import HomeExperience from '@/components/home/HomeExperience';
import { JsonLd } from '@/components/ui';
import { I18N } from '@/data/i18n';
import { speakablePageSchema } from '@/lib/seo-schema';

export const metadata: Metadata = {
  title: 'Prêt Immobilier Dubaï & Émirats — 24 Banques Comparées | Betterway Mortgages',
  description:
    'Courtier hypothécaire indépendant à Dubaï : comparez 24 banques agréées aux EAU, calculez vos frais DLD 4 % et simulez en EUR, GBP, USD ou AED.',
  alternates: {
    canonical: '/fr',
    languages: { 'en-AE': '/', 'ar-AE': '/ar', ru: '/ru', 'zh-Hans': '/zh', fr: '/fr', es: '/es', 'x-default': '/' },
  },
  openGraph: { locale: 'fr_FR', url: '/fr' },
};

export default function FrenchLandingPage() {
  return (
    <>
      <HomeExperience />
      <JsonLd data={speakablePageSchema('/fr', 'Prêt Immobilier Dubaï & Émirats | Betterway Mortgages', I18N.fr.hero.subtitle)} />
    </>
  );
}
