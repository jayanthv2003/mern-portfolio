import { motion } from 'framer-motion';

const SKILL_CATEGORIES = [
  {
    category: 'Languages',
    skills: [
      { name: 'JavaScript (ES6+)', level: 90 },
      { name: 'Python', level: 88 },
      { name: 'Java', level: 82 },
      { name: 'SQL', level: 85 },
      { name: 'HTML5 & CSS3', level: 92 },
    ],
  },
  {
    category: 'Frameworks & Libraries',
    skills: [
      { name: 'React.js', level: 88 },
      { name: 'Flask', level: 84 },
      { name: 'Node.js & Express', level: 85 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Bootstrap', level: 85 },
    ],
  },
  {
    category: 'Databases & Web APIs',
    skills: [
      { name: 'MySQL', level: 85 },
      { name: 'SQLite3', level: 82 },
      { name: 'MongoDB', level: 80 },
      { name: 'RESTful APIs & JSON', level: 90 },
      { name: 'Fetch API & Axios', level: 88 },
    ],
  },
  {
    category: 'Developer Tools & Testing',
    skills: [
      { name: 'Git & GitHub', level: 88 },
      { name: 'VS Code & Postman', level: 90 },
      { name: 'Linux CLI', level: 82 },
      { name: 'Pytest', level: 78 },
      { name: 'Jupyter Notebooks', level: 80 },
    ],
  },
];

const CORE_CONCEPTS = [
  'Data Structures & Algorithms (DSA)',
  'Full-Stack Web Architecture',
  'Object-Oriented Programming (OOP)',
  'Database Management Systems (DBMS)',
  'Web Security (XSS, SQLi Protection)',
  'Software Engineering Principles',
];

const SkillBar = ({ name, level, delay }) => (
  <div>
    <div className="flex justify-between text-sm mb-1.5">
      <span className="font-medium">{name}</span>
      <span className="font-mono text-ink/60 dark:text-mist/60">{level}%</span>
    </div>
    <div className="h-2 rounded-full bg-border-light dark:bg-border-dark overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, delay, ease: 'easeOut' }}
        className="h-full rounded-full bg-gradient-to-r from-circuit to-signal"
      />
    </div>
  </div>
);

const Skills = () => {
  return (
    <section id="skills" className="container-px py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <p className="section-label mb-2">{'// Skills'}</p>
        <h2 className="section-heading">Technical Proficiency</h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-x-12 gap-y-12 mt-10">
        {SKILL_CATEGORIES.map((group) => (
          <div key={group.category}>
            <h3 className="font-mono-label font-mono text-sm text-circuit mb-5">
              {group.category}
            </h3>
            <div className="space-y-5">
              {group.skills.map((skill, i) => (
                <SkillBar key={skill.name} {...skill} delay={i * 0.08} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Core CS Concepts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="mt-16 pt-10 border-t border-border-light dark:border-border-dark"
      >
        <h3 className="font-mono-label font-mono text-sm text-circuit mb-5">
          Core Computer Science Concepts
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {CORE_CONCEPTS.map((concept) => (
            <div
              key={concept}
              className="card p-3.5 text-center text-xs sm:text-sm font-medium text-ink/80 dark:text-mist/80 border border-border-light dark:border-border-dark hover:border-signal transition-colors"
            >
              {concept}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
