import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUp,
  ArrowUpRight,
  Award,
  Briefcase,
  Code2,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Medal,
  MessageSquare,
  Phone,
  Quote,
  Send,
  Sparkles,
  Trophy,
  User,
} from "lucide-react";
import {
  achievements,
  certifications,
  codingProfiles,
  education,
  experience,
  profile,
  projects,
  skillGroups,
  stats,

} from "@/data/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${profile.name} — ${profile.designation}` },
      {
        name: "description",
        content: `${profile.name}: ${profile.shortBio}`,
      },
      { property: "og:title", content: `${profile.name} — ${profile.designation}` },
      { property: "og:description", content: profile.shortBio },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: `${profile.name} — ${profile.designation}` },
      { name: "twitter:description", content: profile.shortBio },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: profile.name,
          jobTitle: profile.designation,
          email: `mailto:${profile.email}`,
          url: "/",
          sameAs: [profile.github, profile.linkedin],
          address: { "@type": "PostalAddress", addressLocality: profile.location },
        }),
      },
    ],
  }),
  component: Portfolio,
});

/* ---------- Hooks ---------- */

function useTypewriter(words: string[], speed = 80, pause = 1400) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = words[i % words.length];
    const t = setTimeout(
      () => {
        if (!deleting) {
          const next = current.slice(0, text.length + 1);
          setText(next);
          if (next === current) setTimeout(() => setDeleting(true), pause);
        } else {
          const next = current.slice(0, Math.max(0, text.length - 1));
          setText(next);
          if (next === "") {
            setDeleting(false);
            setI((v) => v + 1);
          }
        }
      },
      deleting ? speed / 2 : speed,
    );
    return () => clearTimeout(t);
  }, [text, deleting, i, words, speed, pause]);
  return text;
}

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.opacity = "1";
            (e.target as HTMLElement).style.transform = "translateY(0)";
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: "translateY(16px)",
        transition: `opacity 700ms ease ${delay}ms, transform 700ms ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "education", label: "Education" },
  { id: "achievements", label: "Achievements" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

/* ---------- Components ---------- */

function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent transition-[width] duration-150"
        style={{ width: `${p}%` }}
      />
    </div>
  );
}

function Nav() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/70 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#home" className="text-foreground font-semibold tracking-tight">
          {profile.shortName}
        </a>
        <div className="hidden lg:flex items-center gap-7">
          {NAV.slice(0, 9).map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`text-sm font-medium transition-colors ${
                active === n.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {n.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden sm:inline-flex text-sm font-medium bg-foreground text-background py-1.5 px-4 rounded-full ring-1 ring-foreground/10 hover:opacity-90 transition-opacity"
          >
            Contact
          </a>
          <button
            aria-label="Toggle navigation"
            className="lg:hidden inline-flex items-center justify-center min-h-11 min-w-11 rounded-md hover:bg-white/5"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <div className="space-y-1.5">
              <span className="block h-px w-5 bg-foreground" />
              <span className="block h-px w-5 bg-foreground" />
              <span className="block h-px w-5 bg-foreground" />
            </div>
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-white/5 bg-background/95 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-6 py-4 grid grid-cols-2 gap-2">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                className={`text-sm py-2 px-3 rounded-md ${
                  active === n.id ? "bg-white/5 text-foreground" : "text-muted-foreground"
                }`}
              >
                {n.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const typed = useTypewriter(profile.roles);
  return (
    <section id="home" className="relative pt-32 pb-20 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-aurora pointer-events-none" />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[80%] h-[400px] bg-brand-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-6xl mx-auto relative">
        <Reveal className="flex flex-col items-center text-center">
          <div className="mb-8 relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-brand-primary via-brand-secondary to-brand-accent blur-md opacity-60" />
            <img
              src={profile.image}
              alt={`${profile.name} portrait`}
              width={96}
              height={96}
              className="relative size-24 rounded-full object-cover ring-1 ring-white/10"
            />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-white/10 bg-white/5">
            <span className="size-1.5 rounded-full bg-brand-secondary animate-pulse" />
            <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
              Open to opportunities
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold text-foreground tracking-tight text-balance leading-[1.05] mb-6">
            Software developer <br className="hidden md:block" /> {" "}
            <span className="text-gradient-brand">Transforming Ideas In To Digital Experience..</span>
          </h1>
          <div className="h-7 mb-6 text-base md:text-lg text-muted-foreground font-medium">
            <span className="text-foreground">{typed}</span>
            <span className="ml-0.5 text-brand-primary" style={{ animation: "blink-caret 1s step-end infinite" }}>
              |
            </span>
          </div>
          <p className="max-w-[56ch] text-muted-foreground text-pretty leading-relaxed mb-10">
            {profile.shortBio}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex items-center gap-2 bg-brand-primary text-white text-sm font-medium py-2.5 px-4 rounded-md ring-1 ring-brand-primary hover:brightness-110 transition"
            >
              <Download className="size-4" />
              Download Resume
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-white/5 text-foreground text-sm font-medium py-2.5 px-4 rounded-md ring-1 ring-white/10 hover:bg-white/10 transition"
            >
              <Mail className="size-4" />
              Contact Me
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-white/0 text-foreground text-sm font-medium py-2.5 px-4 rounded-md ring-1 ring-white/10 hover:bg-white/5 transition"
            >
              <Code2 className="size-4" />
              View Projects
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 w-full border-y border-white/5 py-10">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <span className="text-2xl md:text-3xl font-semibold text-foreground">{s.value}</span>
                <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, accent = "text-brand-primary" }: { eyebrow: string; title: string; accent?: string }) {
  return (
    <div className="flex flex-col gap-2 mb-12">
      <span className={`text-xs font-semibold uppercase tracking-widest ${accent}`}>{eyebrow}</span>
      <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight text-balance">{title}</h2>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="About" title="A short introduction" />
        <div className="grid md:grid-cols-3 gap-6">
          <Reveal className="md:col-span-2 glass-card rounded-2xl ring-1 ring-white/5 p-8">
            <p className="text-foreground/90 leading-relaxed text-pretty">{profile.longBio}</p>
            <div className="mt-6 pt-6 border-t border-white/5">
              <div className="text-xs uppercase tracking-widest text-brand-secondary font-semibold mb-2">
                Career Objective
              </div>
              <p className="text-muted-foreground text-pretty leading-relaxed">{profile.objective}</p>
            </div>
          </Reveal>
          <Reveal delay={80} className="glass-card rounded-2xl ring-1 ring-white/5 p-8 flex flex-col gap-4">
            {[
              { icon: User, label: "Designation", value: profile.designation },
              { icon: MapPin, label: "Location", value: profile.location },
              { icon: Mail, label: "Email", value: profile.email },
              { icon: Phone, label: "Phone", value: profile.phone },
              { icon: Linkedin, label: "LinkedIn", value: profile.linkedin.replace("https://", "") },
              { icon: Github, label: "GitHub", value: profile.github.replace("https://", "") },
            ].map((row) => (
              <div key={row.label} className="flex items-start gap-3">
                <div className="size-8 shrink-0 rounded-md bg-white/5 ring-1 ring-white/10 grid place-items-center">
                  <row.icon className="size-4 text-brand-primary" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                    {row.label}
                  </div>
                  <div className="text-sm text-foreground truncate">{row.value}</div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-white/[0.015]">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="Expertise" title="Technical Stack" accent="text-brand-secondary" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillGroups.map((group, gi) => (
            <Reveal key={group.title} delay={gi * 80} className="glass-card rounded-2xl ring-1 ring-white/5 p-6">
              <h3 className="text-foreground font-medium mb-5 flex items-center gap-2">
                <span className={`size-1.5 rounded-full ${group.dot}`} />
                {group.title}
              </h3>
              <ul className="space-y-5">
                {group.items.map((s) => (
                  <li key={s.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-foreground/90">{s.name}</span>
                      <span className="text-[11px] text-muted-foreground">{s.meta}</span>
                    </div>
                    <div className="h-1 w-full rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent rounded-full"
                        style={{ width: `${s.level}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="Experience" title="Career Timeline" accent="text-brand-accent" />
        <div className="relative pl-6 md:pl-10">
          <div className="absolute left-2 md:left-3 top-2 bottom-2 w-px bg-white/10" />
          <div className="space-y-10">
            {experience.map((e, i) => (
              <Reveal key={`${e.company}-${i}`} delay={i * 60}>
                <div className="relative">
                  <div className="absolute -left-6 md:-left-10 top-1.5 size-3 rounded-full bg-brand-primary ring-4 ring-background" />
                  <div className="glass-card rounded-2xl ring-1 ring-white/5 p-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">
                        {e.role} <span className="text-brand-secondary">@ {e.company}</span>
                      </h3>
                      <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
                        {e.duration}
                      </span>
                    </div>
                    <ul className="space-y-2 mt-3">
                      {e.bullets.map((b) => (
                        <li key={b} className="flex gap-2 text-sm text-muted-foreground">
                          <span className="text-brand-primary mt-0.5">→</span>
                          <span className="text-pretty">{b}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {e.tech.map((t) => (
                        <span key={t} className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-white/5 ring-1 ring-white/10 text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const allTags = useMemo(() => Array.from(new Set(projects.flatMap((p) => p.tech))), []);
  const [tag, setTag] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const filtered = projects.filter((p) => {
    const tagOk = !tag || p.tech.includes(tag);
    const qOk = !q || (p.title + p.description).toLowerCase().includes(q.toLowerCase());
    return tagOk && qOk;
  });

  return (
    <section id="projects" className="py-24 px-6 bg-white/[0.015]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-primary">Case Studies</span>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">Selected Projects</h2>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="sr-only" htmlFor="project-search">Search projects</label>
            <input
              id="project-search"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search projects…"
              className="bg-white/5 border border-white/10 rounded-md py-2 px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-brand-primary min-w-[200px]"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setTag(null)}
            className={`text-xs px-3 py-1 rounded-full ring-1 transition ${
              !tag ? "bg-foreground text-background ring-foreground" : "bg-white/5 text-muted-foreground ring-white/10 hover:text-foreground"
            }`}
          >
            All
          </button>
          {allTags.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`text-xs px-3 py-1 rounded-full ring-1 transition ${
                tag === t ? "bg-foreground text-background ring-foreground" : "bg-white/5 text-muted-foreground ring-white/10 hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filtered.map((p, i) => (
            <Reveal key={p.title} delay={i * 60}>
              <article className="group">
                <div className="relative overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/5 aspect-[16/10] mb-6">
                  <img
                    src={p.image}
                    alt={`${p.title} preview`}
                    loading="lazy"
                    width={1280}
                    height={800}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                </div>
                <div className="flex justify-between items-start gap-4">
                  <div className="flex flex-col gap-2 min-w-0">
                    <h3 className="text-xl font-medium text-foreground">{p.title}</h3>
                    <p className="max-w-[46ch] text-sm text-muted-foreground text-pretty">{p.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {p.tech.map((t) => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 ring-1 ring-white/10 text-muted-foreground uppercase tracking-wider font-semibold">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 flex gap-3 text-sm">
                      <a href={p.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition">
                        <Github className="size-4" /> Code
                      </a>
                      
                    </div>
                  </div>
                  <ArrowUpRight className="size-5 text-muted-foreground group-hover:text-brand-primary transition-colors shrink-0" />
                </div>
              </article>
            </Reveal>
          ))}
          {filtered.length === 0 && (
            <p className="text-muted-foreground text-sm">No projects match your filter.</p>
          )}
        </div>
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <section id="certifications" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="Credentials" title="Certifications" accent="text-brand-secondary" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((c, i) => (
            <Reveal key={c.id} delay={i * 50}>
              <div className="glass-card rounded-2xl ring-1 ring-white/5 p-6 h-full hover:ring-brand-primary/30 transition">
                <div className="flex items-start gap-3">
                  <div className="size-10 rounded-lg bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 ring-1 ring-white/10 grid place-items-center shrink-0">
                    <Award className="size-5 text-brand-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-foreground font-medium truncate">{c.name}</h3>
                    <div className="text-xs text-muted-foreground mt-1">
                      {c.org} · {c.date}
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mt-2">
                      ID · {c.id}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="py-24 px-6 bg-white/[0.015]">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="Education" title="Academic Background" accent="text-brand-accent" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((e, i) => (
            <Reveal key={e.degree} delay={i * 70}>
              <div className="glass-card rounded-2xl ring-1 ring-white/5 p-6 h-full">
                <div className="flex items-start gap-3">
                  <div className="size-10 rounded-lg bg-white/5 ring-1 ring-white/10 grid place-items-center shrink-0">
                    <GraduationCap className="size-5 text-brand-secondary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-foreground font-medium">{e.degree}</h3>
                    <div className="text-sm text-muted-foreground mt-1">{e.institution}</div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mt-2">
                      {e.year} · {e.cgpa}
                    </div>
                    <p className="text-sm text-muted-foreground mt-3 text-pretty">{e.description}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Achievements() {
  return (
    <section id="achievements" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="Highlights" title="Achievements" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {achievements.map((a, i) => (
            <Reveal key={a.title} delay={i * 50}>
              <div className="glass-card rounded-2xl ring-1 ring-white/5 p-6 flex items-start gap-4 hover:ring-brand-accent/30 transition">
                <div className="size-10 rounded-lg bg-gradient-to-br from-brand-accent/20 to-brand-secondary/20 ring-1 ring-white/10 grid place-items-center shrink-0">
                  <Trophy className="size-5 text-brand-accent" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-foreground font-medium">{a.title}</h3>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">{a.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 text-pretty">{a.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16">
          <SectionHeader eyebrow="Profiles" title="Coding Profiles" accent="text-brand-secondary" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {codingProfiles.map((cp, i) => (
              <Reveal key={cp.name} delay={i * 40}>
                <a
                  href={cp.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group glass-card rounded-2xl ring-1 ring-white/5 p-5 flex flex-col gap-2 hover:ring-brand-primary/30 transition h-full"
                >
                  <div className={`text-xs font-semibold uppercase tracking-widest ${cp.accent}`}>{cp.name}</div>
                  <div className="text-sm text-foreground truncate">@{cp.username}</div>
                  <div className="mt-auto text-muted-foreground group-hover:text-foreground transition">
                    <ArrowUpRight className="size-4" />
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Resume() {
  return (
    <section id="resume" className="py-24 px-6 bg-white/[0.015]">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="Resume" title="One page that tells the rest" />
        <Reveal>
          <div className="glass-card rounded-2xl ring-1 ring-white/5 p-8 grid md:grid-cols-[1fr_auto] gap-6 items-center">
            <div className="flex items-center gap-4 min-w-0">
              <div className="size-12 rounded-lg bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 ring-1 ring-white/10 grid place-items-center shrink-0">
                <Briefcase className="size-5 text-brand-primary" />
              </div>
              <div className="min-w-0">
                <div className="text-foreground font-medium truncate">{profile.name} — Resume</div>
                <div className="text-sm text-muted-foreground">Updated 2025 · PDF · 1 page</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-white/5 text-foreground text-sm font-medium py-2.5 px-4 rounded-md ring-1 ring-white/10 hover:bg-white/10"
              >
                <ExternalLink className="size-4" /> Preview
              </a>
              <a
                href={profile.resumeUrl}
                download
                className="inline-flex items-center gap-2 bg-brand-primary text-white text-sm font-medium py-2.5 px-4 rounded-md ring-1 ring-brand-primary hover:brightness-110"
              >
                <Download className="size-4" /> Download
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}


function Contact() {
  const [status, setStatus] = useState("");

  return (
    <section id="contact" className="pt-24 pb-12 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">

          {/* Left Side */}
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight leading-tight">
              Interested in a <br /> technical partnership?
            </h2>

            <p className="max-w-[44ch] text-muted-foreground">
              Currently available for Full Stack Development, Java Development and Software Engineering opportunities.
            </p>

            <div className="flex flex-col gap-3 text-sm">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 text-foreground"
              >
                <Mail className="size-4" />
                {profile.email}
              </a>

              <a
                href={`tel:${profile.phone}`}
                className="inline-flex items-center gap-2 text-foreground"
              >
                <Phone className="size-4" />
                {profile.phone}
              </a>

              <div className="inline-flex items-center gap-2 text-muted-foreground">
                <MapPin className="size-4" />
                {profile.location}
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="glass-card rounded-2xl ring-1 ring-white/5 p-8">

            <form
              action="https://api.web3forms.com/submit"
              method="POST"
              onSubmit={() => setStatus("Sending...")}
              className="space-y-4"
            >
              <input
                type="hidden"
                name="access_key"
                value="2f3029be-b455-4d84-ba62-b0a688d0e645"
              />

              <input
                type="hidden"
                name="subject"
                value="New Portfolio Contact"
              />

              <input
                type="hidden"
                name="from_name"
                value="Portfolio Website"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="w-full bg-background/60 border border-white/10 rounded-lg p-3"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="w-full bg-background/60 border border-white/10 rounded-lg p-3"
                />

              </div>

              <textarea
                name="message"
                placeholder="Your Message"
                required
                rows={6}
                className="w-full bg-background/60 border border-white/10 rounded-lg p-3"
              />

              <button
                type="submit"
                className="w-full bg-brand-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
              >
                <Send className="inline mr-2 size-4" />
                Send Message
              </button>

              {status && (
                <p className="text-sm text-green-400 text-center">
                  {status}
                </p>
              )}

              <input
                    type="hidden"
                    name="redirect"
                    value="http://localhost:8080/?success=true"
                  />
            </form>

          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-white/5">
          <span className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {profile.name}
          </span>
        </div>
      </div>
    </section>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  if (!show) return null;
  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 size-11 rounded-full bg-brand-primary text-white grid place-items-center ring-1 ring-white/20 shadow-lg hover:brightness-110 transition"
    >
      <ArrowUp className="size-5" />
    </button>
  );
}

function Portfolio() {
  return (
    <div className="min-h-dvh bg-background text-foreground selection:bg-brand-primary/30">
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Education />
        <Achievements />
        
        <Resume />
        <Contact />
      </main>
      <BackToTop />
      {/* Hidden semantic markers to satisfy a11y scanners and provide consistent landmarks */}
      <span className="sr-only" aria-hidden="true"><Medal /><MessageSquare /></span>
    </div>
  );
}
