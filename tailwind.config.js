/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-orange": "#FC9D45",
        "primary-orange-100": "#FDA758",
        "screen-bg": "#FFF3E9",
        "primary-text": "#573353",
        iconBg: "#EEE0DA",
      },
    },
  },
  plugins: [],
};
