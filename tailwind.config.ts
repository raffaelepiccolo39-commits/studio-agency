import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0a',
        surface: '#111111',
        border: '#1e1e1e',
        'text-primary': '#f0ede6',
        muted: '#555555',
        accent: '#c8f55a',
        'accent-red': '#ff4d1c',
      },
      fontFamily: {
        display: ['var(--font-bebas)', 'sans-serif'],
        serif: ['var(--font-dm-serif)', 'serif'],
        sans: ['var(--font-syne)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
