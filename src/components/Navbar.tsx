import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Download, Moon, Sun } from "lucide-react";

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const links = [
  { id: "work", label: "Work" },
  { id: "lab", label: "Lab" },
  { id: "experience", label: "Experience", wideOnly: true },
  { id: "education", label: "Education", wideOnly: true },
  { id: "research", label: "Research" },
  { id: "contact", label: "Contact", wideOnly: true },
];

const ghanaTime = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Africa/Accra",
  hour: "2-digit",
  minute: "2-digit",
});

const Navbar = ({ darkMode, toggleDarkMode }: NavbarProps) => {
  const [time, setTime] = useState(() => ghanaTime.format(new Date()));
  const [active, setActive] = useState("");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  useEffect(() => {
    const id = setInterval(() => setTime(ghanaTime.format(new Date())), 30_000);
    return () => clearInterval(id);
  }, []);

  // highlight the section that crosses the middle of the screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-50% 0px -50% 0px" }
    );
    document.querySelectorAll("main section[id]").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-paper/80 backdrop-blur-md">
      <nav className="container-page flex h-16 items-center justify-between gap-3">
        <a href="#" className="flex items-baseline gap-3 whitespace-nowrap">
          <span className="font-semibold tracking-tight">Enoch Hodo</span>
          <span className="label hidden xl:inline">Ghana · {time} GMT</span>
        </a>
        <div className="flex items-center gap-0.5">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`relative rounded-md px-2 py-1.5 text-sm transition sm:px-3 ${
                active === link.id ? "text-ink" : "text-muted hover:text-ink"
              } ${link.wideOnly ? "hidden md:inline" : ""}`}
            >
              {link.label}
              {active === link.id && (
                <motion.span
                  layoutId="nav-active"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  className="absolute inset-x-2 -bottom-[13px] h-0.5 bg-accent sm:inset-x-3"
                />
              )}
            </a>
          ))}
          <a
            href="/Enoch_Hodo_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 inline-flex items-center gap-1.5 rounded-md bg-ink px-3 py-1.5 text-sm font-medium text-paper transition hover:bg-accent hover:text-white"
          >
            CV <Download className="h-3.5 w-3.5" />
          </a>
          <button
            onClick={toggleDarkMode}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="ml-1 rounded-md p-2 text-muted transition hover:bg-ink/5 hover:text-ink"
          >
            <motion.span
              key={darkMode ? "sun" : "moon"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="block"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </motion.span>
          </button>
        </div>
      </nav>
      <motion.div style={{ scaleX: progress }} className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent" />
    </header>
  );
};

export default Navbar;
