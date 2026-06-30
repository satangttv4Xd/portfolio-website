import { useRef } from 'react';
import { Pipette, Moon, Sun, Terminal } from 'lucide-react';

const PRESETS = [
  { hex: '#D9772E', label: 'Amber' },
  { hex: '#5227FF', label: 'Violet' },
  { hex: '#10B981', label: 'Emerald' },
  { hex: '#3B82F6', label: 'Blue' },
  { hex: '#EC4899', label: 'Pink' },
  { hex: '#EF4444', label: 'Red' },
  { hex: '#F59E0B', label: 'Gold' },
  { hex: '#06B6D4', label: 'Cyan' },
];

export default function ThemeColorPicker({ color, onChange, mode, onModeChange }) {
  const inputRef = useRef(null);

  return (
    <div className="space-y-6">

      {/* Dark / Light / Hacker Mode */}
      <div>
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">โหมด</p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { key: 'dark',   Icon: Moon,     label: 'Dark' },
            { key: 'light',  Icon: Sun,      label: 'Light' },
            { key: 'hacker', Icon: Terminal, label: 'Hacker' },
          ].map(({ key, Icon, label }) => (
            <button
              key={key}
              onClick={() => {
                onModeChange(key);
                if (key === 'hacker') onChange('#00FF41');
              }}
              className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border py-3 font-mono text-[10px] uppercase tracking-[0.12em] transition-all ${
                mode === key
                  ? 'border-amber bg-archive-panelSolid text-amber'
                  : 'border-archive-line text-ink-dim hover:text-ink'
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-archive-line" />

      {/* Current color */}
      <div>
        <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">สีปัจจุบัน</p>
        <div className="flex items-center gap-3">
          <div
            className="h-10 w-10 shrink-0 rounded-full border-2 border-archive-line"
            style={{ background: color }}
          />
          <span className="font-mono text-sm text-ink">{color.toUpperCase()}</span>
          <button
            onClick={() => inputRef.current?.click()}
            className="ml-auto flex items-center gap-1.5 rounded-full border border-archive-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-dim transition-colors hover:border-amber hover:text-amber"
          >
            <Pipette size={11} />
            กำหนดเอง
          </button>
          <input
            ref={inputRef}
            type="color"
            value={color}
            onChange={e => onChange(e.target.value)}
            className="sr-only"
          />
        </div>
      </div>

      {/* Presets */}
      <div>
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">สีสำเร็จรูป</p>
        <div className="grid grid-cols-4 gap-2.5">
          {PRESETS.map(p => (
            <button
              key={p.hex}
              onClick={() => onChange(p.hex)}
              title={p.label}
              className="group flex flex-col items-center gap-1.5"
            >
              <div
                className="h-12 w-full rounded-xl border-2 transition-all group-hover:scale-105"
                style={{
                  background: p.hex,
                  borderColor: color.toLowerCase() === p.hex.toLowerCase() ? p.hex : 'transparent',
                  boxShadow: color.toLowerCase() === p.hex.toLowerCase() ? `0 0 0 2px ${p.hex}55` : 'none',
                }}
              />
              <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-ink-faint group-hover:text-ink-dim">
                {p.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="rounded-xl border border-archive-line bg-archive-bg p-4 space-y-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">ตัวอย่าง</p>
        <div className="flex flex-wrap gap-2">
          <span className="font-mono text-xs" style={{ color }}>accent text</span>
          <span
            className="rounded-full px-2 py-0.5 font-mono text-[10px] text-archive-bg"
            style={{ background: color }}
          >
            badge
          </span>
          <span
            className="rounded-full border px-2 py-0.5 font-mono text-[10px]"
            style={{ borderColor: color, color }}
          >
            outline
          </span>
        </div>
      </div>

    </div>
  );
}
