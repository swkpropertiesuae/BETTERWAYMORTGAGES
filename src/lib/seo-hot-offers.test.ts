import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { PDF_RESOURCES, SEO_TOPICS } from '../data/seo-topics.ts';
import { CURRENCIES, I18N, LOCALES, convertFromAed, formatMoneyFromAed } from '../data/i18n.ts';
import { EXT_I18N, SWISS_UI_I18N } from '../data/i18n-extended.ts';
import { enhancedOrgSchema, websiteSchema, speakablePageSchema, pdfCatalogSchema } from './seo-schema.ts';

const repo = (rel: string) => path.resolve(process.cwd(), rel);

test('all 52 executive CBUAE-compliant Betterway PDF guides exist on disk under public/docs/', () => {
  assert.ok(PDF_RESOURCES.length >= 50, `Expected 50+ PDF guides, got ${PDF_RESOURCES.length}`);
  assert.equal(PDF_RESOURCES.length, 52);
  for (const pdf of PDF_RESOURCES) {
    const abs = repo(path.join('public', pdf.file));
    assert.ok(existsSync(abs), `Missing PDF on disk: ${pdf.file}`);
    assert.ok(statSync(abs).size > 100_000, `PDF unexpectedly small: ${pdf.file}`);
  }
});

test('SEO_TOPICS provides 36 unique high-intent UAE/Dubai guides pushing total built routes above 425', () => {
  assert.equal(SEO_TOPICS.length, 36);
  const slugs = new Set(SEO_TOPICS.map((t) => t.slug));
  assert.equal(slugs.size, 36);
  for (const t of SEO_TOPICS) {
    assert.ok(t.answerCapsule.length >= 120, `Short AEO capsule on ${t.slug}`);
    assert.ok(t.keywords.length >= 3, `Expected keywords on ${t.slug}`);
    assert.ok(t.faqs.length >= 2, `Expected FAQs on ${t.slug}`);
  }
});

test('HotOffersPopup features official female advisors, refined hairline frame, GA4 tracking, and zero auto-popup timer ambush', () => {
  const src = readFileSync(repo('src/components/HotOffersPopup.tsx'), 'utf8');
  assert.match(src, /reshma-rajan/);
  assert.match(src, /rahaba-azeez/);
  assert.match(src, /bw-hot-beam-shell/);
  assert.match(src, /trackEvent/);
  assert.match(src, /Betterway-UAE-Mortgage-Buyer-Guide-2026\.pdf/);
  assert.doesNotMatch(src, /8500/);
  assert.doesNotMatch(src, /auto_timer/);
});

test('24-bank marquee runs endless slow horizontal CSS animation and zero 24s/1080p strings exist in UI', () => {
  const marquee = readFileSync(repo('src/components/LogoMarquee.tsx'), 'utf8');
  const brand = readFileSync(repo('src/app/brand.css'), 'utf8');
  const motionPrim = readFileSync(repo('src/components/ui/MotionPrimitives.tsx'), 'utf8');
  const hero = readFileSync(repo('src/components/home/HomeHero.tsx'), 'utf8');
  const homeExp = readFileSync(repo('src/components/home/HomeExperience.tsx'), 'utf8');

  assert.match(marquee, /bw-bank-marquee/);
  assert.match(brand, /@keyframes\s+bw-bank-scroll/);
  for (const src of [motionPrim, hero, homeExp]) {
    assert.doesNotMatch(src, /\b24s\b|0:24|24-second|1080p|Full HD/i);
  }
});

test('6 full languages (EN, AR, RU, ZH, FR, ES) and live multi-currency FX conversion work deterministically', () => {
  assert.equal(LOCALES.length, 6);
  assert.equal(CURRENCIES.length, 8);
  for (const loc of LOCALES) {
    assert.ok(I18N[loc.code]?.hero.title.length > 12, `Missing hero title for ${loc.code}`);
    assert.ok(I18N[loc.code]?.faq.items.length >= 4, `Missing FAQs for ${loc.code}`);
    assert.ok(SWISS_UI_I18N[loc.code]?.concierge.launcher.length > 3, `Missing Swiss UI copy for ${loc.code}`);
    assert.equal(SWISS_UI_I18N[loc.code]?.mandates.length, 4, `Expected 4 Swiss mandates for ${loc.code}`);
    assert.equal(SWISS_UI_I18N[loc.code]?.metrics.length, 4, `Expected 4 institutional proof metrics for ${loc.code}`);
  }
  const usd = convertFromAed(3_672_500, 'USD');
  assert.ok(Math.abs(usd - 1_000_000) < 100, `Expected ~1,000,000 USD, got ${usd}`);
  assert.match(formatMoneyFromAed(2_000_000, 'GBP'), /^£/);
  assert.match(formatMoneyFromAed(2_000_000, 'AED'), /^AED /);
});

