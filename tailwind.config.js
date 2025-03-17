/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/**/*.{js,ts,jsx,tsx}', 
    ],
    theme: {
      extend: {
        colors: {
          'primary': '#d0eb85',
          'secondary': '#f0f8d4',
        },
        fontFamily: {
          cursive: ['"Comic Sans MS"', 'cursive'], 
        },
      },
    },
    plugins: [],
  };