import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Building2, CalendarClock, Home as HomeIcon, Percent, Scale } from 'lucide-react';
import DisclosureToast from '@/components/home/DisclosureToast';
import LogoMarquee from '@/components/LogoMarquee';
import Calculator from '@/components/calc/Calculator';
import { HmButton, JsonLd, aed } from '@/components/ui';
import { BANKS } from '@/data/banks';
import { COMMUNITIES } from '@/data/communities';
import { COUNTRIES } from '@/data/countries';
import { TEAM_SPECIALISTS } from '@/data/team';
import { LTV_RULES } from '@/data/site';
import { borrowingPower, buyoutSavings, cashToClose } from '@/lib/math';
import TextReveal from '@/components/fx/TextReveal';
import VideoDialog from '@/components/fx/VideoDialog';
import PhotoCarousel from '@/components/fx/PhotoCarousel';

export const metadata: Metadata = {
  title: 'Mortgage Broker in Dubai & UAE | Betterway Mortgages',
  description: 'Dubai mortgage advice for residents, non-residents and investors. Compare UAE mortgage rates, estimate payments and plan your upfront costs with Betterway.',
  alternates: { canonical: '/' },
};

/* Every figure below is derived from the site's own data files or the CBUAE rules in /data/site. */
const ltv = (match: string) => LTV_RULES.find((r) => r.profile.startsWith(match))?.ltv ?? '—';

const PATHS = [
  { chip: `Up to ${ltv('Expat resident — first home up to')} LTV`, name: 'Your First Dubai Home', where: 'Expat residents · salaried & self-employed', href: '/mortgages/uae-residents', img: '/images/dubai-interior-3072.webp', alt: 'Concept image: a bright Dubai apartment interior with a waterfront view' },
  { chip: 'Non-resident finance', name: 'Buying From Overseas', where: `Non-resident guidance for ${COUNTRIES.length} countries`, href: '/mortgages/non-resident-dubai', img: '/images/marina-evening-3072.webp', alt: 'Concept image: Dubai Marina at dusk seen from a terrace' },
  { chip: 'Handover finance', name: 'Off-Plan Handover', where: 'Final developer payment, planned early', href: '/handover/dubai-off-plan-handover-mortgage-guide', img: '/images/offplan-dusk-3072.webp', alt: 'Concept image: a residential tower nearing completion at blue hour' },
];

const SERVICES = [
  { tag: 'Buy a Home', title: 'Finance Your Dubai Home', body: 'Budget, deposit and purchase fees mapped against the 50% debt cap, then the lenders that fit your profile.', href: '/mortgages', img: '/images/villa-courtyard-960.webp' },
  { tag: 'Switch & Save', title: 'Refinance With Confidence', body: 'Compare buyout savings after exit fees, valuation and switching costs, before your fixed period ends.', href: '/mortgages/mortgage-buyout-refinance', img: '/images/keys-handover-3072.webp' },
  { tag: 'Compare Rates', title: 'See Every Bank Side by Side', body: `Fixed periods, revert margins and fees from ${BANKS.length} UAE lenders, compared on the same terms.`, href: '/rates/uae-mortgage-rates-eibor-revert-bible', img: '/images/guide-dbr-planning-3072.webp' },
];

const AREA_IMG: Record<string, [string, string]> = {
  'dubai-marina': ['/images/marina-evening-1536.webp', 'Concept image: Dubai Marina towers and waterway at night'],
  'downtown-dubai': ['/images/guide-dbr-planning-1536.webp', 'Concept image: the Downtown Dubai skyline seen from a desk'],
  'palm-jumeirah': ['/images/dubai-waterfront-1536.webp', 'Concept image: a waterfront villa with the Dubai skyline behind'],
  'dubai-hills-estate': ['/images/villa-courtyard-960.webp', 'Concept image: a villa courtyard with palms and a reflecting pool'],
};
const AREAS = COMMUNITIES.filter((c) => c.slug in AREA_IMG);

