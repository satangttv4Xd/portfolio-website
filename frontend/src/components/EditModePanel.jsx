import { useEffect, useState } from "react";
import { X, Save, RotateCcw, Loader2, Check } from "lucide-react";
import ProfileForm from "./EditPanel/ProfileForm.jsx";
import AboutForm from "./EditPanel/AboutForm.jsx";
import SkillsForm from "./EditPanel/SkillsForm.jsx";
import ProjectsForm from "./EditPanel/ProjectsForm.jsx";
import ExperienceForm from "./EditPanel/ExperienceForm.jsx";
import ContactForm from "./EditPanel/ContactForm.jsx";
import ThemeColorPicker from "./ui/ThemeColorPicker.jsx";

const TABS = [
  { key: "profile", label: "โปรไฟล์" },
  { key: "about", label: "เกี่ยวกับ" },
  { key: "skills", label: "ทักษะ" },
  { key: "projects", label: "ผลงาน" },
  { key: "experience", label: "ประสบการณ์" },
  { key: "contact", label: "ติดต่อ" },
  { key: "theme", label: "ธีม" },
];

export default function EditModePanel({ open, onClose, data, onSave, onResetDefault, themeColor, onChangeThemeColor, colorMode, onChangeColorMode }) {
  const [tab, setTab] = useState("profile");
  const [draft, setDraft] = useState(data);
  const [status, setStatus] = useState("idle"); // idle | saving | saved | error
  const [errorMsg, setErrorMsg] = useState("");

  // ทุกครั้งที่เปิดแผงแก้ไข ให้ดึงข้อมูลล่าสุดมาเป็นฉบับร่าง
  useEffect(() => {
    if (open) {
      setDraft(data);
      setStatus("idle");
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!open) return null;

  function setSection(key, value) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  async function handleSave() {
    setStatus("saving");
    setErrorMsg("");
    try {
      await onSave(draft);
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2000);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  }

  async function handleResetDefault() {
    if (!window.confirm("ต้องการคืนค่าข้อมูลทั้งหมดกลับเป็นค่าเริ่มต้นใช่หรือไม่? การกระทำนี้ย้อนกลับไม่ได้")) return;
    setStatus("saving");
    try {
      const fresh = await onResetDefault();
      setDraft(fresh);
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2000);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        aria-label="ปิดแผงแก้ไข"
        onClick={onClose}
      />

      <aside className="relative flex h-full w-full max-w-md flex-col border-l border-archive-line bg-archive-panelSolid">
        <div className="flex items-center justify-between border-b border-archive-line px-5 py-4">
          <h2 className="font-display text-lg text-ink">แก้ไขเว็บไซต์</h2>
          <button onClick={onClose} className="rounded-full p-1.5 text-ink-dim hover:bg-archive-line hover:text-ink">
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5 border-b border-archive-line px-5 py-3">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${
                tab === t.key ? "bg-amber text-archive-bg" : "text-ink-dim hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {tab === "profile" && <ProfileForm profile={draft.profile} onChange={(v) => setSection("profile", v)} />}
          {tab === "about" && <AboutForm about={draft.about} onChange={(v) => setSection("about", v)} />}
          {tab === "skills" && <SkillsForm skills={draft.skills} onChange={(v) => setSection("skills", v)} />}
          {tab === "projects" && <ProjectsForm projects={draft.projects} onChange={(v) => setSection("projects", v)} />}
          {tab === "experience" && (
            <ExperienceForm experience={draft.experience} onChange={(v) => setSection("experience", v)} />
          )}
          {tab === "contact" && <ContactForm contact={draft.contact} onChange={(v) => setSection("contact", v)} />}
          {tab === "theme" && (
            <ThemeColorPicker
              color={themeColor}
              onChange={onChangeThemeColor}
              mode={colorMode}
              onModeChange={onChangeColorMode}
            />
          )}
        </div>

        <div className={`border-t border-archive-line px-5 py-4 ${tab === "theme" ? "hidden" : ""}`}>
          {status === "error" && <p className="mb-2 text-xs text-red-400">เกิดข้อผิดพลาด: {errorMsg}</p>}
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              disabled={status === "saving"}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-amber px-4 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-archive-bg transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {status === "saving" && <Loader2 size={14} className="animate-spin" />}
              {status === "saved" && <Check size={14} />}
              {status === "saving" ? "กำลังบันทึก..." : status === "saved" ? "บันทึกแล้ว" : "บันทึกการเปลี่ยนแปลง"}
              {status !== "saving" && status !== "saved" && <Save size={14} />}
            </button>
            <button
              onClick={handleResetDefault}
              title="คืนค่าเริ่มต้น"
              className="inline-flex items-center justify-center rounded-full border border-archive-line p-2.5 text-ink-dim hover:border-red-400 hover:text-red-400"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
