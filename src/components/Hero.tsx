import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import enochImage from "/enoch_image.jpg";
import Counter from "./Counter";

const headline = ["I", "build", "websites", "and", "web", "apps", "that", "feel", "fast,", "even", "on", "a"];

const facts = [
  { value: 3.63, decimals: 2, suffix: "/4.0", label: "GPA, First-Class Honours", quiet: true },
  { value: 350, suffix: "+", label: "students taught as a TA" },
  { value: 2, suffix: "×", label: "Dean's Award for Excellence" },
  { value: 5, label: "production sites and apps" },
];

const word = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const Hero = () => {
  return (
    <section className="container-page pb-20 pt-32 sm:pb-28 sm:pt-40">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap items-center justify-between gap-3"
      >
        <p className="label">Frontend developer · Python · BSc Computer Science, UCC</p>
        <p className="label flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Open to roles and graduate study
        </p>
      </motion.div>

      <motion.h1
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.045, delayChildren: 0.1 }}
        className="mt-8 max-w-5xl text-[clamp(2.4rem,7vw,5.25rem)] font-semibold leading-[1.04] tracking-[-0.04em]"
      >
        {headline.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span variants={word} className="inline-block">
              {w}&nbsp;
            </motion.span>
          </span>
        ))}
        <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span variants={word} className="relative inline-block whitespace-nowrap">
            budget phone.
            <svg
              aria-hidden
              viewBox="0 0 200 14"
              preserveAspectRatio="none"
              className="absolute -bottom-1 left-0 h-3 w-[92%] text-accent sm:h-4"
            >
              <motion.path
                d="M3 9 C 30 3, 52 13, 82 7 S 132 2, 160 8 S 188 10, 197 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, delay: 1, ease: "easeInOut" }}
              />
            </svg>
          </motion.span>
        </span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
        className="mt-12 grid gap-8 border-t border-line pt-8 md:grid-cols-[auto_1fr_auto] md:items-start"
      >
        <img
          src={enochImage}
          alt="Enoch Hodo"
          className="h-20 w-20 rounded-xl object-cover grayscale transition duration-500 hover:grayscale-0"
        />
        <p className="max-w-xl text-lg leading-relaxed text-muted">
          Hi, I'm Enoch — a frontend developer and First-Class Computer Science
          graduate of the University of Cape Coast, where I now teach as a
          Graduate Teaching Assistant. I build agency and company websites,
          and products like a tutoring marketplace and a gas delivery app.
        </p>
        <div className="flex flex-wrap gap-3">
          <a href="#work" className="btn-primary">
            See the work <ArrowDown className="h-4 w-4" />
          </a>
          <a href="/Enoch_Hodo_CV.pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary">
            Download CV <Download className="h-4 w-4" />
          </a>
        </div>
      </motion.div>

      <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-4">
        {facts.map((fact, i) => (
          <motion.div
            key={fact.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 + i * 0.08 }}
            className="bg-paper p-5"
          >
            <dt className="sr-only">{fact.label}</dt>
            <dd className="text-3xl font-semibold tracking-tight sm:text-4xl">
              <Counter to={fact.value} decimals={fact.decimals} />
              <span className={fact.quiet ? "text-lg text-muted sm:text-xl" : "text-accent"}>{fact.suffix}</span>
            </dd>
            <dd className="mt-1 text-sm text-muted">{fact.label}</dd>
          </motion.div>
        ))}
      </dl>
    </section>
  );
};

export default Hero;
