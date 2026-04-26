import { useState, useEffect, useRef } from "react";

const SKILLS_PRIMARY = ["Java", "Spring Boot", "Spring Security", "REST APIs", "PostgreSQL"];
const SKILLS_SECONDARY = ["React", "Git", "CI/CD", "Docker", "AWS"];

const PROJECTS = [
  {
    title: "Timesheet Management System",
    company: "Ford Credit",
    year: "2023",
    impact: "Used by 500+ employees across Ford Credit",
    desc: "Enterprise employee tracking system with secure role-based access control and full audit trail.",
    bullets: [
      "Architected REST APIs with Spring Boot handling 10K+ daily requests",
      "Implemented JWT-based auth via Spring Security with RBAC",
      "Set up CI/CD pipeline reducing deployment time by 60%",
    ],
    tech: ["Java", "Spring Boot", "Spring Security", "PostgreSQL"],
    accent: "#0ea5e9",
    github: "#",
  },
  {
    title: "DSEDIFY LMS",
    company: "DSEDIFY",
    year: "2022",
    impact: "Serving 1,000+ learners across the platform",
    desc: "Cloud-based learning management system with course delivery, assessments, and analytics dashboard.",
    bullets: [
      "Built modular API architecture for courses, users & assessments",
      "Integrated automated email pipeline using JavaMail & templates",
      "Developed analytics reporting with role-based data access",
    ],
    tech: ["React", "Spring Boot", "PostgreSQL", "AWS"],
    accent: "#10b981",
    github: "#",
  },
];

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function Reveal({ children, delay = 0, style = {} }: any) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

function Tag({ label, color = "#0ea5e9" }: { label: string; color?: string }) {
  return (
    <span style={{
      display: "inline-block", fontSize: 11, fontWeight: 700,
      letterSpacing: "0.07em", padding: "3px 10px", borderRadius: 4,
      background: color + "18", color, border: `1px solid ${color}30`,
    }}>{label}</span>
  );
}

function SectionLabel({ color, children }: any) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.6rem" }}>
      <div style={{ width: 20, height: 3, borderRadius: 2, background: color }} />
      <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.16em", color }}>
        {String(children).toUpperCase()}
      </span>
    </div>
  );
}

const headingStyle: React.CSSProperties = {
  fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
  fontWeight: 800, letterSpacing: "-0.03em",
  color: "#0f172a", lineHeight: 1.1,
};

function SkillPill({ label, primary }: { label: string; primary?: boolean }) {
  return (
    <div style={{
      padding: "7px 14px", borderRadius: 8,
      background: primary ? "#0f172a" : "#f1f5f9",
      color: primary ? "#f8fafc" : "#475569",
      fontSize: 13, fontWeight: 600,
      border: primary ? "none" : "1px solid #e2e8f0",
    }}>{label}</div>
  );
}

function StrengthBar({ name, pct, delay }: { name: string; pct: number; delay: number }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{name}</span>
        <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>{pct}%</span>
      </div>
      <div style={{ height: 5, background: "#f1f5f9", borderRadius: 4, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: inView ? `${pct}%` : "0%",
          background: "linear-gradient(90deg, #0ea5e9, #6366f1)",
          borderRadius: 4,
          transition: `width 1s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        }} />
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        border: `1px solid ${hovered ? project.accent + "60" : "#e2e8f0"}`,
        borderRadius: 14, padding: "1.6rem 1.8rem",
        boxShadow: hovered ? `0 12px 40px rgba(0,0,0,0.1)` : "0 1px 3px rgba(0,0,0,0.05)",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        position: "relative", overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${project.accent}, ${project.accent}55)`,
      }} />
      <span style={{
        fontSize: 10, fontWeight: 800, letterSpacing: "0.12em",
        color: project.accent, display: "block", marginBottom: 5,
      }}>{project.company.toUpperCase()} · {project.year}</span>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", lineHeight: 1.25, marginBottom: 10 }}>
        {project.title}
      </h3>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        background: project.accent + "12", border: `1px solid ${project.accent}30`,
        borderRadius: 6, padding: "4px 10px", marginBottom: 12,
      }}>
        <span style={{ fontSize: 10 }}>📈</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: project.accent }}>{project.impact}</span>
      </div>
      <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7, marginBottom: 12 }}>{project.desc}</p>
      <ul style={{ listStyle: "none", padding: 0, marginBottom: 14, display: "flex", flexDirection: "column", gap: 5 }}>
        {project.bullets.map((b, i) => (
          <li key={i} style={{ fontSize: 12.5, color: "#374151", display: "flex", gap: 8, lineHeight: 1.55 }}>
            <span style={{ color: project.accent, flexShrink: 0, fontWeight: 800 }}>✓</span>
            {b}
          </li>
        ))}
      </ul>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
        {project.tech.map(t => <Tag key={t} label={t} color={project.accent} />)}
      </div>
      <a href={project.github} style={{
        fontSize: 12, fontWeight: 700, color: project.accent,
        textDecoration: "none", letterSpacing: "0.04em",
      }}>View on GitHub →</a>
    </div>
  );
}

