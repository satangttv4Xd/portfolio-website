import { Plus, Trash2 } from "lucide-react";
import { Field, Input } from "../ui/FormField.jsx";

export default function SkillsForm({ skills, onChange }) {
  function update(id, key, value) {
    onChange(skills.map((s) => (s.id === id ? { ...s, [key]: value } : s)));
  }

  function add() {
    onChange([...skills, { id: `s${Date.now()}`, name: "ทักษะใหม่", level: 50 }]);
  }

  function remove(id) {
    onChange(skills.filter((s) => s.id !== id));
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber">รายการทักษะ</p>
        <button
          onClick={add}
          className="inline-flex items-center gap-1 rounded-full border border-archive-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-dim hover:border-amber hover:text-ink"
        >
          <Plus size={12} /> เพิ่มทักษะ
        </button>
      </div>

      {skills.map((s) => (
        <div key={s.id} className="mb-4 rounded-lg border border-archive-line p-4">
          <Field label="ชื่อทักษะ">
            <Input value={s.name} onChange={(e) => update(s.id, "name", e.target.value)} />
          </Field>
          <Field label={`ระดับความชำนาญ — ${s.level}%`}>
            <input
              type="range"
              min="0"
              max="100"
              value={s.level}
              onChange={(e) => update(s.id, "level", Number(e.target.value))}
              className="w-full accent-amber"
            />
          </Field>
          <button
            onClick={() => remove(s.id)}
            className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.15em] text-red-400 hover:text-red-300"
          >
            <Trash2 size={12} /> ลบทักษะนี้
          </button>
        </div>
      ))}
    </div>
  );
}
