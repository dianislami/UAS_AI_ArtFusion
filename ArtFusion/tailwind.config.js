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
          dark: '#211008',
          brown: '#754517',
          light: '#AB743C',
          cream: '#F3E3B2',
        },
        danger: {
          dark: '#310F10',
          red: '#74070D',
        },
        earth: {
          900: '#211008',
          700: '#754517', 
          500: '#AB743C',
          100: '#F3E3B2',
        }
      },
      backgroundImage: {
        'earth-gradient': 'linear-gradient(135deg, #211008 0%, #754517 50%, #AB743C 100%)',
        'earth-reverse': 'linear-gradient(135deg, #AB743C 0%, #754517 50%, #211008 100%)',
        'earth-warm': 'linear-gradient(135deg, #754517 0%, #AB743C 50%, #F3E3B2 100%)',
      }
    },
  },
  plugins: [],
}