/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{tsx,ts}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
