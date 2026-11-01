/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        saffron: {
          DEFAULT: '#FF9933',
          dark: '#E65100',
          light: '#FFF4E6',
        },
        indiaGreen: {
          DEFAULT: '#138808',
          dark: '#0F6B06',
          light: '#E8F5E9',
        },
        deepNavy: {
          DEFAULT: '#102B4E',
          royal: '#0A192F',
          light: '#EBF2FA',
        },
        ashokaBlue: '#000080',
      },
    },
  },
  plugins: [],
};
