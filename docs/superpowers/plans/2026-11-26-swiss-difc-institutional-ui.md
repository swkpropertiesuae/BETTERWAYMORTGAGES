# Betterway Mortgages — Swiss / DIFC Institutional Light UI Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Betterway Mortgages' public frontend visual layer with a cohesive **Swiss / DIFC Institutional Light** corporate design system (21st.dev interactive patterns, Framer Motion `motion/react` micro-choreography, and Figma-grade design tokens) while preserving 100% of all 425+ routes, 6 languages, 8 live currencies, 24 banks, 52 PDFs, 8 eye-level studio portraits, CBUAE math, and two-way Betterway OS v3 integration.

**Architecture:** Perform a clean design-system and component overhaul directly on the existing Next.js 15 App Router engine. Consolidate `globals.css` + `brand.css` + `startup.css` around official `brand-tokens.json` Midnight Navy (`#070E1A`), Pure White (`#FFFFFF`), Architectural Stone (`#F7F8FA`), WCAG-AA Emerald (`#0E6954` on light / `#34DFAC` on navy), and Champagne Gold (`#D7B158`) hairlines; remove `<GlobalShaderBackdrop />` and the 6 colliding floating widgets in favor of an in-flow top `LiveAnnouncementBar` + sticky `80px` `Header` + single bottom-end tabbed `ExecutiveConciergeDock`; rebuild the 8-band Homepage and shared/flagship inner-page shells (including `/get-started`, `/contact`, `/about-us`, `/hot-offers`, and Arabic RTL `/ar`).

**Tech Stack:** Next.js `15.5.29`, React `19.3.1`, Tailwind CSS `4.3.5`, `motion` (`motion/react` `14.10.1`), `lucide-react`, `@fontsource-variable/{plus-jakarta-sans,inter,jetbrains-mono}`, `@fontsource/{instrument-serif,ibm-plex-sans-arabic}`, Node built-in test runner (`npm.cmd test`).

**Spec:** `docs/superpowers/specs/2026-11-26-swiss-difc-institutional-ui-design.md`

## Global Constraints
- **Zero prohibited third-party strings** anywhere inside `src/` (including comments, CSS classes, or variable names) — verified by `src/lib/compliance-integrity.test.ts`.
- **Zero unverified claims:** No `AED 600M`, `48h SLA`, `Pre-approved in 48 hours`, `November 2026`, `February 2026`, `AED 80,000+`, fake payouts, or raw EMI equations in `TOOLS` method steps.
- **Zero `24s` / `1080p` / `Full HD` strings** in UI components (`MotionPrimitives`, `HomeHero`, `HomeExperience`).
- **WCAG 2.1 AA contrast (`≥ 4.5:1`):** `--color-teal: #0e6954` on `#ffffff`, `#f7f8fa`, and `#edf7f4`; never place white text on `#d7b158` or `#34dfac`.
- **Official brand assets only:** `/brand/logo-horizontal-light.png`, `/brand/logo-horizontal-dark.png`, `/brand/icon.png`, all 24 `/banks/*` logos, all 8 `/staff/*` 3:4 eye-level studio portraits.
- **Windows CLI:** Always run `npm.cmd` and `npx.cmd` in PowerShell.

## Review Focus
1. **Sticky header + in-flow `LiveAnnouncementBar` + `/get-started` stepper offset:** Verify zero overlap between `LiveAnnouncementBar` (36px), sticky `Header` (80px desktop / 68px mobile), `HomeHero` (`-mt-[80px] pt-[124px]`), and `PreApprovalWizard` (`top-[80px] max-sm:top-[68px]`).
2. **Duplicate Framer Motion `layoutId` in Header on `/about-us`:** `isNavActive('/about-us', ...)` matches both `'About Us'` and `'Resources'`; pin single-winner `activeBarKey` selection so `layoutId="bw-nav-active-bar"` never mounts twice simultaneously.
3. **HeroPreCheckConsole → `/get-started` EMI parity:** Both use `4.19%` illustrative rate (`DEFAULT_JOURNEY.ratePct`) and pass `&rate=4.19` in the query string so monthly EMI matches to the exact dirham upon handoff.
4. **Arabic RTL `/ar` Concierge Dock isolation:** `(ar)/layout.tsx` passes `showHotOffersTrigger={false}` to `ExecutiveConciergeDock` (replacing the English modal trigger with an Arabic `/ar#rates` link) and `CoPilot` renders Arabic intent chips & answers when `locale === 'ar'`.
5. **Bespoke inner routes CSS compatibility:** Restyled compatibility classes in `brand.css` (`.holo-canvas--page`, `.holo-section`, `.bw-fintech-stage`, `.bw-beam-box`, `.homy-head`, `.homy-btn`, `.holo-slider`, `.holo-stepper`, etc.) keep `/concierge`, `/hub`, `/edge`, `/downloads`, `/insights/*`, `/portal/*`, and `/partners/*` visually cohesive with zero broken layout.

