import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildRevertBriefing } from './benchmark-briefing.ts';
import { computeScrollProgress, nextSceneIndex, buildHeroDossier, interpolateCount } from './hero-showcase.ts';

test('buildRevertBriefing models bank-neutral EIBOR + margin tiers (+1.00%, +1.50%, +2.00%) on the published CBUAE fixing', () => {
  const briefing = buildRevertBriefing(1_500_000, 4.21);

  assert.equal(briefing.tiers.length, 3);
  assert.deepEqual(
    briefing.tiers.map((t) => t.margin),
    [1.0, 1.5, 2.0],
  );
  assert.equal(briefing.tiers[0].effectiveRate, 5.21);
  assert.equal(briefing.tiers[1].effectiveRate, 5.71);
  assert.equal(briefing.tiers[2].effectiveRate, 6.21);
  assert.ok(
    briefing.tiers[0].monthlyEmi < briefing.tiers[1].monthlyEmi &&
      briefing.tiers[1].monthlyEmi < briefing.tiers[2].monthlyEmi,
  );
  assert.equal(briefing.monthlySpread, briefing.tiers[2].monthlyEmi - briefing.tiers[0].monthlyEmi);
});

test('buildRevertBriefing returns zeroed payment figures when loan amount is zero or negative', () => {
  const zero = buildRevertBriefing(0, 4.21);
  assert.equal(zero.monthlySpread, 0);
  for (const tier of zero.tiers) {
    assert.equal(tier.monthlyEmi, 0);
  }
});

test('computeScrollProgress normalizes scroll position to [0, 1] and guards non-scrollable pages against NaN', () => {
  assert.equal(computeScrollProgress(0, 900, 900), 0);
  assert.equal(computeScrollProgress(100, 700, 900), 0);
  assert.equal(computeScrollProgress(-40, 2900, 900), 0);
  assert.equal(computeScrollProgress(1000, 2900, 900), 0.5);
  assert.equal(computeScrollProgress(2400, 2900, 900), 1);
});

test('nextSceneIndex wraps both forward and backward across hero architectural scenes', () => {
  assert.equal(nextSceneIndex(0, 3, 1), 1);
  assert.equal(nextSceneIndex(2, 3, 1), 0);
  assert.equal(nextSceneIndex(0, 3, -1), 2);
  assert.equal(nextSceneIndex(0, 0, 1), 0);
});

test('buildHeroDossier formats live CBUAE EIBOR and returns official CBUAE statutory LTV & DBR caps', () => {
  const dossier = buildHeroDossier(4.20677);
  assert.equal(dossier.eiborFormatted, '4.21%');
  assert.equal(dossier.residentMaxLtv, '80%');
  assert.equal(dossier.nationalMaxLtv, '85%');
  assert.equal(dossier.maxDbr, '50%');
});

test('interpolateCount decelerates smoothly from 0 to exact integer target across [0, 1]', () => {
  assert.equal(interpolateCount(24, 0), 0);
  assert.equal(interpolateCount(24, -0.2), 0);
  assert.equal(interpolateCount(24, 0.5), 21);
  assert.equal(interpolateCount(24, 1), 24);
  assert.equal(interpolateCount(24, 1.4), 24);
});
