import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

const products = [
  {
    title: "Best Teach",
    category: "Tutoring marketplace · installable web app",
    description:
      "University of Cape Coast students search a course code like MAT 101, book a verified student tutor who already passed it, and pay with MoMo. Free past questions, video courses and AI practice quizzes help between sessions.",
    built: [
      "Booking flow as a state machine — requested, accepted, paid, in progress, completed — with countdowns at each step",
      "One account, two dashboards: students learn, tutors teach, with a switch between them",
      "Paystack checkout that only marks a booking paid after the server verifies it",
      "Mobile-first PWA with light and dark themes, made for students on phones",
    ],
    stack: ["React 19", "TypeScript", "TanStack Query", "React Router", "React Hook Form", "Zod", "Tailwind v4", "Supabase"],
    screens: ["/projects/bestteach-home.jpg", "/projects/bestteach-courses.jpg"],
    tint: "#1e3a8a",
    url: "https://best-teach.vercel.app/",
    domain: "best-teach.vercel.app",
  },
  {
    title: "GasUp",
    category: "On-demand delivery · customer, rider and admin apps",
    description:
      "Order a cooking-gas refill from your phone. A verified rider picks up the empty cylinder, gets it refilled and brings it back to your door.",
    built: [
      "Three apps in one codebase — customer ordering, rider jobs and an admin console — behind role-based routes",
      "Live GPS and Leaflet maps: the delivery address comes from the device and distances from the rider's position",
      "Rider job flow: offers, accept or back out, then pickup, refill and delivery stages with earnings",
      "Rider onboarding with document upload and verification states",
    ],
    stack: ["React 19", "TypeScript", "TanStack Query", "React Router", "Leaflet", "React Hook Form", "Tailwind v4"],
    screens: ["/projects/gasup-onboarding.jpg", "/projects/gasup-login.jpg"],
    tint: "#06371F",
    url: "https://gas-up-eight.vercel.app/",
    domain: "gas-up-eight.vercel.app",
  },
];

const clientSites = [
  {
    title: "Ornama Studios",
    category: "Agency website",
    description:
      "Product, digital and content marketing agency — service pages, case studies, insights and a project inquiry flow.",
    image: "/projects/ornama.jpg",
    url: "https://ornama-v2.vercel.app/",
    domain: "ornama-v2.vercel.app",
    tags: ["Next.js", "Tailwind CSS"],
  },
  {
    title: "ARXYN Development",
    category: "Company website",
    description:
      "Architecture, interior design and project management firm — cinematic hero, services showcase and project gallery.",
    image: "/projects/arxyn.jpg",
    url: "https://arxyndevelopment.com/",
    domain: "arxyndevelopment.com",
    tags: ["React", "Framer Motion"],
  },
];

const Phone = ({ src, alt, y, rotate }: { src: string; alt: string; y: MotionValue<number>; rotate: number }) => (
  <motion.div
    style={{ y, rotate }}
    whileHover={{ scale: 1.04, rotate: 0 }}
    className="w-[40%] max-w-[210px] rounded-[1.9rem] bg-neutral-950 p-[5px] shadow-2xl shadow-black/40"
  >
    <img src={src} alt={alt} loading="lazy" className="aspect-[390/844] w-full rounded-[1.6rem] object-cover object-top" />
  </motion.div>
);

// two phones drifting in opposite directions as the panel scrolls past
const PhonePair = ({ title, screens, tint, url }: { title: string; screens: string[]; tint: string; url: string }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const up = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const down = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <a
      ref={ref}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${title}`}
      className="relative flex aspect-square items-center justify-center gap-4 overflow-hidden rounded-2xl px-6 sm:aspect-[6/5] sm:gap-6"
      style={{ backgroundColor: tint }}
    >
      <Phone src={screens[0]} alt={`${title} screen`} y={up} rotate={-3} />
      <Phone src={screens[1]} alt={`${title} second screen`} y={down} rotate={3} />
    </a>
  );
};

const Projects = () => {
  return (
    <section id="work" className="border-t border-line py-24">
      <div className="container-page">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="section-title">Selected work</h2>
          <p className="label">2023 — 2026</p>
        </Reveal>

        <div className="mt-14 space-y-24">
          {products.map((project, index) => (
            <Reveal key={project.title}>
              <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className={index % 2 ? "lg:order-2" : ""}>
                  <p className="label">{project.category}</p>
                  <h3 className="mt-2 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">{project.title}</h3>
                  <p className="mt-4 leading-relaxed text-muted">{project.description}</p>

                  <h4 className="mt-8 text-sm font-semibold">What I built</h4>
                  <ul className="mt-3 space-y-2.5">
                    {project.built.map((item) => (
                      <li key={item} className="flex gap-3 leading-relaxed text-muted">
                        <span className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-6 font-mono text-xs leading-6 text-muted">{project.stack.join(" / ")}</p>

                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn-secondary mt-8">
                    {project.domain} <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>

                <PhonePair title={project.title} screens={project.screens} tint={project.tint} url={project.url} />
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-28">
          <h3 className="text-xl font-semibold tracking-tight">Client websites</h3>
        </Reveal>
        <div className="mt-8 grid gap-10 md:grid-cols-2">
          {clientSites.map((site, index) => (
            <Reveal key={site.title} delay={index * 0.08}>
              <a href={site.url} target="_blank" rel="noopener noreferrer" className="group block">
                <div className="overflow-hidden rounded-xl border border-line bg-surface">
                  <div className="flex items-center gap-3 border-b border-line px-3 py-2">
                    <div className="flex gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-line" />
                      <span className="h-2 w-2 rounded-full bg-line" />
                      <span className="h-2 w-2 rounded-full bg-line" />
                    </div>
                    <span className="label truncate">{site.domain}</span>
                  </div>
                  <img
                    src={site.image}
                    alt={`${site.title} homepage`}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover object-top transition duration-700 ease-out group-hover:scale-[1.02]"
                  />
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-semibold">{site.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{site.description}</p>
                    <p className="label mt-3">{site.tags.join(" / ")}</p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