---

### Task 1: Design Tokens Export, Consolidated Swiss/DIFC CSS & Localized `SWISS_UI_I18N`

**Files:**
- Create: `docs/design-system/betterway-swiss-difc-tokens.json`
- Modify: `src/app/globals.css`, `src/app/brand.css`, `src/app/startup.css`
- Modify: `src/data/i18n-extended.ts`, `src/components/LocaleCurrencyContext.tsx`
- Test: `src/lib/theme-header.test.ts`, `src/lib/seo-hot-offers.test.ts`

**Interfaces:**
- Produces:
  - W3C Figma-ready JSON tokens in `docs/design-system/betterway-swiss-difc-tokens.json`
  - CSS variables (`--color-navy: #070e1a`, `--color-obsidian: #0c1524`, `--color-mist: #f7f8fa`, `--color-brass: #d7b158`, `--color-teal: #0e6954`, `--bw-rail-max: 1320px`) & restored `.serif` (`Instrument Serif`)
  - `SWISS_UI_I18N: Record<LocaleCode, SwissUiCopy>` exported from `src/data/i18n-extended.ts` and exposed as `swiss` via `useLocaleCurrency()`

- [ ] **Step 1:** Update `src/lib/theme-header.test.ts` and `src/lib/seo-hot-offers.test.ts` with target Swiss/DIFC token, layout, `SWISS_UI_I18N`, `HeroPreCheckConsole`, `ExecutiveConciergeDock`, and zero-auto-popup assertions (keeping 100% of WCAG AA, compliance, 52 PDFs, 24 banks, 6 locales, 8 currencies, and JSON-LD checks intact).
- [ ] **Step 2:** Run `npm.cmd test` to confirm the new Swiss/DIFC assertions fail before implementation (TDD red).
- [ ] **Step 3:** Create `docs/design-system/betterway-swiss-difc-tokens.json`, update `src/app/globals.css` (restoring `Instrument Serif` in `.serif` and setting official `#070E1A` / `#0C1524` / `#F7F8FA` / `#E3E7EE` / `#0E6954` / `#D7B158` tokens), rewrite `src/app/brand.css` cleanly (~650–800 lines with full Swiss compatibility layer for bespoke routes), and harmonize `src/app/startup.css`.
- [ ] **Step 4:** Add `SwissUiCopy` + `SWISS_UI_I18N` across all 6 locales (`en`, `ar`, `ru`, `zh`, `fr`, `es`) to `src/data/i18n-extended.ts` and expose `swiss` on `LocaleCurrencyContext.tsx`.
- [ ] **Step 5:** Commit tokens, stylesheets, and localized UI dictionary.

---

### Task 2: Root Layouts, Sticky Corporate Header, Top Briefing Bar, Institutional Footer & Unified Executive Concierge Dock

**Files:**
- Create: `src/components/ExecutiveConciergeDock.tsx`
- Modify: `src/app/(en)/layout.tsx`, `src/app/(ar)/layout.tsx`, `src/components/Header.tsx`, `src/components/FooterClient.tsx`, `src/components/LiveAnnouncementBar.tsx`, `src/components/OsLiveChat.tsx`, `src/components/CoPilot.tsx`, `src/components/HotOffersPopup.tsx`, `src/components/ecosystem/ResumeJourneyToast.tsx`, `src/components/ui/MotionPrimitives.tsx`

**Interfaces:**
- Consumes: `swiss` from `useLocaleCurrency()`, `SPRING_INSTITUTIONAL` / `EASE_SWISS` from `MotionPrimitives.tsx`
- Produces:
  - `ExecutiveConciergeDock({ showHotOffersTrigger?: boolean })`
  - `OsLiveChat({ embedded?: boolean })` and `CoPilot({ embedded?: boolean })` (with Arabic Q&A intents when `locale === 'ar'`)
  - `HotOffersPopup` (manual trigger only — zero 8.5s auto-timer ambush)
  - `SwissReveal`, `SwissSpotlightCard`, `EASE_SWISS`, `SPRING_INSTITUTIONAL` (plus backwards-compatible aliases `EASE_HOMY`, `SPRING_SNAPPY`)