const bo = buyoutSavings({ balance: 1_500_000, currentRate: 6.0, newRate: 4.25, yearsLeft: 20 });
const purchase = cashToClose({ price: 2_000_000, downPct: 20 });
const cards = borrowingPower({ salary: 38_000, existingEmis: 0, cardLimits: 120_000, years: 25 });
const noCards = borrowingPower({ salary: 38_000, existingEmis: 0, cardLimits: 0, years: 25 });
const SCENARIOS = [
  { who: 'First-time buyer', tag: 'AED 2.0M purchase', body: `At the 80% first-home LTV cap, the 20% deposit plus 4% DLD fee, registration, trustee, valuation and agency brings estimated cash to close to ${aed(purchase.total)}.` },
  { who: 'Homeowner switching banks', tag: 'AED 1.5M balance', body: `Moving from an assumed 6.00% to 4.25% over 20 years lowers repayments by about ${aed(bo.monthly)} a month, against ${aed(bo.switchCost)} in exit and registration costs.` },
  { who: 'Salaried professional', tag: 'AED 38,000 / month', body: `AED 120,000 of unused card limits, assessed at 5%, cuts modelled borrowing from ${aed(noCards.maxLoan)} to ${aed(cards.maxLoan)} under the 50% DBR rule.` },
  { who: 'Overseas investor', tag: 'Non-resident', body: `Non-resident buyers can typically borrow up to ${ltv('Non-resident')} of value. Currency, income country and credit history decide the final offer.` },
];
const ADVISOR = TEAM_SPECIALISTS[0];

const FAQS = [
  { q: 'How does a mortgage broker in Dubai help?', a: 'A broker helps you compare suitable lenders, prepare documents and understand the application process. The bank makes the lending decision and issues your final offer.' },
  { q: 'How much cash do I need for an AED 2M home?', a: `With a 20% deposit, this calculator estimates ${aed(purchase.total)} including the deposit and typical Dubai purchase fees. Bank processing fees, insurance and property-specific charges may add to this.` },
  { q: 'Can non-residents get a mortgage in Dubai?', a: 'Some UAE lenders consider non-resident applicants. Your income country, currency, credit history and property affect the available loan and deposit. A lender must review your documents before confirming eligibility.' },
  { q: 'What should I compare besides the mortgage rate?', a: 'Compare the fixed period, variable-rate formula, minimum floor, processing fees, insurance and early repayment terms. A lower introductory rate does not always mean a lower total cost.' },
  { q: 'How long does mortgage pre-approval take?', a: 'Timing depends on the lender and the completeness of your documents. Pre-approval is an initial assessment; it is not a final loan offer or a property valuation.' },
  { q: 'What is the maximum mortgage tenure in the UAE?', a: 'CBUAE rules cap residential mortgage tenure at 25 years. Lenders may set a shorter term depending on your age at maturity.' },
  { q: 'What fees should I ask about?', a: 'Request a written breakdown of bank fees, broker fees if applicable, valuation, insurance, property registration and transfer charges before proceeding.' },
];

const GALLERY = [
  { n: 'dubai-waterfront', title: 'Waterfront villas', text: 'Villa and townhouse finance across Dubai’s freehold communities.' },
  { n: 'marina-evening', title: 'Dubai Marina living', text: 'Apartment mortgages for residents and overseas buyers.' },
  { n: 'dubai-interior', title: 'Your first home', text: 'Up to 80% LTV for expat first-home buyers under CBUAE rules.' },
  { n: 'offplan-dusk', title: 'Off-plan handover', text: 'Plan the final developer payment before handover day.' },
  { n: 'guide-transfer-day', title: 'Transfer day', text: 'Valuation, final offer and registration at the trustee office.' },
];
const slides = (alt: (t: string) => string) => GALLERY.map((g) => ({ src: `/images/${g.n}-1536.webp`, srcSet: `/images/${g.n}-768.webp 768w, /images/${g.n}-1536.webp 1536w, /images/${g.n}-3072.webp 3072w`, alt: alt(g.title), title: g.title, text: g.text }));

