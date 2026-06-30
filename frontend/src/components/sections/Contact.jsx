import { Mail, Phone, MapPin } from "lucide-react";
import SectionLabel from "../ui/SectionLabel.jsx";
import ShinyButton from "../ui/ShinyButton.jsx";
import useScrollReveal from "../../hooks/useScrollReveal.js";

export default function Contact({ contact, profile }) {
  const ref = useScrollReveal();

  return (
    <section id="contact" className="border-t border-archive-line px-6 py-24">
      <div ref={ref} className="reveal mx-auto max-w-6xl">
        <SectionLabel index="05">ติดต่อ</SectionLabel>

        <div className="grid gap-12 md:grid-cols-2 md:items-start">
          <div>
            <h2 className="font-display text-3xl leading-snug text-ink sm:text-4xl">{contact.heading}</h2>
            <p className="mt-4 max-w-md text-ink-dim">{contact.message}</p>
            {profile.email && (
              <div className="mt-8">
                <ShinyButton onClick={() => (window.location.href = `mailto:${profile.email}`)} icon={Mail}>
                  ส่งอีเมลถึงฉัน
                </ShinyButton>
              </div>
            )}
          </div>

          <dl className="space-y-5 border-l border-archive-line pl-6">
            {profile.email && (
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-amber" />
                <dd className="text-ink-dim">{profile.email}</dd>
              </div>
            )}
            {profile.phone && (
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-amber" />
                <dd className="text-ink-dim">{profile.phone}</dd>
              </div>
            )}
            {profile.location && (
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-amber" />
                <dd className="text-ink-dim">{profile.location}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </section>
  );
}
