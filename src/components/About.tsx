import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Palette, Brain } from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 dark:text-white">About Me</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
          >
            <Code2 className="w-12 h-12 mx-auto mb-4 text-blue-500" />
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Frontend Development</h3>
            <p className="text-gray-600 dark:text-gray-300">Expertise in React, Tailwind CSS, and modern JavaScript</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
          >
            <Palette className="w-12 h-12 mx-auto mb-4 text-blue-500" />
            <h3 className="text-xl font-semibold mb-2 dark:text-white">UI/UX Design</h3>
            <p className="text-gray-600 dark:text-gray-300">Creating intuitive and beautiful user experiences</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
          >
            <Brain className="w-12 h-12 mx-auto mb-4 text-blue-500" />
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Problem Solving</h3>
            <p className="text-gray-600 dark:text-gray-300">Turning complex problems into simple solutions</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            With 2+ years of experience, including work at Plugnom and active involvement in the Frontend Web Development Club
            at the University of Cape Coast, I've developed a strong foundation in creating responsive and performant web applications.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;