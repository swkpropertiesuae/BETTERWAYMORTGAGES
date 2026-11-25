import type { Metadata } from 'next';
import HomeExperience from '@/components/home/HomeExperience';
import { JsonLd } from '@/components/ui';
import { I18N } from '@/data/i18n';
import { speakablePageSchema } from '@/lib/seo-schema';

export const metadata: Metadata = {
  title: '迪拜及阿联酋房贷顾问 — 对比24家持牌银行 | Betterway Mortgages',
  description:
    '迪拜独立房贷顾问：中立对比阿联酋24家持牌银行，支持人民币/美元/英镑/迪拉姆实时换算，透明核算50% DBR与4% DLD过户费用。',
  alternates: {
    canonical: '/zh',
    languages: { 'en-AE': '/', 'ar-AE': '/ar', ru: '/ru', 'zh-Hans': '/zh', fr: '/fr', es: '/es', 'x-default': '/' },
  },
  openGraph: { locale: 'zh_CN', url: '/zh' },
};

export default function ChineseLandingPage() {
  return (
    <>
      <HomeExperience />
      <JsonLd data={speakablePageSchema('/zh', '迪拜及阿联酋房贷顾问 | Betterway Mortgages', I18N.zh.hero.subtitle)} />
    </>
  );
}
