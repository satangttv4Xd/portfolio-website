import { useState } from 'react';

const DARK = {
  body:          '#0E0D0C',
  bg:            '#0E0D0C',
  bgOpacity:     'rgba(14,13,12,0.8)',
  panelSolid:    '#1A1816',
  panel:         'rgba(23,21,19,0.88)',
  line:          '#2A2722',
  ink:           '#F2ECE2',
  inkDim:        '#A39C8F',
  inkFaint:      '#6E685D',
};

const LIGHT = {
  body:          '#F7F3ED',
  bg:            '#F7F3ED',
  bgOpacity:     'rgba(247,243,237,0.8)',
  panelSolid:    '#EDE8E0',
  panel:         'rgba(237,232,224,0.88)',
  line:          '#D8D2C9',
  ink:           '#1A1816',
  inkDim:        '#6B6560',
  inkFaint:      '#9A948E',
};

export function applyColorMode(mode) {
  const c = mode === 'light' ? LIGHT : DARK;

  let el = document.getElementById('__mode__');
  if (!el) {
    el = document.createElement('style');
    el.id = '__mode__';
  }
  document.head.appendChild(el);

  el.textContent = `
    body { background-color: ${c.body}; color: ${c.ink}; }
    .bg-archive-bg { background-color: ${c.bg}; }
    .bg-archive-bg\\/80 { background-color: ${c.bgOpacity}; }
    .bg-archive-panelSolid { background-color: ${c.panelSolid}; }
    .bg-archive-panel { background-color: ${c.panel}; }
    .border-archive-line { border-color: ${c.line}; }
    .text-ink { color: ${c.ink}; }
    .text-ink-dim { color: ${c.inkDim}; }
    .text-ink-faint { color: ${c.inkFaint}; }
  `;

  document.documentElement.setAttribute('data-mode', mode);
  localStorage.setItem('colorMode', mode);
}

// รันทันทีตอน module load — fallback hacker → dark
const _stored = localStorage.getItem('colorMode') || 'dark';
const _initMode = _stored === 'hacker' ? 'dark' : _stored;
applyColorMode(_initMode);

export function useColorMode() {
  const [mode, setMode] = useState(_initMode);

  function changeMode(m) {
    applyColorMode(m);
    setMode(m);
  }

  return { mode, changeMode };
}
