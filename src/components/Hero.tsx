import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import enochImage from "/enoch_image.jpg";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 to-black">
      <div className="absolute inset-0 w-full h-full bg-grid-pattern opacity-10"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center z-10 px-4"
      >
        <div className="mb-8 ">
          <img
            src={enochImage} // Replace with your actual image URL
            alt="Enoch Hodo"
            className="w-48 h-48  rounded-full mx-auto border-4 border-blue-500 shadow-xl"
          />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          <Typewriter
            options={{
              strings: [
                "Hi, I'm Enoch Hodo",
                "Frontend Developer 🚀",
                "Computer Science Student",
                "Crafting Engaging Web Experiences",
                "Passionate About UI/UX & Performance",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </h1>
        <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-4xl mx-auto">
          Hey there! I'm Enoch, a passionate Frontend Developer dedicated to
          crafting sleek, high-performance web experiences.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-medium transition-colors"
          onClick={() =>
            document
              .getElementById("portfolio")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          View My Work
        </motion.button>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <ChevronDown className="w-8 h-8 text-white opacity-50" />
      </motion.div>
    </div>
  );
};

export default Hero;
