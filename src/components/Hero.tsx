import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import enochImage from "/enoch_image.jpg";

const Hero = () => {
  return (
    <section className="container-page pb-20 pt-36 sm:pb-28 sm:pt-44">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex items-center gap-4">
          <img
            src={enochImage}
            alt="Enoch Hodo"
            className="h-14 w-14 rounded-full object-cover ring-1 ring-zinc-200 dark:ring-zinc-800"
          />
          <div>
            <p className="font-medium">Enoch Hodo</p>
            <p className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for new projects
            </p>
          </div>
        </div>

        <h1 className="mt-10 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
          Frontend developer building fast, polished websites for brands.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          I turn designs into responsive, high-performance sites with React and
          Next.js — from agency marketing sites to company websites that win
          clients.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a href="#work" className="btn-primary">
            View my work <ArrowDown className="h-4 w-4" />
          </a>
          <a href="mailto:enochhodo1@gmail.com" className="btn-secondary">
            Get in touch <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
