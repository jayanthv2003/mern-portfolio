import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiBookOpen, FiAward, FiTarget, FiHeart, FiCode, FiExternalLink } from 'react-icons/fi';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const EDUCATION = [
  {
    degree: 'Master of Computer Applications (MCA)',
    school: 'Davangere University Shivagangothri — Davangere, Karnataka',
    period: '2024 – 2026',
    details: 'Coursework: Data Structures & Algorithms, DBMS, Web Technologies, Software Engineering, Python Programming',
  },
  {
    degree: 'Bachelor of Science (BSc)',
    school: 'GFGC and PG Center — Chintamani, Karnataka',
    period: '2021 – 2024',
    details: 'Academic Score: 8.2 CGPA | Coursework: Computer Science, Web Development, DBMS, Mathematics',
  },
];

const ACHIEVEMENTS = [
  {
    title: 'Full-Stack Web Development',
    description: 'Hands-on experience engineering end-to-end, relational database-backed web applications.',
  },
  {
    title: 'Problem Solving & DSA',
    description: 'Active learner practicing Data Structures and Algorithms on LeetCode.',
    link: 'https://leetcode.com/u/JayanthDev',
    linkText: 'leetcode.com/u/JayanthDev',
  },
];

const INTERESTS = [
  'Logical Puzzles & Competitive Coding',
  'Exploring Generative AI & Automation',
  'Playing Chess',
  'Bike Riding',
];

const About = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="about" className="container-px py-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        transition={{ duration: 0.5 }}
      >
        <p className="section-label mb-2">{'// About'}</p>
        <h2 className="section-heading">Who I am</h2>
      </motion.div>

      <div className="grid md:grid-cols-[280px_1fr] gap-12 mt-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="flex md:justify-start justify-center"
        >
          {!imgError ? (
            <img
              src="/profile.jpg"
              alt="Portrait of Jayanth V"
              onError={() => setImgError(true)}
              className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-lg border border-border-light dark:border-border-dark shadow-sm"
              loading="lazy"
            />
          ) : (
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-lg border border-border-light dark:border-border-dark bg-paper-muted dark:bg-midnight-muted flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-signal/10 text-signal flex items-center justify-center text-2xl font-display font-semibold mb-3">
                JV
              </div>
              <p className="font-display font-medium text-sm">Jayanth V</p>
              <p className="font-mono text-xs text-ink/60 dark:text-mist/60 mt-1">Full-Stack Dev</p>
            </div>
          )}
        </motion.div>

        <div className="space-y-10">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-ink/80 dark:text-mist/80 leading-relaxed"
          >
            Motivated Full-Stack Developer and MCA student with a strong foundation in frontend &amp;
            backend web development, Software Engineering, Java, Python, JavaScript, and SQL.
            Experienced in engineering full-stack web applications using JavaScript, Tailwind CSS,
            PHP, Flask, and MySQL/SQLite3, and building RESTful APIs. Passionate about designing clean,
            responsive user interfaces, scalable backend services, optimizing database queries, and
            solving complex algorithmic challenges.
          </motion.p>

          {/* Education */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="flex items-center gap-2 font-display font-semibold text-lg mb-3">
              <FiBookOpen className="text-signal" /> Education
            </h3>
            <ul className="space-y-4">
              {EDUCATION.map((item) => (
                <li
                  key={item.degree}
                  className="border-b border-border-light dark:border-border-dark pb-3"
                >
                  <div className="flex flex-wrap justify-between items-baseline gap-2">
                    <span className="font-medium text-ink dark:text-mist">{item.degree}</span>
                    <span className="font-mono text-xs text-ink/60 dark:text-mist/60">{item.period}</span>
                  </div>
                  <p className="text-sm text-ink/75 dark:text-mist/75 mt-0.5">{item.school}</p>
                  {item.details && (
                    <p className="text-xs font-mono text-ink/60 dark:text-mist/60 mt-1">{item.details}</p>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Achievements & DSA */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <h3 className="flex items-center gap-2 font-display font-semibold text-lg mb-3">
              <FiAward className="text-signal" /> Certifications &amp; Achievements
            </h3>
            <ul className="space-y-3">
              {ACHIEVEMENTS.map((item) => (
                <li
                  key={item.title}
                  className="border-b border-border-light dark:border-border-dark pb-3 text-sm"
                >
                  <span className="font-medium text-ink dark:text-mist">{item.title}: </span>
                  <span className="text-ink/80 dark:text-mist/80">{item.description}</span>
                  {item.link && (
                    <div className="mt-1">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-xs text-signal hover:underline"
                      >
                        {item.linkText} <FiExternalLink size={12} />
                      </a>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Career Objective */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="flex items-center gap-2 font-display font-semibold text-lg mb-3">
              <FiTarget className="text-signal" /> Career Objective
            </h3>
            <p className="text-ink/80 dark:text-mist/80 leading-relaxed text-sm">
              Seeking an impactful full-stack software development role where I can build scalable,
              user-centric applications, design high-performance backends, and collaborate effectively
              in a modern engineering environment.
            </p>
          </motion.div>

          {/* Interests & Activities */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <h3 className="flex items-center gap-2 font-display font-semibold text-lg mb-3">
              <FiHeart className="text-signal" /> Interests &amp; Activities
            </h3>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map((interest) => (
                <span
                  key={interest}
                  className="text-xs font-mono px-3 py-1.5 rounded-full border border-border-light dark:border-border-dark bg-paper-muted dark:bg-midnight-muted text-ink/80 dark:text-mist/80"
                >
                  {interest}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
