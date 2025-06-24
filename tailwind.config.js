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
          DEFAULT: '#8C9E5E',
          light: '#A8B97B',
          dark: '#5F6B3F',
        },
        wood: {
          DEFAULT: '#9C7C5B',
          light: '#BDA78C',
          dark: '#6A533C',
        },
        clay: '#B97A57',
        stone: {
          DEFAULT: '#ADADAD',
          light: '#E5E5E5',
          dark: '#636363',
        },
        rice: '#F5F2E9',
        ink: '#2D2D2D',
      },
      fontFamily: {
        sans: ['Noto Sans', 'Noto Sans JP', 'system-ui', 'sans-serif'],
        serif: ['Noto Serif', 'serif'],
      },
      borderRadius: {
        'sm': '2px',
      },
      boxShadow: {
        'wabi': '0 2px 10px rgba(0,0,0,0.05)',
        'wabi-hover': '0 5px 15px rgba(0,0,0,0.1)',
      },
      animation: {
        'wabi-spin': 'wabi-spin 1s linear infinite',
        'fade-in': 'fadeIn 0.8s ease-in',
      },
      keyframes: {
        'wabi-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'fadeIn': {
          'from': { opacity: '0', transform: 'translateY(10px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
} 