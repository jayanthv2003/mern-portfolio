import { FiSun, FiMoon } from 'react-icons/fi';
import useTheme from '../../hooks/useTheme.js';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="p-2 rounded-md border border-border-light dark:border-border-dark
        hover:border-signal hover:text-signal transition-colors duration-200"
    >
      {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
    </button>
  );
};

export default ThemeToggle;
