# Betterway Mortgages — Swiss / DIFC Institutional Light Frontend UI Overhaul Design Spec

**Date:** 2026-11-26  
**Repository:** `https://github.com/swkpropertiesuae/BETTERWAYMORTGAGES` (local `C:\Users\shamh\.gemini\antigravity\scratch\BetterwayMortgages`, base `main @ 81bf0e9`)  
**Visual Direction:** Swiss / DIFC Institutional Light (user-selected)  
**Architecture Strategy:** Approach 1 — Complete Design-System & Frontend Component Overhaul on the Existing Next.js 15 Engine (user-selected)  
**Brand Source of Truth:** `public/brand/raw/06_Brand_Identity_Presentation/brand-tokens.json` & `Betterway_Mortgages_Brand_Identity_Sheet_4K.png`

---

## 1. Intent & Why

Betterway Mortgages already operates a strong underlying Next.js 15 engine: 425+ statically generated SEO/AEO routes, 6 localized languages (`EN`, `AR`, `RU`, `ZH`, `FR`, `ES`), 8 live currencies, 24 licensed UAE bank profiles with original logos, 52 downloadable CBUAE/DLD PDF guides, 8 eye-level studio portraits, live CBUAE EIBOR feeds, deterministic CBUAE math (`50%` DBR, `80%/85%` LTV, `4%` DLD, `1%/AED 10k` early settlement), and live two-way integration with Betterway OS v3 (`/api/cms/live`, `/api/cms/revalidate`, `/api/os/live-chat`, `/api/os/leads`).

However, the current visual presentation undercuts the firm's institutional authority:
1. A heavy WebGL `<GlobalShaderBackdrop />` paints colored waves behind every page, muddying contrast and creating a consumer-startup vibe.
2. Three stacked stylesheets (`globals.css`, `startup.css`, and 2,381 lines of legacy Homy/Holo rules in `brand.css`) cause inconsistent radii, neon glow borders, mismatched padding, and heavy gradients.
3. The Hero (`HomeHero.tsx`) crowds a photo carousel, frosted chips, two large CTA boxes, quick-jump links, and a 3-phone `PhoneCarousel` simultaneously above the fold.
4. **Six simultaneous floating widgets/toasts** compete on screen (`HotOffersPopup` with an 8.5s auto-ambush timer, fixed bottom-left `LiveAnnouncementBar`, `ResumeJourneyToast`, bottom-left `OsLiveChat`, bottom-right `CoPilot`, and scroll-triggered `DisclosureToast`).
5. `.serif` in `globals.css` overrides `Instrument Serif` back to `Plus Jakarta Sans`, forfeiting the refined private-bank typographic contrast that is already bundled locally.

**Goal of this overhaul:** Transform the entire public frontend into an unmistakable **Swiss / DIFC Institutional Private-Bank** UAE mortgage advisory platform — calm, surgical, airy, typographically authoritative, anchored in Betterway's official Midnight Navy, Emerald Ribbon, and Champagne Gold identity, powered by **21st.dev** interactive component patterns, **Framer Motion (`motion/react`)** disciplined micro-choreography, and **Figma-grade** design token precision — without breaking a single route, calculation, language, compliance guard, or Betterway OS v3 contract.

---

## 2. Goals, Non-Goals & Anti-Goals

### Goals
- **Complete visual transformation** across global design tokens, stylesheets, English & Arabic layouts, Header, Footer, Homepage (`HomeHero`, `HeroPreCheckConsole`, `HomeExperience`, `InteractiveAdvisoryCards`, `HoloMortgageCalc`, `InteractiveReadinessStudio`, `FlagshipCta`, `HomySections`, `LogoMarquee`, `MotionPrimitives`, `PropertyMatchmakerModal`), unified `ExecutiveConciergeDock`, conversion & flagship inner routes (`PreApprovalWizard` / `/get-started`, `/contact`, `/about-us`, `/hot-offers`, `/ar`), and shared inner-page shells (`PageHero`, `Section`, `Facts`, `LinkGrid`, `CtaBand`, `MiniPhone`, `ToolPage`, `TeamPortfolio`, `ar.tsx`).
- **100% official Betterway brand asset fidelity:** Use the exact 4K transparent horizontal logos (`logo-horizontal-light.png` on light, `logo-horizontal-dark.png` on Midnight Navy), brand icon (`icon.png`), all 24 official UAE bank logos, and all 8 calibrated 3:4 eye-level studio portraits (`public/staff/`).
- **W3C Figma-ready Design Tokens export:** Emit `docs/design-system/betterway-swiss-difc-tokens.json` aligned 1:1 with CSS custom properties in `src/app/globals.css` and `brand-tokens.json`. *(Note: the connected Figma seat is View-only on the Starter plan, so tokens are exported as a Figma Variables / Tokens Studio JSON artifact rather than pushed via Figma write APIs.)*
- **Calm, uncluttered viewport:** Zero WebGL backdrop haze, zero 8.5s popup ambushes, zero scroll-triggered floating disclosure toasts, zero colliding corner launchers.
- **Full 6-language localization (`EN/AR/RU/ZH/FR/ES`), RTL & accessibility rigor:** Additive `swissUi` UI copy namespace in `src/data/i18n-extended.ts` covers every new/restructured homepage & concierge label across all 6 languages; crisp layouts at `1440px`, `1280px`, `768px`, and `390px`; clean RTL mirroring on `/ar`; WCAG 2.1 AA contrast (`≥ 4.5:1` for text, including `#0E6954` emerald text on `#FFFFFF` / `#F7F8FA` / `#EDF7F4`); full keyboard focus rings and `useReducedMotion()` support.
- **100% route, SEO/AEO, currency, math & Betterway OS preservation.**

### Non-Goals
- No rewrite of backend API routes (`/api/cms/*`, `/api/os/*`, `/api/market/eibor`, `/api/leads`, `/api/portal/*`, `/api/partners/*`).
- No edits to factual/compliance-guarded datasets (`banks.ts`, `communities.ts`, `handover.ts`, `tools.ts`, `seo-topics.ts`, `team.ts`). Only additive UI copy labels (`swissUi`) in `src/data/i18n-extended.ts` (and Arabic CoPilot intents in `CoPilot.tsx`) are added to keep all 6 locales 100% localized.
- No changes to the 52 generated PDFs in `public/docs/` or the explainer video in `scripts/video/explainer.html`.
- No removal or URL changes to any of the 425+ existing routes.

