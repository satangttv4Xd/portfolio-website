import { useEffect, useRef, useState } from "react";
import SectionLabel from "../ui/SectionLabel.jsx";

function SkillBar({ skill, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="font-display text-lg text-ink">{skill.name}</span>
        <span className="font-mono text-xs text-ink-faint tabular-nums">{skill.level}%</span>
      </div>
      <div className="h-[3px] w-full overflow-hidden rounded-full bg-archive-line">
        <div
          className="h-full rounded-full transition-[width] duration-[1200ms] ease-out"
          style={{
            width: visible ? `${skill.level}%` : "0%",
            transitionDelay: `${index * 90}ms`,
            backgroundImage: 'linear-gradient(to right, var(--accent-soft-hex), var(--accent-hex))',
          }}
        />
      </div>
    </div>
  );
}

export default function Skills({ skills }) {
  return (
    <section id="skills" className="border-t border-archive-line px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="03">ทักษะ</SectionLabel>

        {skills.length === 0 ? (
          <p className="text-ink-dim">ยังไม่มีทักษะ — เพิ่มได้จากปุ่ม “แก้ไขเว็บไซต์”</p>
        ) : (
          <div className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
            {skills.map((s, i) => (
              <SkillBar key={s.id} skill={s} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
