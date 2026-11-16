# Midnight Navy Header & Sovereign Gold UI Palette Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the Betterway Mortgages (`swk.property`) English and Arabic headers to fit `/brand/logo-white.svg` prominently inside a `#021125` Midnight Banking Navy bar with tracked uppercase mega-menu navigation and a solid `#D7B04E` Sovereign Gold `CONTACT US` pill, while shifting the global UI palette from emerald-teal (`#08816C`) to Midnight Navy, Alabaster, and restrained Sovereign Gold.

**Architecture:** Remap the shared Tailwind v4 `@theme` color variables in `src/app/globals.css` (`navy`, `obsidian`, `brass`/`gold`, `teal` → `#a67c21`, `teal-700` → `#8a6518`, `teal-50` → `#faf3e0`, `mint` → `#d7b04e`), adjust button/chip/disc contrast rules, and sweep hardcoded emerald hexes in `brand.css`, `globals.css`, `startup.css`, `StartupExperience.tsx`, `CoPilot.tsx`, and `ui.tsx`. Rebuild `src/components/Header.tsx` (with route-aware active states and a `1200px` desktop breakpoint) and `src/app/(ar)/layout.tsx` to use the dark Midnight Navy frame, generous white-and-gold lockup, and gold CTA pill.

**Tech Stack:** Next.js 15.5 (App Router, static export), React 19, TypeScript 5.9, Tailwind CSS v4 (`@tailwindcss/postcss`), Motion, Lucide React, Node built-in test runner (`node --test`).

**Spec:** `docs/superpowers/specs/2026-11-15-header-gold-ui-design.md`

## Global Constraints

- Do not alter any of the 360 blueprint route paths, CBUAE math formulas, page copy, photography, or mega-menu link destinations.
- Solid `#D7B04E` gold pills/discs must always pair with `#021125` Midnight Navy foreground text/icons; never place white text on `#D7B04E` or `#A67C21`.
- Gold text/links/eyebrows on white or `#F8F9FA` Alabaster surfaces must use `#A67C21` (`--color-teal`) or `#8A6518` (`--color-teal-700`) with `#FAF3E0` (`--color-teal-50`) soft tint.
- Desktop navigation must switch from the mobile drawer at `1200px` (`min-[1200px]`) so the `44–48px` tall `/brand/logo-white.svg` lockup + `HOME` + 6 uppercase triggers + alert bell + `العربية` + `CONTACT US` pill never wrap or collide.
- `npm test`, `npm run build`, and `node scripts/check-links.mjs` must all pass with zero broken internal links.

## Review Focus

1. **White-on-gold contrast regression on `bg-teal` elements:** Remapping `--color-teal` to `#a67c21` would leave `.btn-primary`, `.chip-on`, `.phone-action`, `.step-dot.active`, `CoPilot` user bubbles (`bg-teal text-white`), and `MiniPhone` CTA (`bg-teal ... text-white`) with lower-contrast or overly yellow fills unless switched to `bg-navy text-white` (with gold accents) or `bg-brass text-navy`.
2. **White icon on gold `.bw-btn__disc` and FAQ `+` badge:** `.bw-btn` previously paired `--disc: var(--color-teal)` with `--disc-fg: #fff`, and `.bw-faq__list details[open] summary i` paired `background: var(--color-teal)` with `color: #fff`; when those discs become Sovereign Gold (`#d7b04e`), their foreground must be `var(--color-navy)` (`#021125`).
3. **Header active-state accuracy across nested routes:** `HOME` must highlight in `#D7B04E` only when `pathname === '/'`, while each mega-menu trigger highlights when `open === n.label` or when `pathname` belongs to that category's routes (including `/tools/*` under `Calculators`, `/affordability/*` under `Areas`, and `/advisory/*` + `/about-us` + `/why-betterway-vs-direct-bank` + `/our-underwriters` + `/reviews` under `Resources`).
4. **Desktop header wrapping between `1100px` and `1199px`:** With `/brand/logo-white.svg` enlarged to `clamp(38px, 3.3vw, 48px)` plus `HOME` added to the bar, `Header.tsx` and `.bw-nav` must use a `1200px` (`min-[1200px]`) breakpoint consistently across the nav bar, mega-menu panel, and mobile drawer toggle.
5. **Stray emerald hexes in secondary stylesheets & SVG charts:** `startup.css`, `brand.css`, `globals.css`, and `BenchmarkHistory` in `StartupExperience.tsx` contain hardcoded `#08816c`, `#80ceae`, `rgb(8 129 108 ...)`, and `#049681` values that bypass `@theme` unless explicitly replaced.