### Strict Anti-Goals & Compliance Guardrails (Enforced by `src/lib/compliance-integrity.test.ts`)
- **Zero unrelated third-party brand strings:** Never write prohibited unrelated brokerage names anywhere inside `src/` (including comments, CSS classes, or variable names).
- **Zero unverified claims:** No fabricated loan volume, turnaround promises (`48h SLA`, `Pre-approved in 48 hours`), future-dated month claims (`November 2026`, `February 2026`), fake portal payouts, or raw EMI algebraic equations in tool method steps.
- **Zero decorative bloat:** No rainbow/conic neon borders (`bw-hot-beam-shell` conic rainbow spin is replaced with crisp 1px Champagne Gold / Midnight Navy architectural hairlines), no WebGL shader canvas, no multi-phone hero clutter, no `24s`/`1080p` strings in UI.

---

## 3. Approaches Considered

| Approach | Description | Verdict |
|---|---|---|
| **Approach 1 — Complete Design-System & Frontend Component Overhaul on Existing Next.js 15 Engine** | Replace design tokens, consolidate CSS (`globals.css` + clean institutional `brand.css` with restyled compatibility aliases for bespoke inner routes), remove `GlobalShaderBackdrop`, rebuild Header, Footer, Hero, Homepage bands, primary inner pages (`/get-started`, `/contact`, `/about-us`, `/hot-offers`, `/ar`), shared inner-page shells, and unify floating widgets into one `ExecutiveConciergeDock` while preserving 100% of routes, i18n, math, and OS sync. | **Selected by user** — Delivers a night-and-day corporate transformation with zero SEO/route regressions. |
| **Approach 2 — Clean-Slate Frontend Rewrite** | Scaffold a brand-new Next.js app and migrate 425+ routes, calculators, and OS APIs. | **Rejected** — High regression risk across 425+ indexed routes, JSON-LD schemas, and CBUAE compliance tests for no additional visual gain. |

---

## 4. Figma-Grade Design System Specification

### 4.1 Color & Surface Architecture (`brand-tokens.json` → Swiss / DIFC Palette)

| Token Name | CSS Variable | Hex / Value | Usage & Contrast Guarantee |
|---|---|---|---|
| **Canvas Pure White** | `--color-canvas` / `--background` | `#FFFFFF` | Primary page canvas; clean gallery whitespace |
| **Architectural Stone** | `--color-mist` / `--color-stone` | `#F7F8FA` | Subtle alternating light sections, bento wells, input fills |
| **Stone Elevated** | `--color-sand` | `#EFF2F5` | Subtle hover surfaces, segmented tab tracks, table headers |
| **Midnight Navy (Brand Primary)** | `--color-navy` / `--foreground` | `#070E1A` | Official brand primary; primary headlines, dark hero/executive bands, primary buttons (`19.2:1` on white) |
| **Navy Surface (Brand Secondary)** | `--color-obsidian` / `--color-navy-800` | `#0C1524` | Elevated cards inside Midnight Navy bands, footer card, concierge header |
| **Navy Hairline Border (Dark)** | `--bw-dark-line` | `rgba(255, 255, 255, 0.12)` | 1px crisp dividers & card frames on Midnight Navy bands |
| **Architectural Hairline (Light)** | `--color-line` | `#E3E7EE` | 1px Swiss grid rules, card borders, header bottom divider |
| **Emerald Accessible Text** | `--color-teal` | `#0E6954` | Text links, eyebrows, positive badges on `#FFFFFF` (`6.67:1`), `#F7F8FA` (`6.26:1`), `#EDF7F4` (`6.08:1`) — **passes WCAG 2.1 AA `≥ 4.5:1`** |
| **Emerald Deep (Brand)** | `--color-teal-700` | `#0A4A3E` | Deep emerald hover/pressed text and pill surfaces |
| **Emerald Mid (Brand)** | `--color-emerald` | `#179373` | Non-text icons, active progress strokes, focus accent rings |
| **Emerald Light (Brand)** | `--color-emerald-300` / `--color-mint` | `#34DFAC` | Live status dots, numeric highlights on Midnight Navy (`12.2:1` on `#070E1A`) |
| **Emerald Tint** | `--color-teal-50` | `#EDF7F4` | Soft light-mode institutional badge fill |
| **Champagne Gold Mid (Brand)** | `--color-gold` / `--color-brass` | `#D7B158` | Fine 1px hairline accent rules, dark-mode eyebrow accents (`9.8:1` on `#070E1A`), subtle icons |
| **Champagne Gold Gleam (Brand)** | `--color-brass-200` | `#FCF1B7` | Subtle highlight accents on dark navy surfaces |
| **Champagne Gold Rich (Brand)** | `--color-brass-700` | `#8A6518` | Accessible gold/bronze text on light backgrounds (`5.1:1` on `#FFFFFF`) |
| **Body Slate** | `--color-slate` | `#4A5568` | Secondary copy, captions, form labels (`7.3:1` on `#FFFFFF`) |
| **Primary Ink** | `--color-ink` | `#0B1320` | Body prose on light surfaces |

> **Hard Contrast Rule:** Never place white text on `--color-brass` (`#D7B158`) or `#34DFAC`. Primary light-surface buttons use `#070E1A` background with `#FFFFFF` text; primary dark-surface buttons use `#FFFFFF` background with `#070E1A` text; gold accents on light surfaces use `#8A6518` for text or 1px hairline rules (`#D7B158`).

### 4.2 Typography & Editorial Hierarchy

All fonts are already bundled via `@fontsource` (zero external Google Font latency):
- **Display Sans (`--font-display`):** `Plus Jakarta Sans Variable` — weights `600`–`700`, tight editorial tracking (`-0.03em` on H1, `-0.025em` on H2), `text-wrap: balance`.
- **Editorial Serif Accent (`--font-serif`, `.serif`):** `Instrument Serif` italic (`font-weight: 400`, `font-style: italic`, `letter-spacing: -0.01em`) — restored cleanly for key institutional emphasis words inside H1/H2 (automatically switches to upright `IBM Plex Sans Arabic` in RTL `/ar`).
- **Body Sans (`--font-sans`):** `Inter Variable` — `15px–17px`, line-height `1.62`, OpenType `cv11`, `ss01`.
- **Financial Figures (`--font-mono`, `.num`):** `JetBrains Mono Variable` with `font-variant-numeric: tabular-nums` — mandatory on every EIBOR fixing, AED/FX amount, LTV %, DBR %, tenure, and bank count so live sliders never jitter horizontally.
- **Arabic (`--font-arabic`):** `IBM Plex Sans Arabic` (`400`, `500`, `600`, `700`), `letter-spacing: 0` across all headings and controls in `/ar`.

