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
          DEFAULT: '#7EA479',
          light: '#A6C09F',
          dark: '#4D7146',
        },
        wood: {
          DEFAULT: '#A58D7F',
          light: '#C9B5A8',
          dark: '#7D6355',
        },
        clay: {
          DEFAULT: '#C17F5E',
          light: '#E0A98D',
          dark: '#8F5B42',
        },
        stone: {
          DEFAULT: '#9A9A9A',
          light: '#F5F2EB',
          dark: '#636363',
        },
        rice: {
          DEFAULT: '#F9F6F0',
          dark: '#EFE9DD',
        },
        ink: '#2A2522',
        moss: {
          DEFAULT: '#6A7B6F',
          light: '#9DAF9F',
          dark: '#485950',
        },
        terracotta: {
          DEFAULT: '#C56E52',
          light: '#E19579',
          dark: '#9A4F38',
        },
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
        'wabi-3d': '0 10px 30px -10px rgba(0,0,0,0.2), 0 5px 15px -5px rgba(0,0,0,0.1)',
        'wabi-depth': '0 1px 1px rgba(0,0,0,0.08), 0 2px 2px rgba(0,0,0,0.06), 0 4px 4px rgba(0,0,0,0.04), 0 8px 8px rgba(0,0,0,0.02)',
        'wabi-emboss': 'inset 0 2px 4px rgba(255,255,255,0.5), inset 0 -2px 4px rgba(0,0,0,0.05)',
      },
      animation: {
        'wabi-spin': 'wabi-spin 1s cubic-bezier(0.55, 0.055, 0.675, 0.19) infinite',
        'fade-in': 'fadeIn 1s cubic-bezier(0.39, 0.575, 0.565, 1)',
        'slide-in-left': 'slideInLeft 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'slide-in-right': 'slideInRight 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'scale-in': 'scaleIn 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'float': 'float 3s ease-in-out infinite',
        'subtle-bounce': 'subtleBounce 6s ease-in-out infinite',
        'morph': 'morph 8s ease-in-out infinite alternate',
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
        'subtleBounce': {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-5px) scale(1.01)' },
        },
        'morph': {
          '0%': { borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40%/50% 60% 30% 60%' },
          '100%': { borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%' },
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
        'wabi-bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'grain': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E\")",
        'gradient-wabi': 'linear-gradient(135deg, var(--tw-gradient-stops))',
        'gradient-clay': 'linear-gradient(135deg, #C17F5E, #E0A98D)',
        'gradient-moss': 'linear-gradient(135deg, #6A7B6F, #9DAF9F)',
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
      backdropFilter: {
        'blur-xs': 'blur(2px)',
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
        '.bg-wabi-dots': {
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23A58D7F' fill-opacity='0.05'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3C/g%3E%3C/svg%3E\")",
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
        '.backdrop-blur-xs': {
          backdropFilter: 'blur(2px)',
        },
        '.backdrop-blur-sm': {
          backdropFilter: 'blur(4px)',
        },
        '.backdrop-blur-md': {
          backdropFilter: 'blur(8px)',
        },
        '.backdrop-blur-lg': {
          backdropFilter: 'blur(12px)',
        },
        '.glass-effect': {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.glass-card': {
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        },
      };
      addUtilities(newUtilities);
    },
  ],
} 