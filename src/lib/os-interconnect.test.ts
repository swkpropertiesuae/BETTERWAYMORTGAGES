import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { SITE } from '../data/site.ts';
import { ALL_TEAM_MEMBERS, EXECUTIVE_LEADERSHIP, TEAM_SPECIALISTS } from '../data/team.ts';
import { buildOsLeadPayload, createLocalEnquiryReference } from './os-interconnect.ts';

test('SITE exposes Betterway OS interconnection URLs (osUrl, osPortalUrl, osPartnerHubUrl, osLoginUrl)', () => {
  assert.ok(SITE.osUrl);
  assert.ok(SITE.osPortalUrl.endsWith('/portal'));
  assert.ok(SITE.osPartnerHubUrl.endsWith('/partners'));
  assert.ok(SITE.osLoginUrl.endsWith('/login'));
});

test('buildOsLeadPayload normalizes website enquiries, partner RERA metadata, and consultation slots for Betterway OS', () => {
  const payload = buildOsLeadPayload({
    name: 'Zayed Al Mansoori',
    phone: '+971 50 123 4567',
    email: 'zayed@example.ae',
    residency: 'UAE National',
    goal: 'Buy a ready home',
    price: '3,500,000',
    topic: 'Calculator scenario: mortgage-repayment',
    preferredSlot: 'Today 3:00 PM',
    sourcePage: '/calculators/mortgage-repayment',
    agencyName: 'SWK Properties LLC',
    reraOrn: 'ORN-51517',
    reraBrn: 'BRN-44210',
    partnerRef: 'swk-brn44210',
  });

  assert.equal(payload.contactName, 'Zayed Al Mansoori');
  assert.equal(payload.contactPhone, '+971 50 123 4567');
  assert.equal(payload.propertyPriceAed, 3_500_000);
  assert.equal(payload.preferredSlot, 'Today 3:00 PM');
  assert.equal(payload.agencyName, 'SWK Properties LLC');
  assert.equal(payload.reraOrn, 'ORN-51517');
  assert.equal(payload.partnerRef, 'swk-brn44210');
  assert.match(createLocalEnquiryReference('Zayed Al Mansoori', '+971501234567'), /^BW-ENQ-/);
});

test('official Betterway leadership (Warda Kapadia & Shabib Siraj) and all 8 eye-level aligned portraits exist and are wired into pages & forms', () => {
  assert.equal(EXECUTIVE_LEADERSHIP[0]?.name, 'Warda Kapadia');
  assert.equal(EXECUTIVE_LEADERSHIP[0]?.role, 'Founder & Managing Director');
  assert.equal(EXECUTIVE_LEADERSHIP[1]?.name, 'Shabib Siraj');
  assert.equal(EXECUTIVE_LEADERSHIP[1]?.role, 'Executive Director');
  assert.match(EXECUTIVE_LEADERSHIP[1]?.bio ?? '', /15\+ years/i);
  assert.match(EXECUTIVE_LEADERSHIP[1]?.bio ?? '', /8\+ years/i);
  assert.equal(TEAM_SPECIALISTS.length, 6);
  assert.equal(ALL_TEAM_MEMBERS.length, 8);

  for (const m of ALL_TEAM_MEMBERS) {
    for (const rel of [m.portrait8k, m.portrait, m.portrait1080, m.avatar, m.avatarWebp]) {
      const full = path.resolve(process.cwd(), 'public', rel.replace(/^\//, ''));
      assert.ok(existsSync(full), `Missing staff portrait asset: ${rel}`);
      assert.ok(statSync(full).size > 5_000, `Staff portrait asset looks empty: ${rel}`);
    }
  }

  const clientSrc = readFileSync(path.resolve(process.cwd(), 'src/components/client.tsx'), 'utf8');
  const portalLoginSrc = readFileSync(path.resolve(process.cwd(), 'src/app/(en)/portal/login/page.tsx'), 'utf8');
  const underwritersSrc = readFileSync(path.resolve(process.cwd(), 'src/app/(en)/our-underwriters/page.tsx'), 'utf8');
  assert.match(clientSrc, /submitWebsiteLeadToOs/);
  assert.match(clientSrc, /partnerMode/);
  assert.match(clientSrc, /syncedToOs/);
  assert.match(portalLoginSrc, /osPortalUrl|osLoginUrl/);
  assert.match(underwritersSrc, /TeamPortfolio/);
});
