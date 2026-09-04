import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiDownload } from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';
import useTypewriter from '../../hooks/useTypewriter.js';

const ROLES = [
  'Full-Stack Developer',
  'MCA Student',
  'React & JavaScript Engineer',
  'Python & Flask Developer',
  'Problem Solver (DSA)',
];

const socialLinks = [
  { icon: FiGithub, href: import.meta.env.VITE_GITHUB_URL || 'https://github.com/jayanthv2003', label: 'GitHub' },
  { icon: FiLinkedin, href: import.meta.env.VITE_LINKEDIN_URL || 'https://linkedin.com/in/jayanthv2003', label: 'LinkedIn' },
  { icon: SiLeetcode, href: import.meta.env.VITE_LEETCODE_URL || 'https://leetcode.com/u/JayanthDev', label: 'LeetCode' },
  { icon: FiMail, href: `mailto:${import.meta.env.VITE_EMAIL || 'jayanthv2003@gmail.com'}`, label: 'Email' },
];

const Hero = () => {
  const typedRole = useTypewriter(ROLES);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center container-px pt-24 pb-16"
    >
      <div className="max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="section-label mb-4"
        >
          {"// Hello, I'm"}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl sm:text-6xl font-semibold leading-tight mb-6"
        >
          Jayanth V
        </motion.h1>

        {/* Signature element: rotating role typed out like a terminal command */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="font-mono text-lg sm:text-2xl text-ink/80 dark:text-mist/80 mb-8 h-8"
        >
          <span className="text-circuit">$</span> {typedRole}
          <span className="inline-block w-[2px] h-5 sm:h-6 bg-signal ml-1 align-middle animate-blink" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-base sm:text-lg text-ink/70 dark:text-mist/70 max-w-xl mb-10 leading-relaxed"
        >
          Motivated Full-Stack Developer and MCA student passionate about designing clean,
          responsive user interfaces, building scalable backend services, optimizing database
          queries, and solving complex algorithmic challenges.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap items-center gap-4"
        >
          <a href="/resume.pdf" download="Jayanth_V_Resume.pdf" className="btn-primary">
            <FiDownload /> Download Resume
          </a>
          <a href="#contact" className="btn-secondary">
            Get in touch
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex items-center gap-5 mt-10"
        >
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              aria-label={label}
              className="p-3 rounded-md border border-border-light dark:border-border-dark
                hover:border-signal hover:text-signal transition-colors duration-200"
            >
              <Icon size={18} />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
