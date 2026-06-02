/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'breath-glow': 'breathGlow 2.2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        breathGlow: {
          '0%, 100%': {
            opacity: '0.55',
            filter: 'blur(0.6px)',
            boxShadow:
              '0 0 0 1px rgba(255,255,255,0.10), 0 0 18px rgba(255,255,255,0.10), 0 0 34px rgba(255,255,255,0.08)',
          },
          '50%': {
            opacity: '1',
            filter: 'blur(0.2px)',
            boxShadow:
              '0 0 0 1px rgba(255,255,255,0.18), 0 0 26px rgba(255,255,255,0.16), 0 0 50px rgba(255,255,255,0.12)',
          },
        },
      },
    },
  },
  plugins: [],
}
