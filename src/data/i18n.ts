export type LocaleCode = 'en' | 'ar' | 'ru' | 'zh' | 'fr' | 'es';
export type CurrencyCode = 'AED' | 'USD' | 'GBP' | 'EUR' | 'SAR' | 'RUB' | 'CNY' | 'INR';

export type LocaleMeta = {
  code: LocaleCode;
  nativeLabel: string;
  englishName: string;
  short: string;
  dir: 'ltr' | 'rtl';
  href: string;
  hreflang: string;
  defaultCurrency: CurrencyCode;
};

export const LOCALES: readonly LocaleMeta[] = [
  { code: 'en', nativeLabel: 'English', englishName: 'English', short: 'EN', dir: 'ltr', href: '/', hreflang: 'en-AE', defaultCurrency: 'AED' },
  { code: 'ar', nativeLabel: 'العربية', englishName: 'Arabic', short: 'AR', dir: 'rtl', href: '/ar', hreflang: 'ar-AE', defaultCurrency: 'AED' },
  { code: 'ru', nativeLabel: 'Русский', englishName: 'Russian', short: 'RU', dir: 'ltr', href: '/ru', hreflang: 'ru', defaultCurrency: 'USD' },
  { code: 'zh', nativeLabel: '中文', englishName: 'Chinese', short: '中文', dir: 'ltr', href: '/zh', hreflang: 'zh-Hans', defaultCurrency: 'CNY' },
  { code: 'fr', nativeLabel: 'Français', englishName: 'French', short: 'FR', dir: 'ltr', href: '/fr', hreflang: 'fr', defaultCurrency: 'EUR' },
  { code: 'es', nativeLabel: 'Español', englishName: 'Spanish', short: 'ES', dir: 'ltr', href: '/es', hreflang: 'es', defaultCurrency: 'EUR' },
] as const;

export type CurrencyMeta = {
  code: CurrencyCode;
  symbol: string;
  name: string;
};

