import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const output = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public/images');
const browser = spawn('/repl/tools/bin/chromium', [
  '--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars',
  '--remote-debugging-port=9223', '--user-data-dir=/tmp/ai-advent-demo-capture',
  'about:blank',
], { stdio: 'ignore' });

async function endpoint(url) {
  for (let i = 0; i < 60; i++) {
    try {
      const response = await fetch(url, { method: url.includes('/json/new?') ? 'PUT' : 'GET' });
      if (response.ok) return response.json();
    } catch { /* browser is starting */ }
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  throw new Error(`Browser not ready: ${url}`);
}

async function session(url) {
  const target = await endpoint(`http://127.0.0.1:9223/json/new?${encodeURIComponent(url)}`);
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });
  let id = 0;
  const pending = new Map();
  socket.addEventListener('message', event => {
    const message = JSON.parse(event.data);
    if (!message.id) return;
    const operation = pending.get(message.id);
    if (!operation) return;
    pending.delete(message.id);
    if (message.error) operation.reject(new Error(message.error.message));
    else operation.resolve(message.result);
  });
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const nextId = ++id;
    pending.set(nextId, { resolve, reject });
    socket.send(JSON.stringify({ id: nextId, method, params }));
  });
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1600, height: 900, deviceScaleFactor: 1, mobile: false,
  });
  await send('Page.enable');
  await send('Page.navigate', { url });
  await new Promise(resolve => setTimeout(resolve, 2200));
  await send('Runtime.evaluate', { expression: 'document.fonts.ready' , awaitPromise: true });
  const evaluate = async expression => {
    const result = await send('Runtime.evaluate', { expression, returnByValue: true });
    return result.result.value;
  };
  return { send, evaluate, close: () => socket.close() };
}

try {
  await mkdir(output, { recursive: true });
  await endpoint('http://127.0.0.1:9223/json/version');
  const origin = 'http://localhost:80';
  for (const [name, route, full] of [
    ['home', '/', false],
    ['rag', '/lesson/1', true],
    ['evals', '/lesson/9', true],
  ]) {
    const tab = await session(origin + route);
    const dimensions = await tab.evaluate(`({
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight,
      title: document.title,
      text: document.querySelector('h1')?.textContent,
      door1: (() => { const r = document.querySelector('[data-testid="button-door-1"]')?.getBoundingClientRect(); return r && {x:r.x+r.width/2,y:r.y+r.height/2}; })(),
      door9: (() => { const r = document.querySelector('[data-testid="button-door-9"]')?.getBoundingClientRect(); return r && {x:r.x+r.width/2,y:r.y+r.height/2}; })(),
      back: (() => { const r = document.querySelector('[data-testid="link-back-home-top"]')?.getBoundingClientRect(); return r && {x:r.x+r.width/2,y:r.y+r.height/2}; })()
    })`);
    console.log(name, dimensions);
    const capture = await tab.send('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: true,
      clip: { x: 0, y: 0, width: 1600, height: full ? dimensions.height : 900, scale: 1 },
    });
    await writeFile(path.join(output, `${name}.png`), Buffer.from(capture.data, 'base64'));
    tab.close();
  }
} finally {
  browser.kill('SIGTERM');
}