import React from 'react';
import { motion } from 'framer-motion';
import { Code, Layout, Database, Figma, Globe } from 'lucide-react';

const skills = [
  {
    name: 'Frontend Development',
    items: [
      { name: 'HTML & CSS', level: 90, icon: Layout },
      { name: 'JavaScript', level: 85, icon: Code },
      { name: 'React', level: 80, icon: Globe },
    ]
  },
  {
    name: 'Backend Development',
    items: [
      { name: 'Node.js', level: 75, icon: Database },
      { name: 'Express', level: 70, icon: Code },
      { name: 'MongoDB', level: 65, icon: Database },
    ]
  },
  {
    name: 'Design & Tools',
    items: [
      { name: 'UI/UX Design', level: 70, icon: Figma },
      { name: 'Git', level: 75, icon: Code },
      { name: 'Responsive Design', level: 85, icon: Layout },
    ]
  }
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 dark:text-white">Skills & Expertise</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            >
              <h3 className="text-xl font-semibold mb-6 text-center dark:text-white">{category.name}</h3>
              <div className="space-y-6">
                {category.items.map((skill, skillIndex) => {
                  const Icon = skill.icon;
                  return (
                    <div key={skillIndex} className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Icon className="w-5 h-5 text-blue-500 mr-2" />
                          <span className="text-sm font-medium dark:text-white">{skill.name}</span>
                        </div>
                        <span className="text-sm text-blue-500">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-blue-500 rounded-full"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;