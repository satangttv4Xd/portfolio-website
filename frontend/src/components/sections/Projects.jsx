import { ArrowUpRight } from "lucide-react";
import SectionLabel from "../ui/SectionLabel.jsx";
import SpotlightCard from "../ui/SpotlightCard.jsx";
import useScrollReveal from "../../hooks/useScrollReveal.js";
import { assetUrl } from "../../api/api.js";

function ProjectCard({ project, index }) {
  const ref = useScrollReveal();
  const number = String(index + 1).padStart(2, "0");

  return (
    <div ref={ref} className="reveal" style={{ transitionDelay: `${index * 70}ms` }}>
      <SpotlightCard className="flex h-full flex-col">
        <div className="aspect-[16/10] w-full overflow-hidden border-b border-archive-line bg-archive-bg">
          {project.image ? (
            <img
              src={assetUrl(project.image)}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
              ไม่มีรูปภาพ
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="mb-3 flex items-start justify-between gap-3">
            <h3 className="font-display text-xl text-ink">{project.title}</h3>
            <span className="shrink-0 rounded-full border border-amber-soft px-2 py-0.5 font-mono text-[10px] text-amber">
              P-{number}
            </span>
          </div>

          <p className="flex-1 text-sm leading-relaxed text-ink-dim">{project.description}</p>

          {!!(project.tags || []).length && (
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-archive-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-faint"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.15em] text-amber transition-colors hover:text-amber-glow"
            >
              ดูผลงาน <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </SpotlightCard>
    </div>
  );
}

export default function Projects({ projects }) {
  return (
    <section id="projects" className="border-t border-archive-line px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="02">ผลงาน</SectionLabel>

        {projects.length === 0 ? (
          <p className="text-ink-dim">ยังไม่มีผลงาน — กดปุ่ม “แก้ไขเว็บไซต์” เพื่อเพิ่มผลงานแรกของคุณ</p>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
