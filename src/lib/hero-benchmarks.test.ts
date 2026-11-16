import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildRevertBriefing } from './benchmark-briefing.ts';
import { computeScrollProgress, nextSceneIndex, buildHeroDossier, interpolateCount } from './hero-showcase.ts';

test('buildRevertBriefing ranks offers by 5-year interest cost and quantifies the teaser-vs-revert spread', () => {
  const briefing = buildRevertBriefing(1_500_000, 4.21);

  assert.equal(briefing.offers.length, 3);
  assert.ok(
    briefing.offers[0].fiveYearCost <= briefing.offers[1].fiveYearCost &&
      briefing.offers[1].fiveYearCost <= briefing.offers[2].fiveYearCost,
    'Expected offers sorted ascending by 5-year interest cost',
  );

  const best = briefing.offers[0];
  const teaser = briefing.offers.find((o) => o.key === 'sib');
  assert.ok(teaser, 'Expected SIB teaser archetype in briefing');
  assert.equal(best.lowestFiveYearCost, true);
  assert.equal(teaser.lowestTeaser, true);
  assert.equal(teaser.introEmi, 7712);
  assert.equal(teaser.revertRate, 5.96);
  assert.ok(briefing.spreadFiveYear > 30_000, `Expected 5-year spread > AED 30k, got ${briefing.spreadFiveYear}`);
  assert.equal(briefing.spreadFiveYear, teaser.fiveYearCost - best.fiveYearCost);
});

test('buildRevertBriefing enforces contractual minimum floor rates when EIBOR falls below floor minus margin', () => {
  const lowEibor = buildRevertBriefing(1_500_000, 1.5);
  const sib = lowEibor.offers.find((o) => o.key === 'sib')!;
  const dib = lowEibor.offers.find((o) => o.key === 'dib')!;
  const hsbc = lowEibor.offers.find((o) => o.key === 'hsbc')!;

  // 1.50% + 1.75% = 3.25% < 3.75% floor -> floor binds at 3.75%
  assert.equal(sib.revertRate, 3.75);
  assert.equal(sib.floorBinding, true);

  // 1.50% + 1.00% = 2.50% > 2.24% floor -> formula applies at 2.50%
  assert.equal(dib.revertRate, 2.5);
  assert.equal(dib.floorBinding, false);

  // 1.50% + 1.24% = 2.74% > 1.99% floor -> formula applies at 2.74%
  assert.equal(hsbc.revertRate, 2.74);
  assert.equal(hsbc.floorBinding, false);
});

test('buildRevertBriefing returns zeroed figures when loan amount is zero or negative', () => {
  const zero = buildRevertBriefing(0, 4.21);
  assert.equal(zero.spreadFiveYear, 0);
  for (const offer of zero.offers) {
    assert.equal(offer.introEmi, 0);
    assert.equal(offer.revertEmi, 0);
    assert.equal(offer.monthlyJump, 0);
    assert.equal(offer.fiveYearCost, 0);
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

test('buildHeroDossier computes exact Dubai cash-to-close and live EIBOR formatting for AED 2M purchase', () => {
  const dossier = buildHeroDossier(2_000_000, 20, 4.20677);
  assert.equal(dossier.loan, 1_600_000);
  assert.equal(dossier.upfrontCash, 534_220);
  assert.equal(dossier.eiborFormatted, '4.21%');
  assert.equal(dossier.indicativeRate, 3.89);
  assert.ok(dossier.indicativeEmi > 8_300 && dossier.indicativeEmi < 8_400);
});

test('interpolateCount decelerates smoothly from 0 to exact integer target across [0, 1]', () => {
  assert.equal(interpolateCount(24, 0), 0);
  assert.equal(interpolateCount(24, -0.2), 0);
  // Cubic-out at t=0.5 -> 1 - (0.5)^3 = 0.875 -> 24 * 0.875 = 21
  assert.equal(interpolateCount(24, 0.5), 21);
  assert.equal(interpolateCount(24, 1), 24);
  assert.equal(interpolateCount(24, 1.4), 24);
});