**Type Scale:**
- Hero H1: `clamp(2.35rem, 4.4vw, 3.85rem)` (`38px–62px`), line-height `1.05`
- Section H2: `clamp(1.85rem, 3vw, 2.75rem)` (`30px–44px`), line-height `1.12`
- Card H3: `1.25rem–1.5rem` (`20px–24px`), line-height `1.25`
- Institutional Eyebrow: `11px`, uppercase, tracking `0.16em`, `font-semibold`, paired with a crisp `16px × 1px` Champagne Gold (`#D7B158`) or Emerald (`#0E6954`) hairline rule instead of noisy pulsing dots.

### 4.3 Layout Grid, Radius, Sticky Header Geometry & CSS Compatibility

- **Master Rail (`--bw-rail-max`):** `1320px` (aligned identically across Header, Hero inner container, Homepage sections, Inner `PageHero`/`Section`, and Footer) with responsive gutters (`px-5 sm:px-6 lg:px-8`).
- **Swiss Architectural Radii:**
  - Buttons & Inputs: `10px` (`--radius-btn: 10px`)
  - Standard Cards & Bento Panels: `16px` (`--radius-card: 16px`)
  - Feature Stages & Modals: `20px`–`24px` (replaces bubbly `30px+` consumer curves)
  - Pills / Tags / Segmented Tabs: `9999px` (restrained usage only for status badges & compact tab switches)
- **Sticky Header & Zero Fixed-Offset Collisions:**
  - `<LiveAnnouncementBar />` renders in normal document flow at the very top of `<body>` (height `36px` when active, `null` otherwise).
  - `<Header />` uses **`position: sticky; top: 0; z-index: 50`** (`height: 80px` desktop, `68px` mobile).
  - On **inner pages**, `<main>` flows naturally directly below the `80px` sticky header — **no hardcoded `pt-[110px]` hack is needed** (`.bw-page-spacer` becomes `padding-top: 0`, and `PreApprovalWizard.tsx` updates its container padding and sticky stepper top offset to `top-[80px] max-sm:top-[68px]`).
  - On **Home (`/`, `/ru`, `/zh`, `/fr`, `/es`)**, `<HomeHero />` pulls cleanly up behind the transparent sticky header via `-mt-[80px] pt-[124px] max-sm:-mt-[68px] max-sm:pt-[104px]`, so the Midnight Navy hero sits seamlessly beneath the transparent top bar at `scrollY = 0` AND cleanly below `LiveAnnouncementBar` whenever a CMS banner is active.
- **CSS Consolidation & Bespoke-Route Compatibility (`brand.css`):**
  - `src/app/globals.css`: Master Tailwind v4 `@theme` tokens, base typography, `.wrap`, `.num`, `.serif`, `.btn*`, `.card`, `.table-bw`, `.range`.
  - `src/app/brand.css`: Rewritten from 2,381 lines down to a clean, structured **~650–800-line Swiss / DIFC Institutional Stylesheet** that defines the new Swiss system **and** keeps cleanly restyled Swiss compatibility definitions for all legacy class hooks used by bespoke inner routes (`/concierge`, `/hub`, `/edge`, `/downloads`, `/insights/*`, `/about-us`, `/advisory/*`, `/our-underwriters`, `/portal/*`, `/partners/*`, `AppShell.tsx`, `PdfLibraryBrowser.tsx`, `ContactLocationMap.tsx`): `.holo-canvas`, `.holo-canvas--page`, `.holo-section`, `.holo-section--dark`, `.holo-section--mint`, `.holo-display-h2`, `.holo-display-h3`, `.holo-lead`, `.holo-slider`, `.holo-stepper`, `.bw-fintech-stage`, `.bw-beam-box`, `.bw-hot-beam-shell`, `.bw-page-spacer`, `.bw-window`, `.homy-head`, `.homy-h2`, `.homy-btn`, `.homy-tag`, `.homy-commitment-card`, `.homy-contact-form-box`, `.bw-bank-marquee` (`@keyframes bw-bank-scroll`), `.bw-pagehero`, `.bw-capsule`, FAQ rows, and footer. This guarantees **100% visual cohesion across all 425+ routes** with zero unstyled/orphaned pages!
  - `src/app/startup.css`: Harmonized to `#070E1A`, `#FFFFFF`, `#F7F8FA`, `#E3E7EE`, and `#0E6954` for `AlertCenter`, `LiveBenchmark`, and `BenchmarkHistory`.
  - **Zero WebGL Backdrop:** Remove `<GlobalShaderBackdrop />` from both `src/app/(en)/layout.tsx` and `src/app/(ar)/layout.tsx`, and set `body` background to clean `bg-white text-ink`.

---

## 5. Layout, Navigation & Global Chrome Architecture

### 5.1 Top Live CMS Briefing Strip (`src/components/LiveAnnouncementBar.tsx`)
- Renders cleanly **in normal document flow at the top of `<body>`** (height `36px`, Midnight Navy `#070E1A` background, 1px bottom Champagne Gold hairline `rgba(215, 177, 88, 0.28)`), showing ONLY when `/api/cms/live` returns an active live banner from Betterway OS v3. Dismissible with a clean `×` button. Zero overlap with header or floating dock.

### 5.2 Corporate Sticky Header (`src/components/Header.tsx` & `src/app/(ar)/layout.tsx`)
- **Height & Rail:** Clean **`80px`** desktop sticky bar (`--bw-rail-max: 1320px`), `68px` on mobile (`< 640px`), single horizontal row with zero wrapping (`white-space: nowrap`).
- **Optical Adaptation over Dark Hero (`/` and `/ru`, `/zh`, `/fr`, `/es`):**
  - At scroll `y <= 24` on Home: `data-over-hero="true" data-scrolled="false"` — transparent background over the Midnight Navy hero with subtle bottom hairline `rgba(255,255,255,0.10)`, rendering `/brand/logo-horizontal-dark.png` (4K transparent) + crisp white nav links (`text-white/85 hover:text-white`).
  - Once scrolled (`data-scrolled="true"`) or on any inner light page: crisp translucent Pure White (`rgba(255,255,255,0.95)` + `backdrop-filter: blur(16px)`) with `1px solid #E3E7EE` bottom border, seamlessly swapping to `/brand/logo-horizontal-light.png` + Midnight Navy nav links.