---

### Task 1: Global Midnight Navy & Sovereign Gold Theme System + Contrast Sweep

**Files:**
- Create: `src/lib/theme-header.test.ts`
- Modify: `src/app/globals.css:9-96,113-156`
- Modify: `src/app/brand.css:22-68,78-85,174-182,205-213,272-280,319-325`
- Modify: `src/app/startup.css:1-82`
- Modify: `src/components/StartupExperience.tsx:97-102`
- Modify: `src/components/CoPilot.tsx:36-58`
- Modify: `src/components/ui.tsx:81-100`

**Interfaces:**
- Produces:
  - CSS `@theme` tokens in `src/app/globals.css`: `--color-navy: #021125`, `--color-navy-800: #072244`, `--color-obsidian: #010915`, `--color-gold: #d7b04e`, `--color-brass: #d7b04e`, `--color-brass-200: #f2dcb3`, `--color-brass-700: #a67c21`, `--color-teal: #a67c21`, `--color-teal-700: #8a6518`, `--color-teal-50: #faf3e0`, `--color-emerald: #a67c21`, `--color-emerald-300: #dfc06d`, `--color-mint: #d7b04e`.
  - Utility class `.btn-gold` in `src/app/globals.css` (`bg-[#d7b04e] text-[#021125] hover:bg-[#e5c165]` with uppercase/semibold support) for solid Sovereign Gold pills.
  - Contrast-safe `.btn-primary` (`bg-navy text-white hover:bg-navy-800` with subtle gold ring/shadow), `.chip-on` (`border-navy bg-navy text-white`), and `.bw-btn` (`--bg: var(--color-navy); --fg: #fff; --disc: var(--color-brass); --disc-fg: var(--color-navy);` plus `.bw-btn--gold` with `--bg: var(--color-brass); --fg: var(--color-navy); --disc: var(--color-navy); --disc-fg: var(--color-brass);`).

- [ ] **Step 1: Write the failing palette and contrast tests in `src/lib/theme-header.test.ts`**

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const read = (rel: string) => readFileSync(path.resolve(process.cwd(), rel), 'utf8');

const EMERALD_HEX = /#(?:08816c|066957|e8f4f1|6fd3bb|7fdcc4|80ceae|049681|1b8d73|078675|0a8576|08766f)\b|rgb\(\s*8\s+129\s+108/i;

