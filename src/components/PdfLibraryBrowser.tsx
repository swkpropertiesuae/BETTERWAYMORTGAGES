'use client';

import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  FileDown,
  FileText,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import { PDF_CATEGORIES, PDF_LIBRARY, type PdfCategory } from '@/data/pdf-library';
import { trackEvent } from '@/lib/analytics';

export default function PdfLibraryBrowser() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'All' | PdfCategory>('All');

  const countsByCategory = useMemo(() => {
    const map: Record<string, number> = { All: PDF_LIBRARY.length };
    for (const cat of PDF_CATEGORIES) {
      map[cat] = PDF_LIBRARY.filter((p) => p.category === cat).length;
    }
    return map;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PDF_LIBRARY.filter((pdf) => {
      const catMatch = activeCategory === 'All' || pdf.category === activeCategory;
      if (!catMatch) return false;
      if (!q) return true;
      return (
        pdf.title.toLowerCase().includes(q) ||
        pdf.subtitle.toLowerCase().includes(q) ||
        pdf.category.toLowerCase().includes(q) ||
        pdf.audience.toLowerCase().includes(q) ||
        pdf.neglectedWhy.toLowerCase().includes(q) ||
        pdf.keywords.some((k) => k.toLowerCase().includes(q)) ||
        pdf.keyTakeaways.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [query, activeCategory]);

  return (
    <div className="space-y-7">
      {/* Premium White Search + Live Filter Console With Animated Border Beam */}
      <div className="bw-beam-box p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1">
            <Search
              size={17}
              className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-[#64748b]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search 52 free guides (DBR 5% trap, Form F, EIBOR, Golden Visa)..."
              aria-label="Search free UAE mortgage PDF guides"
              className="h-12 w-full rounded-full border border-[#d6e2dd] bg-white pe-11 ps-11 text-sm font-medium text-[#080b0f] outline-none transition placeholder:text-[#64748b] focus:border-[#0e6954] focus:ring-2 focus:ring-[#0e6954]/15"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute end-3.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-[#eef2f6] text-[#475569] transition hover:bg-[#080b0f] hover:text-white cursor-pointer"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold text-[#334155]">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#080b0f] px-3.5 py-2 font-bold text-[#f1d57e]">
              <Sparkles size={13} />
              Showing {filtered.length} of {PDF_LIBRARY.length} Free PDFs
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#cce5dc] bg-[#edf7f4] px-3.5 py-2 font-bold text-[#0e6954]">
              Zero Email Gate · A4 Print Ready
            </span>
          </div>
        </div>

        {/* 21st.dev Spring-Animated Category Pills */}
        <div
          role="tablist"
          aria-label="Filter PDF guides by UAE mortgage category"
          className="mt-5 flex flex-wrap gap-2 border-t border-[#ebf0ee] pt-4"
        >
          {(['All', ...PDF_CATEGORIES] as const).map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveCategory(cat)}
                className={`relative rounded-full px-3.5 py-2 text-xs font-bold transition cursor-pointer ${
                  active ? 'text-white' : 'bg-[#f4f7f6] text-[#334155] hover:bg-[#e6efec] hover:text-[#080b0f]'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="bw-pdf-cat-pill"
                    transition={{ type: 'spring', stiffness: 460, damping: 34 }}
                    className="absolute inset-0 rounded-full bg-[#080b0f] shadow-[0_6px_18px_-8px_rgba(8,11,15,0.55)]"
                  />
                )}
                <span className="relative z-10 inline-flex items-center gap-1.5">
                  <span>{cat === 'All' ? 'All Categories' : cat}</span>
                  <span
                    className={`num rounded-full px-1.5 py-0.5 text-[10px] ${
                      active ? 'bg-white/15 text-[#f1d57e]' : 'bg-white text-[#64748b]'
                    }`}
                  >
                    {countsByCategory[cat]}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filtered PDF Cards Grid — Pixel-Consistent Heights */}
      {filtered.length === 0 ? (
        <div className="rounded-[26px] border border-[#dce7e2] bg-white/90 p-12 text-center backdrop-blur-md">
          <p className="font-display text-xl font-bold text-[#080b0f]">No matching PDF guides for “{query}”</p>
          <p className="mt-2 text-sm text-[#4f596b]">
            Try searching for DBR, EIBOR, Form F, Golden Visa, Islamic, off-plan, handover, buyout, or self-employed.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setActiveCategory('All');
            }}
            className="homy-btn bw-btn--sm mt-6 cursor-pointer"
          >
            <span>Reset Library Filters</span>
            <span className="homy-btn__disc" aria-hidden="true">
              <ArrowRight size={14} />
            </span>
          </button>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((pdf) => (
            <article
              key={pdf.id}
              className="bw-beam-box group flex flex-col justify-between !rounded-[24px] p-6 transition duration-200 hover:-translate-y-1 hover:border-[#d7b158]"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#080b0f] px-3 py-1 text-[10.5px] font-bold tracking-wide text-[#f1d57e]">
                    <FileText size={11} />
                    {pdf.category}
                  </span>
                  <span className="num text-[11px] font-semibold text-[#64748b]">
                    {pdf.pages}p · A4 PDF
                  </span>
                </div>

                <h2 className="mt-4 min-h-[54px] font-display text-[18px] font-bold leading-snug text-[#080b0f] transition-colors group-hover:text-[#0e6954]">
                  {pdf.title}
                </h2>
                <p className="mt-2 min-h-[60px] text-[13.5px] leading-relaxed text-[#4f596b]">
                  {pdf.subtitle}
                </p>

                {/* Neglected Insight Callout */}
                <div className="mt-4 rounded-[14px] border border-[#f2e2b6] bg-[#fffaf0] px-3.5 py-2.5">
                  <p className="flex items-center gap-1.5 text-[10.5px] font-extrabold uppercase tracking-[0.1em] text-[#8a610c]">
                    <AlertTriangle size={12} className="shrink-0 text-[#c99527]" />
                    Why Buyers Miss This
                  </p>
                  <p className="mt-1 text-[12px] leading-relaxed text-[#473818]">{pdf.neglectedWhy}</p>
                </div>

                {/* 3 Concise Takeaways */}
                <ul className="mt-4 space-y-1.5">
                  {pdf.keyTakeaways.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-[12px] leading-snug text-[#334155]">
                      <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-[#0e6954]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex items-center gap-2 border-t border-[#e8edf1] pt-4">
                <a
                  href={pdf.file}
                  download
                  onClick={() => trackEvent('pdf_guide_download', { guide_id: pdf.id, category: pdf.category })}
                  className="homy-btn bw-btn--sm flex-1 justify-between"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <FileDown size={14} /> Download Free PDF
                  </span>
                  <span className="homy-btn__disc" aria-hidden="true">
                    <span className="homy-btn__arrow-track">
                      <ArrowRight size={13} strokeWidth={2.2} />
                      <ArrowRight size={13} strokeWidth={2.2} />
                    </span>
                  </span>
                </a>
                <a
                  href={pdf.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Open ${pdf.title} in new tab`}
                  aria-label={`Open ${pdf.title} in new tab`}
                  onClick={() => trackEvent('pdf_guide_preview', { guide_id: pdf.id, category: pdf.category })}
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border border-[#dce4ea] bg-white text-[#080b0f] transition hover:border-[#0e6954] hover:text-[#0e6954]"
                >
                  <ExternalLink size={15} />
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