function Head({ label, title, sub, action }: { label: string; title: string; sub: string; action?: [string, string] }) {
  return (
    <div className="hm-head">
      <div><span className="hm-label">{label}</span><h2 className="hm-h2"><TextReveal text={title} /></h2></div>
      <div className="grid gap-5" data-reveal="rise"><p className="hm-sub">{sub}</p>{action && <div><HmButton href={action[1]} size="sm">{action[0]}</HmButton></div>}</div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="hm">
      {/* Hero */}
      <section className="hm-hero">
        <div className="hm-hero__clouds" aria-hidden="true" />
        <div className="hm-wrap">
          <span className="hm-hero__badge"><img src="/brand/bw/betterway-icon-fullcolor-tight.svg" alt="" width={26} height={26} /><span><b>{BANKS.length} UAE lenders</b> compared</span></span>
          <h1>Your Dubai Mortgage, <em>Done Right</em></h1>
          <p className="hm-hero__lead"><TextReveal text="Independent mortgage advice for residents, overseas buyers and investors. Compare banks, know your budget and move from pre-approval to transfer day with confidence." stagger={0.025} delay={0.2} /></p>
          <div className="hm-hero__ctas">
            <HmButton href="/calculators/mortgage-calculator">Check What I Can Borrow</HmButton>
            <HmButton href="/contact" tone="ghost">Book a Consultation</HmButton>
          </div>
        </div>
        <div className="hm-hero__stage">
          <img src="/images/dubai-waterfront-1536.webp" srcSet="/images/dubai-waterfront-768.webp 768w, /images/dubai-waterfront-1536.webp 1536w, /images/dubai-waterfront-3072.webp 3072w" sizes="100vw" alt="Concept image: a contemporary Dubai villa by the water with the city skyline behind" width={1536} height={864} fetchPriority="high" />
          <div className="hm-hero__chips" aria-label="CBUAE mortgage rules">
            <span className="hm-chip"><i />Expat first home <b>{ltv('Expat resident — first home up to')}</b> LTV</span>
            <span className="hm-chip"><i />Debt burden cap <b>50%</b></span>
            <span className="hm-chip"><i />Max tenure <b>25 yrs</b></span>
          </div>
        </div>
      </section>
      <DisclosureToast />

      {/* Our impact */}
      <section className="hm-section !pt-6">
        <div className="hm-wrap">
          <Head label="Our impact" title="Real clarity behind every mortgage decision" sub="Built to make Dubai home finance simple, transparent and more confident for every buyer." />
          <div className="hm-impact">
            <div className="hm-impact__img" data-reveal="rise"><img src="/images/abudhabi-corniche-960.webp" alt="Concept image: beachfront villas along the UAE coast" width={960} height={1280} loading="lazy" /></div>
            <div className="hm-impact__stats">
              {[[`${BANKS.length}`, 'UAE lenders compared'], [`${COMMUNITIES.length}`, 'Freehold communities'], [`${COUNTRIES.length}`, 'Countries we guide']].map(([v, l], i) => (
                <div key={l} className="hm-stat" data-reveal="rise" style={{ ['--i' as string]: i }}><strong>{v}+</strong><span>{l}</span></div>
              ))}
            </div>
            <div className="hm-impact__img" data-reveal="rise"><img src="/images/villa-courtyard-960.webp" alt="Concept image: a calm villa courtyard with a reflecting pool" width={960} height={1280} loading="lazy" /></div>
          </div>
        </div>
      </section>

      <section className="hm-lenders" aria-label="UAE lenders in the directory">
        <div className="hm-wrap">
          <p>Comparing terms across <b className="text-navy">{BANKS.length} UAE lenders</b> in one directory. Listing is not a partnership or a live offer.</p>
          <LogoMarquee label="UAE banks in the lender directory" items={BANKS.map((b) => ({ id: b.key, label: b.name, logo: b.logo, href: `/rates/${b.slug}` }))} />
        </div>
      </section>

      {/* Top paths: stacked full-bleed panels */}
      <section className="hm-section !pb-12">
        <div className="hm-wrap"><Head label="Top mortgage paths" title="Explore the routes Dubai buyers take most" sub="Each path opens a full guide with lender criteria, costs and the documents you will need." /></div>
      </section>
      <div className="hm-stack">
        {PATHS.map((p) => (
          <article key={p.name} className="hm-panel">
            <img src={p.img} alt={p.alt} width={3072} height={1728} loading="lazy" />
            <div className="hm-panel__glass">
              <span className="hm-panel__price">{p.chip}</span>
              <h3>{p.name}</h3>
              <p>{p.where}</p>
              <HmButton href={p.href} tone="light" size="sm">Explore</HmButton>
            </div>
          </article>
        ))}
      </div>

      {/* Services */}
      <section className="hm-section">
        <div className="hm-wrap">
          <Head label="Our services" title="Everything you need for your home loan" sub="Built to simplify your mortgage with clear numbers, better options and confident decisions." />
          <div className="hm-services">
            {SERVICES.map((s, i) => (
              <article key={s.tag} className="hm-svc">
                <span className="hm-svc__num" aria-hidden="true">.0{i + 1}</span>
                <div className="hm-svc__img" aria-hidden="true"><img src={s.img} alt="" loading="lazy" /></div>
                <div className="hm-svc__body">
                  <small>{s.tag}</small><h3>{s.title}</h3>
                  <p className="mt-3">{s.body}</p>
                  <Link href={s.href} className="hm-svc__link">Learn more <ArrowUpRight size={14} /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Listings: communities */}
      <section className="hm-section !pt-0">
        <div className="hm-wrap">
          <Head label="Where we advise" title="Finance homes in Dubai’s top communities" sub="Each community has its own developers, stock and lender appetite. Start with the area behind your shortlist." action={['Explore All Areas', '/areas']} />
          <div className="hm-listings">
            {AREAS.map((c) => (
              <Link key={c.slug} href={`/areas/${c.emirate}/${c.slug}`} className="hm-listing" data-reveal="rise">
                <img src={AREA_IMG[c.slug][0]} alt={AREA_IMG[c.slug][1]} loading="lazy" />
                <span className="hm-listing__tag"><HomeIcon size={13} />{c.stock}</span>
                <span className="hm-listing__name">{c.name}</span>
                <strong className="hm-listing__price">Up to {ltv('Expat resident — first home up to')} LTV</strong>
                <span className="hm-listing__meta">
                  <span><Building2 size={14} />{c.devs.split(',').length} developer{c.devs.includes(',') ? 's' : ''}</span>
                  <span><Percent size={14} />4% DLD fee</span>
                  <span><CalendarClock size={14} />25 yrs</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Film + gallery carousel */}
      <section className="hm-section !pt-0">
        <div className="hm-wrap">
          <Head label="Dubai in motion" title="See the homes our clients finance" sub="A short film and gallery of the property types we arrange finance for across Dubai." />
          <VideoDialog src="/media/betterway-dubai-film.mp4" poster="/media/betterway-dubai-film-poster.webp" alt="Concept film still: a waterfront villa in Dubai" label="Play the Betterway Dubai film" caption="Watch · 17 sec" />
          <div className="mt-3"><PhotoCarousel label="Dubai property gallery" slides={slides((t) => `Concept image: ${t}`)} /></div>
        </div>
      </section>

      {/* Highlight marquee + calculator */}
      <section className="hm-section !pb-0">
        <div className="hm-wrap"><Head label="Mortgage calculator" title="Run the numbers before the bank does" sub="Monthly payment, deposit and purchase fees in one view. No sign-up, nothing submitted." /></div>
        <div className="hm-marquee" aria-hidden="true">
          <div className="hm-marquee__track">{Array.from({ length: 4 }).flatMap((_, k) => ['Compare Banks', 'Know Your Budget', 'Get Pre-Approved'].map((t) => <span key={`${k}${t}`}>{t}</span>))}</div>
          <div className="hm-marquee__pic"><img src="/images/keys-handover-1536.webp" alt="" loading="lazy" /></div>
        </div>
      </section>
      <section id="calculator" className="hm-section !pt-10">
        <div className="hm-wrap">
          <div className="hm-calc" data-reveal="rise"><Calculator slug="mortgage-calculator" /></div>
          <p className="hm-impact__note">Planning estimates only. Rates and fees depend on the lender, property and your circumstances.</p>
        </div>
      </section>

      {/* Scenarios (in place of testimonials: worked examples, no invented reviews) */}
      <section className="hm-section !pt-0">
        <div className="hm-wrap">
          <Head label="Real scenarios" title="What the numbers look like in practice" sub="Illustrative cases calculated with the same CBUAE rules our calculators use." action={['See All Scenarios', '/reviews']} />
          <div className="hm-reviews">
            <div className="hm-reviews__rail">
              {SCENARIOS.map((s) => (
                <article key={s.who} className="hm-quote">
                  <div><span className="hm-quote__mark" aria-hidden="true">“</span><p>{s.body}</p></div>
                  <div className="hm-quote__who"><span className="grid h-11 w-11 place-items-center rounded-[10px] bg-[#070e1a] text-[#d7b158]"><Scale size={18} /></span><div><b>{s.who}</b><small>{s.tag}</small></div></div>
                </article>
              ))}
            </div>
            <Link href="/our-underwriters" className="hm-portrait">
              <img src={ADVISOR.portrait1080} alt={`${ADVISOR.name}, ${ADVISOR.designation}`} loading="lazy" />
              <div><b>{ADVISOR.name}</b><span>{ADVISOR.designation}</span></div>
            </Link>
          </div>
          <p className="hm-rev-note">Illustrative examples, not client testimonials or offers. Assumed rates for comparison only.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="hm-section !pt-0">
        <div className="hm-wrap hm-faq">
          <div>
            <span className="hm-label">FAQ</span>
            <h2 className="hm-h2"><TextReveal text="Things You Should Know" /></h2>
            <p className="hm-sub mt-5">We’ve answered the most common questions to help you start with clarity.</p>
            <Link href="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-teal">Ask an advisor <ArrowRight size={15} /></Link>
          </div>
          <div className="hm-faq__list">
            {FAQS.map((f, i) => (
              <details key={f.q} open={i === 0}>
                <summary>{f.q}<i aria-hidden="true">+</i></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
          <JsonLd data={{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }} />
        </div>
      </section>
    </div>
  );
}
