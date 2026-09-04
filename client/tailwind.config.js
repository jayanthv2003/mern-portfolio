/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Dark mode surface + text
        midnight: '#0B1120',
        surface: '#111A2E',
        mist: '#E7EAF2',
        // Light mode surface + text
        paper: '#F7F5F0',
        ink: '#15171C',
        // Shared borders
        'border-dark': '#1E293B',
        'border-light': '#E2E0D8',
        // Accents - used sparingly (signature: amber for primary action/typing cursor,
        // circuit teal for skill bars / secondary highlights)
        signal: {
          DEFAULT: '#F2A65A',
          soft: '#F7C08A',
        },
        circuit: {
          DEFAULT: '#2DD4BF',
          soft: '#5EEAD4',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(242, 166, 90, 0.35)',
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: 1 },
          '50%, 100%': { opacity: 0 },
        },
      },
      animation: {
        blink: 'blink 1s step-start infinite',
      },
    },
  },
  plugins: [],
};
