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
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const [l1, l2] = [lum(hexA), lum(hexB)];
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

test('global theme defines Swiss / DIFC Institutional tokens (#070E1A Midnight Navy, #0C1524 surface, #F7F8FA stone, #D7B158 gold, #0E6954 accessible emerald)', () => {
  const css = read('src/app/globals.css');
  assert.match(css, /--color-navy:\s*#070e1a/i);
  assert.match(css, /--color-obsidian:\s*#0c1524/i);
  assert.match(css, /--color-mist:\s*#f7f8fa/i);
  assert.match(css, /--color-brass:\s*#d7b158/i);
  assert.match(css, /--color-teal:\s*#0e6954/i);
  assert.match(css, /@fontsource-variable\/plus-jakarta-sans/);
  assert.match(css, /\.serif\s*\{[^}]*var\(--font-serif\)/);
  assert.match(css, /\.btn-primary\b/);

  const tokenFile = path.resolve(process.cwd(), 'docs/design-system/betterway-swiss-difc-tokens.json');
  assert.equal(existsSync(tokenFile), true, 'Missing Figma-ready W3C design tokens JSON');
  const parsed = JSON.parse(readFileSync(tokenFile, 'utf8'));
  assert.equal(parsed.color?.brand?.midnightNavy?.$value?.toUpperCase(), '#070E1A');
  assert.equal(parsed.color?.brand?.emeraldAccessible?.$value?.toUpperCase(), '#0E6954');
});

test('uploaded Betterway 4K transparent PNG brand assets and complete favicon suite exist on disk', () => {
  const required = [
    'public/brand/4k/betterway-favicon-4k-transparent.png',
    'public/brand/4k/betterway-icon-4k-transparent.png',
    'public/brand/4k/betterway-logo-horizontal-dark-4k-transparent.png',
    'public/brand/4k/betterway-logo-horizontal-light-4k-transparent.png',
    'public/brand/4k/betterway-logo-stacked-dark-4k-transparent.png',
    'public/brand/4k/betterway-logo-stacked-light-4k-transparent.png',
    'public/brand/logo-horizontal-light.png',
    'public/brand/logo-horizontal-dark.png',
    'public/brand/logo-stacked-light.png',
    'public/brand/logo-stacked-dark.png',
    'public/brand/logo-light-4k.png',
    'public/brand/logo-dark-4k.png',
    'public/brand/icon.png',
    'public/brand/icon-4k.png',
    'public/brand/favicon-4k.png',
    'public/favicon.svg',
    'public/favicon.ico',
    'public/favicon-16x16.png',
    'public/favicon-32x32.png',
    'public/favicon-48x48.png',
    'public/favicon-64x64.png',
    'public/favicon-96x96.png',
    'public/favicon-128x128.png',
    'public/favicon-256x256.png',
    'public/favicon-512.png',
    'public/apple-touch-icon.png',
    'public/android-chrome-192x192.png',
    'public/android-chrome-512x512.png',
    'public/maskable-icon-512x512.png',
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
  assert.match(brand, /\.homy-btn[\s\S]*--hbtn-bg:\s*#070e1a;\s*--hbtn-fg:\s*#ffffff/i);
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

test('English and Arabic corporate headers render 4K transparent PNG logo-horizontal-light.png and logo-horizontal-dark.png with 6-language & currency switcher', () => {
  const header = read('src/components/Header.tsx');
  const arLayout = read('src/app/(ar)/layout.tsx');
  const brand = read('src/app/brand.css');

  assert.match(header, /\/brand\/logo-horizontal-light\.png/);
  assert.match(header, /\/brand\/logo-horizontal-dark\.png/);
  assert.match(header, /t\.nav\.home/);
  assert.match(header, /Contact us|t\.nav\.contact/i);
  assert.match(header, /min-\[1200px\]/);
  assert.match(header, /LOCALES/);
  assert.match(header, /CURRENCIES/);

  assert.match(arLayout, /<header[\s\S]*\/brand\/logo-horizontal-light\.png[\s\S]*<\/header>/);
  assert.match(brand, /\.bw-header\[data-over-hero='true'\]\[data-scrolled='false'\]\s*\{[^}]*background:\s*transparent/);
});

test('desktop sticky header container and hero rail share exact 1320px alignment and 80px institutional bar height', () => {
  const brand = read('src/app/brand.css');
  const hero = read('src/components/home/HomeHero.tsx');

  assert.match(brand, /--bw-rail-max:\s*1320px/);
  assert.match(brand, /\.bw-header\s+\.wrap\s*\{[^}]*max-width:\s*var\(--bw-rail-max\)/);
  assert.match(brand, /\.holo-hero__inner\s*\{[^}]*max-width:\s*var\(--bw-rail-max\)/);
  assert.match(brand, /\.bw-header__bar\s*\{[^}]*height:\s*80px/);
  assert.match(brand, /\.bw-nav\s+a,[\s\S]*?white-space:\s*nowrap/);
  assert.match(hero, /className="holo-hero__inner/);
});

test('Arabic header defers inline nav to lg breakpoint with nowrap links and mobile header scales logo cleanly', () => {
  const arLayout = read('src/app/(ar)/layout.tsx');
  const brand = read('src/app/brand.css');

  assert.match(arLayout, /<nav\s+className="hidden gap-4 lg:flex"/);
  assert.match(arLayout, /whitespace-nowrap/);
  assert.match(brand, /@media\s*\(max-width:\s*639px\)\s*\{(?:[^{}]|\{[^{}]*\})*\.bw-header__logo\s+img\s*\{\s*height:\s*clamp\(/);
});

test('light-surface --color-teal accent meets WCAG 2.1 AA 4.5:1 contrast against white, #f7f8fa, and #edf7f4', () => {
  const globals = read('src/app/globals.css');
  const tealMatch = globals.match(/--color-teal:\s*(#[0-9a-f]{6})/i);
  assert.ok(tealMatch, 'Expected --color-teal hex token');
  const tealHex = tealMatch[1];

  for (const bg of ['#ffffff', '#f7f8fa', '#edf7f4']) {
    const ratio = contrastRatio(tealHex, bg);
    assert.ok(ratio >= 4.5, `Expected ${tealHex} on ${bg} >= 4.5:1, got ${ratio.toFixed(2)}:1`);
  }
});

test('Header sets aria-current="page" on active Home, About Us, mega-menu, and mobile navigation links', () => {
  const header = read('src/components/Header.tsx');
  const matches = header.match(/aria-current=\{[^}]*'page'[^}]*\}/g) ?? [];
  assert.ok(matches.length >= 4, `Expected at least 4 aria-current="page" bindings, got ${matches.length}`);
});
