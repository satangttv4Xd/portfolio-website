import { Plus, Trash2 } from "lucide-react";
import { Field, Input, TextArea } from "../ui/FormField.jsx";

export default function ExperienceForm({ experience, onChange }) {
  function update(id, key, value) {
    onChange(experience.map((e) => (e.id === id ? { ...e, [key]: value } : e)));
  }

  function add() {
    onChange([
      ...experience,
      { id: `e${Date.now()}`, role: "ตำแหน่งงาน", company: "ชื่อบริษัท", period: "2024 — ปัจจุบัน", description: "" },
    ]);
  }

  function remove(id) {
    onChange(experience.filter((e) => e.id !== id));
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber">เส้นทางการทำงาน</p>
        <button
          onClick={add}
          className="inline-flex items-center gap-1 rounded-full border border-archive-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-dim hover:border-amber hover:text-ink"
        >
          <Plus size={12} /> เพิ่มประสบการณ์
        </button>
      </div>

      {experience.map((e) => (
        <div key={e.id} className="mb-4 rounded-lg border border-archive-line p-4">
          <Field label="ช่วงเวลา" hint='เช่น "2022 — 2024"'>
            <Input value={e.period} onChange={(ev) => update(e.id, "period", ev.target.value)} />
          </Field>
          <Field label="ตำแหน่ง">
            <Input value={e.role} onChange={(ev) => update(e.id, "role", ev.target.value)} />
          </Field>
          <Field label="บริษัท / องค์กร">
            <Input value={e.company} onChange={(ev) => update(e.id, "company", ev.target.value)} />
          </Field>
          <Field label="รายละเอียดงาน">
            <TextArea rows={3} value={e.description} onChange={(ev) => update(e.id, "description", ev.target.value)} />
          </Field>
          <button
            onClick={() => remove(e.id)}
            className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.15em] text-red-400 hover:text-red-300"
          >
            <Trash2 size={12} /> ลบรายการนี้
          </button>
        </div>
      ))}
    </div>
  );
}
