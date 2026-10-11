import Reveal from "./Reveal";

const skills = [
  {
    name: "Frontend",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML & CSS", "Tailwind CSS", "Framer Motion"],
  },
  { name: "Backend", items: ["Node.js", "Express", "MongoDB"] },
  { name: "Workflow", items: ["Responsive design", "UI/UX", "Git", "Vercel"] },
];

const Skills = () => {
  return (
    <section id="skills" className="border-t border-zinc-200 py-24 dark:border-zinc-900">
      <div className="container-page grid gap-12 md:grid-cols-[1fr_2fr]">
        <Reveal>
          <p className="eyebrow">Toolkit</p>
          <h2 className="section-title">What I work with</h2>
        </Reveal>

        <div className="space-y-8">
          {skills.map((group, index) => (
            <Reveal key={group.name} delay={index * 0.05}>
              <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{group.name}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="rounded-lg bg-zinc-100 px-3 py-1.5 text-sm dark:bg-zinc-900">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
