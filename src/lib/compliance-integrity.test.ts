import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { TOOLS } from '../data/tools.ts';
import { BANKS } from '../data/banks.ts';
import { COMMUNITIES } from '../data/communities.ts';
import { PROJECTS } from '../data/handover.ts';

const repo = (rel: string) => path.resolve(process.cwd(), rel);

function walkSourceFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...walkSourceFiles(full));
    } else if (/\.(?:ts|tsx)$/.test(entry) && !entry.endsWith('.test.ts')) {
      out.push(full);
    }
  }
  return out;
}

test('no calculator or tool method contains mathematical equations, formula operators, or monospace step styling', () => {
  const equationPattern = /[=×÷^Σ≥≤]|\b(?:min|max)\s*\(|\bPV\b|\(1\+r\)/;
  for (const tool of TOOLS) {
    assert.ok(tool.method.length >= 2, `Expected plain-English summary steps for ${tool.slug}`);
    for (const step of tool.method) {
      assert.doesNotMatch(step, equationPattern, `Unexpected equation syntax in ${tool.slug}: "${step}"`);
    }
  }

  const toolPage = readFileSync(repo('src/components/ToolPage.tsx'), 'utf8');
  assert.doesNotMatch(toolPage, /<span className="num[^>]*>0\{i \+ 1\}<\/span>/);
  assert.doesNotMatch(toolPage, /fixed-vs-revert\.mp4/);
});

test('BANKS directory retains all 24 original logos and factual profiles without unverified hardcoded rate cards', () => {
  assert.equal(BANKS.length, 24);
  const forbiddenRateKeys = ['intro', 'fixed3', 'fixed5', 'margin', 'floor', 'nrLtv', 'ccFactor'];
  for (const bank of BANKS) {
    assert.ok(bank.slug && bank.key && bank.logo && bank.name && bank.type && bank.hq);
    for (const k of forbiddenRateKeys) {
      assert.equal(k in bank, false, `Unexpected unverified rate property "${k}" on bank ${bank.key}`);
    }
  }
});

test('COMMUNITIES directory retains all 60 freehold areas without unverified price-per-sqft or rental yield claims', () => {
  assert.equal(COMMUNITIES.length, 60);
  const forbiddenCommunityKeys = ['psf', 'yieldPct', 'typical', 'rent'];
  for (const c of COMMUNITIES) {
    assert.ok(c.slug && c.emirate && c.name && c.stock && c.devs);
    for (const k of forbiddenCommunityKeys) {
      assert.equal(k in c, false, `Unexpected unverified market figure "${k}" on community ${c.slug}`);
    }
  }
});

test('PROJECTS directory retains all 80 handover projects without unverified launch prices, valuations, or APL bank counts', () => {
  assert.equal(PROJECTS.length, 80);
  const forbiddenProjectKeys = ['launch', 'value', 'apl', 'balancePct'];
  for (const p of PROJECTS) {
    assert.ok(p.slug && p.dev && p.name && p.community);
    for (const k of forbiddenProjectKeys) {
      assert.equal(k in p, false, `Unexpected unverified valuation/APL property "${k}" on project ${p.slug}`);
    }
  }
});

test('source files and explainer video contain zero unverified marketing claims, fake 2026 stats, equations, or mock transactions', () => {
  const bannedPatterns: [RegExp, string][] = [
    [/EMI\s*=\s*P|\(1\+r\)\^n/, 'raw EMI algebra equation'],
    [/AED\s*600M/i, 'unverified AED 600M commercial loan claim'],
    [/359\.35|115,?989/, 'unverified 2026 DLD YTD sales claim'],
    [/AED\s*80,000\+?|over AED 80,000/i, 'unverified AED 80,000 life insurance savings claim'],
    [/November 2026|February 2026|Feb 2026|نوفمبر 2026/i, 'unverified future-dated 2026 claim'],
    [/Villa 14,\s*Dubai Hills|ValuStrat|35%\s*of\s*0\.80%|Business Bay buyout/i, 'fictional portal or partner payout transaction'],
    [/15-minute Dubai Courts|Pre-approved in 48 hours|48h SLA/i, 'unverified turnaround time claim'],
  ];

  const files = [...walkSourceFiles(repo('src')), repo('scripts/video/explainer.html')];
  for (const file of files) {
    // math.ts holds pure deterministic computation helpers for user-supplied inputs
    if (file.endsWith(path.join('src', 'lib', 'math.ts'))) continue;
    const content = readFileSync(file, 'utf8');
    const rel = path.relative(process.cwd(), file);
    for (const [pattern, reason] of bannedPatterns) {
      assert.doesNotMatch(content, pattern, `Found ${reason} in ${rel}`);
    }
  }
});