- [ ] **Step 1:** Upgrade `src/components/ui/MotionPrimitives.tsx` with `EASE_SWISS`, `SPRING_INSTITUTIONAL`, `SwissReveal`, `SwissSpotlightCard`, and restyled Swiss `VideoBriefingShowcase` & `VideoBriefingModal`.
- [ ] **Step 2:** Restyle `LiveAnnouncementBar.tsx` into an in-flow top `36px` Midnight Navy institutional briefing strip, upgrade `Header.tsx` (`80px` sticky bar, single-winner `activeBarKey` for `layoutId="bw-nav-active-bar"`, locked 5 center links + 4 right controls, crisp 2-column mega-menu), and rebuild `FooterClient.tsx` into a clean full-bleed Midnight Navy corporate footer (no twilight villa overlay).
- [ ] **Step 3:** Add `embedded?: boolean` support to `OsLiveChat.tsx` and `CoPilot.tsx` (adding Arabic RTL Q&A intents to `CoPilot.tsx`), remove the 8.5s auto-timer from `HotOffersPopup.tsx` and refine its Swiss hairline modal frame, create `ExecutiveConciergeDock.tsx`, and restyle `ResumeJourneyToast.tsx`.
- [ ] **Step 4:** Remove `<GlobalShaderBackdrop />` from `src/app/(en)/layout.tsx` and `src/app/(ar)/layout.tsx`, set clean `bg-white`, mount in-flow `<LiveAnnouncementBar />` above `<Header />`, mount `<ExecutiveConciergeDock />` (`showHotOffersTrigger={false}` on `/ar`), and update `/ar` sticky header & footer.
- [ ] **Step 5:** Run `npx.cmd tsc --noEmit` and commit layout & global chrome overhaul.

---

### Task 3: Flagship Homepage 8-Band Overhaul (`HomeHero`, `HeroPreCheckConsole`, `HomeExperience`, `InteractiveAdvisoryCards`, `HoloMortgageCalc`, `InteractiveReadinessStudio`, `FlagshipCta`, `LogoMarquee`, `HomySections`, `PropertyMatchmakerModal`)

**Files:**
- Create: `src/components/home/HeroPreCheckConsole.tsx`
- Modify: `src/components/home/HomeHero.tsx`, `src/components/home/HomeExperience.tsx`, `src/components/home/InteractiveAdvisoryCards.tsx`, `src/components/ecosystem/HoloMortgageCalc.tsx`, `src/components/home/InteractiveReadinessStudio.tsx`, `src/components/ui/FlagshipCta.tsx`, `src/components/LogoMarquee.tsx`, `src/components/home/HomySections.tsx`, `src/components/ecosystem/PropertyMatchmakerModal.tsx`

**Interfaces:**
- Consumes: `emi`, `cashToClose`, `principalFromEmi` from `src/lib/math.ts`; `minDownPaymentPct` from `src/lib/journey.ts`; `useBenchmark` from `StartupExperience.tsx`; `useLocaleCurrency` (`t`, `ext`, `swiss`, `currency`, `formatMoney`, `formatCompact`); `HotOffersTrigger`
- Produces: Complete 8-band alternating `Navy → White → Stone → White → Navy → White → Stone → Navy` Homepage across `/`, `/ru`, `/zh`, `/fr`, `/es`.

