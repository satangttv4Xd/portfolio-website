import { useState, useEffect } from 'react';

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [h * 360, s * 100, l * 100];
}

function hslToHex(h, s, l) {
  h /= 360; s /= 100; l /= 100;
  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  let r, g, b;
  if (s === 0) { r = g = b = l; }
  else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return '#' + [r, g, b].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('');
}

export function applyThemeColor(hex) {
  const { r, g, b } = hexToRgb(hex);
  const [h, s, l] = rgbToHsl(r, g, b);

  const softHex = hslToHex(h, Math.max(0, s * 0.65), Math.max(5, l * 0.48));
  const glowHex = hslToHex(h, Math.min(100, s * 0.88), Math.min(90, l * 1.38 + 8));

  // CSS vars สำหรับ inline styles / rgba() / canvas
  const root = document.documentElement;
  root.style.setProperty('--accent-rgb', `${r}, ${g}, ${b}`);
  root.style.setProperty('--accent-hex', hex);
  root.style.setProperty('--accent-soft-hex', softHex);
  root.style.setProperty('--accent-glow-hex', glowHex);

  // Style tag injection — override ทุก Tailwind amber class
  // วางไว้ท้าย <head> จึง specificity เท่ากัน แต่ source order ชนะ Tailwind
  let el = document.getElementById('__theme__');
  if (!el) {
    el = document.createElement('style');
    el.id = '__theme__';
  }
  // ย้ายไปท้าย <head> ทุกครั้ง เพื่อให้ชนะ Vite-injected CSS ที่อาจ inject ทีหลัง
  document.head.appendChild(el);

  el.textContent = `
    .text-amber { color: ${hex}; }
    .text-amber-soft { color: ${softHex}; }
    .text-amber-glow { color: ${glowHex}; }
    .bg-amber { background-color: ${hex}; }
    .border-amber { border-color: ${hex}; }
    .border-amber-soft { border-color: ${softHex}; }
    .from-amber-soft {
      --tw-gradient-from: ${softHex} var(--tw-gradient-from-position);
      --tw-gradient-to: transparent var(--tw-gradient-to-position);
      --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
    }
    .to-amber { --tw-gradient-to: ${hex} var(--tw-gradient-to-position); }
    .hover\\:border-amber:hover { border-color: ${hex}; }
    .hover\\:text-amber:hover { color: ${hex}; }
    .shadow-amber {
      --tw-shadow: 0 0 40px -10px rgba(${r}, ${g}, ${b}, 0.45);
      box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    }
    ::selection { background-color: ${hex}; }
    :focus-visible { outline-color: ${hex}; }
    ::-webkit-scrollbar-thumb:hover { background: ${softHex}; }
  `;
}

// รันทันทีตอน module load — ก่อน React render ครั้งแรก ไม่มี flash
const _initColor = localStorage.getItem('themeColor') || '#D9772E';
applyThemeColor(_initColor);

export function useThemeColor() {
  const [color, setColor] = useState(_initColor);

  useEffect(() => {
    applyThemeColor(color);
  }, [color]);

  function changeColor(hex) {
    localStorage.setItem('themeColor', hex);
    setColor(hex);
    applyThemeColor(hex); // อัปเดตทันทีไม่รอ useEffect
  }

  return { color, changeColor };
}
