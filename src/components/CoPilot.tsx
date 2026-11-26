'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, MessageCircle, Send, Sparkles, X } from 'lucide-react';
import { cashToClose, borrowingPower, earlySettlementFee } from '@/lib/math';
import { waLink } from '@/data/site';
import { SPRING_INSTITUTIONAL } from '@/components/ui/MotionPrimitives';
import { useLocaleCurrency } from '@/components/LocaleCurrencyContext';
import { COPILOT_I18N } from '@/data/i18n-extended';

const aed = (n: number) => `AED ${Math.round(n).toLocaleString('en-US')}`;

type Msg = { id: string; from: 'bot' | 'me'; text: string; link?: { href: string; label: string } };

type IntentItem = { chip: string; answer: () => Omit<Msg, 'id'> };

const EN_INTENTS: IntentItem[] = [
  {
    chip: 'Upfront fees on an AED 2.5M purchase?',
    answer: () => {
      const c = cashToClose({ price: 2_500_000, downPct: 20 });
      return {
        from: 'bot',
        text: `At a 20% down payment (${aed(c.down)}), statutory Dubai purchase costs include ${aed(c.dld)} DLD transfer & title deed, ${aed(c.mortgageReg)} mortgage registration, AED 4,200 trustee fee, AED 3,150 valuation allowance, and ${aed(c.agencyFee)} agency commission — bringing total cash to close to ${aed(c.total)}.`,
        link: { href: '/calculators/mortgage-calculator', label: 'Model your own purchase' },
      };
    },
  },
  {
    chip: 'How does the 50% DBR cap work?',
    answer: () => {
      const r = borrowingPower({ salary: 35_000, existingEmis: 0, cardLimits: 50_000, years: 25 });
      return {
        from: 'bot',
        text: `Under CBUAE rules, total monthly debt obligations cannot exceed 50% of gross income. On an illustrative AED 35,000 salary with AED 50,000 in credit card limits (assessed at 5%), monthly mortgage capacity is ${aed(r.available)}/mo.`,
        link: { href: '/calculators/dbr-borrowing-power', label: 'Run the DBR calculator' },
      };
    },
  },
  {
    chip: 'What is the early-settlement fee cap?',
    answer: () => ({
      from: 'bot',
      text: `CBUAE regulations cap the early-settlement or buyout exit fee at 1% of the outstanding principal or AED 10,000, whichever is lower, plus 5% VAT (up to ${aed(earlySettlementFee(1e9))}). Always check valuation, registration and processing fees before switching.`,
      link: { href: '/calculators/buyout-refinance-savings', label: 'Compare buyout costs' },
    }),
  },
  {
    chip: 'Golden Visa with a mortgaged home?',
    answer: () => ({
      from: 'bot',
      text: 'Properties meeting the AED 2,000,000 statutory value threshold on a Dubai Title Deed, Oqood or DLD valuation may be submitted for residency consideration with a lender NOC. Confirm current fees and eligibility directly with DLD and ICP/GDRFA.',
      link: { href: '/mortgages/golden-visa-mortgage', label: 'Golden Visa mortgage guide' },
    }),
  },
];

const AR_INTENTS: IntentItem[] = [
  {
    chip: 'ما هي الرسوم المقدمة لعقار بقيمة 2.5 مليون درهم؟',
    answer: () => {
      const c = cashToClose({ price: 2_500_000, downPct: 20 });
      return {
        from: 'bot',
        text: `عند دفعة أولى 20% (${aed(c.down)})، تشمل التكاليف التنظيمية في دبي ${aed(c.dld)} رسوم دائرة الأراضي وإصدار سند الملكية، و${aed(c.mortgageReg)} رسوم تسجيل الرهن، و4,200 درهم رسوم أمين التسجيل، و3,150 درهم تقدير للتقييم، ليصل إجمالي النقد المطلوب عند النقل إلى ${aed(c.total)}.`,
        link: { href: '/ar#calculators', label: 'افتح حاسبة التمويل' },
      };
    },
  },
  {
    chip: 'كيف يعمل سقف الاستقطاع 50% (DBR)؟',
    answer: () => {
      const r = borrowingPower({ salary: 35_000, existingEmis: 0, cardLimits: 50_000, years: 25 });
      return {
        from: 'bot',
        text: `وفق أنظمة المصرف المركزي الإماراتي، لا يجوز أن تتجاوز التزامات الديون الشهرية 50% من الدخل الشهري. لراتب استرشادي 35,000 درهم وحد بطاقات ائتمانية 50,000 درهم (يُحتسب 5% منها)، تبلغ القدرة الشهرية للتمويل العقاري ${aed(r.available)} شهرياً.`,
        link: { href: '/ar/calculators/dbr-borrowing-power', label: 'احسب نسبة الاستقطاع' },
      };
    },
  },
  {
    chip: 'ما هو سقف رسوم السداد المبكر أو إعادة التمويل؟',
    answer: () => ({
      from: 'bot',
      text: `يحدد المصرف المركزي رسوم السداد المبكر أو نقل الرهن بنسبة 1% من الرصيد المتبقي أو 10,000 درهم أيهما أقل، مضافاً إليها 5% ضريبة القيمة المضافة (بحد أقصى ${aed(earlySettlementFee(1e9))}).`,
      link: { href: '/ar/calculators/buyout-refinance-savings', label: 'قارن تكلفة إعادة التمويل' },
    }),
  },
  {
    chip: 'هل يؤهل العقار الممول للإقامة الذهبية؟',
    answer: () => ({
      from: 'bot',
      text: 'يمكن التقدم بطلب الإقامة الذهبية للعقار الذي تبلغ قيمته 2,000,000 درهم فأكثر في سند الملكية أو عقود (Oqood) مع خطاب عدم ممانعة من البنك الممول وفق ضوابط دائرة الأراضي والإقامة.',
      link: { href: '/ar/mortgages/golden-visa-mortgage', label: 'دليل الإقامة الذهبية' },
    }),
  },
];

