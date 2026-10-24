import { motion } from "framer-motion";
import { Award, ArrowUpRight, GraduationCap, Users } from "lucide-react";
import Reveal from "./Reveal";

const honours = [
  { title: "Best Graduating Computer Science Student", detail: "University of Cape Coast" },
  { title: "Dean's Award for Academic Excellence", detail: "2023/2024 and 2024/2025" },
  {
    title: "AWS Certified Cloud Practitioner",
    detail: "Verified on Credly",
    url: "https://www.credly.com/badges/5226e4e4-3eeb-4ed7-bb46-ae089d1e5af5/public_url",
  },
];

const teaching = [
  {
    title: "Graduate Teaching Assistant",
    detail: "Tutorials for 350+ students in Discrete Mathematics, Algorithms and Numerical Analysis",
  },
  {
    title: "Lead, Front-End Web Development Club",
    detail: "Computer Science and IT Students' Association — ran free weekend tutorials and mentored peers",
  },
  {
    title: "Student Peer Academic Tutor",
    detail: "Volunteered weekends teaching juniors Algorithms, Calculus and Programming Techniques",
  },
];

const listItem = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const Education = () => {
  return (
    <section id="education" className="border-t border-line py-24">
      <div className="container-page">
        <Reveal>
          <h2 className="section-title">Education &amp; honours</h2>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <Reveal className="relative flex flex-col overflow-hidden rounded-2xl bg-ink p-7 text-paper sm:p-9">
            <GraduationCap aria-hidden className="absolute -right-6 -top-6 h-40 w-40 text-paper/[0.06]" />
            <p className="font-mono text-xs text-paper/60">Aug 2025 · Cape Coast, Ghana</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              BSc Computer Science
            </h3>
            <p className="mt-1 text-paper/70">University of Cape Coast</p>

            <div className="mt-10 flex flex-wrap items-end gap-x-10 gap-y-6">
              <div>
                <p className="text-5xl font-semibold tracking-tight">
                  3.63<span className="text-2xl text-paper/50"> / 4.0</span>
                </p>
                <p className="mt-1 text-sm text-paper/60">Cumulative GPA</p>
              </div>
              <div>
                <p className="inline-flex rounded-md bg-accent px-3 py-1.5 text-sm font-semibold text-white">
                  First-Class Honours
                </p>
                <p className="mt-2 text-sm text-paper/60">Highest degree classification</p>
              </div>
            </div>

            <div className="mt-10 border-t border-paper/15 pt-6 lg:mt-auto">
              <p className="font-mono text-xs text-paper/60">Subjects I now teach</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {["Discrete Mathematics", "Algorithms", "Numerical Analysis"].map((subject) => (
                  <li key={subject} className="rounded-md border border-paper/20 px-3 py-1.5 text-sm">
                    {subject}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <div className="space-y-6">
            <Reveal className="rounded-2xl border border-line bg-surface p-6">
              <h3 className="flex items-center gap-2 text-sm font-semibold">
                <Award className="h-4 w-4 text-accent" /> Awards and certification
              </h3>
              <motion.ul
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ staggerChildren: 0.1 }}
                className="mt-4 divide-y divide-line"
              >
                {honours.map((item) => (
                  <motion.li key={item.title} variants={listItem} className="py-3 first:pt-0 last:pb-0">
                    {item.url ? (
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1 font-medium hover:text-accent">
                        {item.title}
                        <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    ) : (
                      <p className="font-medium">{item.title}</p>
                    )}
                    <p className="text-sm text-muted">{item.detail}</p>
                  </motion.li>
                ))}
              </motion.ul>
            </Reveal>

            <Reveal delay={0.08} className="rounded-2xl border border-line bg-surface p-6">
              <h3 className="flex items-center gap-2 text-sm font-semibold">
                <Users className="h-4 w-4 text-accent" /> Teaching and leadership
              </h3>
              <motion.ul
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ staggerChildren: 0.1 }}
                className="mt-4 divide-y divide-line"
              >
                {teaching.map((item) => (
                  <motion.li key={item.title} variants={listItem} className="py-3 first:pt-0 last:pb-0">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm leading-relaxed text-muted">{item.detail}</p>
                  </motion.li>
                ))}
              </motion.ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
