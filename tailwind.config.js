/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        matcha: {
          DEFAULT: '#8A9A5B',
          light: '#B9C68D',
          dark: '#5D6B3C',
        },
        wood: {
          DEFAULT: '#9C7C5B',
          light: '#C4A47D',
          dark: '#6A533C',
        },
        clay: {
          DEFAULT: '#B97A57',
          light: '#D5A98B',
        },
        stone: {
          DEFAULT: '#9A9A9A',
          light: '#F0EDE5',
          dark: '#636363',
        },
        rice: {
          DEFAULT: '#F5F2E9',
          dark: '#EAE5D6',
        },
        ink: '#2D2D2D',
      },
      fontFamily: {
        sans: ['Source Sans 3', 'system-ui', 'sans-serif'],
        serif: ['Noto Serif', 'serif'],
      },
      borderRadius: {
        'sm': '2px',
      },
      boxShadow: {
        'wabi': '0 2px 10px rgba(0,0,0,0.05)',
        'wabi-hover': '0 15px 30px rgba(0,0,0,0.1)',
        'wabi-inner': 'inset 0 2px 4px rgba(0,0,0,0.06)',
      },
      animation: {
        'wabi-spin': 'wabi-spin 1s cubic-bezier(0.55, 0.055, 0.675, 0.19) infinite',
        'fade-in': 'fadeIn 1s cubic-bezier(0.39, 0.575, 0.565, 1)',
        'slide-in-left': 'slideInLeft 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'slide-in-right': 'slideInRight 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'scale-in': 'scaleIn 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'wabi-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'fadeIn': {
          'from': { opacity: '0', transform: 'translateY(15px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'slideInLeft': {
          'from': { transform: 'translateX(-30px)', opacity: '0' },
          'to': { transform: 'translateX(0)', opacity: '1' },
        },
        'slideInRight': {
          'from': { transform: 'translateX(30px)', opacity: '0' },
          'to': { transform: 'translateX(0)', opacity: '1' },
        },
        'scaleIn': {
          'from': { transform: 'scale(0.9)', opacity: '0' },
          'to': { transform: 'scale(1)', opacity: '1' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      spacing: {
        'xs': '0.382rem',
        'sm': '0.618rem',
        'md': '1rem',
        'lg': '1.618rem',
        'xl': '2.618rem',
        'xxl': '4.236rem',
      },
      transitionTimingFunction: {
        'wabi-in': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'wabi-out': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'grain': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E\")",
      },
      textShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.1)',
        'md': '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
      lineHeight: {
        'relaxed': '1.75',
        'loose': '2',
      },
      letterSpacing: {
        'widest': '0.15em',
      },
      gridTemplateColumns: {
        'auto-fill-card': 'repeat(auto-fill, minmax(280px, 1fr))',
      },
      aspectRatio: {
        'product': '3 / 4',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-sm': {
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
        },
        '.text-shadow': {
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        '.text-shadow-lg': {
          textShadow: '0 4px 8px rgba(0, 0, 0, 0.12)',
        },
        '.bg-wabi-texture': {
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E\")",
        },
        '.line-clamp-1': {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '1',
        },
        '.line-clamp-2': {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '2',
        },
        '.line-clamp-3': {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '3',
        },
      };
      addUtilities(newUtilities);
    },
  ],
} 