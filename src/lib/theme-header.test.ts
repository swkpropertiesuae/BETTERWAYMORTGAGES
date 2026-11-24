import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { isNavActive } from './nav-active.ts';

const read = (rel: string) => readFileSync(path.resolve(process.cwd(), rel), 'utf8');
const hasFile = (rel: string) => existsSync(path.resolve(process.cwd(), rel));

function contrastRatio(hexA: string, hexB: string): number {
  const lum = (hex: string) => {
    const clean = hex.replace('#', '');
    const [r, g, b] = [0, 2, 4].map((i) => {
      const c = parseInt(clean.slice(i, i + 2), 16) / 255;
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.7152 * 0 + 0.0722 * b;
  };
  const [l1, l2] = [lum(hexA), lum(hexB)];
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

test('global theme defines Homy Editorial tokens (#080b0f ink, #0b1117 dark footer, #f6f6f6 surface) harmonized with Betterway Emerald & Gold', () => {
  const css = read('src/app/globals.css');
  assert.match(css, /--color-navy:\s*#080b0f/i);
  assert.match(css, /--color-obsidian:\s*#0b1117/i);
  assert.match(css, /--color-mist:\s*#f6f6f6/i);
  assert.match(css, /--color-brass:\s*#d7b158/i);
  assert.match(css, /--color-teal:\s*#0e6954/i);
  assert.match(css, /@fontsource-variable\/plus-jakarta-sans/);
  assert.match(css, /\.btn-primary\b/);
});

test('uploaded Betterway brand assets and complete favicon suite exist on disk', () => {
  const required = [
    'public/brand/logo-light.svg',
    'public/brand/logo-white.svg',
    'public/brand/logo-white-full.svg',
    'public/brand/icon-fullcolor.svg',
    'public/favicon.svg',
    'public/favicon.ico',
    'public/favicon-16x16.png',
    'public/favicon-32x32.png',
    'public/apple-touch-icon.png',
    'public/safari-pinned-tab.svg',
    'public/site.webmanifest',
    'public/images/hero-dubai-residence.webp',
    'public/images/footer-dubai-night-villa.webp',
  ];
  for (const f of required) {
    assert.equal(hasFile(f), true, `Missing required brand/UI asset: ${f}`);
  }
});

test('buttons, discs, CoPilot user bubbles, and MiniPhone maintain crisp accessible contrast', () => {
  const globals = read('src/app/globals.css');
  const brand = read('src/app/brand.css');
  const copilot = read('src/components/CoPilot.tsx');
  const ui = read('src/components/ui.tsx');

  assert.doesNotMatch(globals, /\.btn-primary\s*\{[^}]*bg-brass\s+text-white/);
  assert.match(brand, /\.homy-btn[\s\S]*--hbtn-bg:\s*#080b0f;\s*--hbtn-fg:\s*#ffffff/);
  assert.doesNotMatch(copilot, /bg-brass\s+text-white/);
  assert.doesNotMatch(ui, /bg-brass[^"]*text-white/);
});

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

test('English and Arabic Homy headers render uploaded logo-light.svg with 1200px breakpoint and Contact us pill', () => {
  const header = read('src/components/Header.tsx');
  const arLayout = read('src/app/(ar)/layout.tsx');
  const brand = read('src/app/brand.css');

  assert.match(header, /\/brand\/logo-light\.svg/);
  assert.match(header, />\s*Home\s*</i);
  assert.match(header, /Contact us/i);
  assert.match(header, /min-\[1200px\]/);

  assert.match(arLayout, /<header[\s\S]*\/brand\/logo-light\.svg[\s\S]*<\/header>/);
  assert.match(brand, /\.bw-header\[data-over-hero='true'\]\[data-scrolled='false'\]\s*\{[^}]*background:\s*transparent/);
});

test('desktop header container and fluid nav sizing prevent horizontal overflow at 1200px+', () => {
  const brand = read('src/app/brand.css');
  assert.match(brand, /\.bw-header\s+\.wrap\s*\{[^}]*max-width:\s*1320px/);
  assert.match(brand, /\.bw-header__bar\s*\{[^}]*height:\s*84px/);
  assert.match(brand, /\.bw-nav\s+a,[\s\S]*?white-space:\s*nowrap/);
});

test('Arabic header defers inline nav to lg breakpoint with nowrap links and mobile header scales logo cleanly', () => {
  const arLayout = read('src/app/(ar)/layout.tsx');
  const brand = read('src/app/brand.css');

  assert.match(arLayout, /<nav\s+className="hidden gap-4 lg:flex"/);
  assert.match(arLayout, /whitespace-nowrap/);
  assert.match(brand, /@media\s*\(max-width:\s*639px\)\s*\{(?:[^{}]|\{[^{}]*\})*\.bw-header__logo\s+img\s*\{\s*height:\s*clamp\(/);
});

test('light-surface --color-teal accent meets WCAG 2.1 AA 4.5:1 contrast against white and #f6f6f6', () => {
  const globals = read('src/app/globals.css');
  const tealMatch = globals.match(/--color-teal:\s*(#[0-9a-f]{6})/i);
  assert.ok(tealMatch, 'Expected --color-teal hex token');
  const tealHex = tealMatch[1];

  for (const bg of ['#ffffff', '#f6f6f6', '#edf7f4']) {
    const ratio = contrastRatio(tealHex, bg);
    assert.ok(ratio >= 4.5, `Expected ${tealHex} on ${bg} >= 4.5:1, got ${ratio.toFixed(2)}:1`);
  }
});

test('Header sets aria-current="page" on active Home and child navigation links', () => {
  const header = read('src/components/Header.tsx');
  const matches = header.match(/aria-current=\{[^}]*'page'[^}]*\}/g) ?? [];
  assert.equal(matches.length, 4, 'Expected aria-current="page" on desktop Home, mega-menu links, mobile Home, and mobile child links');
});