test('global theme defines Midnight Banking Navy (#021125) and Sovereign Gold (#d7b04e / #a67c21) tokens', () => {
  const css = read('src/app/globals.css');
  assert.match(css, /--color-navy:\s*#021125/i);
  assert.match(css, /--color-obsidian:\s*#010915/i);
  assert.match(css, /--color-brass:\s*#d7b04e/i);
  assert.match(css, /--color-teal:\s*#a67c21/i);
  assert.match(css, /--color-teal-700:\s*#8a6518/i);
  assert.match(css, /--color-teal-50:\s*#faf3e0/i);
  assert.match(css, /--color-mint:\s*#d7b04e/i);
  assert.match(css, /\.btn-gold\b/);
});

test('no leftover emerald hex or rgb(8 129 108) values remain in stylesheets or StartupExperience', () => {
  for (const file of ['src/app/globals.css', 'src/app/brand.css', 'src/app/startup.css', 'src/components/StartupExperience.tsx']) {
    const src = read(file);
    assert.equal(EMERALD_HEX.test(src), false, `Unexpected emerald color in ${file}`);
  }
});

test('buttons, discs, CoPilot user bubbles, and MiniPhone avoid white text on gold fills', () => {
  const globals = read('src/app/globals.css');
  const brand = read('src/app/brand.css');
  const copilot = read('src/components/CoPilot.tsx');
  const ui = read('src/components/ui.tsx');

  assert.doesNotMatch(globals, /\.btn-primary\s*\{[^}]*bg-teal\s+text-white/);
  assert.doesNotMatch(globals, /\.chip-on\s*\{[^}]*bg-teal\s+text-white/);
  assert.match(brand, /\.bw-btn\s*\{[^}]*--disc:\s*var\(--color-brass\);\s*--disc-fg:\s*var\(--color-navy\)/);
  assert.doesNotMatch(copilot, /bg-teal\s+text-white/);
  assert.doesNotMatch(ui, /bg-teal[^"]*text-white/);
});
```

- [ ] **Step 2: Run `npm test` to verify the new tests fail**

Run: `npm test`
Expected: FAIL on `global theme defines Midnight Banking Navy (#021125)...`, `no leftover emerald hex...`, and `buttons, discs, CoPilot user bubbles...`.

- [ ] **Step 3: Implement the Midnight Navy & Sovereign Gold palette and contrast rules**

1. In `src/app/globals.css`:
   - Update `@theme` to `--color-navy: #021125`, `--color-navy-800: #072244`, `--color-obsidian: #010915`, `--color-gold: #d7b04e`, `--color-brass: #d7b04e`, `--color-brass-200: #f2dcb3`, `--color-brass-700: #a67c21`, `--color-teal: #a67c21`, `--color-teal-700: #8a6518`, `--color-teal-50: #faf3e0`, `--color-emerald: #a67c21`, `--color-emerald-300: #dfc06d`, `--color-mint: #d7b04e`.
   - Set `::selection { background: var(--color-brass); color: var(--color-navy); }`.
   - Update `.btn-primary` to `@apply bg-navy text-white hover:bg-navy-800; box-shadow: 0 14px 30px -18px rgb(2 17 37 / 0.65), inset 0 0 0 1px rgb(215 176 78 / 0.28);`.
   - Add `.btn-gold { @apply bg-brass font-semibold text-navy hover:bg-brass-200; box-shadow: 0 12px 28px -14px rgb(215 176 78 / 0.55); }`.
   - Update `.chip-on` to `@apply border-navy bg-navy text-white hover:border-navy;`.
   - Update `.hero-footnote` border (`#ebd9ab`), `.hero-photo` fallback (`#e8e2d5`), `.phone-insight` (`background: #faf3e0; color: var(--color-teal-700)`), `.phone-action` (`background: var(--color-navy); color: white;`), and `.step-dot.active` (`background: var(--color-navy); border-color: var(--color-brass); color: var(--color-brass);`).
2. In `src/app/brand.css`:
   - Update `.bw-btn` defaults to `--bg: var(--color-navy); --fg: #fff; --disc: var(--color-brass); --disc-fg: var(--color-navy);`, update `.bw-btn--emerald` / add `.bw-btn--gold` (`--bg: var(--color-brass); --fg: var(--color-navy); --disc: var(--color-navy); --disc-fg: var(--color-brass);`), and keep `.bw-btn--brass` dark-with-gold-disc.
   - Update `.bw-announce` (`background: var(--color-obsidian); border-bottom: 1px solid rgb(255 255 255 / 0.08);`).
   - Replace emerald `rgb(8 129 108 ...)` glows in `.bw-glow--emerald`, `.bw-calc-shell`, and `.bw-pagehero::before` with warm navy/gold glows (`rgb(7 34 68 / 0.55)` and `rgb(215 176 78 / 0.16)`).
   - Update `.bw-faq__list details[open] summary i` to `background: var(--color-brass); color: var(--color-navy);`.
3. In `src/app/startup.css`:
   - Replace hardcoded emerald hexes (`#08816c`, `#d8eee5`, `#08766f`, `#7dcaac`/`#b4dfcf`, `#e3f3ed`/`#078675`, `#dff5e9`/`#0a8576`, `#049681`/`#e5f5ef`, `#80ceae`, `#e4f2ed`/`#1b8d73`, and soft green borders/tints) with the Midnight Navy (`#021125` / `#072244`) & Sovereign Gold (`#d7b04e` / `#a67c21` / `#faf3e0`) equivalents.
4. In `src/components/StartupExperience.tsx`:
   - In `BenchmarkHistory`, replace `#80ceae` area gradient stops with `#d7b04e` (`0.32` → `0`) and `#08816C` line stroke with `#a67c21` (with warm `#e5e0d5` gridlines and `#5b6675` axis labels).
5. In `src/components/CoPilot.tsx`:
   - Change user bubble from `ms-auto bg-teal text-white` to `ms-auto bg-navy text-white` (and link inside bot bubble keeps `text-teal` which is `#a67c21` on `#f8f9fa`).
6. In `src/components/ui.tsx`:
   - In `MiniPhone`, change the bottom pill from `bg-teal ... text-white` to `bg-brass ... text-navy` (`Plan your mortgage` in bold `#021125` on Sovereign Gold `#D7B04E`).

- [ ] **Step 4: Run `npm test` to verify all Task 1 tests pass**

Run: `npm test`
Expected: PASS (all existing math/eibor/route tests + 3 new theme tests pass).

- [ ] **Step 5: Commit Task 1**

```powershell
& "C:\Program Files\Git\cmd\git.exe" add docs/superpowers/specs/2026-11-15-header-gold-ui-design.md src/lib/theme-header.test.ts src/app/globals.css src/app/brand.css src/app/startup.css src/components/StartupExperience.tsx src/components/CoPilot.tsx src/components/ui.tsx
& "C:\Program Files\Git\cmd\git.exe" commit -m "feat(theme): shift UI palette to Midnight Banking Navy and Sovereign Gold"
```

---

### Task 2: Midnight Navy & Sovereign Gold Header (English Mega-Menu + Arabic Mirror) & Build Verification

**Files:**
- Modify: `src/lib/theme-header.test.ts`
- Modify: `src/components/Header.tsx:1-111`
- Modify: `src/app/brand.css:86-96,336-338`
- Modify: `src/app/(ar)/layout.tsx:42-51`

**Interfaces:**
- Consumes: `@theme` tokens and `.btn-gold` from Task 1; `NAV` (`NavItem[]`) from `src/data/nav.ts`.
- Produces:
  - Pure helper `export function isNavActive(pathname: string, label: string): boolean` in `src/data/nav.ts` (or `src/lib/nav-active.ts` imported by `Header.tsx` and tested in `src/lib/theme-header.test.ts`) mapping `/` → `'Home'` and route prefixes (`/mortgages`, `/rates`, `/calculators` + `/tools`, `/handover`, `/areas` + `/affordability`, `/guides` + `/advisory` + `/about-us` + `/why-betterway-vs-direct-bank` + `/our-underwriters` + `/reviews`) to their top-level trigger.
  - Updated `Header` component in `src/components/Header.tsx` and `.bw-header*` / `.bw-nav*` / `.bw-cta-pill` rules in `src/app/brand.css`, plus updated Arabic `<header>` in `src/app/(ar)/layout.tsx`.

- [ ] **Step 1: Add failing header & active-route tests to `src/lib/theme-header.test.ts`**

Append to `src/lib/theme-header.test.ts`:

```ts
import { isNavActive } from './nav-active.ts';

test('isNavActive highlights Home only on / and maps nested routes to their mega-menu category', () => {
  assert.equal(isNavActive('/', 'Home'), true);
  assert.equal(isNavActive('/rates', 'Home'), false);
  assert.equal(isNavActive('/mortgages/uae-residents', 'Mortgages'), true);
  assert.equal(isNavActive('/rates/hsbc-uae-mortgage-rates', 'Rates'), true);
  assert.equal(isNavActive('/tools/form-f-clause-generator', 'Calculators'), true);
  assert.equal(isNavActive('/handover/emaar', 'Off-plan'), true);
  assert.equal(isNavActive('/affordability/20000-aed-salary-mortgage-dubai', 'Areas'), true);
  assert.equal(isNavActive('/about-us', 'Resources'), true);
});

test('English and Arabic headers render logo-white.svg on Midnight Navy with 1200px breakpoint and gold CONTACT US pill', () => {
  const header = read('src/components/Header.tsx');
  const arLayout = read('src/app/(ar)/layout.tsx');
  const brand = read('src/app/brand.css');

  assert.match(header, /\/brand\/logo-white\.svg/);
  assert.doesNotMatch(header, /\/brand\/logo-primary\.svg/);
  assert.match(header, />\s*Home\s*</i);
  assert.match(header, /Contact us/i);
  assert.match(header, /min-\[1200px\]/);
  assert.doesNotMatch(header, /min-\[1100px\]/);

  assert.match(arLayout, /<header[\s\S]*\/brand\/logo-white\.svg[\s\S]*<\/header>/);
  assert.match(brand, /\.bw-header\s*\{[^}]*background:\s*rgb\(2\s+17\s+37|background:\s*var\(--color-navy\)/i);
});
```

- [ ] **Step 2: Run `npm test` to verify the new header tests fail**

Run: `npm test`
Expected: FAIL (`Cannot find module './nav-active.ts'` / missing header assertions).

- [ ] **Step 3: Create `src/lib/nav-active.ts` and rebuild the English & Arabic Midnight Navy headers**

1. Create `src/lib/nav-active.ts` exporting `isNavActive(pathname: string, label: string): boolean`:
   - `'Home'`: `pathname === '/'`
   - `'Mortgages'`: `pathname.startsWith('/mortgages')`
   - `'Rates'`: `pathname.startsWith('/rates')`
   - `'Calculators'`: `pathname.startsWith('/calculators') || pathname.startsWith('/tools')`
   - `'Off-plan'`: `pathname.startsWith('/handover')`
   - `'Areas'`: `pathname.startsWith('/areas') || pathname.startsWith('/affordability')`
   - `'Resources'`: `['/guides', '/advisory', '/about-us', '/why-betterway-vs-direct-bank', '/our-underwriters', '/reviews'].some((p) => pathname === p || pathname.startsWith(p + '/'))`
2. In `src/app/brand.css`:
   - Style `.bw-header` as a sticky Midnight Banking Navy bar (`background: rgb(2 17 37 / 0.97); backdrop-filter: blur(16px) saturate(1.3); border-bottom: 1px solid rgb(255 255 255 / 0.08);` and `border-bottom-color: rgb(215 176 78 / 0.24)` when `[data-scrolled='true']`).
   - Size `.bw-header__bar` at `height: 86px` (`76px` below `640px`) and `.bw-header__logo img` at `height: clamp(38px, 3.3vw, 48px); width: auto;` so the gold squircle emblem + `Betterway Mortgages` serif wordmark sit generously proportioned like the reference screenshot.
   - Style `.bw-nav` (`@media (min-width: 1200px) { display: flex; }`, `gap: 2px`) so `.bw-nav a, .bw-nav button` render in `12.5px` uppercase (`font-weight: 600; letter-spacing: 0.09em; color: rgb(255 255 255 / 0.84); padding: 9px 11px; border-radius: 999px;`), shifting to Sovereign Gold (`color: var(--color-brass);`) on `:hover`, `[aria-expanded='true']`, or `[data-active='true']` (with subtle `background: rgb(255 255 255 / 0.05)` on hover/expanded).
   - Style `.bw-cta-pill` to match the reference screenshot's solid gold pill (`display: inline-flex; align-items: center; justify-content: center; height: 42px; padding: 0 22px; border-radius: 999px; background: var(--color-brass); color: var(--color-navy); font-size: 12.5px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; transition: background 0.2s, transform 0.2s;`) with `:hover { background: var(--color-brass-200); transform: translateY(-1px); }`.
   - Style `.bw-header .alert-bell` for the dark header (`width: 40px; height: 40px; background: rgb(255 255 255 / 0.05); border-color: rgb(255 255 255 / 0.14); color: rgb(255 255 255 / 0.84);`, hover `border-color: rgb(215 176 78 / 0.45); color: var(--color-brass);`, badge `background: var(--color-brass); color: var(--color-navy); border-color: var(--color-navy); font-weight: 700;`).
3. In `src/components/Header.tsx`:
   - Render `/brand/logo-white.svg` (`width={1618} height={276}`).
   - Render `<Link href="/" data-active={isNavActive(path, 'Home') || undefined}>Home</Link>` as the first item in `.bw-nav`, followed by the 6 `NAV` mega-menu `<button>` triggers with `data-active={isNavActive(path, n.label) || undefined}`.
   - Use `min-[1200px]` consistently for desktop utilities, mega-menu panel, and mobile menu toggle/drawer.
   - Style `العربية` link in crisp off-white/gold hover (`text-xs font-semibold tracking-wider text-white/80 hover:text-brass`), mobile menu button in dark glass (`border border-white/15 bg-white/5 text-white hover:border-brass/50 hover:text-brass`), and desktop CTA as `<Link href="/contact" className="bw-cta-pill">Contact us</Link>`.
   - Restyle the desktop mega-menu dropdown (`border-t border-white/10 bg-[#021125] text-white shadow-[0_32px_64px_-24px_rgb(1_9_21/0.85)]`) with gold column eyebrows (`text-brass`), crisp white links (`text-white/90 hover:text-brass`) + muted descriptions (`text-white/50`), and a refined feature card (`border border-brass/25 bg-white/[0.04]` with `.bw-cta-pill` / gold link).
   - Restyle the mobile slide-down drawer (`border-t border-white/10 bg-[#021125] text-white min-[1200px]:hidden`) with `Home` link at top, collapsible `NAV` accordions (`border-white/10`, `text-white`, chevron `text-brass`), full-width `.bw-cta-pill` `Contact us`, and dark-bordered `العربية` button.
4. In `src/app/(ar)/layout.tsx`:
   - Swap `/brand/logo-primary.svg` to `/brand/logo-white.svg`, style Arabic nav links as `text-white/85 hover:bg-white/5 hover:text-brass`, style the `English` switch button for the dark bar (`border border-white/20 bg-white/5 text-white hover:border-brass hover:text-brass`), and style the primary Arabic CTA with `.bw-cta-pill` (`!normal-case !tracking-normal` for Arabic script).

- [ ] **Step 4: Run tests, full production Next.js build, and internal link scanner**

Run:
```powershell
npm install
npm test
npm run build
node scripts/check-links.mjs
```
Expected:
- `npm test`: PASS (all math, eibor, route, palette, and header tests pass)
- `npm run build`: PASS (TypeScript + static generation succeed)
- `node scripts/check-links.mjs`: `371 pages scanned, 0 broken internal links`

- [ ] **Step 5: Commit Task 2**

```powershell
& "C:\Program Files\Git\cmd\git.exe" add src/lib/nav-active.ts src/lib/theme-header.test.ts src/components/Header.tsx src/app/brand.css src/app/(ar)/layout.tsx docs/superpowers/plans/2026-11-15-header-gold-ui.md
& "C:\Program Files\Git\cmd\git.exe" commit -m "feat(header): restyle English and Arabic headers in Midnight Navy and Sovereign Gold"
```
