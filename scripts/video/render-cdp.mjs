// Renders any deterministic HTML scene (window.render(t)) at 1920x1080 using system Chrome CDP + bundled ffmpeg.
// Usage: node scripts/video/render-cdp.mjs <scene.html> <out-basename> <seconds> [fps=30] [posterAt=0] [webm=0|1]
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const [, , scene, out, secsArg, fpsArg = '30', posterAtArg = '0', makeWebmArg = '0'] = process.argv;
if (!scene || !out || !secsArg) {
  throw new Error('Usage: render-cdp.mjs <scene.html> <out-basename> <seconds> [fps=30] [posterAt=0] [webm=0|1]');
}

const secs = Number(secsArg);
const fps = Number(fpsArg);
const frames = Math.round(secs * fps);
const posterAt = Number(posterAtArg);
const makeWebm = makeWebmArg === '1';

const chromeCandidates = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
];
const chromeBin = chromeCandidates.find((p) => fs.existsSync(p));
if (!chromeBin) throw new Error('No Chrome/Edge binary found.');

const ffmpegBin = process.env.FFMPEG_BIN || 'ffmpeg';
const port = 9340 + Math.floor(Math.random() * 400);
const userData = fs.mkdtempSync(path.join(os.tmpdir(), 'bw-vid-'));

const chrome = spawn(
  chromeBin,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    '--window-size=1920,1080',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${userData}`,
    'about:blank',
  ],
  { stdio: 'ignore' },
);

async function waitForWs() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/list`);
      const list = await res.json();
      const target = list.find((t) => t.type === 'page' && t.webSocketDebuggerUrl);
      if (target) return target.webSocketDebuggerUrl;
    } catch {}
    await new Promise((r) => setTimeout(r, 150));
  }
  throw new Error('Timed out waiting for Chrome DevTools Protocol.');
}

class CDP {
  constructor(url) {
    this.ws = new WebSocket(url);
    this.id = 0;
    this.pending = new Map();
    this.ready = new Promise((resolve, reject) => {
      this.ws.addEventListener('open', resolve, { once: true });
      this.ws.addEventListener('error', reject, { once: true });
    });
    this.ws.addEventListener('message', (ev) => {
      const msg = JSON.parse(String(ev.data));
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(msg.error.message));
        else resolve(msg.result);
      }
    });
  }
  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
  close() {
    try { this.ws.close(); } catch {}
  }
}

const enc = (args) =>
  spawn(ffmpegBin, ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-vcodec', 'mjpeg', '-framerate', String(fps), '-i', '-', ...args], {
    stdio: ['pipe', 'inherit', 'inherit'],
  });

const procs = [
  enc(['-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', `${out}.mp4`]),
];
if (makeWebm) {
  procs.push(enc(['-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '32', '-row-mt', '1', '-speed', '4', `${out}.webm`]));
}

try {
  const wsUrl = await waitForWs();
  const cdp = new CDP(wsUrl);
  await cdp.ready;
  await cdp.send('Page.enable');
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await cdp.send('Page.navigate', { url: pathToFileURL(path.resolve(scene)).href });
  // Wait for fonts & all 4K images to load completely
  await new Promise((r) => setTimeout(r, 1200));
  await cdp.send('Runtime.evaluate', {
    expression: `(async () => {
      await document.fonts.ready;
      const imgs = [...document.images];
      await Promise.all(imgs.map(im => im.complete ? Promise.resolve() : new Promise(res => { im.onload = im.onerror = res; })));
      return imgs.length;
    })()`,
    awaitPromise: true,
  });

  for (let f = 0; f < frames; f++) {
    const t = f / fps;
    await cdp.send('Runtime.evaluate', { expression: `window.render(${t})` });
    const { data } = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 92 });
    const buf = Buffer.from(data, 'base64');
    for (const p of procs) {
      if (!p.stdin.write(buf)) await new Promise((r) => p.stdin.once('drain', r));
    }
    if ((f + 1) % 120 === 0 || f + 1 === frames) {
      console.log(`  rendered ${f + 1}/${frames} frames...`);
    }
  }

  await cdp.send('Runtime.evaluate', { expression: `window.render(${posterAt})` });
  const { data: posterB64 } = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 92 });
  fs.writeFileSync(`${out}.jpg`, Buffer.from(posterB64, 'base64'));
  cdp.close();
} finally {
  for (const p of procs) p.stdin.end();
  chrome.kill();
  try { fs.rmSync(userData, { recursive: true, force: true }); } catch {}
}

await Promise.all(procs.map((p) => new Promise((r, j) => p.on('close', (c) => (c ? j(new Error(`ffmpeg exit ${c}`)) : r())))));
console.log(`DONE: ${out}.mp4 (${frames} frames @ ${fps}fps) + poster ${out}.jpg${makeWebm ? ` + ${out}.webm` : ''}`);
