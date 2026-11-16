import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { BANKS } from '../data/banks.ts';

const repoFile = (rel: string) => path.resolve(process.cwd(), rel);

test('every bank in BANKS has a distinct, non-empty logo asset on disk under public/banks/', () => {
  assert.equal(BANKS.length, 24);
  const seen = new Set<string>();

  for (const bank of BANKS) {
    const logo = (bank as { logo?: string }).logo;
    assert.ok(logo, `Expected ${bank.key} (${bank.name}) to define a logo path`);
    assert.match(logo, /^\/banks\/[a-z0-9-]+\.(?:svg|png|webp)$/, `Invalid logo path format for ${bank.key}: ${logo}`);
    assert.equal(seen.has(logo), false, `Duplicate logo path ${logo} on ${bank.key}`);
    seen.add(logo);

    const diskPath = repoFile(`public${logo}`);
    assert.equal(existsSync(diskPath), true, `Missing bank logo file on disk: ${diskPath}`);
    const bytes = statSync(diskPath).size;
    assert.ok(bytes > 200, `Expected non-trivial logo file for ${bank.key}, got ${bytes} bytes`);
  }
});

test('Footer removes the oversized bw-footer__mark Betterway wordmark while keeping logo-white-full.svg', () => {
  const ui = readFileSync(repoFile('src/components/ui.tsx'), 'utf8');
  const brand = readFileSync(repoFile('src/app/brand.css'), 'utf8');

  assert.match(ui, /\/brand\/logo-white-full\.svg/);
  assert.doesNotMatch(ui, /bw-footer__mark/);
  assert.doesNotMatch(ui, /data-reveal="mark"/);
  assert.doesNotMatch(brand, /\.bw-footer__mark\b/);
});

test('explainer.html uses Midnight Banking Navy (#021125) and Sovereign Gold (#d7b04e) with zero legacy emerald/mint colors', () => {
  const html = readFileSync(repoFile('scripts/video/explainer.html'), 'utf8');

  assert.doesNotMatch(html, /#007d78|#081d37|#6fe3c9|rgba\(\s*0\s*,\s*125\s*,\s*120/i);
  assert.match(html, /#021125/i);
  assert.match(html, /#d7b04e/i);
  assert.match(html, /public\/brand\/logo-white\.svg/);
});
