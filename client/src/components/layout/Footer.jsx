import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';

const Footer = () => {
  const year = new Date().getFullYear();
  const githubUrl = import.meta.env.VITE_GITHUB_URL || 'https://github.com/jayanthv2003';
  const linkedinUrl = import.meta.env.VITE_LINKEDIN_URL || 'https://linkedin.com/in/jayanthv2003';
  const leetcodeUrl = import.meta.env.VITE_LEETCODE_URL || 'https://leetcode.com/u/JayanthDev';
  const email = import.meta.env.VITE_EMAIL || 'jayanthv2003@gmail.com';

  return (
    <footer className="border-t border-border-light dark:border-border-dark">
      <div className="container-px py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-ink/60 dark:text-mist/60">
          © {year} Jayanth V. Built with the MERN stack.
        </p>
        <div className="flex items-center gap-4">
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hover:text-signal transition-colors p-1.5"
          >
            <FiGithub size={18} />
          </a>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="hover:text-signal transition-colors p-1.5"
          >
            <FiLinkedin size={18} />
          </a>
          <a
            href={leetcodeUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="LeetCode"
            className="hover:text-signal transition-colors p-1.5"
          >
            <SiLeetcode size={18} />
          </a>
          <a
            href={`mailto:${email}`}
            aria-label="Email"
            className="hover:text-signal transition-colors p-1.5"
          >
            <FiMail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
