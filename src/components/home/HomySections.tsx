'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { TEAM_SPECIALISTS } from '@/data/team';

export type HomyServiceItem = {
  index: string;
  kicker: string;
  title: string;
  body: string;
  href: string;
  img: string;
  alt: string;
};

/** Exact Homy 3-Card Interactive Horizontal Expanding Services Accordion */
export function HomyServicesAccordion({ items }: { items: readonly HomyServiceItem[] }) {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="homy-services-row" role="list">
      {items.map((item, idx) => {
        const active = idx === activeIdx;
        return (
          <div
            key={item.index}
            role="listitem"
            tabIndex={0}
            aria-expanded={active}
            onClick={() => setActiveIdx(idx)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveIdx(idx);
              }
            }}
            className={`homy-service-card ${active ? 'is-active' : ''}`}
          >
            <div className="homy-service-card__bg" aria-hidden="true">
              <img src={item.img} alt={item.alt} loading="lazy" decoding="async" />
            </div>
            <div className="homy-service-card__scrim" aria-hidden="true" />

            <span className="homy-service-card__idx" aria-hidden="true">
              {item.index}
            </span>

            <div className="relative z-[1]">
              <p className="homy-service-card__kicker">{item.kicker}</p>
              <h3 className="homy-service-card__title">{item.title}</h3>
              {active && (
                <>
                  <p className="homy-service-card__desc">{item.body}</p>
                  <div className="mt-5">
                    <Link
                      href={item.href}
                      onClick={(e) => e.stopPropagation()}
                      className="homy-btn homy-btn--white !h-10 !text-[13.5px]"
                    >
                      <span>Explore</span>
                      <span className="homy-btn__disc !h-6 !w-6" aria-hidden="true">
                        <span className="homy-btn__arrow-track">
                          <ArrowRight size={13} strokeWidth={2.2} />
                          <ArrowRight size={13} strokeWidth={2.2} />
                        </span>
                      </span>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Exact Homy Sticky 2-Column Single-Open FAQ Accordion */
export function HomyFaqAccordion({ faqs }: { faqs: readonly { q: string; a: string }[] }) {
  const [openIdx, setOpenIdx] = useState<number>(0);

  return (
    <div className="homy-faq-list">
      {faqs.map((f, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div key={f.q} className="homy-faq-item" data-open={isOpen ? 'true' : 'false'}>
            <button
              type="button"
              className="homy-faq-btn"
              aria-expanded={isOpen}
              onClick={() => setOpenIdx(isOpen ? -1 : idx)}
            >
              <span>{f.q}</span>
              <span className="homy-faq-icon" aria-hidden="true">
                {isOpen ? '−' : '+'}
              </span>
            </button>
            {isOpen && <p className="homy-faq-panel">{f.a}</p>}
          </div>
        );
      })}
    </div>
  );
}

/** Exact Homy Infinite Reviews / Specialist Carousel (alternating light insight cards & dark full-bleed portraits) */
const ADVISORY_NOTES = [
  {
    quote:
      'Every borrower sees the fixed period, post-fixed EIBOR revert margin, floor clause, and DLD fees side by side before a single bank form is signed.',
    advisorIdx: 0,
  },
  {
    quote:
      'Understanding how credit card limits and existing liabilities impact your 50% CBUAE debt burden ratio prevents last-minute pre-approval surprises.',
    advisorIdx: 1,
  },
  {
    quote:
      'Document readiness starts on day one — salary certificates, six-month statements, and property papers checked cleanly before formal bank submission.',
    advisorIdx: 2,
  },
  {
    quote:
      'From bank valuation panels and developer NOCs to final offer letters and DLD trustee transfer, every milestone is tracked in one timeline.',
    advisorIdx: 3,
  },
] as const;

export function HomyAdvisorsCarousel() {
  // Interleave authentic advisory notes with authentic 8K-mastered Dubai specialist portraits
  const cards: Array<
    | { kind: 'quote'; id: string; quote: string; name: string; role: string; avatar: string }
    | { kind: 'portrait'; id: string; name: string; role: string; img: string }
  > = [];

  ADVISORY_NOTES.forEach((note, i) => {
    const sp = TEAM_SPECIALISTS[note.advisorIdx];
    const portraitMember = TEAM_SPECIALISTS[(i + 1) % TEAM_SPECIALISTS.length];
    if (sp) {
      cards.push({
        kind: 'quote',
        id: `q-${i}`,
        quote: note.quote,
        name: sp.name,
        role: sp.designation,
        avatar: sp.avatarWebp,
      });
    }
    if (portraitMember) {
      cards.push({
        kind: 'portrait',
        id: `p-${i}`,
        name: portraitMember.name,
        role: portraitMember.designation,
        img: portraitMember.portrait1080,
      });
    }
  });

  // Duplicate for seamless CSS infinite marquee loop
  const loopCards = [...cards, ...cards];

  return (
    <div className="homy-reviews-wrap">
      <div className="homy-reviews-track">
        {loopCards.map((card, i) =>
          card.kind === 'quote' ? (
            <article key={`${card.id}-${i}`} className="homy-review-card" aria-hidden={i >= cards.length || undefined}>
              <div>
                <span className="homy-review-card__mark" aria-hidden="true">
                  “
                </span>
                <p className="homy-review-card__quote">{card.quote}</p>
              </div>
              <div className="homy-review-card__author">
                <img src={card.avatar} alt={i < cards.length ? card.name : ''} width={44} height={44} loading="lazy" />
                <div>
                  <p className="font-display text-sm font-semibold text-[#0c0c0c]">{card.name}</p>
                  <p className="text-xs text-[#606060]">{card.role}</p>
                </div>
              </div>
            </article>
          ) : (
            <Link
              key={`${card.id}-${i}`}
              href="/our-underwriters"
              tabIndex={i >= cards.length ? -1 : undefined}
              aria-hidden={i >= cards.length || undefined}
              className="homy-portrait-card"
            >
              <img src={card.img} alt={i < cards.length ? `${card.name} — ${card.role}` : ''} loading="lazy" />
              <div className="homy-portrait-card__meta">
                <h4>{card.name}</h4>
                <p>{card.role}</p>
              </div>
            </Link>
          ),
        )}
      </div>
    </div>
  );
}
