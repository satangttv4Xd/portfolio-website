/**
 * ป้ายลำดับหมวด เช่น "01 — ผลงาน" ทำหน้าที่เป็นทั้งดัชนีหน้าและตัวคั่นสายตา
 * เลขลำดับมีความหมายจริง เพราะหมวดต่าง ๆ เรียงตามลำดับการเล่าเรื่องของพอร์ตโฟลิโอ
 */
export default function SectionLabel({ index, children }) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <span className="font-mono text-sm tracking-[0.25em] text-amber tabular-nums">{index}</span>
      <span className="h-px w-12 bg-archive-line" />
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-ink-dim">{children}</span>
      <span className="h-px flex-1 bg-archive-line" />
    </div>
  );
}
