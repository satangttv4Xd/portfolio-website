import { Field, Input, TextArea } from "../ui/FormField.jsx";

export default function ContactForm({ contact, onChange }) {
  function set(key, value) {
    onChange({ ...contact, [key]: value });
  }

  return (
    <div>
      <Field label="หัวข้อท้ายเว็บไซต์">
        <Input value={contact.heading} onChange={(e) => set("heading", e.target.value)} />
      </Field>
      <Field label="ข้อความชวนติดต่อ">
        <TextArea rows={3} value={contact.message} onChange={(e) => set("message", e.target.value)} />
      </Field>
      <p className="text-[11px] text-ink-faint">
        อีเมล เบอร์โทร และที่อยู่ที่แสดงในส่วนนี้ใช้ข้อมูลเดียวกับแท็บ “โปรไฟล์” แก้ไขได้ที่นั่น
      </p>
    </div>
  );
}
