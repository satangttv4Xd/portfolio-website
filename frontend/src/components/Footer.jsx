export default function Footer({ name }) {
  return (
    <footer className="border-t border-archive-line px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-faint sm:flex-row">
        <span>© {new Date().getFullYear()} {name || "พอร์ตโฟลิโอ"}</span>
        <span>สร้างด้วย React · ออกแบบและแก้ไขได้ทุกส่วน</span>
      </div>
    </footer>
  );
}
