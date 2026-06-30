import SectionLabel from "../ui/SectionLabel.jsx";
import useScrollReveal from "../../hooks/useScrollReveal.js";

export default function About({ about }) {
  const ref = useScrollReveal();

  return (
    <section id="about" className="border-t border-archive-line px-6 py-24">
      <div ref={ref} className="reveal mx-auto max-w-6xl">
        <SectionLabel index="01">เกี่ยวกับ</SectionLabel>

        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
          <p className="max-w-2xl text-lg leading-relaxed text-ink-dim sm:text-xl">
            {about.description}
          </p>

          <dl className="grid grid-cols-3 gap-4 md:grid-cols-1 md:gap-6">
            {(about.highlights || []).map((h) => (
              <div key={h.id} className="border-l border-archive-line pl-4">
                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">{h.label}</dt>
                <dd className="mt-1 font-display text-3xl text-amber">{h.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