- **Exact Top-Bar Slot Architecture (Locked to Fit Cleanly at `1200px+` with Zero Duplicate Active Indicators):**
  - **Left:** Official 4K horizontal Betterway Mortgages logo (`height: 38px` desktop, `clamp(28px, 7vw, 34px)` mobile — clear space respected per `brand-tokens.json`).
  - **Center (`min-[1200px]:flex`) — Exact 5 Canonical Items:** `Home` (`/`), `About Us` (`/about-us`), `For Buyers` (mega-menu), `For Agents` (mega-menu), `Resources` (mega-menu). To prevent duplicate Framer Motion `layoutId="bw-nav-active-bar"` collisions (e.g., on `/about-us` where `isNavActive` matches both `'About Us'` and `'Resources'`), compute a single winning `activeBarKey` prioritizing `'Home'` and `'About Us'` before mega-menus, while preserving `aria-current="page"` bindings on active links.
  - **Right Utility Cluster (Exact 4 Controls):**
    1. Compact **`<AlertCenter />`** bell button (`hidden sm:inline-flex`, restyled in Swiss hairline).
    2. Unified **Language (6) + Currency (8)** pill trigger (`EN · AED` with `Globe` icon) opening a crisp 2-section Swiss popover.
    3. Compact **Client Portal** icon-pill link (`/portal/login`, `Lock` icon).
    4. Single high-contrast Primary CTA: **`Contact us`** → `/contact` (localized via `t.nav.contactUs`, crisp `10px` radius Midnight Navy on light / Pure White on dark hero). *(Priority Offers triggers live in the Hero action row, `/hot-offers`, and the Executive Concierge Dock footer rather than crowding the header bar.)*
- **2-Column Architectural Mega-Menu:** Clean Pure White panel (`rounded-[18px]`, `1px solid #E3E7EE`, subtle elevation), left column structured link groups, right column Midnight Navy institutional callout panel featuring live 3M EIBOR and quick link to `/get-started`.
- **Arabic RTL Header (`src/app/(ar)/layout.tsx`):** Exact same `80px` sticky Swiss header bar using `logo-horizontal-light.png`, `IBM Plex Sans Arabic`, `hidden gap-4 lg:flex` nowrap links, clean 6-language pill switcher, and crisp Midnight Navy CTA.

### 5.3 Unified Executive Concierge Dock (`src/components/ExecutiveConciergeDock.tsx`)
- **Problem solved:** Replaces 6 overlapping floating elements (`OsLiveChat` bottom-left, `CoPilot` bottom-right, `HotOffersPopup` 8.5s auto-timer, `DisclosureToast`, bottom-left `LiveAnnouncementBar`, and noisy pill buttons) with **ONE calm, institutional concierge system**:
  1. **Single Launcher Button** anchored at `fixed bottom-5 end-5 z-50`: refined Midnight Navy (`#070E1A`) pill with `1px solid rgba(215, 177, 88, 0.45)` hairline border, official `/brand/icon.png` emblem, live emerald dot (`#34DFAC`), and localized label (`ext.swissUi.conciergeLauncher` — e.g., `"Advisory Desk"` / `"مكتب الاستشارات"`).
  2. **Tabbed Executive Drawer (`w-[min(410px,calc(100vw-24px))]`, `rounded-[20px]`):**
     - **Header:** Midnight Navy `#070E1A`, Betterway emblem, live Dubai Oud Metha desk status, close button (`Escape` supported).
     - **2-Tab Segmented Switcher** (Framer Motion `layoutId="bw-concierge-tab"`):
       - **Tab 1 — Live Advisor Desk (`<OsLiveChat embedded />`):** Persistent `localStorage` thread, quick prompts, live two-way sync to Betterway OS v3 via `POST /api/os/live-chat`, advisor callback handoff strip, WhatsApp deep link.
       - **Tab 2 — Mortgage Guide (`<CoPilot embedded />`):** Instant deterministic CBUAE/DLD/50% DBR/1% buyout/AED 2M Golden Visa Q&A calculations with **full Arabic RTL intent chips & answers** when `locale === 'ar'` alongside English & localized `COPILOT_I18N` header/welcome copy.
     - **Drawer Footer Bar (Locale-Aware):**
       - When `showHotOffersTrigger={true}` (default on `(en)/layout.tsx`, where `<HotOffersPopup />` is mounted): displays a clean trigger button opening the full **Priority Desk & Hot Offers Modal** (`window.dispatchEvent(new CustomEvent('bw:open-hot-offers'))`) + WhatsApp direct link.
       - When `showHotOffersTrigger={false}` (passed by `(ar)/layout.tsx`): replaces the modal trigger with a direct RTL Arabic link to `/ar#rates` + Arabic WhatsApp desk — **zero dead clicks and zero English modals over Arabic RTL pages**.
  3. **Manual-Trigger-Only `HotOffersPopup.tsx`:** Keeps the full interactive 2-column modal with official female advisors (`reshma-rajan` & `rahaba-azeez`), live CMS offers from `/api/cms/live`, instant OS lead capture (`/api/os/leads`), GA4 `trackEvent`, and free 2026 PDF download — **removes the 8.5-second auto-timer completely** and restyles `bw-hot-beam-shell` into a refined `1px` Champagne Gold / Midnight Navy hairline border.
  4. **Zero `<DisclosureToast />`:** Removed from `HomeExperience.tsx` (regulatory disclosure is permanently visible in the Hero footnote, Calculator disclosure, and Footer).
  5. **Contextual `<ResumeJourneyToast />`:** Appears ONLY when a visitor has an in-progress `/get-started` session (steps 1–4), docked cleanly at `bottom-5 start-5` in crisp Pure White + `1px solid #E3E7EE` + Midnight Navy progress ring.

