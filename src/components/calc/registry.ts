// Declarative calculator definitions: user inputs + statutory CBUAE / DLD compute helpers.
import * as M from '@/lib/math';

export type L = { en: string; ar: string };
export type Input = { k: string; label: L; def: number; min: number; max: number; step: number; unit: 'AED' | '%' | 'yrs' | ''; options?: { v: number; label: L }[] };
export type Row = { label: L; v: number | string; f?: 'aed' | 'pct' | 'mo' | 'raw' | 'yrs'; strong?: boolean };
export type Out = { hero: Row; rows: Row[]; bars?: { label: string; v: number; hl?: boolean }[]; text?: string; note?: L };
export type CalcDef = { inputs: Input[]; compute: (v: Record<string, number>) => Out };

const l = (en: string, ar: string): L => ({ en, ar });
const price = (def = 2_000_000): Input => ({ k: 'price', label: l('Property price', 'سعر العقار'), def, min: 300_000, max: 30_000_000, step: 50_000, unit: 'AED' });
const rate = (def = 4.25): Input => ({ k: 'rate', label: l('Annual rate (from offer)', 'المعدل السنوي (حسب العرض)'), def, min: 2, max: 9, step: 0.05, unit: '%' });
const years = (def = 25): Input => ({ k: 'years', label: l('Tenure', 'المدة'), def, min: 5, max: 25, step: 1, unit: 'yrs' });
const yesNo = (k: string, label: L, def: number): Input => ({ k, label, def, min: 0, max: 1, step: 1, unit: '', options: [{ v: 1, label: l('Yes', 'نعم') }, { v: 0, label: l('No', 'لا') }] });