- [ ] **Step 1:** Build `src/components/home/HeroPreCheckConsole.tsx` (interactive residency toggle, property price slider + presets, CBUAE-clamped down payment slider, live `4.19%` EMI + 4% DLD + total cash required metrics in active currency, and `/get-started?price=...&down=...&rate=4.19&residency=...` handoff) and rebuild `HomeHero.tsx` as the Midnight Navy Swiss Institutional Hero (keeping `VideoBriefingModal`, `PropertyMatchmakerModal`, and `HotOffersTrigger` wired cleanly).
- [ ] **Step 2:** Restyle `LogoMarquee.tsx` (crisp white `1px` architectural bank tiles) and rebuild `InteractiveAdvisoryCards.tsx` (4-Mandate Swiss spotlight bento + preserved Conventional/Islamic 24-bank switcher & Expat/National/Global closing-cost workbench).
- [ ] **Step 3:** Restyle `HoloMortgageCalc.tsx` into the Swiss Split Financial Workbench (Pure White inputs left, Midnight Navy `#070E1A` 3-tab summary ledger right) and `InteractiveReadinessStudio.tsx` into the Midnight Navy 50% DBR Studio (preserving `principalFromEmi(..., 5.75, 25)` math + existing-debt DBR gauge thresholds `< 25%` / `25–40%` / `> 40%`).
- [ ] **Step 4:** Restyle `HomySections.tsx` (`HomyFaqAccordion` with Framer Motion `AnimatePresence`), `FlagshipCta.tsx`, `PropertyMatchmakerModal.tsx`, and compose the 8 disciplined bands in `HomeExperience.tsx` (removing `<DisclosureToast />` and adding the compact localized Executive Desk callout strip linking to `/about-us`).
- [ ] **Step 5:** Run `npx.cmd tsc --noEmit` and commit homepage overhaul.

---

### Task 4: Shared Inner-Page Shells, Flagship Conversion Routes (`/get-started`, `/contact`, `/about-us`, `/hot-offers`) & Arabic RTL (`/ar`)

**Files:**
- Modify: `src/components/ui.tsx`, `src/components/ToolPage.tsx`, `src/components/TeamPortfolio.tsx`, `src/components/ecosystem/PreApprovalWizard.tsx`, `src/app/(en)/contact/page.tsx`, `src/app/(en)/hot-offers/page.tsx`, `src/components/ar.tsx`, `src/app/(ar)/ar/page.tsx`

- [ ] **Step 1:** Upgrade `src/components/ui.tsx` (`PageHero`, `MiniPhone` CBUAE Statutory Reference card, `Section`, `Facts`, `FaqList`, `LinkGrid`, `CtaBand`, `SectionTag`, `Cta`) and `ToolPage.tsx` to crisp Swiss/DIFC hairlines and tonal alternating bands.
- [ ] **Step 2:** Upgrade `TeamPortfolio.tsx` (Executive Leadership navy split cards with 1px gold hairline + Swiss 8-member gallery grid & modal), `PreApprovalWizard.tsx` (sticky header offset `top-[80px] max-sm:top-[68px]`, clean `#F7F8FA` + Pure White cards), `src/app/(en)/contact/page.tsx` (remove twilight villa image box, Swiss consultation layout + `ContactLocationMap`), and `src/app/(en)/hot-offers/page.tsx`.
- [ ] **Step 3:** Upgrade `src/components/ar.tsx` and `src/app/(ar)/ar/page.tsx` to the Midnight Navy Swiss Institutional RTL Hero (removing `MorningHeroCarousel` clutter) and clean alternating Arabic RTL sections.
- [ ] **Step 4:** Run `npm.cmd test`, `npx.cmd tsc --noEmit`, and `npm.cmd run build` — verify 100% tests pass, 0 TypeScript errors, and all 425+ routes build cleanly!
- [ ] **Step 5:** Commit inner-page, funnel, and RTL overhaul.

---

### Task 5: Live Browser Visual Verification, Whole-Branch Code Review, Merge & Push

- [ ] **Step 1:** Boot production build (`npx.cmd next start -p 3099`) as daemon and dispatch `browser` subagent (`Model: "flash"`) to visually inspect and verify interactivity + zero console/network/image errors across `/`, `/ar`, `/ru`, `/get-started`, `/contact`, `/about-us`, `/rates`, `/hot-offers`, `/calculators/mortgage-calculator` at Desktop (`1440×900`, `1280×800`) and Mobile (`390×844`).
- [ ] **Step 2:** Inspect browser evidence screenshots directly via `read_file` and fix any visual or responsive polish issues immediately; re-run `npm.cmd test && npx.cmd tsc --noEmit && npm.cmd run build`.
- [ ] **Step 3:** Dispatch ONE fresh whole-branch Code Reviewer (`invoke_subagent`, `TypeName: "self"`, `Model: "pro"`) against `git diff main...HEAD`; fix every Critical/Important finding and re-verify tests & build.
- [ ] **Step 4:** Kill daemon server, merge `redesign/swiss-difc-institutional-ui` cleanly into `main`, verify clean test/build state on `main`, and push to `origin/main` per user instruction ("Push and merge").
