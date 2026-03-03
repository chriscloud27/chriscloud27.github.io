/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: '#0B1F3A',
          mid: '#0D2447',
        },
        cyan: {
          DEFAULT: '#00E5FF',
          dim: '#00b8cc',
          pale: '#e4fbff',
        },
        gray: {
          100: '#f4f6f8',
          300: '#c8d4e3',
          500: '#8a9bb0',
          700: '#4a5a72',
        },
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
