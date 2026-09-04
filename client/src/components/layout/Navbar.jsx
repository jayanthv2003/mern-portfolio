import { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle.jsx';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = () => setIsOpen(false);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'bg-paper/90 dark:bg-midnight/90 backdrop-blur border-b border-border-light dark:border-border-dark'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-px flex items-center justify-between h-16">
        <a href="#hero" className="font-mono text-signal font-medium tracking-tight">
          &lt;Jayanth V/&gt;
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 font-mono text-sm">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="hover:text-signal transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            aria-label="Toggle menu"
            onClick={() => setIsOpen((prev) => !prev)}
            className="p-2"
          >
            {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col gap-1 px-6 pb-6 font-mono text-sm bg-paper dark:bg-midnight border-b border-border-light dark:border-border-dark">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={handleLinkClick}
                className="block py-3 hover:text-signal transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};

export default Navbar;
