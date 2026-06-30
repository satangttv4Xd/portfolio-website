import { Field, Input, TextArea } from "../ui/FormField.jsx";
import ImageUploader from "../ui/ImageUploader.jsx";

export default function ProfileForm({ profile, onChange }) {
  function set(key, value) {
    onChange({ ...profile, [key]: value });
  }
  function setSocial(key, value) {
    onChange({ ...profile, socials: { ...profile.socials, [key]: value } });
  }

  return (
    <div>
      <Field label="รูปโปรไฟล์">
        <ImageUploader value={profile.avatar} onChange={(url) => set("avatar", url)} aspect="aspect-[4/5]" />
      </Field>

      <Field label="ชื่อ - นามสกุล">
        <Input value={profile.name} onChange={(e) => set("name", e.target.value)} placeholder="เช่น สมชาย ใจดี" />
      </Field>

      <Field label="ตำแหน่ง / สายงาน">
        <Input value={profile.title} onChange={(e) => set("title", e.target.value)} placeholder="เช่น UX/UI Designer" />
      </Field>

      <Field label="แท็กไลน์สั้น ๆ ใต้ตำแหน่ง">
        <TextArea rows={2} value={profile.tagline} onChange={(e) => set("tagline", e.target.value)} />
      </Field>

      <Field label="สถานะ (ป้ายมุมรูปโปรไฟล์)" hint='เช่น "พร้อมรับงานใหม่" หรือ "ไม่สะดวกรับงานช่วงนี้"'>
        <Input value={profile.resumeNote} onChange={(e) => set("resumeNote", e.target.value)} />
      </Field>

      <Field label="อีเมล">
        <Input type="email" value={profile.email} onChange={(e) => set("email", e.target.value)} />
      </Field>

      <Field label="เบอร์โทร">
        <Input value={profile.phone} onChange={(e) => set("phone", e.target.value)} />
      </Field>

      <Field label="ที่อยู่ / จังหวัด">
        <Input value={profile.location} onChange={(e) => set("location", e.target.value)} />
      </Field>

      <div className="mt-6 border-t border-archive-line pt-5">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-amber">โซเชียลมีเดีย</p>
        {["github", "linkedin", "facebook", "instagram", "behance"].map((key) => (
          <Field key={key} label={key}>
            <Input
              value={profile.socials?.[key] || ""}
              onChange={(e) => setSocial(key, e.target.value)}
              placeholder="วางลิงก์ทั้งหมด เช่น https://..."
            />
          </Field>
        ))}
      </div>
    </div>
  );
}
