/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'theme-light': '#eff6e0',
        'theme-light-shade': '#aec3b0',
        'theme-dark': '#01161e',
        'theme-mediam-dark': '#124559',
        'theme-dark-shade': '#598392',
      },
    },
  },
  plugins: [],
}

