import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { isNavActive } from './nav-active.ts';

const read = (rel: string) => readFileSync(path.resolve(process.cwd(), rel), 'utf8');

const EMERALD_HEX = /#(?:08816c|066957|e8f4f1|6fd3bb|7fdcc4|80ceae|049681|1b8d73|078675|0a8576|08766f)\b|rgb\(\s*8\s+129\s+108/i;

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

test('global theme defines Midnight Banking Navy (#021125) and Sovereign Gold (#d7b04e / #8a6518) tokens', () => {
  const css = read('src/app/globals.css');
  assert.match(css, /--color-navy:\s*#021125/i);
  assert.match(css, /--color-obsidian:\s*#010915/i);
  assert.match(css, /--color-brass:\s*#d7b04e/i);
  assert.match(css, /--color-teal:\s*#8a6518/i);
  assert.match(css, /--color-teal-700:\s*#735312/i);
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

test('English header renders the brand-pack light logo on a light bar; Arabic header keeps logo-white.svg on Midnight Navy', () => {
  const header = read('src/components/Header.tsx');
  const arLayout = read('src/app/(ar)/layout.tsx');
  const brand = read('src/app/brand.css');

  assert.match(header, /\/brand\/bw\/betterway-logo-horizontal-light-bg\.svg/);
  assert.match(header, /hm-header/);
  assert.doesNotMatch(header, /\/brand\/logo-primary\.svg/);
  assert.match(header, />\s*Home\s*</i);
  assert.match(header, /Contact us/i);
  assert.match(header, /min-\[1200px\]/);
  assert.doesNotMatch(header, /min-\[1100px\]/);

  assert.match(arLayout, /<header[\s\S]*\/brand\/logo-white\.svg[\s\S]*<\/header>/);
  assert.match(brand, /\.bw-header\s*\{[^}]*background:\s*rgb\(2\s+17\s+37|background:\s*var\(--color-navy\)/i);
});

test('desktop header container and fluid nav sizing prevent horizontal overflow at 1200px+', () => {
  const brand = read('src/app/brand.css');
  assert.match(brand, /\.bw-header\s+\.wrap\s*\{[^}]*max-width:\s*1440px/);
  assert.match(brand, /\.bw-header__logo\s+img\s*\{[^}]*clamp\(35px,\s*3\.08vw,\s*45px\)/);
  assert.match(brand, /\.bw-nav\s+a,\s*\.bw-nav\s+button\s*\{[^}]*letter-spacing:\s*0\.068em/);
});

test('Arabic header defers inline nav to lg breakpoint with nowrap links and mobile header scales logo for <=360px phones', () => {
  const arLayout = read('src/app/(ar)/layout.tsx');
  const brand = read('src/app/brand.css');

  assert.match(arLayout, /<nav\s+className="hidden gap-1 lg:flex"/);
  assert.match(arLayout, /whitespace-nowrap/);
  assert.match(brand, /@media\s*\(max-width:\s*639px\)\s*\{(?:[^{}]|\{[^{}]*\})*\.bw-header__logo\s+img\s*\{\s*height:\s*clamp\(28px,\s*7\.6vw,\s*34px\)/);
});

test('light-surface --color-teal and startup text links meet WCAG 2.1 AA 4.5:1 contrast', () => {
  const globals = read('src/app/globals.css');
  const startup = read('src/app/startup.css');
  const tealMatch = globals.match(/--color-teal:\s*(#[0-9a-f]{6})/i);
  assert.ok(tealMatch, 'Expected --color-teal hex token');
  const tealHex = tealMatch[1];

  for (const bg of ['#ffffff', '#f8f9fa', '#faf3e0']) {
    const ratio = contrastRatio(tealHex, bg);
    assert.ok(ratio >= 4.5, `Expected ${tealHex} on ${bg} >= 4.5:1, got ${ratio.toFixed(2)}:1`);
  }
  assert.doesNotMatch(startup, /\.benchmark-source a\{color:#a67c21/i);
  assert.doesNotMatch(startup, /\.feature-tab-list button\[aria-pressed=true\]\{[^}]*color:#a67c21/i);
  assert.doesNotMatch(startup, /\.project-info>a\{[^}]*color:#a67c21/i);
});

test('Header sets aria-current="page" on active Home and child navigation links', () => {
  const header = read('src/components/Header.tsx');
  const matches = header.match(/aria-current=\{[^}]*'page'[^}]*\}/g) ?? [];
  assert.equal(matches.length, 4, 'Expected aria-current="page" on desktop Home, mega-menu links, mobile Home, and mobile child links');
});
