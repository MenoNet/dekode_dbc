/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx,pug}",
  ],
  theme: {
    extend: {
      colors: {
        dekode: {
          red: '#E31B23',
          bg: '#FFF5ED',
        }
      },
      fontFamily: {
        spartan: ['"League Spartan"', 'sans-serif'],
        roboto: ['"Roboto"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
