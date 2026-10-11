import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

const projects = [
  {
    title: "Ornama Studios",
    category: "Agency website",
    description:
      "Website for a Ghana-based product, digital and content marketing agency — service pages, case studies, insights, client testimonials and a project inquiry flow.",
    image: "/projects/ornama.jpg",
    url: "https://ornama-v2.vercel.app/",
    domain: "ornama-v2.vercel.app",
    tags: ["Next.js", "React", "Tailwind CSS", "Responsive"],
  },
  {
    title: "ARXYN Development",
    category: "Company website",
    description:
      "Website for an architecture, interior design and project management firm — a cinematic hero, services showcase, project gallery and contact touchpoints.",
    image: "/projects/arxyn.jpg",
    url: "https://arxyndevelopment.com/",
    domain: "arxyndevelopment.com",
    tags: ["React", "Tailwind CSS", "Animations", "Responsive"],
  },
];

const Projects = () => {
  return (
    <section id="work" className="border-t border-zinc-200 py-24 dark:border-zinc-900">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow">Selected work</p>
          <h2 className="section-title">Recent client projects</h2>
        </Reveal>

        <div className="mt-14 space-y-20">
          {projects.map((project) => (
            <Reveal key={project.title}>
              <article>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 shadow-sm transition hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="flex items-center gap-3 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
                    <div className="flex gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                      <span className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                      <span className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                    </div>
                    <span className="mx-auto truncate rounded-md bg-white px-3 py-0.5 text-xs text-zinc-500 dark:bg-zinc-950 dark:text-zinc-400">
                      {project.domain}
                    </span>
                    <span className="w-[42px]" />
                  </div>
                  <div className="overflow-hidden">
                    <img
                      src={project.image}
                      alt={`${project.title} homepage`}
                      loading="lazy"
                      className="aspect-[16/10] w-full object-cover object-top transition duration-700 ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                </a>

                <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
                  <div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{project.category}</p>
                    <h3 className="mt-1 text-2xl font-semibold tracking-tight">{project.title}</h3>
                    <p className="mt-3 max-w-2xl leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {project.description}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 dark:border-zinc-800 dark:text-zinc-400"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary justify-self-start"
                  >
                    Visit site <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
