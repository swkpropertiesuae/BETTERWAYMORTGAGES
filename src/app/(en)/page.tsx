import type { Metadata } from 'next';
import HomeExperience from '@/components/home/HomeExperience';
import { JsonLd } from '@/components/ui';
import { I18N } from '@/data/i18n';
import { TRENDING_UAE_KEYWORDS, pdfCatalogSchema, speakablePageSchema } from '@/lib/seo-schema';

export const metadata: Metadata = {
  title: 'Betterway Mortgages — Independent Dubai & UAE Mortgage Advisory across 24 Banks',
  description:
    'Independent Dubai & UAE mortgage advisory comparing 24 licensed conventional and Islamic lenders. Live multi-currency calculator, 6 languages, CBUAE 50% DBR clarity, and 1-on-1 Dubai specialists.',
  keywords: TRENDING_UAE_KEYWORDS,
  alternates: {
    canonical: '/',
    languages: {
      'en-AE': '/',
      'ar-AE': '/ar',
      ru: '/ru',
      'zh-Hans': '/zh',
      fr: '/fr',
      es: '/es',
      'x-default': '/',
    },
  },
};

export default function Home() {
  return (
    <>
      <HomeExperience />
      <JsonLd
        data={speakablePageSchema(
          '/',
          'Betterway Mortgages — Independent Dubai & UAE Mortgage Advisory across 24 Banks',
          'Compare 24 UAE banks neutrally, calculate monthly repayments and 4% DLD upfront costs in live multi-currency, and speak 1-on-1 with our Oud Metha, Dubai advisors.',
        )}
      />
      <JsonLd data={pdfCatalogSchema()} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: I18N.en.faq.items.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }}
      />
    </>
  );
}
