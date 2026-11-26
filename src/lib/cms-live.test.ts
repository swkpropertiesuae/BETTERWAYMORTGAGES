import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { verifyCmsRevalidateSignature, resolveOsCmsUrl } from './cms-live.ts';

test('verifyCmsRevalidateSignature accepts valid HMAC-SHA256 headers and rejects tampered signatures', () => {
  const secret = 'test-cms-secret-key';
  const payload = JSON.stringify({ tag: 'betterway-cms' });
  const validSig = `sha256=${createHmac('sha256', secret).update(payload).digest('hex')}`;

  assert.equal(verifyCmsRevalidateSignature(payload, validSig, secret), true);
  assert.equal(verifyCmsRevalidateSignature(payload, 'sha256=badhash', secret), false);
  assert.equal(verifyCmsRevalidateSignature(payload, null, secret), false);
});

test('resolveOsCmsUrl points to Betterway OS public CMS endpoint', () => {
  const url = resolveOsCmsUrl();
  assert.match(url, /\/api\/v1\/public\/cms$/);
});
