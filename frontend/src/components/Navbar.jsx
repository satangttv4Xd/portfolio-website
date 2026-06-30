import { PenLine, X, Download, Loader2 } from "lucide-react";
import ShinyButton from "./ui/ShinyButton.jsx";

const LINKS = [
  { href: "#about", label: "เกี่ยวกับ" },
  { href: "#projects", label: "ผลงาน" },
  { href: "#skills", label: "ทักษะ" },
  { href: "#experience", label: "ประสบการณ์" },
  { href: "#contact", label: "ติดต่อ" },
];

export default function Navbar({ name, editMode, onToggleEdit, onExportPDF, exporting }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-archive-line bg-archive-bg/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <a href="#hero" className="font-display text-lg tracking-wide text-ink">
          {name || "พอร์ตโฟลิโอ"}
        </a>

        <nav className="hidden gap-7 font-mono text-xs uppercase tracking-[0.18em] text-ink-dim md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-amber">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={onExportPDF}
            disabled={exporting}
            title="ดาวน์โหลดพอร์ตโฟลิโอเป็น PDF"
            className="inline-flex items-center gap-2 rounded-full border border-archive-line px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-ink-dim transition-colors hover:border-amber hover:text-ink disabled:opacity-50"
          >
            {exporting ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
            <span className="hidden sm:inline">{exporting ? "กำลังสร้าง..." : "PDF"}</span>
          </button>

          {editMode ? (
            <ShinyButton onClick={onToggleEdit} icon={X} className="!px-4 !py-2">
              ปิดแก้ไข
            </ShinyButton>
          ) : (
            <button
              onClick={onToggleEdit}
              className="inline-flex items-center gap-2 rounded-full border border-archive-line px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-ink-dim transition-colors hover:border-amber hover:text-ink"
            >
              <PenLine size={14} />
              <span className="hidden sm:inline">แก้ไขเว็บไซต์</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
