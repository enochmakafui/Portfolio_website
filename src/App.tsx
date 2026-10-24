import { useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Craft from "./components/Craft";
import Lab from "./components/Lab";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Research from "./components/Research";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  const [darkMode, setDarkMode] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    try {
      localStorage.setItem("theme", darkMode ? "dark" : "light");
    } catch {
      // storage unavailable; theme just won't persist
    }
  }, [darkMode]);

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen">
      <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
      <main>
        <Hero />
        <Projects />
        <Craft />
        <Lab />
        <Experience />
        <Education />
        <Research />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
    </MotionConfig>
  );
}

export default App;
