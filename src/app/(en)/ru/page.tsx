import type { Metadata } from 'next';
import HomeExperience from '@/components/home/HomeExperience';
import { JsonLd } from '@/components/ui';
import { I18N } from '@/data/i18n';
import { speakablePageSchema } from '@/lib/seo-schema';

export const metadata: Metadata = {
  title: 'Ипотека в Дубае и ОАЭ — Сравнение 24 банков | Betterway Mortgages',
  description:
    'Независимый ипотечный консалтинг в Дубае: сравнение 24 лицензированных банков ОАЭ, расчёт 50% DBR и 4% DLD в USD, RUB, EUR, GBP и AED.',
  alternates: {
    canonical: '/ru',
    languages: { 'en-AE': '/', 'ar-AE': '/ar', ru: '/ru', 'zh-Hans': '/zh', fr: '/fr', es: '/es', 'x-default': '/' },
  },
  openGraph: { locale: 'ru_RU', url: '/ru' },
};

export default function RussianLandingPage() {
  return (
    <>
      <HomeExperience />
      <JsonLd data={speakablePageSchema('/ru', 'Ипотека в Дубае и ОАЭ | Betterway Mortgages', I18N.ru.hero.subtitle)} />
    </>
  );
}
