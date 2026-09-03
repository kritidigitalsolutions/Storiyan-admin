/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        storiyan: {
          bg: '#090B10',
          card: '#10141E',
          surface: '#161B28',
          border: '#232C3E',
          gold: '#E5A93C',
          goldLight: '#F5C467',
          goldDark: '#B37D1E',
          goldGlow: '#E5A93C33',
          red: '#E50914',
          crimson: '#D21A24',
          accent: '#FF4D4D',
          muted: '#8E9AA8',
          emerald: '#10B981',
          indigo: '#6366F1',
          cyan: '#06B6D4'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-gold': '0 0 25px -5px rgba(229, 169, 60, 0.3)',
        'glow-red': '0 0 25px -5px rgba(229, 9, 20, 0.3)',
        'card-glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
