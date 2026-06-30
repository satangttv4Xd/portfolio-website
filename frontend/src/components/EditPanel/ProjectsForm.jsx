import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { Field, Input, TextArea } from "../ui/FormField.jsx";
import ImageUploader from "../ui/ImageUploader.jsx";

export default function ProjectsForm({ projects, onChange }) {
  function update(id, key, value) {
    onChange(projects.map((p) => (p.id === id ? { ...p, [key]: value } : p)));
  }

  function add() {
    onChange([
      ...projects,
      { id: `p${Date.now()}`, title: "ชื่อโปรเจกต์ใหม่", description: "", image: "", link: "", tags: [] },
    ]);
  }

  function remove(id) {
    onChange(projects.filter((p) => p.id !== id));
  }

  function move(index, dir) {
    const next = [...projects];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber">รายการผลงาน</p>
        <button
          onClick={add}
          className="inline-flex items-center gap-1 rounded-full border border-archive-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-dim hover:border-amber hover:text-ink"
        >
          <Plus size={12} /> เพิ่มผลงาน
        </button>
      </div>

      {projects.map((p, i) => (
        <div key={p.id} className="mb-5 rounded-lg border border-archive-line p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-[11px] text-ink-faint">P-{String(i + 1).padStart(2, "0")}</span>
            <div className="flex items-center gap-1">
              <button onClick={() => move(i, -1)} className="rounded p-1 text-ink-faint hover:text-ink" aria-label="เลื่อนขึ้น">
                <ChevronUp size={14} />
              </button>
              <button onClick={() => move(i, 1)} className="rounded p-1 text-ink-faint hover:text-ink" aria-label="เลื่อนลง">
                <ChevronDown size={14} />
              </button>
            </div>
          </div>

          <Field label="รูปปกผลงาน">
            <ImageUploader value={p.image} onChange={(url) => update(p.id, "image", url)} aspect="aspect-[16/10]" />
          </Field>

          <Field label="ชื่อผลงาน">
            <Input value={p.title} onChange={(e) => update(p.id, "title", e.target.value)} />
          </Field>

          <Field label="คำอธิบาย">
            <TextArea rows={3} value={p.description} onChange={(e) => update(p.id, "description", e.target.value)} />
          </Field>

          <Field label="ลิงก์ผลงาน (ถ้ามี)">
            <Input value={p.link} onChange={(e) => update(p.id, "link", e.target.value)} placeholder="https://..." />
          </Field>

          <Field label="แท็ก" hint="คั่นแต่ละแท็กด้วยจุลภาค (,) เช่น Web, Branding, 2024">
            <Input
              value={(p.tags || []).join(", ")}
              onChange={(e) =>
                update(
                  p.id,
                  "tags",
                  e.target.value.split(",").map((t) => t.trim()).filter(Boolean)
                )
              }
            />
          </Field>

          <button
            onClick={() => remove(p.id)}
            className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.15em] text-red-400 hover:text-red-300"
          >
            <Trash2 size={12} /> ลบผลงานนี้
          </button>
        </div>
      ))}
    </div>
  );
}
