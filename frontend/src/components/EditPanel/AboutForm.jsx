import { Plus, Trash2 } from "lucide-react";
import { Field, Input, TextArea } from "../ui/FormField.jsx";

export default function AboutForm({ about, onChange }) {
  function setDescription(value) {
    onChange({ ...about, description: value });
  }

  function updateHighlight(id, key, value) {
    onChange({
      ...about,
      highlights: about.highlights.map((h) => (h.id === id ? { ...h, [key]: value } : h)),
    });
  }

  function addHighlight() {
    onChange({
      ...about,
      highlights: [...(about.highlights || []), { id: `h${Date.now()}`, label: "หัวข้อใหม่", value: "0" }],
    });
  }

  function removeHighlight(id) {
    onChange({ ...about, highlights: about.highlights.filter((h) => h.id !== id) });
  }

  return (
    <div>
      <Field label="ข้อความแนะนำตัว">
        <TextArea rows={6} value={about.description} onChange={(e) => setDescription(e.target.value)} />
      </Field>

      <div className="mt-6 border-t border-archive-line pt-5">
        <div className="mb-4 flex items-center justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber">ตัวเลขไฮไลต์</p>
          <button
            onClick={addHighlight}
            className="inline-flex items-center gap-1 rounded-full border border-archive-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-dim hover:border-amber hover:text-ink"
          >
            <Plus size={12} /> เพิ่ม
          </button>
        </div>

        {(about.highlights || []).map((h) => (
          <div key={h.id} className="mb-4 rounded-lg border border-archive-line p-4">
            <div className="grid grid-cols-2 gap-3">
              <Field label="ป้ายชื่อ">
                <Input value={h.label} onChange={(e) => updateHighlight(h.id, "label", e.target.value)} />
              </Field>
              <Field label="ค่า">
                <Input value={h.value} onChange={(e) => updateHighlight(h.id, "value", e.target.value)} />
              </Field>
            </div>
            <button
              onClick={() => removeHighlight(h.id)}
              className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.15em] text-red-400 hover:text-red-300"
            >
              <Trash2 size={12} /> ลบรายการนี้
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
