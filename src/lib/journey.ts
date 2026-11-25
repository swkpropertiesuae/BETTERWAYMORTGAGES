import { borrowingPower, cashToClose, emi, goldenVisa, STRESS_RATE } from './math';

export type ResidencyKey = 'resident' | 'national' | 'gcc' | 'non-resident';
export type GoalKey = 'new-mortgage' | 'refinance' | 'equity-release' | 'off-plan';
export type PropertyStageKey = 'found-ready' | 'off-plan-handover' | 'exploring' | 'existing-owner';

export type JourneyState = {
  step: number;
  goal?: GoalKey;
  residency: ResidencyKey;
  stage?: PropertyStageKey;
  propertyValue: number;
  downPaymentPct: number;
  years: number;
  ratePct: number;
  monthlyIncome: number;
  existingEmis: number;
  cardLimits: number;
  financePreference: 'either' | 'islamic' | 'conventional';
  updatedAt: number;
};

export const JOURNEY_STORAGE_KEY = 'bw_ecosystem_journey_v1';

export const DEFAULT_JOURNEY: JourneyState = {
  step: 0,
  residency: 'resident',
  propertyValue: 2_000_000,
  downPaymentPct: 20,
  years: 25,
  ratePct: 4.19,
  monthlyIncome: 35_000,
  existingEmis: 0,
  cardLimits: 30_000,
  financePreference: 'either',
  updatedAt: 0,
};

/** Official CBUAE minimum down payment percentage by residency profile & property value. */
export function minDownPaymentPct(residency: ResidencyKey, propertyValue: number, isOffPlan = false): number {
  if (isOffPlan) return 20; // handover mortgage max 80% typical; under-construction 50% noted in copy
  if (residency === 'national') return propertyValue > 5_000_000 ? 25 : 15;
  if (residency === 'resident') return propertyValue > 5_000_000 ? 30 : 20;
  if (residency === 'gcc') return 25;
  return 40; // Non-resident typical lender policy
}

/** Deterministic underwriting readiness readout used by /get-started and the Budget Matchmaker. */
export function buildJourneyDossier(state: JourneyState) {
  const isHandover = state.goal === 'off-plan' || state.stage === 'off-plan-handover';
  const minDown = minDownPaymentPct(state.residency, state.propertyValue, false);
  const effectiveDownPct = Math.max(minDown, Math.min(80, state.downPaymentPct));
  const ctc = cashToClose({
    price: state.propertyValue,
    downPct: effectiveDownPct,
    agency: state.goal !== 'refinance' && state.goal !== 'equity-release',
    offPlanHandover: isHandover,
  });
  const monthlyPayment = emi(ctc.loan, state.ratePct, state.years);
  const stressedMonthly = emi(ctc.loan, STRESS_RATE, state.years);
  const power = borrowingPower({
    salary: state.monthlyIncome,
    existingEmis: state.existingEmis,
    cardLimits: state.cardLimits,
    years: state.years,
  });

  const totalStressedMonthly = state.existingEmis + power.cardHit + stressedMonthly;
  const dbrPct = state.monthlyIncome > 0 ? (totalStressedMonthly / state.monthlyIncome) * 100 : 100;
  const dbrStatus: 'strong' | 'tight' | 'over-cap' =
    dbrPct <= 42 ? 'strong' : dbrPct <= 50 ? 'tight' : 'over-cap';

  const gv = goldenVisa(state.propertyValue, 0);
  const completionPct = Math.min(100, Math.max(15, Math.round(((state.step + 1) / 6) * 100)));

  return {
    minDownPct: minDown,
    maxLtvPct: 100 - minDown,
    effectiveDownPct,
    loan: ctc.loan,
    downPayment: ctc.down,
    dldFee: ctc.dld,
    mortgageReg: ctc.mortgageReg,
    trusteeFee: ctc.trustee,
    valuationFee: ctc.valuation,
    agencyFee: ctc.agencyFee,
    totalFees: ctc.fees,
    totalCashToClose: ctc.total,
    monthlyPayment,
    stressedMonthly,
    maxBorrowingPower: power.maxLoan,
    dbrCapacity: power.capacity,
    dbrAvailableForMortgage: power.available,
    dbrCardImpact: power.cardHit,
    dbrPct: Math.min(99.9, Math.max(0, dbrPct)),
    dbrStatus,
    goldenVisaEligible: gv.eligible,
    goldenVisaGap: gv.gap,
    completionPct,
  };
}

export function loadSavedJourney(): JourneyState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(JOURNEY_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<JourneyState>;
    if (typeof parsed.step !== 'number' || typeof parsed.propertyValue !== 'number') return null;
    return { ...DEFAULT_JOURNEY, ...parsed };
  } catch {
    return null;
  }
}

export function saveJourney(state: JourneyState) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(JOURNEY_STORAGE_KEY, JSON.stringify({ ...state, updatedAt: Date.now() }));
    window.dispatchEvent(new Event('betterway:journey-updated'));
  } catch {}
}

export function clearSavedJourney() {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(JOURNEY_STORAGE_KEY);
    window.dispatchEvent(new Event('betterway:journey-updated'));
  } catch {}
}
