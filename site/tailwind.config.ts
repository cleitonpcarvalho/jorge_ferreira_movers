import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#063A1F',
        accent: '#D91A2A',
        dark: '#212529',
        light: '#F0F3F5',
      },
      fontFamily: {
        heading: ['Funnel Display', 'sans-serif'],
        body: ['Be Vietnam Pro', 'sans-serif'],
      },
      borderRadius: {
        card: '12px',
        btn: '50px',
      },
      boxShadow: {
        card: 'rgba(68, 68, 68, 0.11) 0px 0px 0px 1px',
      },
      transitionTimingFunction: {
        smooth: 'ease-in-out',
      },
      transitionDuration: {
        default: '300ms',
      },
    },
  },
  plugins: [],
}

export default config