export default function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: "#f8f9fb", color: "#0f172a", minHeight: "100vh" }}>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrollY > 20 ? "rgba(248,249,251,0.95)" : "transparent",
        backdropFilter: scrollY > 20 ? "blur(16px)" : "none",
        borderBottom: scrollY > 20 ? "1px solid #e2e8f0" : "none",
        transition: "all 0.3s", padding: "0 2rem",
        height: 56, display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 8,
            background: "linear-gradient(135deg, #0ea5e9, #6366f1)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 800, color: "#fff",
          }}>NK</div>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", letterSpacing: "-0.02em" }}>Naveen Kumar</span>
        </div>
        <div style={{ display: "flex", gap: "1.8rem" }}>
          {["Profile", "Experience", "Skills", "Projects", "Contact"].map(n => (
            <button key={n} onClick={() => navTo(n.toLowerCase())} style={{
              background: "none", border: "none", fontSize: 13, fontWeight: 600,
              color: "#64748b", cursor: "pointer", padding: 0, transition: "color 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = "#0f172a")}
              onMouseLeave={e => (e.currentTarget.style.color = "#64748b")}
            >{n}</button>
          ))}
        </div>
      </nav>

      {/* ══════════════════════════════════════
          HERO — RECRUITER PROFILE CARD
      ══════════════════════════════════════ */}
      <section id="profile" style={{
        paddingTop: 80,
        background: "linear-gradient(160deg, #0f172a 0%, #1e293b 55%, #0f172a 100%)",
        position: "relative", overflow: "hidden",
      }}>
        {/* dot grid */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.04, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />
        {/* glow blobs */}
        <div style={{
          position: "absolute", top: -80, right: "15%", width: 320, height: 320,
          borderRadius: "50%", pointerEvents: "none",
          background: "radial-gradient(circle, rgba(14,165,233,0.2) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", bottom: 0, left: "10%", width: 240, height: 240,
          borderRadius: "50%", pointerEvents: "none",
          background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
        }} />

        <div style={{ maxWidth: 900, margin: "0 auto", padding: "3.5rem 2rem 4rem", position: "relative", zIndex: 1 }}>

          {/* TOP ROW */}
          <div style={{
            display: "flex", alignItems: "flex-start", gap: "2rem", flexWrap: "wrap",
            animation: "heroIn 0.8s ease both",
          }}>
            {/* Avatar */}
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div style={{
                width: 88, height: 88, borderRadius: 20,
                background: "linear-gradient(135deg, #0ea5e9, #6366f1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 32, fontWeight: 800, color: "#fff", letterSpacing: "-0.04em",
              }}>NK</div>
              <div style={{
                position: "absolute", bottom: 6, right: 6, width: 14, height: 14,
                borderRadius: "50%", background: "#10b981",
                border: "2.5px solid #1e293b", boxShadow: "0 0 0 3px rgba(16,185,129,0.25)",
              }} />
            </div>

            {/* Identity */}
            <div style={{ flex: 1, minWidth: 240 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)",
                borderRadius: 20, padding: "3px 12px", marginBottom: 12,
              }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981" }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: "#10b981", letterSpacing: "0.1em" }}>
                  OPEN TO OPPORTUNITIES
                </span>
              </div>
              <h1 style={{
                fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800,
                color: "#f8fafc", letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 8,
              }}>Naveen Kumar</h1>
              <p style={{ fontSize: 16, fontWeight: 500, color: "#94a3b8", marginBottom: 16 }}>
                Software Engineer · Backend Systems & APIs
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {[
                  { icon: "🏢", text: "Ford Credit · 2+ yrs" },
                  { icon: "📍", text: "Chennai, India" },
                  { icon: "🎓", text: "B.E. Computer Science" },
                  { icon: "⚡", text: "Java · Spring Boot" },
                ].map(chip => (
                  <div key={chip.text} style={{
                    display: "flex", alignItems: "center", gap: 6,
                    background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 8, padding: "5px 12px", fontSize: 12, fontWeight: 500, color: "#cbd5e1",
                  }}>
                    <span>{chip.icon}</span><span>{chip.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, flexShrink: 0 }}>
              <a href="mailto:naveen@example.com" style={{
                padding: "11px 22px", borderRadius: 10,
                background: "linear-gradient(135deg, #0ea5e9, #6366f1)",
                color: "#fff", fontWeight: 700, fontSize: 13,
                textDecoration: "none", textAlign: "center", letterSpacing: "0.02em",
                transition: "opacity 0.2s, transform 0.2s", display: "block",
              }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
              >📩 Hire Me</a>
              <a href="#" style={{
                padding: "11px 22px", borderRadius: 10,
                background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)",
                color: "#e2e8f0", fontWeight: 600, fontSize: 13,
                textDecoration: "none", textAlign: "center",
                transition: "background 0.2s", display: "block",
              }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
              >↓ Download Resume</a>
            </div>
          </div>

          {/* STATS STRIP */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1px", marginTop: "3rem",
            background: "rgba(255,255,255,0.08)", borderRadius: 16, overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            animation: "heroIn 0.8s ease 0.2s both",
          }}>
            {[
              { value: "2+", label: "Years at Ford Credit", sub: "Enterprise scale" },
              { value: "20+", label: "APIs Built & Shipped", sub: "Production-grade" },
              { value: "5+", label: "Projects Delivered", sub: "End-to-end" },
              { value: "500+", label: "Daily Active Users", sub: "Timesheet system" },
            ].map((s, i) => (
              <div key={s.label} style={{
                background: "rgba(15,23,42,0.6)", padding: "1.4rem 1.2rem", textAlign: "center",
                borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none",
              }}>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "#f8fafc", letterSpacing: "-0.05em", lineHeight: 1 }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8", marginTop: 6 }}>{s.label}</div>
                <div style={{ fontSize: 11, color: "#475569", marginTop: 2 }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* WHY HIRE ME BANNER */}
          <div style={{
            marginTop: "1.5rem",
            background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.2)",
            borderRadius: 12, padding: "1rem 1.4rem",
            display: "flex", alignItems: "flex-start", gap: 12,
            animation: "heroIn 0.8s ease 0.35s both",
          }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>💡</span>
            <p style={{ fontSize: 13, color: "#bae6fd", lineHeight: 1.7, margin: 0 }}>
              <strong style={{ color: "#e0f2fe" }}>Why shortlist Naveen?</strong> — Backend engineer with proven experience shipping enterprise software at Ford Credit.
              Specialises in Java/Spring Boot API systems with security, CI/CD, and cloud deployment.
              Strong in system design, REST principles, and scalable architecture. <strong style={{ color: "#e0f2fe" }}>Available immediately.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* ══ EXPERIENCE ══ */}
      <section id="experience" style={{ maxWidth: 900, margin: "0 auto", padding: "5rem 2rem" }}>
        <Reveal>
          <SectionLabel color="#6366f1">Experience</SectionLabel>
          <h2 style={headingStyle}>Work history.</h2>
        </Reveal>
        <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {[
            {
              role: "Software Engineer",
              company: "Ford Credit (via DSEDIFY)",
              period: "2022 – Present · 2+ yrs",
              type: "Full-time",
              color: "#0ea5e9",
              points: [
                "Built and maintained enterprise Java/Spring Boot applications for Ford Credit internal tools",
                "Developed secure REST APIs with Spring Security, RBAC, and JWT authentication",
                "Integrated cloud deployments with automated CI/CD pipelines",
                "Collaborated with cross-functional teams across finance and engineering",
              ],
            },
            {
              role: "Software Developer",
              company: "DSEDIFY",
              period: "2021 – 2022 · 1 yr",
              type: "Full-time",
              color: "#10b981",
              points: [
                "Developed LMS features using React (frontend) and Spring Boot (backend)",
                "Designed database schema and query optimisation in PostgreSQL",
                "Built email notification and reporting systems",
              ],
            },
          ].map((exp, i) => (
            <Reveal key={exp.company} delay={i * 0.1}>
              <div style={{
                background: "#fff", border: "1px solid #e2e8f0",
                borderLeft: `4px solid ${exp.color}`,
                borderRadius: "0 12px 12px 0", padding: "1.5rem 1.8rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 3 }}>{exp.role}</h3>
                    <p style={{ fontSize: 13, color: "#64748b", fontWeight: 600 }}>{exp.company}</p>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                    <span style={{
                      fontSize: 11, background: exp.color + "15", color: exp.color,
                      border: `1px solid ${exp.color}30`, borderRadius: 20,
                      padding: "3px 10px", fontWeight: 700, letterSpacing: "0.06em",
                    }}>{exp.type}</span>
                    <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500 }}>{exp.period}</span>
                  </div>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
                  {exp.points.map((pt, j) => (
                    <li key={j} style={{ fontSize: 13.5, color: "#475569", display: "flex", gap: 10, lineHeight: 1.6 }}>
                      <span style={{ color: exp.color, fontWeight: 800, flexShrink: 0, marginTop: 1 }}>›</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ SKILLS ══ */}
      <section id="skills" style={{ background: "#fff", borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "5rem 2rem" }}>
          <Reveal>
            <SectionLabel color="#10b981">Tech Stack</SectionLabel>
            <h2 style={headingStyle}>Skills & tools.</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem", marginTop: "2.5rem" }}>
            <Reveal delay={0.05}>
              <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.15em", color: "#94a3b8", marginBottom: "1rem" }}>CORE STACK</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {SKILLS_PRIMARY.map(s => <SkillPill key={s} label={s} primary />)}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.15em", color: "#94a3b8", marginBottom: "1rem" }}>ADDITIONAL TOOLS</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {SKILLS_SECONDARY.map(s => <SkillPill key={s} label={s} />)}
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div style={{ marginTop: "3rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem 3rem" }}>
              {[
                { name: "Backend Development", pct: 92 },
                { name: "REST API Design", pct: 90 },
                { name: "Spring Security / Auth", pct: 84 },
                { name: "Database (PostgreSQL)", pct: 80 },
                { name: "Frontend (React)", pct: 72 },
                { name: "Cloud / DevOps", pct: 74 },
              ].map((s, i) => (
                <StrengthBar key={s.name} {...s} delay={i * 0.06} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ PROJECTS ══ */}
      <section id="projects" style={{ maxWidth: 900, margin: "0 auto", padding: "5rem 2rem" }}>
        <Reveal>
          <SectionLabel color="#f59e0b">Projects</SectionLabel>
          <h2 style={headingStyle}>Work that ships.</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginTop: "2rem" }}>
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.12}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section id="contact" style={{
        background: "linear-gradient(160deg, #0f172a 0%, #1e293b 100%)",
        padding: "5rem 2rem 6rem",
      }}>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)",
              borderRadius: 20, padding: "4px 14px", marginBottom: "1.5rem",
            }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 6px #10b981" }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: "#10b981", letterSpacing: "0.1em" }}>AVAILABLE FOR HIRE</span>
            </div>
            <h2 style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800,
              color: "#f8fafc", letterSpacing: "-0.04em", marginBottom: "1rem",
            }}>Let's build something great.</h2>
            <p style={{ fontSize: 15, color: "#94a3b8", lineHeight: 1.8, marginBottom: "2.5rem" }}>
              Actively looking for backend / full-stack engineering roles.<br />
              Open to full-time positions — product companies, startups, or enterprises.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              {[
                { label: "📩 naveen@example.com", href: "mailto:naveen@example.com", primary: true },
                { label: "💼 LinkedIn", href: "#", primary: false },
                { label: "🐙 GitHub", href: "#", primary: false },
              ].map(link => (
                <a key={link.label} href={link.href} style={{
                  padding: "13px 28px", borderRadius: 10,
                  background: link.primary ? "linear-gradient(135deg, #0ea5e9, #6366f1)" : "rgba(255,255,255,0.08)",
                  border: link.primary ? "none" : "1px solid rgba(255,255,255,0.15)",
                  color: link.primary ? "#fff" : "#e2e8f0",
                  fontWeight: link.primary ? 700 : 600, fontSize: 14,
                  textDecoration: "none", transition: "opacity 0.2s, transform 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
                >{link.label}</a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <footer style={{
        background: "#080f1a", textAlign: "center", padding: "1.2rem",
        fontSize: 12, color: "#334155", letterSpacing: "0.06em",
      }}>
        Naveen Kumar · Software Engineer · {new Date().getFullYear()}
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        @keyframes heroIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}