### 5.4 Institutional Corporate Footer (`src/components/FooterClient.tsx` & `src/app/(ar)/layout.tsx`)
- **Problem solved:** Removes the dark twilight villa gimmick photo (`footer-dubai-night-villa.webp` backdrop overlay) and oversized rounded box gimmicks; keeps `public/images/footer-dubai-night-villa.webp` untouched on disk for asset tests.
- **New design:** Full-bleed **Midnight Navy (`#070E1A`)** institutional footer topped with a razor-thin `1px` Champagne Gold gradient hairline (`transparent → #D7B158/45 → transparent`).
  - **Top Row:** 4K transparent `/brand/logo-horizontal-dark.png` (left) + Oud Metha Al Nasr Plaza HQ address, operating hours, direct email & WhatsApp link (right).
  - **Middle Row (4 Clean Architectural Columns):** Mortgages, Calculators & Tools, UAE Rates & Areas, Company & Legal (100% localized via `FOOTER_LINKS_I18N` across EN/AR/RU/ZH/FR/ES, plus clean 6-language switcher pills).
  - **Bottom Compliance Strip:** Full CBUAE bank-neutral broker disclosure, copyright, and `/privacy-and-cbuae-disclosure` link.

---

## 6. Homepage Architecture (`HomeHero.tsx` & `HomeExperience.tsx`) — 8 Disciplined Bands

The homepage uses an intentional **alternating architectural rhythm** (`Navy → White → Stone → White → Navy → White → Stone → Navy`) with generous whitespace (`py-20 lg:py-28`). **Every UI string pulls from `useLocaleCurrency()` (`t`, `ext`, and additive `ext.swissUi`)** so `/`, `/ru`, `/zh`, `/fr`, and `/es` remain 100% localized with zero English fallbacks.

