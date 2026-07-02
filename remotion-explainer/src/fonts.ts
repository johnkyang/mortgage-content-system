import {ANTON_400, INTER_700, INTER_800, INTER_900} from './fontData';

/**
 * Register fonts via pure CSS @font-face using BASE64 data URIs (see
 * fontData.ts). Deliberately does NOT use delayRender / FontFace.load() /
 * document.fonts: in headless render workers that JS font-loading promise can
 * intermittently never settle, which stalls the whole render. The browser's
 * CSS font pipeline decodes the inline data synchronously at paint time — no
 * network, no promise, nothing to hang. The <style> is appended at module
 * evaluation (before first paint), so text renders in the right face from
 * frame 0.
 */
const FACES: {family: string; weight: string; data: string}[] = [
  {family: 'Anton', weight: '400', data: ANTON_400},
  {family: 'Inter', weight: '700', data: INTER_700},
  {family: 'Inter', weight: '800', data: INTER_800},
  {family: 'Inter', weight: '900', data: INTER_900},
];

if (typeof document !== 'undefined' && !document.getElementById('vendored-fontface')) {
  const style = document.createElement('style');
  style.id = 'vendored-fontface';
  style.textContent = FACES.map(
    (f) =>
      `@font-face{font-family:'${f.family}';font-style:normal;font-weight:${f.weight};` +
      `font-display:block;src:url(${f.data}) format('woff2');}`,
  ).join('\n');
  document.head.appendChild(style);
}
