/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        adminPrimary: '#063A1F',
        adminAccent: '#D91A2A',
        adminSidebar: '#0f2d1a',
        adminGold: '#c9a84c',
      },
    },
  },
  plugins: [],
}