test('SEO, AEO, AIO, GEO JSON-LD schemas emit valid Organization, WebSite, Speakable & DigitalDocument structures', () => {
  const org = enhancedOrgSchema();
  const web = websiteSchema();
  const speak = speakablePageSchema('/', 'Home', 'Desc');
  const pdfs = pdfCatalogSchema();

  assert.ok(Array.isArray(org['@type']) && org['@type'].includes('FinancialService'));
  assert.equal(web['@type'], 'WebSite');
  assert.equal(speak.speakable['@type'], 'SpeakableSpecification');
  assert.equal(pdfs.itemListElement.length, 52);
  assert.equal(pdfs.itemListElement[0].item['@type'], 'DigitalDocument');
});

test('Swiss / DIFC Institutional Light architecture replaces WebGL clutter with HeroPreCheckConsole, ExecutiveConciergeDock, and clean inner shells', () => {
  const enLayout = readFileSync(repo('src/app/(en)/layout.tsx'), 'utf8');
  const arLayout = readFileSync(repo('src/app/(ar)/layout.tsx'), 'utf8');
  const brandCss = readFileSync(repo('src/app/brand.css'), 'utf8');
  const homeHero = readFileSync(repo('src/components/home/HomeHero.tsx'), 'utf8');
  const homeExp = readFileSync(repo('src/components/home/HomeExperience.tsx'), 'utf8');
  const aboutPage = readFileSync(repo('src/app/(en)/about-us/page.tsx'), 'utf8');
  const dock = readFileSync(repo('src/components/ExecutiveConciergeDock.tsx'), 'utf8');
  const preCheck = readFileSync(repo('src/components/home/HeroPreCheckConsole.tsx'), 'utf8');

  assert.doesNotMatch(enLayout, /<GlobalShaderBackdrop\b/);
  assert.doesNotMatch(arLayout, /<GlobalShaderBackdrop\b/);
  assert.match(enLayout, /bg-white/);
  assert.match(arLayout, /bg-white/);
  assert.match(enLayout, /<ExecutiveConciergeDock\b/);
  assert.match(arLayout, /<ExecutiveConciergeDock\b/);
  assert.match(arLayout, /showHotOffersTrigger=\{false\}/);
  assert.match(dock, /OsLiveChat/);
  assert.match(dock, /CoPilot/);

  assert.match(homeHero, /HeroPreCheckConsole/);
  assert.match(preCheck, /4\.19/);
  assert.match(preCheck, /rate=4\.19/);
  assert.doesNotMatch(homeHero, /PhoneMockupBasic/);
  assert.doesNotMatch(homeHero, /MorningHeroCarousel/);

  assert.match(brandCss, /\.holo-canvas--page/);
  assert.doesNotMatch(readFileSync(repo('public/favicon.svg'), 'utf8'), /fill="#070E1A"/);
  assert.match(homeExp, /InteractiveReadinessStudio/);
  assert.match(homeExp, /FlagshipCta/);
  assert.doesNotMatch(homeExp, /HomyAdvisorsCarousel/);
  assert.doesNotMatch(homeExp, /DisclosureToast/);
  assert.match(aboutPage, /<TeamPortfolio\b/);
  assert.ok(existsSync(repo('src/app/api/os/live-chat/route.ts')), 'Missing Betterway OS live-chat API route');
  assert.match(readFileSync(repo('src/app/(en)/contact/page.tsx'), 'utf8'), /ContactLocationMap/);
  assert.ok(existsSync(repo('public/images/dubai-oud-metha-map.webp')), 'Missing Oud Metha Dubai map asset');
  assert.match(readFileSync(repo('next.config.mjs'), 'utf8'), /frame-src[^;]*openstreetmap\.org/);
  assert.match(readFileSync(repo('src/components/TeamPortfolio.tsx'), 'utf8'), /motion\.article/);
  assert.match(readFileSync(repo('src/components/CoPilot.tsx'), 'utf8'), /COPILOT_I18N/);
  assert.match(readFileSync(repo('src/components/FooterClient.tsx'), 'utf8'), /FOOTER_LINKS_I18N/);
  for (const loc of LOCALES) {
    assert.ok(EXT_I18N[loc.code]?.liveChat.title.length > 5, `Missing extended i18n for ${loc.code}`);
    assert.ok(EXT_I18N[loc.code]?.readiness.heading.length > 10, `Missing readiness i18n for ${loc.code}`);
    assert.ok(EXT_I18N[loc.code]?.flagshipCta.heading.length > 10, `Missing CTA i18n for ${loc.code}`);
  }
});