export const CALCS: Record<string, CalcDef> = {
  'mortgage-calculator': {
    inputs: [
      price(),
      { k: 'down', label: l('Down payment', 'الدفعة الأولى'), def: 20, min: 15, max: 80, step: 1, unit: '%' },
      rate(),
      years(),
      yesNo('agency', l('Agency commission (2%)', 'عمولة الوسيط (2%)'), 1),
    ],
    compute: (v) => {
      const c = M.cashToClose({ price: v.price, downPct: v.down, agency: !!v.agency });
      const e = M.emi(c.loan, v.rate, v.years);
      return {
        hero: { label: l('Estimated monthly payment', 'القسط الشهري التقديري'), v: e, f: 'mo' },
        rows: [
          { label: l('Loan amount', 'مبلغ التمويل'), v: c.loan, f: 'aed' },
          { label: l('Down payment', 'الدفعة الأولى'), v: c.down, f: 'aed' },
          { label: l('DLD 4% + AED 580 title deed', 'رسوم دائرة الأراضي 4% + 580'), v: c.dld, f: 'aed' },
          { label: l('Mortgage registration 0.25% + AED 290', 'تسجيل الرهن 0.25% + 290'), v: c.mortgageReg, f: 'aed' },
          { label: l('Trustee fee (incl. VAT)', 'رسوم أمين التسجيل'), v: c.trustee, f: 'aed' },
          { label: l('Valuation allowance (incl. VAT)', 'مخصص التقييم'), v: c.valuation, f: 'aed' },
          { label: l('Agency 2% + VAT', 'عمولة الوسيط'), v: c.agencyFee, f: 'aed' },
          { label: l('Total cash to close', 'إجمالي النقد المطلوب'), v: c.total, f: 'aed', strong: true },
          { label: l('Total interest over term', 'إجمالي الفائدة'), v: e * v.years * 12 - c.loan, f: 'aed' },
        ],
        note: l('Adjust the rate slider to match a written bank offer.', 'عدّل شريط المعدل ليطابق العرض المكتوب من البنك.'),
      };
    },
  },
  'dbr-borrowing-power': {
    inputs: [
      { k: 'salary', label: l('Gross monthly salary', 'الراتب الشهري الإجمالي'), def: 35_000, min: 10_000, max: 300_000, step: 1000, unit: 'AED' },
      { k: 'emis', label: l('Existing loan payments / month', 'أقساط القروض الحالية'), def: 2_000, min: 0, max: 100_000, step: 500, unit: 'AED' },
      { k: 'cards', label: l('Total credit card limits', 'إجمالي حدود البطاقات'), def: 80_000, min: 0, max: 1_000_000, step: 5000, unit: 'AED' },
      years(),
      {
        k: 'cc',
        label: l('Card-limit assessment', 'احتساب حدود البطاقات'),
        def: 5,
        min: 3,
        max: 5,
        step: 2,
        unit: '',
        options: [
          { v: 5, label: l('5% of limit (standard)', '5% من الحد (القياسي)') },
          { v: 3, label: l('3% of limit (if confirmed by lender)', '3% من الحد (حسب سياسة البنك)') },
        ],
      },
    ],
    compute: (v) => {
      const r = M.borrowingPower({ salary: v.salary, existingEmis: v.emis, cardLimits: v.cards, ccFactor: v.cc as 3 | 5, years: v.years });
      const noCards = M.borrowingPower({ salary: v.salary, existingEmis: v.emis, cardLimits: 0, ccFactor: 5, years: v.years });
      return {
        hero: { label: l('Indicative maximum loan', 'الحد الأقصى التقديري للتمويل'), v: r.maxLoan, f: 'aed' },
        rows: [
          { label: l('50% CBUAE DBR ceiling / month', 'سقف عبء الدين 50% شهرياً'), v: r.capacity, f: 'aed' },
          { label: l('Assessed card-limit obligation / month', 'الالتزام المحتسب للبطاقات شهرياً'), v: r.cardHit, f: 'aed' },
          { label: l('Available monthly mortgage capacity', 'المتاح لقسط التمويل الشهري'), v: r.available, f: 'aed' },
          { label: l('Indicative property budget at 80% LTV', 'سعر العقار التقديري عند 80%'), v: r.maxLoan / 0.8, f: 'aed', strong: true },
          { label: l('Additional capacity if card limits closed', 'قدرة إضافية عند إغلاق البطاقات'), v: Math.max(0, noCards.maxLoan - r.maxLoan), f: 'aed' },
        ],
        note: l('Modelled under the 50% CBUAE DBR ceiling using an illustrative stress rate. Individual banks apply their own stress rates and income multiples.', 'محسوب وفق سقف عبء الدين 50% من المصرف المركزي. يطبق كل بنك معدل اختبار وسياسة ائتمان خاصة به.'),
      };
    },
  },
  'fixed-to-revert-analyzer': {
    inputs: [
      { k: 'loan', label: l('Loan amount', 'مبلغ التمويل'), def: 1_500_000, min: 300_000, max: 20_000_000, step: 50_000, unit: 'AED' },
      years(),
      { k: 'intro', label: l('Introductory fixed rate', 'المعدل الثابت الأولي'), def: 4.0, min: 2, max: 8, step: 0.05, unit: '%' },
      {
        k: 'fixedYrs',
        label: l('Fixed period', 'فترة التثبيت'),
        def: 2,
        min: 1,
        max: 5,
        step: 1,
        unit: '',
        options: [
          { v: 1, label: l('1 yr', 'سنة') },
          { v: 2, label: l('2 yrs', 'سنتان') },
          { v: 3, label: l('3 yrs', '3 سنوات') },
          { v: 5, label: l('5 yrs', '5 سنوات') },
        ],
      },
      { k: 'eibor', label: l('3M EIBOR assumption', 'افتراض إيبور 3 أشهر'), def: 4.21, min: 1.5, max: 7, step: 0.05, unit: '%' },
      { k: 'margin', label: l('Bank revert margin', 'هامش البنك بعد التثبيت'), def: 1.5, min: 0.5, max: 3.5, step: 0.05, unit: '%' },
      { k: 'floor', label: l('Minimum floor rate', 'الحد الأدنى للمعدل'), def: 3.0, min: 0, max: 6, step: 0.25, unit: '%' },
    ],
    compute: (v) => {
      const r = M.fixedThenRevert(v.loan, v.years, v.intro, v.fixedYrs, v.eibor, v.margin, v.floor, 5);
      return {
        hero: { label: l('Post-revert monthly payment', 'القسط الشهري بعد انتهاء التثبيت'), v: r.revertEmi, f: 'mo' },
        rows: [
          { label: l('Introductory monthly payment', 'القسط الشهري خلال فترة التثبيت'), v: r.introEmi, f: 'mo' },
          { label: l('Monthly payment change at revert', 'التغير الشهري عند العودة لإيبور'), v: r.revertEmi - r.introEmi, f: 'mo', strong: true },
          { label: l('Effective revert rate', 'معدل المتغير الفعلي'), v: r.revertRate, f: 'pct' },
          { label: l('5-year cumulative interest', 'إجمالي الفائدة خلال 5 سنوات'), v: r.cost, f: 'aed' },
        ],
        note: l('Enter the exact fixed rate, revert margin and floor clause stated in your bank’s written offer.', 'أدخل المعدل الثابت وهامش إيبور والحد الأدنى الوارد في عرض البنك المكتوب.'),
      };
    },
  },
  'buyout-refinance-savings': {
    inputs: [
      { k: 'balance', label: l('Outstanding balance', 'الرصيد المتبقي'), def: 1_500_000, min: 200_000, max: 20_000_000, step: 50_000, unit: 'AED' },
      { k: 'current', label: l('Current rate', 'المعدل الحالي'), def: 6.0, min: 2, max: 9, step: 0.05, unit: '%' },
      { k: 'next', label: l('Proposed new rate', 'المعدل الجديد المقترح'), def: 4.25, min: 2, max: 9, step: 0.05, unit: '%' },
      { k: 'left', label: l('Years remaining', 'السنوات المتبقية'), def: 20, min: 3, max: 25, step: 1, unit: 'yrs' },
    ],
    compute: (v) => {
      const r = M.buyoutSavings({ balance: v.balance, currentRate: v.current, newRate: v.next, yearsLeft: v.left });
      return {
        hero: { label: l('Illustrative net difference (36 months)', 'الفرق الصافي التقديري (36 شهراً)'), v: r.net, f: 'aed' },
        rows: [
          { label: l('Current monthly payment', 'القسط الحالي'), v: r.oldEmi, f: 'mo' },
          { label: l('Proposed monthly payment', 'القسط المقترح'), v: r.newEmi, f: 'mo' },
          { label: l('Monthly payment reduction', 'الوفر الشهري'), v: r.monthly, f: 'mo', strong: true },
          { label: l('Statutory exit cap + registration allowance', 'سقف السداد المبكر ورسوم التسجيل'), v: r.switchCost, f: 'aed' },
          { label: l('Estimated break-even', 'فترة التعادل التقديرية'), v: Number.isFinite(r.breakEvenMonths) ? `${r.breakEvenMonths} months` : '—', f: 'raw' },
        ],
        note: l('Check your existing loan agreement for any promotional fee clawbacks and confirm new lender processing fees in writing.', 'راجع عقد تمويلك الحالي للتحقق من أي شروط استرداد رسوم وتأكد من رسوم البنك الجديد كتابياً.'),
      };
    },
  },
  'handover-equity-release': {
    inputs: [
      { k: 'purchase', label: l('Original SPA purchase price', 'سعر الشراء الأصلي'), def: 2_000_000, min: 400_000, max: 30_000_000, step: 50_000, unit: 'AED' },
      {
        k: 'bal',
        label: l('Final handover instalment', 'دفعة التسليم النهائية'),
        def: 20,
        min: 20,
        max: 60,
        step: 10,
        unit: '',
        options: [
          { v: 40, label: l('60/40', '60/40') },
          { v: 30, label: l('70/30', '70/30') },
          { v: 20, label: l('80/20', '80/20') },
          { v: 50, label: l('50/50', '50/50') },
        ],
      },
      { k: 'val', label: l('Assumed bank valuation at handover', 'تقييم البنك المفترض عند التسليم'), def: 2_200_000, min: 400_000, max: 40_000_000, step: 50_000, unit: 'AED' },
      { k: 'ltv', label: l('Eligible LTV cap', 'سقف نسبة التمويل'), def: 80, min: 50, max: 85, step: 5, unit: '%' },
    ],
    compute: (v) => {
      const r = M.handoverRelease(v.purchase, v.bal, v.val, v.ltv);
      return {
        hero: { label: l('Potential surplus above developer balance', 'الفائض المحتمل فوق مستحقات المطور'), v: r.cashOut, f: 'aed' },
        rows: [
          { label: l('Final developer instalment due', 'الرصيد المستحق للمطور'), v: r.owed, f: 'aed' },
          { label: l('Maximum loan on valuation', 'الحد الأقصى للتمويل على التقييم'), v: r.loanCap, f: 'aed', strong: true },
          { label: l('Valuation difference vs SPA', 'فرق التقييم عن عقد البيع'), v: r.uplift, f: 'aed' },
          { label: l('Mortgage registration & valuation allowance', 'مخصص تسجيل الرهن والتقييم'), v: r.fees, f: 'aed' },
        ],
        note: l('Whether a lender bases LTV on SPA price or current valuation—and whether surplus funds are released—depends on individual bank policy and 50% DBR.', 'يعتمد احتساب التمويل على سعر العقد أو التقييم الحالي وصرف أي فائض على سياسة البنك وسقف عبء الدين 50%.'),
      };
    },
  },
  'golden-visa-mortgage-calculator': {
    inputs: [
      price(2_000_000),
      { k: 'down', label: l('Down payment', 'الدفعة الأولى'), def: 20, min: 15, max: 80, step: 1, unit: '%' },
    ],
    compute: (v) => {
      const eligible = v.price >= 2_000_000;
      const gap = Math.max(0, 2_000_000 - v.price);
      const c = M.cashToClose({ price: v.price, downPct: v.down });
      return {
        hero: eligible
          ? { label: l('Statutory AED 2,000,000 property threshold', 'حد العقار النظامي (2,000,000 درهم)'), v: 'Meets AED 2M threshold', f: 'raw' }
          : { label: l('Shortfall to AED 2,000,000 threshold', 'النقص عن حد 2,000,000 درهم'), v: gap, f: 'aed' },
        rows: [
          { label: l('Down payment', 'الدفعة الأولى'), v: c.down, f: 'aed' },
          { label: l('Loan amount', 'مبلغ التمويل'), v: c.loan, f: 'aed' },
          { label: l('DLD 4% + registration & closing fees', 'رسوم دائرة الأراضي والتسجيل'), v: c.fees, f: 'aed' },
          { label: l('Total purchase cash to close', 'إجمالي النقد المطلوب للشراء'), v: c.total, f: 'aed', strong: true },
        ],
        note: l('Checks the AED 2,000,000 property value threshold and standard DLD purchase costs only. Confirm current Golden Visa government fees and bank NOC requirements directly with DLD and ICP/GDRFA.', 'يتحقق من حد قيمة العقار البالغ 2,000,000 درهم ورسوم الشراء فقط. يرجى تأكيد رسوم الإقامة ومتطلبات شهادة عدم الممانعة مباشرة مع دائرة الأراضي والهيئة الاتحادية للهوية.'),
      };
    },
  },
  'non-resident-rental-coverage': {
    inputs: [
      price(1_800_000),
      { k: 'ltv', label: l('Loan-to-value (LTV)', 'نسبة التمويل'), def: 60, min: 40, max: 65, step: 5, unit: '%' },
      rate(4.5),
      years(),
      { k: 'yield', label: l('Assumed gross rental yield', 'العائد الإيجاري الإجمالي المفترض'), def: 6.5, min: 3, max: 10, step: 0.1, unit: '%' },
      { k: 'sc', label: l('Annual service charge / sq.ft.', 'رسوم الخدمة السنوية للقدم'), def: 18, min: 5, max: 40, step: 1, unit: 'AED' },
      { k: 'psf', label: l('Property price / sq.ft.', 'سعر القدم المربعة'), def: 1700, min: 600, max: 5000, step: 50, unit: 'AED' },
    ],
    compute: (v) => {
      const loan = v.price * (v.ltv / 100);
      const e = M.emi(loan, v.rate, v.years);
      const sqft = v.price / v.psf;
      const net = ((v.price * (v.yield / 100) - sqft * v.sc) * 0.95) / 12;
      const c = M.cashToClose({ price: v.price, downPct: 100 - v.ltv });
      return {
        hero: { label: l('Net rent coverage of payment', 'نسبة تغطية صافي الإيجار للقسط'), v: `${((net / e) * 100).toFixed(0)}%`, f: 'raw' },
        rows: [
          { label: l('Monthly mortgage payment', 'القسط الشهري'), v: e, f: 'mo' },
          { label: l('Estimated net monthly rent', 'صافي الإيجار الشهري التقديري'), v: net, f: 'mo' },
          { label: l('Monthly cash-flow difference', 'صافي التدفق الشهري'), v: net - e, f: 'mo', strong: true },
          { label: l('Total cash to close', 'النقد المطلوب للشراء'), v: c.total, f: 'aed' },
        ],
        note: l('Based entirely on your yield and service-charge inputs, including a 5% vacancy allowance.', 'يعتمد بالكامل على مدخلات العائد ورسوم الخدمة مع احتساب 5% مخصص شغور.'),
      };
    },
  },
  'rent-vs-buy-dubai': {
    inputs: [
      price(1_800_000),
      { k: 'rent', label: l('Current annual rent', 'الإيجار السنوي الحالي'), def: 110_000, min: 30_000, max: 1_000_000, step: 5000, unit: 'AED' },
      rate(),
      { k: 'esc', label: l('Assumed rent change / yr', 'تغير الإيجار السنوي المفترض'), def: 5, min: 0, max: 15, step: 0.5, unit: '%' },
      { k: 'app', label: l('Assumed price change / yr', 'تغير الأسعار السنوي المفترض'), def: 3, min: -3, max: 10, step: 0.5, unit: '%' },
    ],
    compute: (v) => {
      const r = M.rentVsBuy(v.price, 20, v.rate, 25, v.rent, v.esc, v.app, 15);
      return {
        hero: { label: l('Illustrative break-even horizon', 'نقطة التعادل التوضيحية'), v: r.breakEven ? `Year ${r.breakEven}` : 'Beyond 15 yrs', f: 'raw' },
        rows: [
          { label: l('Monthly mortgage payment', 'القسط الشهري'), v: r.emi, f: 'mo' },
          { label: l('Current monthly rent', 'الإيجار الشهري الحالي'), v: v.rent / 12, f: 'mo' },
          { label: l('Upfront cash to buy (20% down + fees)', 'النقد المقدم للشراء'), v: r.upfront, f: 'aed' },
          { label: l('10-year cumulative rent (at your input)', 'الإيجار التراكمي خلال 10 سنوات'), v: r.rows[9].rentCum, f: 'aed', strong: true },
        ],
        bars: r.rows.filter((_, i) => i % 3 === 2).map((x) => ({ label: `Y${x.year}`, v: x.rentCum - x.ownNet, hl: x.ownNet <= x.rentCum })),
      };
    },
  },
  'overpayment-early-settlement': {
    inputs: [
      { k: 'loan', label: l('Loan amount', 'مبلغ التمويل'), def: 1_500_000, min: 300_000, max: 20_000_000, step: 50_000, unit: 'AED' },
      rate(4.25),
      years(),
      { k: 'lump', label: l('Annual lump-sum payment', 'الدفعة السنوية الإضافية'), def: 100_000, min: 0, max: 2_000_000, step: 10_000, unit: 'AED' },
    ],
    compute: (v) => {
      const r = M.overpayment(v.loan, v.rate, v.years, v.lump);
      return {
        hero: { label: l('Illustrative interest saved', 'الفائدة التقديرية الموفرة'), v: r.saved, f: 'aed' },
        rows: [
          { label: l('Scheduled monthly payment', 'القسط الشهري المجدول'), v: r.emi, f: 'mo' },
          { label: l('Term reduction', 'المدة المختصرة'), v: r.yearsSaved, f: 'yrs', strong: true },
          { label: l('Revised payoff horizon', 'مدة السداد المعدلة'), v: r.months / 12, f: 'yrs' },
          { label: l('Annual lump sum as % of loan', 'نسبة الدفعة من القرض'), v: (v.lump / v.loan) * 100, f: 'pct' },
        ],
        note: l('Check your Final Offer Letter for any annual penalty-free overpayment allowance; above that allowance the statutory CBUAE early-settlement cap applies.', 'راجع خطاب العرض النهائي لمعرفة نسبة السداد الجزئي المجاني سنوياً؛ وما يزيد عنها يخضع لسقف المصرف المركزي.'),
      };
    },
  },
  'form-f-clause-generator': {
    inputs: [
      { k: 'val', label: l('Minimum acceptable valuation', 'الحد الأدنى للتقييم'), def: 2_950_000, min: 300_000, max: 50_000_000, step: 10_000, unit: 'AED' },
      { k: 'ltv', label: l('Loan as % of price', 'نسبة التمويل'), def: 80, min: 50, max: 85, step: 5, unit: '%' },
      { k: 'days', label: l('FOL deadline', 'مهلة خطاب العرض'), def: 21, min: 21, max: 28, step: 7, unit: '', options: [{ v: 21, label: l('21 days', '21 يوماً') }, { v: 28, label: l('28 days', '28 يوماً') }] },
      { k: 'validity', label: l('Contract validity', 'صلاحية العقد'), def: 45, min: 45, max: 60, step: 15, unit: '', options: [{ v: 45, label: l('45 days', '45 يوماً') }, { v: 60, label: l('60 days', '60 يوماً') }] },
      yesNo('sellerMortgage', l('Seller has a mortgage', 'العقار مرهون'), 1),
    ],
    compute: (v) => {
      const n = (x: number) => x.toLocaleString('en-US');
      const words: Record<number, string> = { 21: 'Twenty-One', 28: 'Twenty-Eight', 45: 'Forty-Five', 60: 'Sixty' };
      const text = [
        'SPECIAL CONDITION 1 — SUBJECT TO BANK VALUATION & FINAL OFFER LETTER (FOL):',
        '1.1 The Parties expressly agree that this Contract F is strictly conditional upon the Buyer obtaining both:',
        `    (a) An official RERA-certified bank property valuation report valuing the Property at no less than AED ${n(v.val)}; and`,
        `    (b) An unconditional written Final Offer Letter ("FOL") from a UAE Central Bank (CBUAE) licensed financial institution for a mortgage loan of no less than ${v.ltv}% of the Purchase Price within ${words[v.days]} (${v.days}) calendar days from full execution of this Contract F.`,
        '1.2 If no written price adjustment agreement is reached within Five (5) working days following a valuation shortfall, or if the Buyer’s lending bank declines to issue the FOL for any reason not caused by willful default of the Buyer, this Contract F shall automatically terminate with immediate effect without penalty, and the Stakeholder Agency shall return the uncashed 10% Security Deposit Cheque to the Buyer within Forty-Eight (48) hours.',
        '',
        `SPECIAL CONDITION 2 — ${v.sellerMortgage ? 'SELLER MORTGAGE CLEARANCE, LIABILITY LETTER & ' : ''}AUTOMATIC EXTENSION:`,
        ...(v.sellerMortgage ? ['2.1 The Seller confirms that the Property is mortgaged to [SELLER’S BANK] and undertakes to apply for the official Bank Liability Letter within Two (2) working days of receiving the Buyer’s signed FOL.'] : []),
        `2.${v.sellerMortgage ? 2 : 1} The validity period of this Contract F shall be ${words[v.validity]} (${v.validity}) calendar days. In the event of administrative delays by the Buyer’s Bank, Seller’s Bank, Master Developer (NOC), or DLD beyond either Party’s control, both Parties grant an automatic written extension of up to Fifteen (15) additional calendar days at zero penalty.`,
        '',
        'SPECIAL CONDITION 3 — DEPOSIT CHEQUE CUSTODY & PROPERTY COMPLIANCE WARRANTY:',
        '3.1 The Buyer’s 10% Security Deposit Cheque shall be held strictly in trust and uncashed by the RERA-licensed Brokerage as neutral stakeholder and shall never be presented for encashment prior to DLD Transfer.',
        '3.2 The Seller warrants that there are no unauthorized structural modifications or building violations that would prevent Developer NOC or Bank Valuation approval.',
      ].join('\n');
      return {
        hero: { label: l('Draft annexure clauses', 'مسودة البنود الإضافية'), v: '3 special conditions', f: 'raw' },
        rows: [{ label: l('10% deposit cheque referenced', 'شيك التأمين المشار إليه (10%)'), v: v.val * 0.1, f: 'aed', strong: true }],
        text,
        note: l('Drafting template only, not legal advice — have a licensed UAE legal professional or RERA-registered conveyancer review before signing.', 'نموذج إرشادي فقط وليس استشارة قانونية — يجب مراجعته من مستشار قانوني مرخص قبل التوقيع.'),
      };
    },
  },
  'life-insurance-assignment-audit': {
    inputs: [
      { k: 'loan', label: l('Loan amount', 'مبلغ التمويل'), def: 2_000_000, min: 300_000, max: 20_000_000, step: 50_000, unit: 'AED' },
      rate(4.25),
      years(15),
      { k: 'bank', label: l('Policy quote A (% p.a.)', 'عرض الوثيقة أ (% سنوياً)'), def: 0.6, min: 0.2, max: 1, step: 0.01, unit: '%' },
      { k: 'ext', label: l('Policy quote B (% p.a.)', 'عرض الوثيقة ب (% سنوياً)'), def: 0.3, min: 0.1, max: 0.8, step: 0.01, unit: '%' },
    ],
    compute: (v) => {
      const r = M.lifeInsurance(v.loan, v.rate, v.years, v.bank, v.ext);
      return {
        hero: { label: l('Cumulative difference over term', 'الفرق التراكمي طوال المدة'), v: r.saved, f: 'aed' },
        rows: [
          { label: l('Policy quote A cumulative cost', 'التكلفة التراكمية للعرض أ'), v: r.bank, f: 'aed' },
          { label: l('Policy quote B cumulative cost', 'التكلفة التراكمية للعرض ب'), v: r.ext, f: 'aed' },
          { label: l('Average monthly difference', 'متوسط الفرق الشهري'), v: r.monthlyGain, f: 'mo', strong: true },
        ],
        note: l('Confirm external policy assignment acceptance and any policy administration fees in writing with your lender.', 'يرجى تأكيد قبول التنازل عن الوثيقة الخارجية وأي رسوم إدارية كتابياً مع البنك.'),
      };
    },
  },
  'transfer-day-cheque-calculator': {
    inputs: [
      price(2_500_000),
      { k: 'payoff', label: l('Seller’s bank liability payoff', 'مديونية بنك البائع'), def: 1_100_000, min: 0, max: 30_000_000, step: 10_000, unit: 'AED' },
      { k: 'deposit', label: l('Deposit paid directly', 'الدفعة المدفوعة مباشرة'), def: 250_000, min: 0, max: 5_000_000, step: 10_000, unit: 'AED' },
      { k: 'ltv', label: l('Your loan LTV', 'نسبة تمويلك'), def: 80, min: 0, max: 85, step: 5, unit: '%' },
    ],
    compute: (v) => {
      const loan = v.price * (v.ltv / 100);
      const s = M.chequeSplit(v.price, v.payoff, v.deposit, loan);
      const total = s.sellerBank + s.seller + s.dld + s.mortgageReg + s.trustee;
      return {
        hero: { label: l('Total across manager’s cheques', 'إجمالي الشيكات المصرفية'), v: total, f: 'aed' },
        rows: [
          { label: l('Payee: seller’s bank (liability letter)', 'المستفيد: بنك البائع'), v: s.sellerBank, f: 'aed' },
          { label: l('Payee: seller (net proceeds)', 'المستفيد: البائع'), v: s.seller, f: 'aed' },
          { label: l('Payee: Dubai Land Department', 'المستفيد: دائرة الأراضي'), v: s.dld, f: 'aed' },
          { label: l('Payee: DLD mortgage registration', 'تسجيل الرهن'), v: s.mortgageReg, f: 'aed' },
          { label: l('Payee: trustee office', 'المستفيد: أمين التسجيل'), v: s.trustee, f: 'aed' },
          { label: l('Funded by your mortgage loan', 'ممول من قرضك'), v: loan, f: 'aed', strong: true },
        ],
        note: l('Verify exact payee names and final statement of account with your trustee office and conveyancer prior to issuing cheques.', 'تحقق من الأسماء الدقيقة للمستفيدين وكشف الحساب النهائي مع مكتب أمين التسجيل قبل إصدار الشيكات.'),
      };
    },
  },
};
