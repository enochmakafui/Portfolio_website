import { motion } from "framer-motion";
import { ArrowUpRight, Brain, Fingerprint, SearchCode, ShieldAlert } from "lucide-react";
import Reveal from "./Reveal";

const interests = [
  {
    icon: ShieldAlert,
    title: "Cybersecurity",
    detail: "Social engineering and fraud detection on mobile platforms, where most people in Ghana bank and pay.",
  },
  {
    icon: SearchCode,
    title: "Digital forensics",
    detail: "Reconstructing what happened after an attack, from device and platform evidence.",
  },
  {
    icon: Brain,
    title: "Applied machine learning",
    detail: "Models that flag suspicious behaviour early, without blocking honest users.",
  },
  {
    icon: Fingerprint,
    title: "Software engineering",
    detail: "Building security into products from the start instead of adding it after launch.",
  },
];

const card = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Research = () => {
  return (
    <section id="research" className="border-t border-line py-24">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <h2 className="section-title">Research interests</h2>
          <p className="mt-6 text-lg leading-relaxed">
            I want to make the digital systems people rely on every day harder to
            abuse — especially mobile money.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            Building MoMo payment flows as a developer showed me how much trust
            people put in these apps, and how often that trust is the target of
            social engineering and fraud. In graduate study I want to research how
            fraud happens on mobile platforms and build machine-learning and
            software tools that catch it before users lose money.
          </p>

          <div className="mt-8 rounded-xl border border-line bg-surface p-5">
            <p className="label">Related work</p>
            <a
              href="https://github.com/Asamoah4284/Hacker"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-2 inline-flex items-center gap-1 font-semibold hover:text-accent"
            >
              Fraud Reduction Platform
              <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              Hackathon, team lead of five. We used browser fingerprinting to give
              each user a persistent identifier and block serial sign-ups and
              self-referrals in "refer and earn" schemes. React, Node.js, MongoDB.
            </p>
          </div>
        </Reveal>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.1 }}
          className="grid content-start gap-4 sm:grid-cols-2"
        >
          {interests.map(({ icon: Icon, title, detail }) => (
            <motion.li
              key={title}
              variants={card}
              whileHover={{ y: -4 }}
              className="group rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-accent"
            >
              <Icon className="h-6 w-6 text-accent transition-transform duration-300 group-hover:scale-110" />
              <h3 className="mt-5 font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{detail}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default Research;
