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
        charcoal: '#0F1115',
        graphite: '#1A1D24',
        mist: '#E6E8EC',
        neon: '#FFFFFF',
        accent: '#7F8EA3',
      },
      fontFamily: {
        headline: ['Outfit', 'Sora', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 7s ease-in-out infinite',
        'shimmer': 'shimmer 9s ease-in-out infinite',
        'fog': 'fog 20s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { transform: 'scale(0.9)', opacity: '0.8' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'fog': {
          '0%, 100%': { transform: 'translateX(0) translateY(0)' },
          '33%': { transform: 'translateX(30px) translateY(-30px)' },
          '66%': { transform: 'translateX(-20px) translateY(20px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
export default config
