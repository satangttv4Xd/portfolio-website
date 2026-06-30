import { Github, Linkedin, Facebook, Instagram, Dribbble, MapPin } from "lucide-react";
import ParticleField from "../ui/ParticleField.jsx";
import Antigravity from "../ui/Antigravity.jsx";
import { assetUrl } from "../../api/api.js";

const SOCIAL_ICONS = {
  github: Github,
  linkedin: Linkedin,
  facebook: Facebook,
  instagram: Instagram,
  behance: Dribbble,
};

export default function Hero({ profile }) {
  const socials = Object.entries(profile.socials || {}).filter(([, url]) => url);

  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <ParticleField count={70} />

      {/* Antigravity — magnetic particle ring that follows the cursor */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Antigravity
          count={180}
          magnetRadius={8}
          ringRadius={5}
          waveSpeed={0.35}
          waveAmplitude={0.9}
          particleSize={1.3}
          lerpSpeed={0.05}
          color="#F2A65A"
          autoAnimate={true}
          particleVariance={0.9}
          rotationSpeed={0.04}
          depthFactor={0.8}
          pulseSpeed={2.5}
          fieldStrength={12}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(800px circle at 80% 20%, rgba(217,119,46,0.12), transparent 60%), radial-gradient(600px circle at 10% 80%, rgba(217,119,46,0.08), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p
            className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-amber animate-fade-up"
            style={{ animationDelay: "0.05s" }}
          >
            พอร์ตโฟลิโอส่วนบุคคล
          </p>

          <h1
            className="font-display text-5xl font-semibold leading-[1.05] text-ink animate-fade-up sm:text-6xl md:text-7xl"
            style={{ animationDelay: "0.15s" }}
          >
            {profile.name || "ชื่อ - นามสกุล"}
          </h1>

          <p
            className="mt-5 max-w-xl font-display text-xl italic text-ink-dim animate-fade-up sm:text-2xl"
            style={{ animationDelay: "0.3s" }}
          >
            {profile.title || "ตำแหน่ง / สายงานของคุณ"}
          </p>

          <p
            className="mt-6 max-w-lg text-ink-dim animate-fade-up"
            style={{ animationDelay: "0.42s" }}
          >
            {profile.tagline}
          </p>

          <div
            className="mt-9 flex flex-wrap items-center gap-5 animate-fade-up"
            style={{ animationDelay: "0.55s" }}
          >
            {profile.location && (
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-ink-faint">
                <MapPin size={14} /> {profile.location}
              </span>
            )}
            <div className="flex items-center gap-3">
              {socials.map(([key, url]) => {
                const Icon = SOCIAL_ICONS[key];
                if (!Icon) return null;
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-archive-line text-ink-dim transition-colors hover:border-amber hover:text-amber"
                    aria-label={key}
                  >
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div
          className="relative mx-auto h-56 w-44 shrink-0 animate-fade-up sm:h-72 sm:w-56"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="absolute -inset-2 rounded-[28px] border border-amber-soft" aria-hidden="true" />
          <div className="h-full w-full overflow-hidden rounded-3xl border border-archive-line bg-archive-panelSolid">
            {profile.avatar ? (
              <img src={assetUrl(profile.avatar)} alt={profile.name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center font-display text-3xl text-ink-faint">
                {(profile.name || "P F").slice(0, 1)}
              </div>
            )}
          </div>
          <span className="absolute -bottom-3 -right-3 rounded-full border border-amber-soft bg-archive-bg px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-amber">
            {profile.resumeNote || "พร้อมรับงานใหม่"}
          </span>
        </div>
      </div>
    </section>
  );
}
