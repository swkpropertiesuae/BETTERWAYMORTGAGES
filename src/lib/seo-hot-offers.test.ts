import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { PDF_RESOURCES, SEO_TOPICS } from '../data/seo-topics.ts';
import { enhancedOrgSchema, websiteSchema, speakablePageSchema, pdfCatalogSchema } from './seo-schema.ts';

const repo = (rel: string) => path.resolve(process.cwd(), rel);

test('all 3 executive CBUAE-compliant Betterway PDF guides exist on disk under public/docs/', () => {
  assert.equal(PDF_RESOURCES.length, 3);
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

test('21st.dev HotOffersPopup features official female advisors, border-beam frame, and GA4 tracking', () => {
  const src = readFileSync(repo('src/components/HotOffersPopup.tsx'), 'utf8');
  assert.match(src, /reshma-rajan/);
  assert.match(src, /rahaba-azeez/);
  assert.match(src, /bw-hot-beam-shell/);
  assert.match(src, /trackEvent/);
  assert.match(src, /Betterway-UAE-Mortgage-Buyer-Guide-2026\.pdf/);
});

test('cards, carousels, and bank marquee have infinite/exiting animations cleanly removed', () => {
  const marquee = readFileSync(repo('src/components/LogoMarquee.tsx'), 'utf8');
  const sections = readFileSync(repo('src/components/home/HomySections.tsx'), 'utf8');
  const reveal = readFileSync(repo('src/components/MotionReveal.tsx'), 'utf8');
  const brand = readFileSync(repo('src/app/brand.css'), 'utf8');

  assert.doesNotMatch(marquee, /requestAnimationFrame/);
  assert.doesNotMatch(sections, /homy-reviews-track/);
  assert.doesNotMatch(reveal, /whileInView/);
  assert.doesNotMatch(brand, /animation:\s*homy-marquee/);
});

test('SEO, AEO, AIO, GEO JSON-LD schemas emit valid Organization, WebSite, Speakable & DigitalDocument structures', () => {
  const org = enhancedOrgSchema();
  const web = websiteSchema();
  const speak = speakablePageSchema('/', 'Home', 'Desc');
  const pdfs = pdfCatalogSchema();

  assert.ok(Array.isArray(org['@type']) && org['@type'].includes('FinancialService'));
  assert.equal(web['@type'], 'WebSite');
  assert.equal(speak.speakable['@type'], 'SpeakableSpecification');
  assert.equal(pdfs.itemListElement.length, 3);
  assert.equal(pdfs.itemListElement[0].item['@type'], 'DigitalDocument');
});