export default function CoPilot({
  embedded = false,
  onNavigate,
}: {
  embedded?: boolean;
  onNavigate?: () => void;
}) {
  const { locale } = useLocaleCurrency();
  const cp = COPILOT_I18N[locale] ?? COPILOT_I18N.en;
  const intents = locale === 'ar' ? AR_INTENTS : EN_INTENTS;
  const [open, setOpen] = useState(embedded);
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (embedded || !open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [embedded, open]);

  const [msgs, setMsgs] = useState<Msg[]>([{ id: 'welcome', from: 'bot', text: cp.welcome }]);

  useEffect(() => {
    setMsgs((prev) =>
      prev.length === 1 && prev[0].id === 'welcome'
        ? [{ id: 'welcome', from: 'bot', text: cp.welcome }]
        : prev,
    );
  }, [cp.welcome]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [msgs]);

  const ask = (intent: IntentItem) => {
    const stamp = `${Date.now()}-${Math.random()}`;
    setMsgs((m) => [
      ...m,
      { id: `me-${stamp}`, from: 'me', text: intent.chip },
      { id: `bot-${stamp}`, ...intent.answer() },
    ]);
  };

  const body = (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-[#f7f8fa] p-4 text-[13px]">
        {msgs.map((m) => (
          <motion.div
            key={m.id}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
            className={`max-w-[88%] rounded-[14px] px-3.5 py-2.5 ${
              m.from === 'bot'
                ? 'border border-[#e3e7ee] bg-white text-[#0b1320]'
                : 'ms-auto bg-[#070e1a] text-white'
            }`}
          >
            <p className="leading-relaxed">{m.text}</p>
            {m.link && (
              <Link
                href={m.link.href}
                className="mt-2 inline-flex items-center gap-1 font-semibold text-[#0e6954] hover:underline"
                onClick={() => {
                  setOpen(false);
                  onNavigate?.();
                }}
              >
                {m.link.label} <ArrowRight size={12} className="rtl:rotate-180" />
              </Link>
            )}
          </motion.div>
        ))}
      </div>

      <div className="border-t border-[#e3e7ee] bg-white p-3.5">
        <div className="mb-3 flex flex-wrap gap-1.5">
          {intents.map((i) => (
            <button
              key={i.chip}
              type="button"
              className="rounded-full border border-[#d6dce6] bg-[#f7f8fa] px-3 py-1.5 text-start text-[11.5px] font-medium text-[#070e1a] transition hover:border-[#070e1a] hover:bg-white cursor-pointer"
              onClick={() => ask(i)}
            >
              {i.chip}
            </button>
          ))}
        </div>
        <a
          href={waLink(
            locale === 'ar'
              ? 'مرحباً بيترواي، لدي استفسار حول التمويل العقاري.'
              : 'Hi Betterway, I have a mortgage question.',
          )}
          rel="noopener"
          className="homy-btn bw-btn--sm w-full justify-between"
        >
          <span className="inline-flex items-center gap-2">
            <MessageCircle size={14} /> {cp.askAdvisor}
          </span>
          <span className="homy-btn__disc !h-6 !w-6" aria-hidden="true">
            <Send size={11} />
          </span>
        </a>
      </div>
    </div>
  );

  if (embedded) return body;

  return (
    <div className="fixed bottom-4 end-4 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            key="bw-copilot-dialog"
            initial={reduce ? false : { opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 12, scale: 0.97 }}
            transition={reduce ? { duration: 0 } : SPRING_INSTITUTIONAL}
            role="dialog"
            aria-label="Mortgage assistant guide"
            className="mb-3 flex h-[min(540px,78dvh)] w-[min(392px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[20px] border border-[#e3e7ee] bg-white shadow-[0_32px_80px_-24px_rgba(7,14,26,0.42)]"
          >
            <div className="flex items-center justify-between bg-[#070e1a] px-5 py-4 text-white">
              <div className="flex items-center gap-2.5">
                <img src="/brand/icon.png" alt="" width={26} height={26} className="h-6 w-6 shrink-0 object-contain" />
                <div>
                  <p className="font-display text-sm font-semibold leading-tight text-white">{cp.title}</p>
                  <p className="text-[11px] text-white/60">{cp.subtitle}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close guide"
                className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 text-white hover:bg-white/20 cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>
            {body}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="homy-btn !h-11 !rounded-full !px-4 !text-xs shadow-lg"
      >
        <Sparkles size={14} className="text-[#34dfac]" />
        <span className="hidden sm:inline">{cp.launcher}</span>
        <span className="sm:hidden">{cp.mobileLauncher}</span>
      </button>
    </div>
  );
}