export const CURRENCIES: readonly CurrencyMeta[] = [
  { code: 'AED', symbol: 'AED', name: 'UAE Dirham' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'SAR', symbol: 'SAR', name: 'Saudi Riyal' },
  { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
] as const;

/** Indicative CBUAE-pegged fallback FX rates per 1 AED (USD pegged at 3.6725 AED). */
export const DEFAULT_FX_RATES: Record<CurrencyCode, number> = {
  AED: 1,
  USD: 0.272294,
  GBP: 0.2145,
  EUR: 0.2518,
  SAR: 1.0211,
  RUB: 26.4,
  CNY: 1.972,
  INR: 22.95,
};

export function convertFromAed(
  aedAmount: number,
  currency: CurrencyCode,
  rates: Record<CurrencyCode, number> = DEFAULT_FX_RATES,
): number {
  const rate = rates[currency] ?? DEFAULT_FX_RATES[currency] ?? 1;
  return aedAmount * rate;
}

export function formatMoneyFromAed(
  aedAmount: number,
  currency: CurrencyCode,
  rates: Record<CurrencyCode, number> = DEFAULT_FX_RATES,
): string {
  const converted = Math.round(convertFromAed(aedAmount, currency, rates));
  const formatted = converted.toLocaleString('en-US');
  if (currency === 'AED' || currency === 'SAR') return `${currency} ${formatted}`;
  const sym = CURRENCIES.find((c) => c.code === currency)?.symbol ?? currency;
  return `${sym}${formatted}`;
}

export function formatCompactFromAed(
  aedAmount: number,
  currency: CurrencyCode,
  rates: Record<CurrencyCode, number> = DEFAULT_FX_RATES,
): string {
  const converted = convertFromAed(aedAmount, currency, rates);
  const sym = CURRENCIES.find((c) => c.code === currency)?.symbol ?? currency;
  const prefix = currency === 'AED' || currency === 'SAR' ? `${currency} ` : sym;
  if (Math.abs(converted) >= 1_000_000) {
    const m = converted / 1_000_000;
    return `${prefix}${m >= 10 ? m.toFixed(1) : m.toFixed(2)}M`;
  }
  if (Math.abs(converted) >= 1_000) {
    return `${prefix}${Math.round(converted / 1_000)}K`;
  }
  return `${prefix}${Math.round(converted).toLocaleString('en-US')}`;
}

export type SiteCopy = {
  nav: {
    home: string;
    about: string;
    buyers: string;
    agents: string;
    resources: string;
    login: string;
    contact: string;
    exit: string;
    startCheck: string;
  };
  hero: {
    eiborLabel: string;
    watchBriefing: string;
    priorityDesk: string;
    title: string;
    subtitle: string;
    card1Title: string;
    card1Meta: string;
    card2Title: string;
    card2Meta: string;
    jumpCalc: string;
    jumpEibor: string;
    jumpHub: string;
  };
  twoCards: {
    eyebrow: string;
    heading: string;
    sub: string;
    card1Badge: string;
    card1Title: string;
    card1Desc: string;
    card1Cta: string;
    card1Secondary: string;
    card2Badge: string;
    card2Title: string;
    card2Desc: string;
    card2Cta: string;
    card2Secondary: string;
    moreInfoPrompt: string;
    speakAdvisor: string;
  };
  education: {
    eyebrow: string;
    heading: string;
    sub: string;
    steps: readonly { num: string; title: string; summary: string; detail: string }[];
    cta: string;
  };
  calc: {
    eyebrow: string;
    heading: string;
    sub: string;
    tabs: readonly [string, string, string];
    priceLabel: string;
    downLabel: string;
    tenureLabel: string;
    years: string;
    rateLabel: string;
    monthlyLabel: string;
    loanAmount: string;
    cashToClose: string;
    dldLine: string;
    ctaPrimary: string;
    ctaSecondary: string;
    fxNotice: string;
    marqueeTitle: string;
  };
  suite: {
    eyebrow: string;
    heading: string;
    sub: string;
    betterHubTag: string;
    betterHubTitle: string;
    betterHubDesc: string;
    betterHubCta: string;
    betterCoreTag: string;
    betterCoreTitle: string;
    betterCoreDesc: string;
    betterCoreCta: string;
  };
  team: {
    eyebrow: string;
    heading: string;
    sub: string;
    cta: string;
  };
  faq: {
    eyebrow: string;
    heading: string;
    sub: string;
    cta1: string;
    cta2: string;
    items: readonly { q: string; a: string }[];
  };
  footer: {
    eyebrow: string;
    heading: string;
    sub: string;
    cta1: string;
    cta2: string;
    tagline: string;
    contactTitle: string;
    colBuyers: string;
    colTools: string;
    colSuite: string;
  };
};

export const I18N: Record<LocaleCode, SiteCopy> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      buyers: 'For Buyers',
      agents: 'For Agents',
      resources: 'Resources',
      login: 'BetterVault',
      contact: 'Contact us',
      exit: 'Exit',
      startCheck: 'Check Borrowing Power',
    },
    hero: {
      eiborLabel: '24 UAE Banks · Live CBUAE 3M EIBOR',
      watchBriefing: 'Watch Briefing',
      priorityDesk: 'BetterDesk',
      title: 'Structured UAE home finance, across 24 licensed banks.',
      subtitle:
        'See your CBUAE 50% DBR limit, itemised 4% DLD transfer fees, and 24-bank written options clearly with a 1-on-1 Dubai advisor before you commit.',
      card1Title: 'Check your borrowing power',
      card1Meta: 'Free 60-second CBUAE DBR & 24-bank readiness brief',
      card2Title: 'Plan deposit & 4% DLD costs',
      card2Meta: 'Map upfront cash across 60 UAE freehold communities',
      jumpCalc: 'Mortgage & 4% DLD Calculator ↓',
      jumpEibor: 'Live CBUAE EIBOR →',
      jumpHub: 'BetterHub for RERA Agents →',
    },
    twoCards: {
      eyebrow: 'One-on-One Clarity',
      heading: 'Two essentials to confirm before you sign Form F.',
      sub: 'We keep mortgage advice simple and human. Review the two numbers that matter most, then speak directly with your dedicated Oud Metha advisor for bespoke lender structuring.',
      card1Badge: '24-Bank Advisory Desk',
      card1Title: 'Compare conventional & Islamic offers side by side',
      card1Desc:
        'See fixed periods, post-fixed EIBOR revert margins, minimum rate floors, and bank fee schedules clearly — zero guesswork, zero impact on your AECB score.',
      card1Cta: 'Start 1-on-1 Assessment',
      card1Secondary: 'Browse 24 UAE Banks',
      card2Badge: 'BetterClose · Buying Desk',
      card2Title: 'Know every dirham of upfront cash & DLD fees',
      card2Desc:
        'Combine deposit thresholds (80% Expat / 85% UAE National LTV), 4% DLD registration, trustee fees, and valuation protection clauses before booking a unit.',
      card2Cta: 'Explore BetterClose',
      card2Secondary: 'Contact an Advisor',
      moreInfoPrompt: 'Want lender-specific policy guidance for your income or visa profile?',
      speakAdvisor: 'Speak 1-on-1 with our Dubai desk',
    },
    education: {
      eyebrow: '1-on-1 Client Education',
      heading: 'Three clear steps from first question to keys.',
      sub: 'No jargon, no hidden revert traps. Your advisor walks you personally through every milestone.',
      steps: [
        {
          num: '01',
          title: 'Know your real limit',
          summary: 'Verify your 50% CBUAE DBR ceiling and deposit cash upfront.',
          detail: 'We check credit card limits (assessed at 5% monthly), existing loans, and 4% DLD closing costs before you view.',
        },
        {
          num: '02',
          title: 'Compare 24 written offers',
          summary: 'Review conventional and Islamic lenders on one neutral desk.',
          detail: 'Inspect introductory fixed years, EIBOR revert margins, floor rates, and early exit caps side by side.',
        },
        {
          num: '03',
          title: 'Close calmly at DLD',
          summary: 'From bank valuation and Final Offer Letter to Title Deed.',
          detail: 'We coordinate Form F protection clauses, developer NOCs, and trustee manager’s cheques right to handover.',
        },
      ],
      cta: 'Book a 1-on-1 Walkthrough',
    },
    calc: {
      eyebrow: 'Interactive Multi-Currency Planner',
      heading: 'Estimate your UAE mortgage & upfront cash',
      sub: 'Adjust property value, deposit, and tenure below — switch currencies anytime for instant international context. Contact us for exact written bank sheets.',
      tabs: ['UAE Resident', 'UAE National', 'Non-Resident'],
      priceLabel: 'Property Price',
      downLabel: 'Down Payment',
      tenureLabel: 'Loan Tenure',
      years: 'Years',
      rateLabel: 'Illustrative Annual Rate',
      monthlyLabel: 'Estimated Monthly Payment',
      loanAmount: 'Mortgage Amount',
      cashToClose: 'Estimated Total Cash Needed',
      dldLine: 'Includes down payment, 4% DLD, title deed, mortgage reg & trustee fee',
      ctaPrimary: 'Get Written 24-Bank Quotes',
      ctaSecondary: 'Full Breakdown & Contact Us',
      fxNotice: 'Displayed in selected currency for guidance. Statutory UAE mortgages and DLD fees settle in AED.',
      marqueeTitle: 'Independent panel comparing 24 licensed UAE conventional & Islamic banks',
    },
    suite: {
      eyebrow: 'Exclusive Betterway Suite',
      heading: 'Purpose-built platforms for RERA agents & advisory teams.',
      sub: 'Original Betterway technology crafted in Dubai to keep buyers informed and transfers on schedule.',
      betterHubTag: 'BetterHub · RERA Agencies',
      betterHubTitle: 'Keep every buyer deal moving to DLD transfer',
      betterHubDesc:
        'Give your agents co-branded readiness links, pre-verify buyer borrowing capacity before viewings, and track files cleanly from Form F to handover.',
      betterHubCta: 'Explore BetterHub',
      betterCoreTag: 'BetterCore · Advisory Infrastructure',
      betterCoreTitle: 'Operating system for UAE mortgage specialists',
      betterCoreDesc:
        'Run CBUAE Key Facts Statement workflows, 24-bank policy matrices, and multilingual client journeys on Betterway’s proprietary operating core.',
      betterCoreCta: 'Explore BetterCore',
    },
    team: {
      eyebrow: 'Our Oud Metha, Dubai Team',
      heading: 'Real people advising you 1-on-1 from start to keys.',
      sub: 'Led by Founder & Managing Director Warda Kapadia and Executive Director Shabib Siraj, our Dubai specialists handle every lender negotiation personally.',
      cta: 'Meet Full Leadership & Team',
    },
    faq: {
      eyebrow: 'Straight Answers',
      heading: 'Key questions buyers ask first',
      sub: 'Clear facts grounded in CBUAE regulations and DLD fee schedules. Need tailored advice? Contact our desk directly.',
      cta1: 'Start Eligibility Check',
      cta2: 'Contact Us 1-on-1',
      items: [
        {
          q: 'Why work with Betterway instead of going directly to one bank?',
          a: 'A single bank only shares its own policy and headline rate. Betterway compares 24 licensed UAE conventional and Islamic lenders neutrally — covering post-fixed EIBOR revert margins, minimum floors, and fees before you apply.',
        },
        {
          q: 'Does checking my eligibility affect my AECB credit score?',
          a: 'No. Our readiness check and calculators have zero impact on your Al Etihad Credit Bureau report. Credit pulls happen only when you formally authorise a bank submission.',
        },
        {
          q: 'Can non-residents and international buyers finance property in Dubai?',
          a: 'Yes. Selected UAE lenders finance salaried and self-employed overseas buyers across 25+ countries. Speak with our desk to confirm LTV limits and documentation for your country of residence.',
        },
        {
          q: 'What are the core CBUAE borrowing limits?',
          a: 'Central Bank of the UAE rules cap Debt Burden Ratio (DBR) at 50% of gross monthly income, cap first-home LTV at 80% for expats and 85% for UAE Nationals (up to AED 5M), and cap early settlement fees at 1% or AED 10,000 (+5% VAT), whichever is lower.',
        },
        {
          q: 'How can RERA agents partner via BetterHub?',
          a: 'Register on BetterHub to share co-branded buyer readiness tools, confirm borrowing limits before viewings, and monitor every deal live through valuation and trustee day.',
        },
      ],
    },
    footer: {
      eyebrow: 'Personal 1-on-1 Advisory · Oud Metha, Dubai',
      heading: 'Ready for clear numbers before you sign?',
      sub: 'Speak directly with a Betterway advisor for a neutral 24-bank comparison tailored to your profile.',
      cta1: 'Contact Us Today',
      cta2: 'Run Calculator',
      tagline: 'Independent Dubai & UAE mortgage advisory comparing 24 licensed banks with 1-on-1 human guidance.',
      contactTitle: 'Contact',
      colBuyers: 'For Buyers',
      colTools: 'Calculators & Rates',
      colSuite: 'Betterway Suite',
    },
  },

  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      buyers: 'للمشترين',
      agents: 'للوسطاء',
      resources: 'المصادر',
      login: 'BetterVault',
      contact: 'تواصل معنا',
      exit: 'خروج',
      startCheck: 'افحص قدرتك التمويلية',
    },
    hero: {
      eiborLabel: '24 بنكاً إماراتياً · إيبور المركزي 3 أشهر',
      watchBriefing: 'شاهد الملخص',
      priorityDesk: 'BetterDesk',
      title: 'تمويل عقاري مُهيكل في الإمارات عبر 24 بنكاً مرخصاً.',
      subtitle:
        'تعرّف بوضوح على سقف الاستقطاع (50%) ورسوم الأراضي والأملاك (4%) وخيارات 24 بنكاً مع مستشار مخصص وجهاً لوجه في دبي قبل التوقيع.',
      card1Title: 'افحص قدرتك التمويلية',
      card1Meta: 'تقييم مجاني خلال دقيقة لسقف الاستقطاع ومقارنة 24 بنكاً',
      card2Title: 'احسب الدفعة ورسوم 4% DLD',
      card2Meta: 'خطّط للدفعة الأولى والتكاليف عبر 60 منطقة تملك حر',
      jumpCalc: 'حاسبة التمويل ورسوم 4% ↓',
      jumpEibor: 'أسعار إيبور اليومية ←',
      jumpHub: 'BetterHub للوسطاء العقاريين ←',
    },
    twoCards: {
      eyebrow: 'وضوح مباشر ومخصص',
      heading: 'رقمان أساسيان يجب التأكد منهما قبل توقيع عقد البيع.',
      sub: 'نبسّط لك التمويل العقاري بدون تعقيد. راجع الأساسيات هنا، وتواصل معنا مباشرة للحصول على دراسة مفصلة لحالتك.',
      card1Badge: 'مكتب مقارنة 24 بنكاً',
      card1Title: 'قارن البنوك التقليدية والإسلامية جنباً إلى جنب',
      card1Desc:
        'اطّلع على فترات التثبيت وهوامش إيبور والرسوم بشفافية كاملة وبدون أي تأثير على تقييمك الائتماني في مكتب الاتحاد.',
      card1Cta: 'ابدأ التقييم المباشر',
      card1Secondary: 'دليل 24 بنكاً',
      card2Badge: 'BetterClose · مكتب الإغلاق',
      card2Title: 'اعرف كل درهم من التكاليف قبل حجز العقار',
      card2Desc:
        'احسب الدفعة الأولى (حتى 80% للمقيم و85% للمواطن) ورسوم 4% لدائرة الأراضي وبنود حماية التقييم في عقد Form F.',
      card2Cta: 'استكشف BetterClose',
      card2Secondary: 'تواصل مع مستشار',
      moreInfoPrompt: 'هل تحتاج إلى دراسة دقيقة لملف الدخل أو الإقامة أو الاستثمار؟',
      speakAdvisor: 'تحدث 1-على-1 مع مستشارنا في دبي',
    },
    education: {
      eyebrow: 'توجيه شخصي خطوة بخطوة',
      heading: 'ثلاث خطوات واضحة من أول استفسار حتى استلام المفاتيح.',
      sub: 'بدون مصطلحات معقدة أو مفاجآت. يرافقك مستشارنا في كل مرحلة بشفافية كاملة.',
      steps: [
        {
          num: '01',
          title: 'اعرف سقفك الحقيقي',
          summary: 'تحقق من سقف الاستقطاع 50% وتكاليف الإغلاق مسبقاً.',
          detail: 'نراجع حدود البطاقات الائتمانية (تُحتسب بنسبة 5%) والالتزامات القائمة ورسوم دائرة الأراضي قبل المعاينة.',
        },
        {
          num: '02',
          title: 'قارن 24 عرضاً مكتوباً',
          summary: 'بنوك تقليدية وإسلامية على طاولة واحدة وبحياد تام.',
          detail: 'نقارن فترات التثبيت وهامش ما بعد التثبيت والحد الأدنى وسقف السداد المبكر.',
        },
        {
          num: '03',
          title: 'أغلق الصفقة بسلاسة',
          summary: 'من التقييم البنكي وخطاب العرض النهائي حتى سند الملكية.',
          detail: 'ننسّق شروط التقييم وشهادة عدم الممانعة وشيكات أمين التسجيل حتى استلام المفاتيح.',
        },
      ],
      cta: 'احجز جلسة توضيحية 1-على-1',
    },
    calc: {
      eyebrow: 'حاسبة تفاعلية متعددة العملات',
      heading: 'احسب قسطك الشهري والتكاليف المقدمة',
      sub: 'عدّل سعر العقار والدفعة الأولى وبدّل العملة فوراً لمقارنة واضحة. للتفاصيل الدقيقة حسب ملفك، تواصل معنا.',
      tabs: ['مقيم في الإمارات', 'مواطن إماراتي', 'غير مقيم'],
      priceLabel: 'سعر العقار',
      downLabel: 'الدفعة الأولى',
      tenureLabel: 'مدة التمويل',
      years: 'سنة',
      rateLabel: 'نسبة تقديرية سنوية',
      monthlyLabel: 'القسط الشهري التقديري',
      loanAmount: 'مبلغ التمويل',
      cashToClose: 'إجمالي النقد المطلوب تقديرياً',
      dldLine: 'يشمل الدفعة الأولى و4% رسوم الأراضي وسند الملكية وتسجيل الرهن وأمين التسجيل',
      ctaPrimary: 'اطلب عروض 24 بنكاً',
      ctaSecondary: 'تواصل معنا للتفاصيل',
      fxNotice: 'الأرقام بالعملة المختارة استرشادية؛ تُسدد عقود التمويل ورسوم الأراضي رسمياً بالدرهم الإماراتي.',
      marqueeTitle: 'مقارنة محايدة عبر 24 بنكاً تقليدياً وإسلامياً مرخصاً في الإمارات',
    },
    suite: {
      eyebrow: 'منظومة بيترواي الحصرية',
      heading: 'منصات مبتكرة للوسطاء العقاريين وفرق التمويل.',
      sub: 'تقنيات حصرية مطورة في دبي لتبسيط رحلة المشتري وتسريع الإغلاق في دائرة الأراضي.',
      betterHubTag: 'BetterHub · للوكالات العقارية',
      betterHubTitle: 'أنجز صفقات المشترين بثقة حتى التحويل',
      betterHubDesc:
        'زوّد فريقك بحاسبات جاهزية المشترين وتأكد من القدرة التمويلية قبل المعاينة وتابع كل ملف بوضوح.',
      betterHubCta: 'استكشف BetterHub',
      betterCoreTag: 'BetterCore · البنية التشغيلية',
      betterCoreTitle: 'منصة تشغيلية متكاملة لفرق التمويل العقاري',
      betterCoreDesc:
        'أدر نماذج بيان الحقائق الأساسية ومصفوفة 24 بنكاً ورحلات العملاء متعددة اللغات عبر نظام BetterCore.',
      betterCoreCta: 'استكشف BetterCore',
    },
    team: {
      eyebrow: 'فريقنا في عود ميثاء، دبي',
      heading: 'خبراء حقيقيون يرافقونك شخصياً حتى استلام المفتاح.',
      sub: 'بقيادة المؤسِّسة والمديرة الإدارية وردة كاباديا والمدير التنفيذي شبيب سراج، يدير فريقنا في دبي ملفك التمويلي باحترافية.',
      cta: 'تعرّف على القيادة والفريق الكامل',
    },
    faq: {
      eyebrow: 'إجابات واضحة ومباشرة',
      heading: 'أهم الأسئلة قبل بدء التمويل',
      sub: 'معلومات دقيقة وفق لوائح مصرف الإمارات المركزي. للمزيد من التفاصيل الخاصة بوضعك، تواصل معنا.',
      cta1: 'ابدأ فحص الأهلية',
      cta2: 'تواصل معنا 1-على-1',
      items: [
        {
          q: 'ما الفرق بين التقديم عبر بيترواي والتقديم لبنك واحد مباشرة؟',
          a: 'البنك الواحد يعرض سياساته فقط، بينما تقارن بيترواي 24 بنكاً تقليدياً وإسلامياً بحياد كامل مع توضيح هوامش ما بعد التثبيت والرسوم مسبقاً.',
        },
        {
          q: 'هل يؤثر فحص الأهلية على التقرير الائتماني في مكتب الاتحاد؟',
          a: 'لا إطلاقاً. استخدام حاسباتنا وتقييمنا الأولي لا يؤثر على تقييمك الائتماني، ولا يُطلب التقرير إلا عند تفويضك الرسمي لتقديم طلب بنكي.',
        },
        {
          q: 'هل يمكن لغير المقيمين والمستثمرين من خارج الإمارات الحصول على تمويل في دبي؟',
          a: 'نعم، توفر بنوك إماراتية مختارة تمويلاً للمستثمرين الدوليين. تواصل مع مستشارينا لتأكيد نسبة التمويل والمستندات المطلوبة لبلدك.',
        },
        {
          q: 'ما هي القواعد الأساسية لمصرف الإمارات المركزي للتمويل العقاري؟',
          a: 'يحدد المصرف المركزي سقف الاستقطاع بنسبة 50% من الدخل الشهري، والتمويل للمسكن الأول حتى 80% للمقيم و85% للمواطن (حتى 5 ملايين درهم)، وسقف السداد المبكر 1% أو 10,000 درهم أيهما أقل.',
        },
        {
          q: 'كيف ينضم الوسطاء العقاريون إلى BetterHub؟',
          a: 'سجّل وكالتك عبر BetterHub لمشاركة أدوات فحص الجاهزية مع عملائك ومتابعة كل صفقة حتى التحويل لدى أمين التسجيل.',
        },
      ],
    },
    footer: {
      eyebrow: 'استشارة شخصية 1-على-1 · عود ميثاء، دبي',
      heading: 'جاهز لأرقام واضحة قبل التوقيع؟',
      sub: 'تحدث مباشرة مع مستشار بيترواي للحصول على مقارنة محايدة عبر 24 بنكاً في الإمارات.',
      cta1: 'تواصل معنا اليوم',
      cta2: 'استخدم الحاسبة',
      tagline: 'استشارات تمويل عقاري مستقلة في دبي والإمارات عبر 24 بنكاً مرخصاً بتوجيه شخصي مباشر.',
      contactTitle: 'التواصل',
      colBuyers: 'للمشترين',
      colTools: 'الحاسبات والأسعار',
      colSuite: 'منظومة بيترواي',
    },
  },

  ru: {
    nav: {
      home: 'Главная',
      about: 'О нас',
      buyers: 'Покупателям',
      agents: 'Брокерам',
      resources: 'Ресурсы',
      login: 'BetterVault',
      contact: 'Связаться',
      exit: 'Выход',
      startCheck: 'Проверить лимит',
    },
    hero: {
      eiborLabel: '24 банка ОАЭ · CBUAE 3M EIBOR',
      watchBriefing: 'Смотреть брифинг',
      priorityDesk: 'BetterDesk',
      title: 'Структурированная ипотека в ОАЭ через 24 лицензированных банка.',
      subtitle:
        'Узнайте ваш лимит DBR 50% по правилам ЦБ ОАЭ, точный сбор 4% DLD и письменные условия 24 банков на персональной консультации в Дубае до подписания Form F.',
      card1Title: 'Проверить ипотечный лимит',
      card1Meta: 'Бесплатный расчёт 50% DBR и подбор из 24 банков за минуту',
      card2Title: 'Рассчитать взнос и 4% DLD',
      card2Meta: 'План первоначальных затрат для 60 freehold-районов ОАЭ',
      jumpCalc: 'Калькулятор ипотеки и 4% DLD ↓',
      jumpEibor: 'Ставки CBUAE EIBOR →',
      jumpHub: 'BetterHub для RERA-агентов →',
    },
    twoCards: {
      eyebrow: 'Персональная ясность',
      heading: 'Два главных расчёта до подписания Form F.',
      sub: 'Мы объясняем ипотеку просто и по делу. Проверьте ключевые цифры здесь и свяжитесь с вашим персональным советником в Дубае для детального разбора.',
      card1Badge: 'Сравнение 24 банков ОАЭ',
      card1Title: 'Сравните классические и исламские банки на одном столе',
      card1Desc:
        'Фиксированные периоды, маржа после фиксации (EIBOR), минимальные пороги и комиссии банков — без влияния на вашу кредитную историю AECB.',
      card1Cta: 'Пройти оценку 1-на-1',
      card1Secondary: 'Каталог 24 банков',
      card2Badge: 'BetterClose · Сопровождение сделки',
      card2Title: 'Полная прозрачность взноса и сборов DLD заранее',
      card2Desc:
        'Первый взнос (до 80% LTV для резидентов, программы для нерезидентов), 4% DLD, услуги трасти и защитные пункты оценки в Form F.',
      card2Cta: 'Открыть BetterClose',
      card2Secondary: 'Связаться с советником',
      moreInfoPrompt: 'Нужен точный расчёт под ваш доход, резидентство или страну налогообложения?',
      speakAdvisor: 'Поговорите 1-на-1 с офисом в Дубае',
    },
    education: {
      eyebrow: 'Персональное обучение клиента',
      heading: 'Три понятных шага от первого вопроса до ключей.',
      sub: 'Без сложного банковского жаргона. Личный советник ведёт вас по каждому этапу.',
      steps: [
        {
          num: '01',
          title: 'Определите реальный бюджет',
          summary: 'Проверяем лимит 50% DBR ЦБ ОАЭ и все upfront-расходы.',
          detail: 'Учитываем лимиты кредитных карт (5% в месяц), текущие кредиты и 4% сбор DLD до просмотров.',
        },
        {
          num: '02',
          title: 'Сравните 24 банка письменно',
          summary: 'Независимый подбор классических и исламских программ.',
          detail: 'Сверяем фиксированный срок, маржу EIBOR, минимальную ставку и лимит досрочного погашения.',
        },
        {
          num: '03',
          title: 'Спокойное закрытие в DLD',
          summary: 'От банковской оценки и Final Offer Letter до Title Deed.',
          detail: 'Координируем пункты Form F, NOC застройщика и чеки на день передачи собственности.',
        },
      ],
      cta: 'Записаться на 1-на-1 разбор',
    },
    calc: {
      eyebrow: 'Мультивалютный калькулятор',
      heading: 'Рассчитайте ипотеку в ОАЭ и стартовый капитал',
      sub: 'Выберите цену объекта, взнос и срок — переключайте валюту в один клик. Для точных ставок банков свяжитесь с нами.',
      tabs: ['Резидент ОАЭ', 'Гражданин ОАЭ', 'Нерезидент'],
      priceLabel: 'Стоимость объекта',
      downLabel: 'Первый взнос',
      tenureLabel: 'Срок кредита',
      years: 'лет',
      rateLabel: 'Ориентировочная ставка',
      monthlyLabel: 'Примерный платёж в месяц',
      loanAmount: 'Сумма кредита',
      cashToClose: 'Итого стартовых средств',
      dldLine: 'Включает первый взнос, 4% DLD, Title Deed, регистрацию залога и трасти',
      ctaPrimary: 'Запросить расчёт по 24 банкам',
      ctaSecondary: 'Связаться для точного расчёта',
      fxNotice: 'Конвертация в выбранную валюту справочная; расчёты с банками и DLD ведутся в AED.',
      marqueeTitle: 'Независимое сравнение 24 лицензированных банков ОАЭ',
    },
    suite: {
      eyebrow: 'Экосистема Betterway',
      heading: 'Специализированные решения для RERA-агентств и брокеров.',
      sub: 'Собственные технологии Betterway, созданные в Дубае для чистого и быстрого закрытия сделок.',
      betterHubTag: 'BetterHub · Для агентств RERA',
      betterHubTitle: 'Доводите каждую сделку покупателя до трансфера',
      betterHubDesc:
        'Кобрендинговые калькуляторы, предварительная проверка бюджета клиента до показов и прозрачный трекинг сделки.',
      betterHubCta: 'Узнать о BetterHub',
      betterCoreTag: 'BetterCore · Операционное ядро',
      betterCoreTitle: 'Инфраструктура для ипотечных команд ОАЭ',
      betterCoreDesc:
        'Матрица 24 банков, стандарты CBUAE KFS и мультиязычное сопровождение клиентов на единой платформе.',
      betterCoreCta: 'Узнать о BetterCore',
    },
    team: {
      eyebrow: 'Наш офис в Oud Metha, Дубай',
      heading: 'Команда экспертов, ведущая вашу сделку лично.',
      sub: 'Под руководством основателя и управляющего директора Варды Кападиа и исполнительного директора Шабиба Сираджа.',
      cta: 'Познакомиться со всей командой',
    },
    faq: {
      eyebrow: 'Коротко о главном',
      heading: 'Частые вопросы покупателей',
      sub: 'Факты на основе правил ЦБ ОАЭ и DLD. За подробным расчётом обратитесь к нашему советнику.',
      cta1: 'Проверить лимит',
      cta2: 'Связаться 1-на-1',
      items: [
        {
          q: 'Чем Betterway лучше прямого обращения в один банк?',
          a: 'Один банк показывает только свои условия. Betterway нейтрально сравнивает 24 лицензированных банка ОАЭ, включая маржу EIBOR после фиксации и все комиссии.',
        },
        {
          q: 'Влияет ли проверка на сайте на кредитный рейтинг AECB?',
          a: 'Нет. Предварительный расчёт абсолютно безопасен для рейтинга AECB. Официальный запрос отправляется только с вашего письменного согласия.',
        },
        {
          q: 'Доступна ли ипотека в Дубае нерезидентам?',
          a: 'Да. Ряд банков ОАЭ финансируют иностранных покупателей с подтверждённым доходом за рубежом. Свяжитесь с нами для проверки условий под вашу страну.',
        },
        {
          q: 'Каковы основные лимиты ЦБ ОАЭ (CBUAE)?',
          a: 'Максимальная долговая нагрузка (DBR) — 50% дохода, LTV на первое жильё до 80% для экспатов и 85% для граждан ОАЭ (до 5 млн AED), комиссия за досрочное закрытие ограничена 1% или 10 000 AED (+5% НДС).',
        },
        {
          q: 'Как RERA-агенты работают через BetterHub?',
          a: 'Зарегистрируйтесь в BetterHub, чтобы проверять бюджет клиентов до просмотров и отслеживать статус сделки до передачи ключей.',
        },
      ],
    },
    footer: {
      eyebrow: 'Персональный консалтинг 1-на-1 · Дубай',
      heading: 'Нужны точные цифры до подписания договора?',
      sub: 'Свяжитесь с советником Betterway для независимого сравнения 24 банков ОАЭ.',
      cta1: 'Связаться с нами',
      cta2: 'Открыть калькулятор',
      tagline: 'Независимый ипотечный консалтинг в Дубае и ОАЭ по 24 лицензированным банкам.',
      contactTitle: 'Контакты',
      colBuyers: 'Покупателям',
      colTools: 'Калькуляторы и ставки',
      colSuite: 'Платформа Betterway',
    },
  },

  zh: {
    nav: {
      home: '首页',
      about: '关于我们',
      buyers: '购房买家',
      agents: '房产经纪',
      resources: '指南资源',
      login: 'BetterVault',
      contact: '联系我们',
      exit: '退出',
      startCheck: '评估贷款额度',
    },
    hero: {
      eiborLabel: '24家阿联酋持牌银行 · 央行3个月EIBOR',
      watchBriefing: '观看简介',
      priorityDesk: 'BetterDesk',
      title: '对接24家阿联酋持牌银行，清晰规划迪拜房贷。',
      subtitle:
        '签署 Form F 合同前，由迪拜专属顾问一对一为您理清阿联酋央行50%负债比（DBR）、4% DLD过户税费及24家银行书面方案。',
      card1Title: '测算您的贷款额度',
      card1Meta: '60秒免费评估央行50% DBR与24家银行资格',
      card2Title: '规划首付及4% DLD费用',
      card2Meta: '覆盖阿联酋60个永久产权社区的前期资金清单',
      jumpCalc: '房贷与4% DLD计算器 ↓',
      jumpEibor: '央行实时EIBOR利率 →',
      jumpHub: 'RERA经纪人专属 BetterHub →',
    },
    twoCards: {
      eyebrow: '一对一清晰顾问',
      heading: '签署购房合同前，先确认这两项核心数字。',
      sub: '我们坚持简洁透明的顾问方式：先看清核心框架，具体银行审批细节欢迎直接联系迪拜顾问一对一解答。',
      card1Badge: '24家银行中立比对',
      card1Title: '传统银行与伊斯兰银行方案同台对比',
      card1Desc:
        '清晰对比固定利率期、浮动期EIBOR加点、最低利率下限及银行手续费——全程不影响您的AECB信用记录。',
      card1Cta: '开始一对一评估',
      card1Secondary: '浏览24家银行名录',
      card2Badge: 'BetterClose · 过户筹备台',
      card2Title: '预订房源前掌握每一笔首付与税费',
      card2Desc:
        '整合首套成数（外籍最高80% / 阿联酋公民最高85% LTV）、4% DLD注册费、托管费及Form F估值保护条款。',
      card2Cta: '了解 BetterClose',
      card2Secondary: '联系专属顾问',
      moreInfoPrompt: '想根据您的收入结构、签证类型或海外资产定制方案？',
      speakAdvisor: '与迪拜顾问一对一沟通',
    },
    education: {
      eyebrow: '一对一买家指导',
      heading: '从首次咨询到顺利拿钥匙，仅需三步。',
      sub: '告别晦涩术语与隐性转浮动陷阱，顾问全程一对一透明陪同。',
      steps: [
        {
          num: '01',
          title: '明确真实预算上限',
          summary: '看房前核实央行50% DBR与全部前期现金需求。',
          detail: '提前核算信用卡额度折算（按总额度5%计月供）、现有负债及4% DLD过户费。',
        },
        {
          num: '02',
          title: '书面比对24家银行',
          summary: '中立对比传统按揭与伊斯兰住房金融条款。',
          detail: '逐项核查固定期、EIBOR浮动加点、利率下限与提前还款上限。',
        },
        {
          num: '03',
          title: '从容完成DLD过户',
          summary: '涵盖银行估值、正式批复函（FOL）直至领产权证。',
          detail: '统筹Form F保护条款、开发商NOC与过户日银行本票拆分。',
        },
      ],
      cta: '预约一对一顾问讲解',
    },
    calc: {
      eyebrow: '多币种交互计算器',
      heading: '估算您的迪拜房贷月供与前期资金',
      sub: '自由调整房价、首付比例与年限，随时切换币种直观换算。如需精准银行书面报价，请联系我们。',
      tabs: ['阿联酋居民', '阿联酋公民', '海外非居民'],
      priceLabel: '房产总价',
      downLabel: '首付比例',
      tenureLabel: '贷款年限',
      years: '年',
      rateLabel: '参考年利率',
      monthlyLabel: '预估每月还款',
      loanAmount: '贷款本金',
      cashToClose: '预估前期总现金',
      dldLine: '含首付、4% DLD注册费、产权证费、按揭登记费及托管费',
      ctaPrimary: '获取24家银行书面方案',
      ctaSecondary: '联系顾问获取明细',
      fxNotice: '所选币种仅供参考换算；阿联酋房贷合同及DLD税费均以迪拉姆（AED）结算。',
      marqueeTitle: '中立覆盖阿联酋24家持牌传统及伊斯兰银行',
    },
    suite: {
      eyebrow: 'Betterway 专属平台矩阵',
      heading: '为RERA房产机构与按揭团队打造的专属系统。',
      sub: '迪拜本土研发的原创数字化工具，帮助客户与经纪人顺畅完成每一次过户。',
      betterHubTag: 'BetterHub · RERA经纪机构',
      betterHubTitle: '助力每一笔买方交易顺畅抵达DLD过户',
      betterHubDesc: '提供联名贷款测算链接，看房前确认买家支付能力，并实时追踪审批进度。',
      betterHubCta: '了解 BetterHub',
      betterCoreTag: 'BetterCore · 机构运营核心',
      betterCoreTitle: '阿联酋房贷顾问团队的专属操作系统',
      betterCoreDesc: '集成央行KFS合规流程、24家银行政策矩阵与多语种客户协同工作台。',
      betterCoreCta: '了解 BetterCore',
    },
    team: {
      eyebrow: '迪拜 Oud Metha 总部团队',
      heading: '迪拜真人专家团队，一对一全程护航。',
      sub: '由创始人兼董事总经理 Warda Kapadia 与执行董事 Shabib Siraj 领衔，团队亲自为您对接银行审批。',
      cta: '查看完整管理层与团队',
    },
    faq: {
      eyebrow: '核心问答',
      heading: '买家最常问的五个问题',
      sub: '基于阿联酋央行与迪拜土地局（DLD）现行规定。如需针对个人情况深入咨询，请直接联系我们。',
      cta1: '开始资格评估',
      cta2: '一对一联系顾问',
      items: [
        {
          q: '通过 Betterway 申请与直接找单一银行有何区别？',
          a: '单一银行只提供自家政策；Betterway 中立比对24家阿联酋持牌银行，在递交申请前把固定期后EIBOR加点、利率下限和费用全部摊开比较。',
        },
        {
          q: '在网站测算贷款额度会影响我的AECB信用分吗？',
          a: '不会。所有前期评估与计算均不触发征信查询；只有在您书面授权正式向银行递交申请时才会调取AECB报告。',
        },
        {
          q: '海外非居民买家可以在迪拜申请房贷吗？',
          a: '可以。多家阿联酋银行支持25个以上国家及地区的海外受薪或企业主买家，请联系我们确认您所在地区的贷款成数与材料清单。',
        },
        {
          q: '阿联酋央行（CBUAE）的核心房贷规定是什么？',
          a: '月负债比（DBR）上限为月收入的50%；500万迪拉姆以下首套房外籍最高贷80%、本地公民最高85%；提前还款违约金法定上限为余额1%或10,000迪拉姆（另加5% VAT），取较低者。',
        },
        {
          q: 'RERA房产经纪人如何加入 BetterHub？',
          a: '注册 BetterHub 即可为买家提供联名预算工具，看房前锁定融资能力并追踪过户节点。',
        },
      ],
    },
    footer: {
      eyebrow: '迪拜一对一专属顾问 · Oud Metha',
      heading: '签约前，先把每一笔账算清楚。',
      sub: '直接联系 Betterway 迪拜顾问，获取针对您条件的24家银行中立对比方案。',
      cta1: '立即联系我们',
      cta2: '使用计算器',
      tagline: '迪拜独立房贷顾问，中立对接24家阿联酋持牌银行，提供一对一专业指导。',
      contactTitle: '联系方式',
      colBuyers: '购房买家',
      colTools: '计算器与利率',
      colSuite: 'Betterway 平台',
    },
  },

  fr: {
    nav: {
      home: 'Accueil',
      about: 'À propos',
      buyers: 'Acheteurs',
      agents: 'Courtiers',
      resources: 'Ressources',
      login: 'BetterVault',
      contact: 'Contactez-nous',
      exit: 'Quitter',
      startCheck: 'Évaluer ma capacité',
    },
    hero: {
      eiborLabel: '24 banques EAU · EIBOR 3M CBUAE',
      watchBriefing: 'Voir la présentation',
      priorityDesk: 'BetterDesk',
      title: 'Financement immobilier structuré aux Émirats, auprès de 24 banques.',
      subtitle:
        'Clarifiez votre plafond DBR de 50 %, vos frais DLD de 4 % et vos offres parmi 24 banques lors d’un accompagnement individuel à Dubaï avant de signer.',
      card1Title: 'Vérifier votre capacité d’emprunt',
      card1Meta: 'Bilan gratuit 50 % DBR & 24 banques en 60 secondes',
      card2Title: 'Planifier apport & frais DLD 4 %',
      card2Meta: 'Estimez l’apport initial dans 60 quartiers freehold',
      jumpCalc: 'Simulateur crédit & 4 % DLD ↓',
      jumpEibor: 'Taux EIBOR CBUAE →',
      jumpHub: 'BetterHub pour agences RERA →',
    },
    twoCards: {
      eyebrow: 'Clarté en tête-à-tête',
      heading: 'Deux chiffres essentiels avant de signer le Form F.',
      sub: 'Nous gardons le conseil simple et transparent. Vérifiez l’essentiel ici, puis échangez en direct avec votre conseiller dédié à Dubaï pour votre dossier sur mesure.',
      card1Badge: 'Bureau comparatif 24 banques',
      card1Title: 'Comparez banques conventionnelles et islamiques',
      card1Desc:
        'Périodes fixes, marges de révision EIBOR, taux planchers et frais bancaires présentés clairement — sans impact sur votre score AECB.',
      card1Cta: 'Démarrer le bilan 1-à-1',
      card1Secondary: 'Voir les 24 banques',
      card2Badge: 'BetterClose · Bureau de clôture',
      card2Title: 'Anticipez chaque dirham d’apport et de frais DLD',
      card2Desc:
        'Combinez apport minimal (80 % LTV résident / 85 % émirien), 4 % DLD, frais de trustee et clauses de protection d’évaluation.',
      card2Cta: 'Découvrir BetterClose',
      card2Secondary: 'Contacter un conseiller',
      moreInfoPrompt: 'Besoin d’une étude personnalisée selon vos revenus ou votre résidence fiscale ?',
      speakAdvisor: 'Parler en 1-à-1 avec notre équipe à Dubaï',
    },
    education: {
      eyebrow: 'Accompagnement individuel',
      heading: 'Trois étapes limpides jusqu’à la remise des clés.',
      sub: 'Zéro jargon, zéro surprise après taux fixe. Votre conseiller vous guide personnellement.',
      steps: [
        {
          num: '01',
          title: 'Validez votre budget réel',
          summary: 'Vérifiez votre plafond DBR de 50 % et vos frais de clôture.',
          detail: 'Prise en compte des plafonds de cartes bancaires (5 %/mois), prêts existants et 4 % DLD avant vos visites.',
        },
        {
          num: '02',
          title: 'Comparez 24 offres écrites',
          summary: 'Analyse neutre des banques conventionnelles et islamiques.',
          detail: 'Revue des taux fixes, marges EIBOR post-fixe, planchers et plafonds de remboursement anticipé.',
        },
        {
          num: '03',
          title: 'Concluez sereinement au DLD',
          summary: 'De l’expertise bancaire et Final Offer Letter au titre de propriété.',
          detail: 'Coordination Form F, NOC promoteur et chèques de banque jusqu’au transfert.',
        },
      ],
      cta: 'Réserver un entretien 1-à-1',
    },
    calc: {
      eyebrow: 'Simulateur multi-devises',
      heading: 'Estimez votre prêt immobilier aux Émirats',
      sub: 'Ajustez le prix, l’apport et la durée, puis changez de devise instantanément. Contactez-nous pour des grilles bancaires exactes.',
      tabs: ['Résident EAU', 'Citoyen EAU', 'Non-résident'],
      priceLabel: 'Prix du bien',
      downLabel: 'Apport initial',
      tenureLabel: 'Durée du prêt',
      years: 'ans',
      rateLabel: 'Taux annuel indicatif',
      monthlyLabel: 'Mensualité estimée',
      loanAmount: 'Montant financé',
      cashToClose: 'Liquidités initiales estimées',
      dldLine: 'Inclut apport, 4 % DLD, titre, enregistrement hypothécaire et frais trustee',
      ctaPrimary: 'Obtenir des offres de 24 banques',
      ctaSecondary: 'Nous contacter pour le détail',
      fxNotice: 'Conversion indicative dans la devise choisie. Les prêts et frais DLD aux EAU sont réglés en AED.',
      marqueeTitle: 'Comparaison indépendante de 24 banques agréées aux Émirats',
    },
    suite: {
      eyebrow: 'Suite exclusive Betterway',
      heading: 'Des plateformes dédiées aux agences RERA et conseillers.',
      sub: 'Technologies propriétaires conçues à Dubaï pour sécuriser chaque dossier jusqu’au transfert.',
      betterHubTag: 'BetterHub · Agences RERA',
      betterHubTitle: 'Sécurisez chaque vente jusqu’au transfert DLD',
      betterHubDesc:
        'Outils co-brandés, validation du financement avant les visites et suivi transparent des étapes clés.',
      betterHubCta: 'Découvrir BetterHub',
      betterCoreTag: 'BetterCore · Infrastructure métier',
      betterCoreTitle: 'Le système d’exploitation des équipes crédit aux EAU',
      betterCoreDesc:
        'Processus CBUAE KFS, matrice 24 banques et parcours clients multilingues unifiés.',
      betterCoreCta: 'Découvrir BetterCore',
    },
    team: {
      eyebrow: 'Notre bureau d’Oud Metha, Dubaï',
      heading: 'Une équipe humaine dédiée du premier appel aux clés.',
      sub: 'Dirigée par la fondatrice Warda Kapadia et le directeur exécutif Shabib Siraj, notre équipe pilote chaque négociation bancaire.',
      cta: 'Rencontrer toute l’équipe',
    },
    faq: {
      eyebrow: 'Réponses directes',
      heading: 'Les questions clés avant d’emprunter',
      sub: 'Des repères fondés sur les règles CBUAE et DLD. Pour un avis adapté à votre dossier, contactez-nous.',
      cta1: 'Vérifier mon éligibilité',
      cta2: 'Nous contacter 1-à-1',
      items: [
        {
          q: 'Pourquoi passer par Betterway plutôt que par une seule banque ?',
          a: 'Une banque ne présente que ses propres critères. Betterway compare de manière neutre 24 banques agréées aux EAU — incluant marges EIBOR post-fixe et frais réels.',
        },
        {
          q: 'La vérification d’éligibilité affecte-t-elle mon score AECB ?',
          a: 'Non. Nos simulateurs n’ont aucun impact sur votre dossier AECB. Une demande officielle n’est lancée qu’avec votre accord écrit.',
        },
        {
          q: 'Les non-résidents peuvent-ils emprunter à Dubaï ?',
          a: 'Oui. Plusieurs banques aux EAU financent les acheteurs internationaux dans plus de 25 pays. Contactez-nous pour valider le LTV applicable.',
        },
        {
          q: 'Quelles sont les règles principales de la Banque centrale (CBUAE) ?',
          a: 'Taux d’endettement (DBR) plafonné à 50 %, financement premier bien jusqu’à 80 % (expatriés) ou 85 % (émiriens) jusqu’à 5 M AED, et pénalité de remboursement anticipé plafonnée à 1 % ou 10 000 AED (+5 % TVA).',
        },
        {
          q: 'Comment les courtiers RERA collaborent-ils via BetterHub ?',
          a: 'Inscrivez votre agence sur BetterHub pour vérifier la capacité de vos acheteurs avant les visites et suivre chaque transfert.',
        },
      ],
    },
    footer: {
      eyebrow: 'Conseil 1-à-1 · Oud Metha, Dubaï',
      heading: 'Prêt à clarifier vos chiffres avant de signer ?',
      sub: 'Échangez directement avec un conseiller Betterway pour comparer 24 banques aux EAU.',
      cta1: 'Nous contacter',
      cta2: 'Lancer le simulateur',
      tagline: 'Conseil indépendant en prêt immobilier à Dubaï et aux EAU auprès de 24 banques agréées.',
      contactTitle: 'Contact',
      colBuyers: 'Acheteurs',
      colTools: 'Simulateurs & Taux',
      colSuite: 'Suite Betterway',
    },
  },

  es: {
    nav: {
      home: 'Inicio',
      about: 'Nosotros',
      buyers: 'Compradores',
      agents: 'Agentes',
      resources: 'Recursos',
      login: 'BetterVault',
      contact: 'Contáctanos',
      exit: 'Salir',
      startCheck: 'Ver capacidad',
    },
    hero: {
      eiborLabel: '24 bancos EAU · CBUAE 3M EIBOR',
      watchBriefing: 'Ver resumen',
      priorityDesk: 'BetterDesk',
      title: 'Hipotecas estructuradas en EAU en 24 bancos con licencia.',
      subtitle:
        'Confirma tu límite 50 % DBR del Banco Central, el 4 % de registro DLD y las condiciones de 24 bancos con un asesor personal en Dubái antes de firmar.',
      card1Title: 'Calcula tu capacidad de préstamo',
      card1Meta: 'Evaluación gratuita de 50 % DBR y 24 bancos en 60 segundos',
      card2Title: 'Planifica entrada y gastos 4 % DLD',
      card2Meta: 'Calcula el efectivo inicial en 60 zonas freehold de EAU',
      jumpCalc: 'Calculadora hipotecaria y 4 % DLD ↓',
      jumpEibor: 'Tasas CBUAE EIBOR →',
      jumpHub: 'BetterHub para agentes RERA →',
    },
    twoCards: {
      eyebrow: 'Claridad uno a uno',
      heading: 'Dos cifras clave que confirmar antes de firmar Form F.',
      sub: 'Hacemos la financiación sencilla y directa. Revisa lo esencial aquí y habla con nuestro equipo en Dubái para recibir tu estudio a medida.',
      card1Badge: 'Mesa de 24 bancos de EAU',
      card1Title: 'Compara bancos convencionales e islámicos sin sesgo',
      card1Desc:
        'Revisa periodos fijos, márgenes EIBOR posteriores, suelos mínimos y comisiones bancarias — sin afectar tu historial AECB.',
      card1Cta: 'Iniciar evaluación 1-a-1',
      card1Secondary: 'Ver los 24 bancos',
      card2Badge: 'BetterClose · Mesa de cierre',
      card2Title: 'Conoce cada dirham de entrada y gastos DLD',
      card2Desc:
        'Combina porcentajes de entrada (80 % LTV residentes / 85 % nacionales), 4 % DLD, trustee y cláusulas de protección de tasación.',
      card2Cta: 'Explorar BetterClose',
      card2Secondary: 'Hablar con un asesor',
      moreInfoPrompt: '¿Necesitas orientación específica según tus ingresos o país de residencia?',
      speakAdvisor: 'Habla 1-a-1 con nuestra oficina en Dubái',
    },
    education: {
      eyebrow: 'Orientación personalizada 1-a-1',
      heading: 'Tres pasos claros desde tu primera consulta hasta las llaves.',
      sub: 'Sin letra pequeña ni tecnicismos. Tu asesor te acompaña personalmente en cada etapa.',
      steps: [
        {
          num: '01',
          title: 'Confirma tu límite real',
          summary: 'Verificamos el tope 50 % DBR y el efectivo inicial necesario.',
          detail: 'Revisamos límites de tarjetas (calculados al 5 % mensual), deudas activas y el 4 % DLD antes de visitar.',
        },
        {
          num: '02',
          title: 'Compara 24 bancos por escrito',
          summary: 'Mesa neutral de financiación convencional e islámica.',
          detail: 'Contrastamos tramos fijos, márgenes EIBOR, mínimos y límites legales de cancelación anticipada.',
        },
        {
          num: '03',
          title: 'Cierra con calma en DLD',
          summary: 'Desde la tasación y Final Offer Letter hasta el Title Deed.',
          detail: 'Coordinamos cláusulas Form F, NOC del promotor y cheques el día del traspaso.',
        },
      ],
      cta: 'Reservar sesión 1-a-1',
    },
    calc: {
      eyebrow: 'Planificador multidivisa',
      heading: 'Estima tu hipoteca en EAU y efectivo inicial',
      sub: 'Ajusta precio, entrada y plazo — cambia de moneda en tiempo real. Contáctanos para recibir ofertas bancarias escritas.',
      tabs: ['Residente EAU', 'Nacional EAU', 'No residente'],
      priceLabel: 'Precio de la propiedad',
      downLabel: 'Pago inicial',
      tenureLabel: 'Plazo del préstamo',
      years: 'años',
      rateLabel: 'Tasa anual orientativa',
      monthlyLabel: 'Cuota mensual estimada',
      loanAmount: 'Importe financiado',
      cashToClose: 'Efectivo inicial estimado',
      dldLine: 'Incluye entrada, 4 % DLD, título, registro hipotecario y trustee',
      ctaPrimary: 'Solicitar estudio de 24 bancos',
      ctaSecondary: 'Contáctanos para el detalle',
      fxNotice: 'Conversión orientativa en la divisa elegida. Las hipotecas y tasas DLD en EAU se liquidan en AED.',
      marqueeTitle: 'Comparación independiente de 24 bancos autorizados en EAU',
    },
    suite: {
      eyebrow: 'Suite exclusiva Betterway',
      heading: 'Plataformas propias para agencias RERA y equipos hipotecarios.',
      sub: 'Tecnología original desarrollada en Dubái para cerrar operaciones con claridad.',
      betterHubTag: 'BetterHub · Agencias RERA',
      betterHubTitle: 'Lleva cada compra hasta el traspaso en DLD',
      betterHubDesc:
        'Enlaces co-brandeados, validación de solvencia antes de visitas y seguimiento en vivo de cada expediente.',
      betterHubCta: 'Explorar BetterHub',
      betterCoreTag: 'BetterCore · Infraestructura operativa',
      betterCoreTitle: 'Sistema operativo para especialistas hipotecarios en EAU',
      betterCoreDesc:
        'Flujos CBUAE KFS, matriz de 24 bancos y experiencia multilingüe centralizada.',
      betterCoreCta: 'Explorar BetterCore',
    },
    team: {
      eyebrow: 'Nuestro equipo en Oud Metha, Dubái',
      heading: 'Personas reales guiándote 1-a-1 hasta la entrega de llaves.',
      sub: 'Liderados por la fundadora y directora general Warda Kapadia y el director ejecutivo Shabib Siraj.',
      cta: 'Conocer al equipo completo',
    },
    faq: {
      eyebrow: 'Respuestas claras',
      heading: 'Preguntas frecuentes de compradores',
      sub: 'Información basada en normativa CBUAE y DLD. ¿Buscas un cálculo personalizado? Contáctanos directamente.',
      cta1: 'Evaluar elegibilidad',
      cta2: 'Contáctanos 1-a-1',
      items: [
        {
          q: '¿Por qué elegir Betterway en lugar de acudir a un solo banco?',
          a: 'Un banco solo muestra sus propias reglas. Betterway compara de forma neutral 24 bancos autorizados en EAU, incluyendo márgenes EIBOR tras el tramo fijo y todas las comisiones.',
        },
        {
          q: '¿Afecta la comprobación inicial a mi historial crediticio AECB?',
          a: 'No. Nuestras herramientas son informativas y tienen cero impacto en AECB. Solo se solicita informe cuando autorizas formalmente una solicitud.',
        },
        {
          q: '¿Pueden los no residentes obtener hipoteca en Dubái?',
          a: 'Sí. Diversos bancos en EAU financian compradores internacionales en más de 25 países. Contáctanos para confirmar porcentaje LTV y documentación.',
        },
        {
          q: '¿Cuáles son las normas clave del Banco Central de EAU (CBUAE)?',
          a: 'Ratio de endeudamiento (DBR) máximo del 50 %, primera vivienda hasta 80 % LTV para expatriados y 85 % para nacionales (hasta 5 M AED), y comisión de cancelación anticipada limitada al 1 % o 10 000 AED (+5 % IVA).',
        },
        {
          q: '¿Cómo colaboran los agentes RERA con BetterHub?',
          a: 'Regístrate en BetterHub para validar el presupuesto de tus compradores antes de las visitas y seguir cada expediente hasta DLD.',
        },
      ],
    },
    footer: {
      eyebrow: 'Asesoría personal 1-a-1 · Oud Metha, Dubái',
      heading: '¿Listo para cifras claras antes de firmar?',
      sub: 'Habla directamente con un asesor de Betterway para comparar 24 bancos en EAU.',
      cta1: 'Contáctanos hoy',
      cta2: 'Abrir calculadora',
      tagline: 'Asesoría hipotecaria independiente en Dubái y EAU comparando 24 bancos con trato humano 1-a-1.',
      contactTitle: 'Contacto',
      colBuyers: 'Compradores',
      colTools: 'Calculadoras y tasas',
      colSuite: 'Suite Betterway',
    },
  },
};
