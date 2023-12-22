/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#FF6363',
        secondary: '#E2E2D5',
      },
      backgroundImage: {
        'gradient-1':
          'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.1) 100%)',
      },
      screens: {
        xs: '480px',
        sm: '768px',
        md: '1060px',
      },
    },
  },
  plugins: [],
};
