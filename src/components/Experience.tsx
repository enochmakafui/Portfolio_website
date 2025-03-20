import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';

const experiences = [
  {
    title: 'Frontend Developer',
    company: 'Plugnom',
    period: '2023 - Present',
    description: 'Led frontend development for multiple client projects, implementing responsive designs and optimizing performance.'
  },
  {
    title: 'Frontend Development Club Lead',
    company: 'University of Cape Coast',
    period: '2022 - 2023',
    description: 'Organized workshops and mentored junior developers in modern web development practices.'
  },
  {
    title: 'Freelance Web Developer',
    company: 'Self-employed',
    period: '2021 - 2022',
    description: 'Developed custom websites and web applications for various clients using modern technologies.'
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 dark:text-white">Experience</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 dark:bg-gray-700"></div>
          
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative mb-12 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:ml-auto'}`}
            >
              <div className={`md:w-1/2 bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg ${index % 2 === 0 ? 'md:ml-auto' : ''}`}>
                <div className="flex items-center mb-4 justify-between">
                  <h3 className="text-xl font-semibold dark:text-white">{exp.title}</h3>
                  <Briefcase className="w-5 h-5 text-blue-500" />
                </div>
                <div className="flex items-center mb-4 text-gray-600 dark:text-gray-300">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{exp.period}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;