import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildJourneyDossier, DEFAULT_JOURNEY, minDownPaymentPct } from './journey.ts';

test('minDownPaymentPct applies official CBUAE LTV thresholds across residency tiers and AED 5M threshold', () => {
  assert.equal(minDownPaymentPct('resident', 2_000_000), 20);
  assert.equal(minDownPaymentPct('resident', 6_000_000), 30);
  assert.equal(minDownPaymentPct('national', 2_000_000), 15);
  assert.equal(minDownPaymentPct('national', 6_000_000), 25);
  assert.equal(minDownPaymentPct('gcc', 2_000_000), 25);
  assert.equal(minDownPaymentPct('non-resident', 2_000_000), 40);
});

test('buildJourneyDossier enforces CBUAE LTV floor, calculates itemised 4% DLD fees, and assesses 50% DBR', () => {
  const d = buildJourneyDossier({
    ...DEFAULT_JOURNEY,
    residency: 'resident',
    propertyValue: 2_000_000,
    downPaymentPct: 10, // below statutory 20% floor — must clamp to 20%
    monthlyIncome: 40_000,
    existingEmis: 0,
    cardLimits: 40_000,
  });
  assert.equal(d.effectiveDownPct, 20);
  assert.equal(d.loan, 1_600_000);
  assert.equal(d.dldFee, 80_580);
  assert.equal(d.dbrCardImpact, 2_000);
  assert.equal(d.goldenVisaEligible, true);
  assert.equal(d.dbrStatus, 'strong');
  assert.ok(d.totalCashToClose > 530_000);
});

test('buildJourneyDossier flags over-cap DBR when commitments exceed 50% of gross income', () => {
  const d = buildJourneyDossier({
    ...DEFAULT_JOURNEY,
    propertyValue: 5_000_000,
    downPaymentPct: 20,
    monthlyIncome: 25_000,
    existingEmis: 4_000,
    cardLimits: 100_000,
  });
  assert.equal(d.dbrStatus, 'over-cap');
  assert.ok(d.dbrPct > 50);
});
