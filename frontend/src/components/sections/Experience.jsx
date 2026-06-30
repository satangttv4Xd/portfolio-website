import SectionLabel from "../ui/SectionLabel.jsx";
import useScrollReveal from "../../hooks/useScrollReveal.js";

function ExperienceRow({ item, index }) {
  const ref = useScrollReveal();
  return (
    <div
      ref={ref}
      className="reveal grid gap-2 border-t border-archive-line py-7 sm:grid-cols-[120px_1fr] sm:gap-8"
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <span className="font-mono text-xs uppercase tracking-[0.15em] text-amber">{item.period}</span>
      <div>
        <h3 className="font-display text-xl text-ink">{item.role}</h3>
        <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-ink-faint">{item.company}</p>
        <p className="mt-3 max-w-2xl text-ink-dim">{item.description}</p>
      </div>
    </div>
  );
}

export default function Experience({ experience }) {
  return (
    <section id="experience" className="border-t border-archive-line px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="04">เส้นทางการทำงาน</SectionLabel>

        {experience.length === 0 ? (
          <p className="text-ink-dim">ยังไม่มีข้อมูลประสบการณ์ — เพิ่มได้จากปุ่ม “แก้ไขเว็บไซต์”</p>
        ) : (
          <div className="border-b border-archive-line">
            {experience.map((e, i) => (
              <ExperienceRow key={e.id} item={e} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