### Band 1: Midnight Navy Institutional Hero + Embedded Live Pre-Check Console (`HomeHero.tsx` & `HeroPreCheckConsole.tsx`)
- **Surface:** Full-width **Midnight Navy (`#070E1A`)** architectural stage (`-mt-[80px] pt-[124px] pb-20 lg:pb-24 max-sm:-mt-[68px] max-sm:pt-[104px]`) with subtle `64px` architectural hairline grid (`rgba(255,255,255,0.035)`) and an ultra-subtle desaturated architectural Dubai skyline vignette on the right edge (`opacity: 0.14` masked cleanly into `#070E1A` — zero loud photo carousel, zero 3-phone `PhoneCarousel` overlap).
- **2-Column Asymmetric Grid (`max-w-[1320px]`, `lg:grid-cols-[1.12fr_0.88fr]`, `gap-12 items-center`):**
  - **Left Column (Authoritative Narrative):**
    1. **Live Benchmark Pill:** Subtle hairline pill (`border-white/15 bg-white/[0.04]`) showing live CBUAE 3M EIBOR (`tabular-nums`, fetched via `useBenchmark()`) + `24 Licensed UAE Banks` + inline `"Watch Briefing"` trigger opening `VideoBriefingModal`.
    2. **Editorial H1:** Large crisp `Plus Jakarta Sans` headline with `Instrument Serif` italic editorial styling (`t.hero.title`).
    3. **Concise Subtitle:** Crisp `text-white/74` narrative (`t.hero.subtitle`, max-w-xl).
    4. **Action Row:** Primary Pure White CTA (`t.hero.cta1Title`, `/get-started`) + Secondary Glass Hairline CTA (`t.hero.cta2Title` opening restyled `<PropertyMatchmakerModal />` so zero existing hero capability is lost!) + subtle text trigger (`HotOffersTrigger` `"Priority Offers Desk"`).
    5. **Regulatory Micro-Line:** Single quiet localized line (`ext.swissUi.regulatoryMicro`, `text-xs text-white/52`).
  - **Right Column — 21st.dev `HeroPreCheckConsole` (`src/components/home/HeroPreCheckConsole.tsx`):**
    - Elevated `#0C1524` dark banking console (`rounded-[20px]`, `1px solid rgba(215, 177, 88, 0.28)` top champagne accent, `p-6 sm:p-7`).
    - Header: localized `"Instant Mortgage Preview"` + active currency badge (`currency` from `useLocaleCurrency()`).
    - Interactive Controls (using exact **`4.19%`** illustrative rate matching `DEFAULT_JOURNEY.ratePct` in `HoloMortgageCalc` and `PreApprovalWizard`, plus `emi()` & `cashToClose()` from `src/lib/math.ts`):
      - **Buyer Residency Toggle** (3-segment Framer Motion spring pill): `Expat Resident (80% LTV)` / `UAE National (85% LTV)` / `Non-Resident (60% LTV)`
      - **Property Value Slider + Quick Presets** (`AED 1.5M`, `2.5M`, `4M`, `7M`)
      - **Down Payment % Slider** (auto-clamped to CBUAE LTV rules: `>= 20%` expat `<= 5M`, `>= 30%` expat `> 5M`, `>= 15%` national `<= 5M`, `>= 40%` non-resident)
    - **Live Output Strip (2×2 Swiss Metric Grid, `tabular-nums`, formatted via `formatMoney()`):**
      - Est. Monthly Payment (`4.19%` / `25y` illustrative)
      - Loan Amount & LTV %
      - 4% DLD & Statutory Closing Fees
      - Total Cash Required at Transfer
    - **Direct Handoff CTA:** Links to `/get-started?price=${price}&down=${downPct}&rate=4.19&residency=${residency}` so the visitor lands on the **exact same dirham EMI** in `PreApprovalWizard` (preserving `PreApprovalWizard`'s existing hydration flow).

### Band 2: Pure White — 24-Bank Official Directory Strip & 4 Institutional Proof Metrics
- **Surface:** Pure White (`#FFFFFF`), `border-b border-[#E3E7EE]`.
- **Top Half:** Endless silky-slow horizontal **24-Bank Official Logo Marquee** (`LogoMarquee.tsx` restyled with crisp `1px solid #E3E7EE` white architectural tiles, subtle hover border `#070E1A`, zero heavy drop-shadows, keeping `bw-bank-marquee` & `@keyframes bw-bank-scroll`).
- **Bottom Half:** **4-Column Swiss Hairline Stat Strip** (divided by crisp `1px` vertical rules on desktop, factual CBUAE/directory figures only, 100% localized via `ext.swissUi.metrics`):
  1. `24` — Licensed UAE Conventional & Islamic Banks
  2. `50%` — CBUAE Maximum Debt Burden Ratio (DBR) Cap
  3. `80% / 85%` — First-Home LTV Cap (Expat / UAE National ≤ AED 5M)
  4. `AED 0` — Upfront Advisory Consultation Fee

### Band 3: Architectural Stone (`#F7F8FA`) — Swiss 4-Mandate Bento + Interactive Bank & Buyer-Profile Studio (`InteractiveAdvisoryCards.tsx`)
- **Surface:** `#F7F8FA`, `border-b border-[#E3E7EE]`.
- **Header:** Eyebrow (`t.twoCards.eyebrow`) + Editorial H2 (`t.twoCards.heading`) + Lead (`t.twoCards.sub`).
- **Part A — 4-Mandate Swiss Hairline Spotlight Bento Grid (`grid md:grid-cols-2 lg:grid-cols-4`, 100% localized via `ext.swissUi.mandates`):**
  - Crisp Pure White cards (`bg-white border border-[#E3E7EE] rounded-[16px] p-6`) with subtle cursor-tracking hairline highlight (`4%` emerald/gold tint, zero neon):
    1. **First-Home Resident** (`80%/85% LTV`) → `/mortgages/uae-residents`
    2. **Buyout & Revert Audit** (`1% / AED 10k Cap`) → `/calculators/buyout-refinance-savings`
    3. **Non-Resident & Golden Visa** (`AED 2M+`) → `/mortgages/non-resident-dubai`
    4. **Off-Plan Handover SOA** (`80 UAE Projects`) → `/handover`
- **Part B — Preserved Interactive 2-Column Institutional Workbench (Zero Functional Loss!):**
  - **Left Card (`Conventional` vs `Islamic` 24-Bank Switcher):** Clean Swiss Pure White + Midnight Navy header card retaining the full interactive Conventional/Islamic bank tab switcher, 3-logo bank showcase pagination, and direct links to `/rates` & `/get-started`.
  - **Right Card (`Expat` / `UAE National` / `Global Investor` Closing-Cost Preview + BetterClose Concierge):** Clean Swiss card retaining the full interactive buyer-profile switcher with live multi-currency `cashToClose()` breakdown and direct links to `/concierge` & `/mortgages`.

### Band 4: Pure White — Executive Multi-Currency Mortgage & 4% DLD Studio (`HoloMortgageCalc.tsx`)
- **Surface:** Pure White (`#FFFFFF`).
- **Restyling:** Rebuilds `HoloMortgageCalc.tsx` into a **Swiss Private-Bank Split Financial Workbench** (`rounded-[20px] border border-[#E3E7EE]`):
  - **Left Panel (Pure White Inputs):** Live 8-currency selector bar (`AED`, `USD`, `GBP`, `EUR`, `INR`, `RUB`, `CNY`, `SAR`), Property Price, Down Payment %, Tenure (5–25 yrs), Interest Rate (default `4.19%` with live CBUAE 3M EIBOR reference tag), Residency selector.
  - **Right Panel (Midnight Navy `#070E1A` Summary Ledger):** Segmented Framer Motion tabs (`Monthly Repayment` | `Upfront 4% DLD & Fees` | `Year-4 Revert Check`) displaying crisp `JetBrains Mono` tabular figures, proportional visual breakdown bar, CBUAE disclaimer, and direct handoff to `/get-started` or `/calculators/mortgage-calculator`.

### Band 5: Midnight Navy (`#070E1A`) — Interactive 50% DBR Borrowing Power Studio (`InteractiveReadinessStudio.tsx`) & Betterway Platform Suite
- **Surface:** Full-bleed **Midnight Navy (`#070E1A`)** executive anchor band with top/bottom subtle gold hairline accents.
- **Part A — Interactive 50% DBR Studio (`InteractiveReadinessStudio.tsx`):**
  - Clean `#0C1524` elevated console (`border border-white/12 rounded-[20px]`).
  - Preserves **100% identical financial math** (`principalFromEmi(availableMonthly, 5.75, 25)` and exact 5% credit-card-limit DBR computation) so numbers match existing calculations to the dirham!
  - Smooth Framer Motion SVG semicircle **Existing-Debt DBR Gauge** (emerald `< 25%` existing obligations → ample headroom, champagne gold `25%–40%` → moderate obligations, amber/rose `> 40%` or `>= 50%` → tight/capped under CBUAE 50% ceiling) clearly labeled `"Existing Monthly Debt DBR vs 50% CBUAE Cap"`.
- **Part B — BetterHub & BetterCore Platform Cards + Advisory Briefing Film (`VideoBriefingShowcase`):**
  - Two clean equal-height `#0C1524` architectural cards (`border border-white/12 hover:border-[#D7B158]/50`) showcasing **BetterHub** (`/hub`, `/partners`) and **BetterCore** (`/edge`, `/portal/login`) with crisp 2×2 capability tiles.
  - Below: Compact horizontal **Corporate Advisory Briefing Card** (`VideoBriefingShowcase` restyled cleanly in `#0C1524`) launching `VideoBriefingModal` (`/video/betterway-explainer.mp4`).

### Band 6: Pure White — 3-Step 1-on-1 Advisory Process & Institutional Dubai Desk Callout
- **Surface:** Pure White (`#FFFFFF`).
- **Part A — Interactive 3-Step Advisory Process:**
  - Clean 3-column numbered Swiss editorial cards (`01`, `02`, `03` from `t.education.steps`). Selecting a card smoothly elevates it into **Midnight Navy `#070E1A`** with a `2px` Champagne Gold top bar (`layoutId="bw-step-bar"`), while unselected cards remain crisp Pure White with `1px solid #E3E7EE`.
- **Part B — Compact Localized Executive Desk Preview Strip:**
  - Refined horizontal Swiss Pure White bar (`rounded-[16px] border border-[#E3E7EE] bg-[#F7F8FA]`) featuring overlapping circular avatars of **Warda Kapadia** & **Shabib Siraj** (from `EXECUTIVE_LEADERSHIP`), 100% localized `ext.swissUi.leadershipBanner` copy across all 6 languages, and direct link `"Meet Our 8 Dubai Specialists →"` (`/about-us`) — keeping full `TeamPortfolio` cleanly on `/about-us` & `/our-underwriters` (preserving zero `HomyAdvisorsCarousel` on Home and 100% 6-language purity!).

### Band 7: Architectural Stone (`#F7F8FA`) — 52 Free CBUAE/DLD Buyer Guides Strip & Sticky Split FAQ Accordion
- **Surface:** `#F7F8FA`, `border-y border-[#E3E7EE]`.
- **Part A — Featured 6 of 52 Free CBUAE & DLD PDF Guides (`FEATURED_PDFS`):**
  - Crisp Pure White cards (`rounded-[16px] border border-[#E3E7EE]`), clean emerald category tag + page count (`tabular-nums`), concise title, subtle amber-tinted "Why buyers miss this" note (`pdf.neglectedWhy`), and direct PDF download link + `"Browse All 52 Free PDFs →"` (`/downloads`).
- **Part B — Sticky Split FAQ Accordion (`HomyFaqAccordion`):**
  - Left sticky column (`lg:sticky lg:top-28`): Eyebrow, H2, concise copy, `Start Pre-Approval` & `Contact Advisory Desk` CTAs.
  - Right column: Crisp Swiss hairline accordion (`bg-white border border-[#E3E7EE] rounded-[14px]`) with smooth Framer Motion `AnimatePresence` answer reveal and crisp `+`/`−` icon transition.

### Band 8: Pure White Frame → Midnight Navy Flagship Executive CTA (`FlagshipCta.tsx`) → Institutional Footer (`FooterClient.tsx`)
- `FlagshipCta.tsx`: Restyled into an authoritative framed **Midnight Navy `#070E1A`** executive panel (`max-w-[1320px]`, `rounded-[22px]`, subtle `1px solid rgba(215,177,88,0.35)` border, `/brand/logo-horizontal-dark.png`, crisp editorial headline, Pure White primary CTA + Ghost hairline secondary CTA, zero neon glows).
- Followed directly by the full-bleed Midnight Navy Institutional Footer (`FooterClient.tsx`).

---

## 7. Global Inner-Page, Flagship Funnel & Arabic RTL Overhaul (`425+` Routes)

1. **Shared Primitives (`src/components/ui.tsx`):**
   - `PageHero`: Clean Pure White (`#FFFFFF`) header band with `1px` bottom border (`#E3E7EE`), crisp breadcrumbs, Swiss `SectionTag`, sharp `Plus Jakarta Sans` H1, AEO Answer Capsule (`bw-capsule` with `3px` Emerald `#0E6954` left rule on `#F7F8FA`), and restyled `MiniPhone` (Midnight Navy `#070E1A` **"CBUAE Statutory Reference"** executive card, preserving export name `MiniPhone`).
   - `Section` (`white` / `mist` `#F7F8FA` / `navy` `#070E1A`), `Facts`, `FaqList`, `LinkGrid`, `CtaBand` all harmonized to crisp 1px hairlines and clean architectural radii.
2. **Primary Conversion & Flagship Routes (Direct Component Upgrades):**
   - **`/get-started` (`src/components/ecosystem/PreApprovalWizard.tsx`):** Updated for the sticky `80px`/`68px` header (removes hardcoded `pt-[110px]`, sets sticky progress bar to `top-[80px] max-sm:top-[68px]`), crisp `#F7F8FA` canvas + Pure White wizard cards + Midnight Navy `#070E1A` summary cards, honoring incoming `?price=&down=&rate=&residency=` params cleanly.
   - **`/contact` (`src/app/(en)/contact/page.tsx`):** Replaces legacy twilight villa (`footer-dubai-night-villa.webp`) hero box with a crisp Swiss Midnight Navy / Pure White institutional consultation split layout alongside `ContactLocationMap` (Al Nasr Plaza, Oud Metha).
   - **`/about-us` & `TeamPortfolio.tsx`:** Midnight Navy `#070E1A` architectural Executive Leadership cards (`Warda Kapadia` & `Shabib Siraj`, `1px` Champagne Gold hairline, zero rainbow conic border) + clean Swiss 8-member gallery cards (`motion.article`, eye-level 3:4 portraits, spring department tabs, crisp modal).
   - **`/hot-offers` (`src/app/(en)/hot-offers/page.tsx`):** Midnight Navy hero + Pure White 3-track comparison cards wired to `fetchLiveCms()`.
   - **`ToolPage.tsx` (All Calculators & Micro-Tools):** Clean `#F7F8FA` band wrapping Pure White calculator shell (`rounded-[20px] border border-[#E3E7EE]`) + Swiss `Step 1 / Step 2 / Step 3` cards.
   - **All Other Bespoke Routes (`/concierge`, `/hub`, `/edge`, `/downloads`, `/insights/*`, `/advisory/*`, `/our-underwriters`, `/portal/*`, `/partners/*`):** Automatically receive full Swiss/DIFC colors, borders, typography, and radii through the restyled compatibility layer in `brand.css` (Section 4.3).
3. **Arabic RTL Experience (`src/app/(ar)/layout.tsx`, `src/app/(ar)/ar/page.tsx`, `src/components/ar.tsx`):**
   - Removes `<GlobalShaderBackdrop />` and `MorningHeroCarousel` clutter.
   - Restyles `/ar` Hero into the exact same **Midnight Navy `#070E1A` Swiss Institutional Hero** in clean RTL (`IBM Plex Sans Arabic`, crisp right-aligned editorial hierarchy, dual high-contrast action cards, live 24-bank badge) + clean alternating Pure White / `#F7F8FA` Arabic sections (`ArSection` / `ArLinks`) + `<ExecutiveConciergeDock showHotOffersTrigger={false} />` with full Arabic `OsLiveChat` and Arabic `CoPilot` intents.

---

## 8. Framer Motion (`motion/react`) Discipline & Performance

- **Motion Primitives (`src/components/ui/MotionPrimitives.tsx`):**
  - Export `EASE_SWISS = [0.22, 1, 0.36, 1]` (plus alias `EASE_HOMY`) and `SPRING_INSTITUTIONAL = { type: 'spring', stiffness: 360, damping: 34, mass: 0.9 }` (plus alias `SPRING_SNAPPY`).
  - Export `SwissReveal` (GPU-only `opacity: 0, y: 14 → opacity: 1, y: 0`, `viewport={{ once: true, amount: 0.12 }}`, instant render when `useReducedMotion()` is true).
  - Export `SwissSpotlightCard` (subtle hairline illumination via CSS `--spot-x`/`--spot-y` with zero React re-renders on `mousemove`).
  - Keep `SpotlightCard`, `ScrollScaleFrame`, `HeroParallaxMedia`, `AnimatedAnnouncementBar`, `VideoBriefingModal`, and `VideoBriefingShowcase` exported cleanly with zero `24s`/`1080p` strings.
- **Performance Targets:**
  - Zero WebGL GPU overhead on page scroll.
  - Zero layout shift (explicit `width`/`height` on all logos, bank marks, and 3:4 portraits; `tabular-nums` on every live calculator output).
  - Zero horizontal overflow (`overflow-x: clip` verified at `390px`, `768px`, `1280px`, `1440px`).

---

## 9. Test & Verification Plan

### Automated Test Suite (`npm.cmd test`)
1. **Must Pass Unchanged (Zero Relaxations):**
   - `src/lib/compliance-integrity.test.ts` (zero unrelated brokerage names, zero unverified claims, 24 banks, 60 communities, 80 projects, zero raw EMI algebra in tool steps)
   - `src/lib/math.test.ts`, `src/lib/eibor.test.ts`, `src/lib/journey.test.ts`, `src/lib/hero-benchmarks.test.ts`, `src/lib/os-interconnect.test.ts`, `src/lib/cms-live.test.ts`, `src/lib/bank-logos-footer-video.test.ts`
2. **Updated to Enforce the Approved Swiss / DIFC Institutional System:**
   - `src/lib/theme-header.test.ts`:
     - Update token assertions to official Betterway Swiss/DIFC tokens: `--color-navy: #070e1a`, `--color-obsidian: #0c1524`, `--color-mist: #f7f8fa`, `--color-brass: #d7b158`, `--color-teal: #0e6954` (keeping WCAG 2.1 AA `≥ 4.5:1` contrast test against `#ffffff`, `#f7f8fa`, `#edf7f4`!), `height: 80px`, `1320px` rail alignment, 4K transparent PNG logos, `aria-current="page"`, 6-language + 8-currency switcher, and Arabic RTL header checks.
   - `src/lib/seo-hot-offers.test.ts`:
     - Keep 100% of functional guards (52 PDFs on disk, 36 SEO topics, 6 full languages, 8 currencies, JSON-LD schemas, 24-bank marquee `bw-bank-marquee` + `bw-bank-scroll`, zero `24s`/`1080p` strings, female advisors `reshma-rajan`/`rahaba-azeez` + `trackEvent` + 2026 PDF in `HotOffersPopup`, `InteractiveReadinessStudio`, `FlagshipCta`, `TeamPortfolio` on `/about-us`, `/api/os/live-chat`, `ContactLocationMap`, `EXT_I18N` + `swissUi` across all 6 locales).
     - Replace obsolete legacy WebGL/PhoneCarousel assertions (`GlobalShaderBackdrop`, `PhoneMockupBasic`, `bg-transparent`, `bw-border-trace`) with positive Swiss/DIFC institutional guards: zero `<GlobalShaderBackdrop` in `(en)`/`(ar)` layouts, `HeroPreCheckConsole` wired in `HomeHero`, `ExecutiveConciergeDock` wired in `(en)`/`(ar)` layouts (embedding `OsLiveChat` + `CoPilot`), zero 8.5s auto-timer ambush in `HotOffersPopup`, and valid `docs/design-system/betterway-swiss-difc-tokens.json` on disk.
3. **TypeScript & Production Build:**
   - `npx.cmd tsc --noEmit` (0 errors)
   - `npm.cmd run build` (all 425+ routes build cleanly with 0 errors)
4. **Live Visual & Interactive Verification (via `browser` subagent):**
   - Boot production server (`npm.cmd run start` on isolated port) and capture live screenshots + console/network checks across:
     - `/` Desktop (`1440×900` & `1280×800`) — Hero + Pre-Check Console live slider interaction & handoff to `/get-started`, scrolled sticky header optical swap, 24-bank marquee, 4-Mandate Bento + Conventional/Islamic switcher, Calculator currency switch, DBR gauge, FAQ, Footer, and Executive Concierge Dock open/tab-switch.
     - `/` Mobile (`390×844`) — zero horizontal overflow, clean responsive hero + mobile menu.
     - `/ar` Arabic RTL (`1440×900`) — clean RTL Midnight Navy hero, `IBM Plex Sans Arabic`, Arabic Concierge Dock (both Live Chat & Arabic Mortgage Guide tabs, zero English modal leak).
     - `/get-started`, `/contact`, `/about-us`, `/rates`, `/hot-offers`, `/calculators/mortgage-calculator`, and `/ru` — full visual cohesion, 0 console errors, 0 broken images (`naturalWidth > 0`), 0 HTTP 4xx/5xx.
5. **Fresh Whole-Branch Code Review** before branch completion / user merge decision.

---

## 10. File-Level Change Map

| Layer | Files Modified / Created |
|---|---|
| **Design Tokens & CSS** | `docs/design-system/betterway-swiss-difc-tokens.json` *(new)*, `src/app/globals.css`, `src/app/brand.css`, `src/app/startup.css` |
| **Localized UI Copy** | `src/data/i18n-extended.ts` *(additive `swissUi` across all 6 locales)* |
| **Root Layouts & Global Chrome** | `src/app/(en)/layout.tsx`, `src/app/(ar)/layout.tsx`, `src/components/Header.tsx`, `src/components/FooterClient.tsx`, `src/components/LiveAnnouncementBar.tsx`, `src/components/ExecutiveConciergeDock.tsx` *(new)*, `src/components/OsLiveChat.tsx`, `src/components/CoPilot.tsx`, `src/components/HotOffersPopup.tsx`, `src/components/ecosystem/ResumeJourneyToast.tsx` |
| **Homepage Suite** | `src/components/home/HomeHero.tsx`, `src/components/home/HeroPreCheckConsole.tsx` *(new)*, `src/components/home/HomeExperience.tsx`, `src/components/home/InteractiveAdvisoryCards.tsx`, `src/components/home/InteractiveReadinessStudio.tsx`, `src/components/home/HomySections.tsx`, `src/components/ecosystem/HoloMortgageCalc.tsx`, `src/components/ecosystem/PropertyMatchmakerModal.tsx`, `src/components/LogoMarquee.tsx`, `src/components/ui/FlagshipCta.tsx`, `src/components/ui/MotionPrimitives.tsx` |
| **Flagship & Shared Inner Pages + Arabic RTL** | `src/components/ui.tsx`, `src/components/ToolPage.tsx`, `src/components/TeamPortfolio.tsx`, `src/components/ecosystem/PreApprovalWizard.tsx`, `src/app/(en)/contact/page.tsx`, `src/app/(en)/hot-offers/page.tsx`, `src/components/ar.tsx`, `src/app/(ar)/ar/page.tsx` |
| **Test Guards** | `src/lib/theme-header.test.ts`, `src/lib/seo-hot-offers.test.ts` |
