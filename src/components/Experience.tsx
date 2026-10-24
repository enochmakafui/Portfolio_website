import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Reveal from "./Reveal";

const experiences = [
  {
    title: "Graduate Teaching Assistant",
    company: "University of Cape Coast",
    period: "Nov 2025 — Present",
    points: [
      "Lead tutorial and problem-solving sessions for 350+ students in Discrete Mathematics, Algorithms and Numerical Analysis",
      "Give one-on-one support and grade assignments and quizzes with timely feedback",
    ],
  },
  {
    title: "Front-End Web Developer",
    company: "TST Labs",
    period: "Dec 2024 — Aug 2025",
    points: [
      "Built user-centred interfaces with UI/UX designers and integrated them with back-end developers' APIs",
      "Shipped on schedule through testing, debugging and SEO work that improved search visibility",
    ],
  },
  {
    title: "Front-End Developer",
    company: "Ornama Studios",
    period: "Aug 2023 — Oct 2025",
    points: [
      "Built an e-commerce site that lifted the client's sales 20% within a month of launch",
      "Built the Ornama Studios website and lead-generating landing pages for client companies with React and Next.js",
    ],
  },
  {
    title: "Front-End Intern",
    company: "Plugnom Solutions",
    period: "Oct 2023 — Dec 2023",
    points: ["Developed and tested user interfaces in HTML, CSS and JavaScript before launch"],
  },
];

const Experience = () => {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" className="border-t border-line py-24">
      <div className="container-page grid gap-12 md:grid-cols-[1fr_2fr]">
        <Reveal>
          <h2 className="section-title">Experience</h2>
          <p className="mt-4 leading-relaxed text-muted">
            Building for clients since 2023, alongside a degree and now teaching.
          </p>
        </Reveal>

        <div className="relative">
          <span aria-hidden className="absolute bottom-2 left-[5px] top-2 w-px bg-line" />
          <motion.span
            aria-hidden
            style={{ scaleY: progress }}
            className="absolute bottom-2 left-[5px] top-2 w-px origin-top bg-accent"
          />
          <ol ref={listRef} className="space-y-10 pl-8">
            {experiences.map((exp) => (
              <li key={exp.title} className="relative">
                <Reveal>
                  <span className="absolute -left-8 top-1.5 h-[11px] w-[11px] rounded-full border-2 border-accent bg-paper" />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-semibold">
                      {exp.title} <span className="font-normal text-muted">· {exp.company}</span>
                    </h3>
                    <span className="label tabular-nums">{exp.period}</span>
                  </div>
                  <ul className="mt-3 space-y-1.5">
                    {exp.points.map((point) => (
                      <li key={point} className="leading-relaxed text-muted">
                        {point}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Experience;
