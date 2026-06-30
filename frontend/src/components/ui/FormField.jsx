export function Field({ label, children, hint }) {
  return (
    <div className="mb-5">
      <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.18em] text-ink-dim">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 text-[11px] text-ink-faint">{hint}</p>}
    </div>
  );
}

export function Input(props) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg border border-archive-line bg-archive-bg px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-amber ${props.className || ""}`}
    />
  );
}

export function TextArea(props) {
  return (
    <textarea
      {...props}
      className={`w-full resize-y rounded-lg border border-archive-line bg-archive-bg px-3 py-2.5 text-sm leading-relaxed text-ink placeholder:text-ink-faint focus:border-amber ${props.className || ""}`}
    />
  );
}
