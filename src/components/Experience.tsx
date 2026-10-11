import Reveal from "./Reveal";

const experiences = [
  {
    title: "Frontend Developer",
    company: "Plugnom",
    period: "2023 — Present",
    description:
      "Led frontend development for multiple client projects, implementing responsive designs and optimizing performance.",
  },
  {
    title: "Frontend Development Club Lead",
    company: "University of Cape Coast",
    period: "2022 — 2023",
    description:
      "Organized workshops and mentored junior developers in modern web development practices.",
  },
  {
    title: "Freelance Web Developer",
    company: "Self-employed",
    period: "2021 — 2022",
    description:
      "Developed custom websites and web applications for various clients using modern technologies.",
  },
];

const Experience = () => {
  return (
    <section id="experience" className="border-t border-zinc-200 py-24 dark:border-zinc-900">
      <div className="container-page grid gap-12 md:grid-cols-[1fr_2fr]">
        <Reveal>
          <p className="eyebrow">Experience</p>
          <h2 className="section-title">Where I've worked</h2>
          <p className="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-400">
            2+ years shipping production websites, with a computer science
            background from the University of Cape Coast.
          </p>
        </Reveal>

        <div className="divide-y divide-zinc-200 dark:divide-zinc-900">
          {experiences.map((exp, index) => (
            <Reveal key={exp.title} delay={index * 0.05} className="py-6 first:pt-0">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-medium">
                  {exp.title}{" "}
                  <span className="text-zinc-500 dark:text-zinc-400">· {exp.company}</span>
                </h3>
                <span className="text-sm tabular-nums text-zinc-500 dark:text-zinc-400">
                  {exp.period}
                </span>
              </div>
              <p className="mt-2 leading-relaxed text-zinc-600 dark:text-zinc-400">
                {exp.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
