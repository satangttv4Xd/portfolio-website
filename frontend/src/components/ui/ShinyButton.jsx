/**
 * ปุ่ม CTA ที่มีแสงไล่วิ่งบนพื้นหลัง (สไตล์ React Bits "Shiny Button")
 */
export default function ShinyButton({ children, onClick, type = "button", className = "", icon: Icon, disabled }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-amber-soft px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-transform duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      <span
        className="absolute inset-0 -z-10 animate-shimmer bg-[length:200%_100%] opacity-90"
        style={{
          backgroundImage: "linear-gradient(110deg,#6B4226,45%,#F2A65A,55%,#6B4226)",
        }}
        aria-hidden="true"
      />
      {Icon && <Icon size={14} />}
      {children}
    </button>
  );
}
