/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        neonBlue: '#00f3ff',
        neonPurple: '#bc13fe',
      },
      fontFamily: {
        orbitron: ['"Orbitron"', 'system-ui', 'sans-serif'],
        rajdhani: ['"Rajdhani"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};