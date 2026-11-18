import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { SITE } from '../data/site.ts';
import { buildOsLeadPayload, createLocalEnquiryReference } from './os-interconnect.ts';

function walkSrc(dir: string): string[] {
  const out: string[] = [];
  for (const e of readdirSync(dir)) {
    const full = path.join(dir, e);
    if (statSync(full).isDirectory()) out.push(...walkSrc(full));
    else if (/\.(?:ts|tsx)$/.test(e) && !e.endsWith('.test.ts')) out.push(full);
  }
  return out;
}

test('SITE exposes Betterway OS interconnection URLs (osUrl, osPortalUrl, osPartnerHubUrl, osLoginUrl)', () => {
  assert.ok(SITE.osUrl);
  assert.ok(SITE.osPortalUrl.endsWith('/portal'));
  assert.ok(SITE.osPartnerHubUrl.endsWith('/partners'));
  assert.ok(SITE.osLoginUrl.endsWith('/login'));
});

test('buildOsLeadPayload normalizes website enquiries, calculator scenarios, and consultation slots for Betterway OS', () => {
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
  });

  assert.equal(payload.contactName, 'Zayed Al Mansoori');
  assert.equal(payload.contactPhone, '+971 50 123 4567');
  assert.equal(payload.propertyPriceAed, 3_500_000);
  assert.equal(payload.preferredSlot, 'Today 3:00 PM');
  assert.match(createLocalEnquiryReference('Zayed Al Mansoori', '+971501234567'), /^BW-ENQ-/);
});

test('main website never embeds internal staff portrait photos (/staff/) while interconnecting forms and portals with Betterway OS', () => {
  const files = walkSrc(path.resolve(process.cwd(), 'src'));
  for (const f of files) {
    const src = readFileSync(f, 'utf8');
    assert.doesNotMatch(src, /\/staff\/(?:daniel|rahaba|mohammad|elton|reshma|asif)/i);
  }

  const clientSrc = readFileSync(path.resolve(process.cwd(), 'src/components/client.tsx'), 'utf8');
  const portalLoginSrc = readFileSync(path.resolve(process.cwd(), 'src/app/(en)/portal/login/page.tsx'), 'utf8');
  assert.match(clientSrc, /\/api\/os\/leads/);
  assert.match(portalLoginSrc, /osPortalUrl|osLoginUrl/);
});
