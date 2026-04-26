import { useState } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { FaJava, FaReact, FaGitAlt, FaGithub, FaLinkedin } from "react-icons/fa";
import { SiSpringboot, SiPostgresql } from "react-icons/si";

type Skill = {
  name: string;
  icon: ReactNode;
};

type Project = {
  title: string;
  desc: string;
  tech: string;
  github?: string;
  live?: string;
};

export default function App() {
  const [open, setOpen] = useState<boolean>(false);

  const skills: Skill[] = [
    { name: "Java", icon: <FaJava /> },
    { name: "Spring Boot", icon: <SiSpringboot /> },
    { name: "React", icon: <FaReact /> },
    { name: "PostgreSQL", icon: <SiPostgresql /> },
    { name: "Git", icon: <FaGitAlt /> },
  ];

  const projects: Project[] = [
    {
      title: "Timesheet Management",
      desc: "Spring Boot APIs with authentication and CI/CD deployment.",
      tech: "Java, Spring Boot",
      github: "#",
      live: "#",
    },
    {
      title: "DSEDIFY LMS",
      desc: "Role-based LMS with reporting and email automation.",
      tech: "React, Spring Boot",
      github: "#",
      live: "#",
    },
    {
      title: "Ford Credit Enterprise App",
      desc: "Enterprise financial system with batch processing.",
      tech: "Java, SQL",
    },
    {
      title: "Quiz App",
      desc: "React-based quiz system with timer.",
      tech: "React",
      github: "#",
      live: "#",
    },
  ];

  return (
    <div className="relative min-h-screen text-white bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617] overflow-x-hidden">

      {/* 🔥 Background Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute w-[420px] h-[420px] bg-blue-500/20 blur-3xl rounded-full top-16 left-10"></div>
        <div className="absolute w-[420px] h-[420px] bg-purple-500/20 blur-3xl rounded-full bottom-16 right-10"></div>
      </div>

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-white/5 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="font-semibold tracking-wide">Naveen</h1>

          <div className="hidden md:flex gap-8 text-sm text-gray-300">
            <a href="#about" className="hover:text-white">About</a>
            <a href="#skills" className="hover:text-white">Skills</a>
            <a href="#projects" className="hover:text-white">Projects</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden">
            ☰
          </button>
        </div>

        {open && (
          <div className="md:hidden flex flex-col items-center gap-4 pb-4 text-gray-300">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text"
        >
          Naveen Kumar
        </motion.h1>

        <p className="text-gray-400 mb-4">
          Software Engineer | Java • Spring Boot • React
        </p>

        <p className="text-gray-500 max-w-xl mb-6">
          Building scalable backend systems and enterprise-grade applications.
        </p>

        <div className="flex gap-4 flex-wrap justify-center">
          <a
            href="#projects"
            className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2 rounded-lg shadow-lg hover:scale-105 transition"
          >
            View Projects
          </a>
          <a
            href="/resume.pdf"
            className="border border-white/20 px-6 py-2 rounded-lg hover:bg-white hover:text-black transition"
          >
            Resume
          </a>
        </div>
      </section>

      {/* ABOUT */}
      <Section id="about" title="About Me">
        Software Engineer with 2+ years of experience in Java, Spring Boot, and React.
        Worked on enterprise applications like Ford Credit, building scalable APIs,
        CI/CD pipelines, and cloud deployments.
      </Section>

      {/* SKILLS */}
      <Section id="skills" title="Skills">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mt-8">
          {skills.map((s, i) => (
            <GlassCard key={i}>
              <div className="text-3xl mb-2">{s.icon}</div>
              {s.name}
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" title="Projects">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          {projects.map((p, i) => (
            <GlassCard key={i}>
              <h3 className="font-semibold mb-2">{p.title}</h3>
              <p className="text-gray-400 text-sm mb-2">{p.desc}</p>
              <p className="text-xs text-gray-500">{p.tech}</p>

              {(p.github || p.live) && (
                <div className="flex gap-4 mt-3 text-sm">
                  {p.github && <a href={p.github} className="text-blue-400 hover:underline">GitHub</a>}
                  {p.live && <a href={p.live} className="text-green-400 hover:underline">Live</a>}
                </div>
              )}
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience" title="Experience">
        <div className="border-l border-white/10 pl-6 space-y-6 mt-6">
          <div>
            <h3 className="font-semibold">Sorim Technologies</h3>
            <p className="text-sm text-gray-400">2025 - Present</p>
            <p className="text-gray-500 text-sm">
              Backend systems, CI/CD pipelines, cloud deployment.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Dyashin Technosoft</h3>
            <p className="text-sm text-gray-400">2024 - 2025</p>
            <p className="text-gray-500 text-sm">
              Full-stack development using React and Spring Boot.
            </p>
          </div>
        </div>
      </Section>

      {/* CONTACT */}
      <section id="contact" className="text-center py-24 px-6">
        <h2 className="text-3xl font-semibold mb-4">Contact</h2>
        <p className="text-gray-400">naveenkumarareddula375@gmail.com</p>

        <div className="flex justify-center gap-6 mt-4 text-xl">
          <FaLinkedin className="cursor-pointer hover:text-blue-400" />
          <FaGithub className="cursor-pointer hover:text-gray-300" />
        </div>
      </section>

      <footer className="text-center pb-6 text-gray-500 text-sm">
        © 2026 Naveen Kumar
      </footer>
    </div>
  );
}

/* 🔹 Reusable Components */

function Section({ id, title, children }: any) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto px-6 py-24"
    >
      <h2 className="text-3xl font-semibold mb-6">{title}</h2>
      <div className="text-gray-400">{children}</div>
    </motion.section>
  );
}

function GlassCard({ children }: any) {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:scale-105 hover:shadow-lg transition">
      {children}
    </div>
  );
}