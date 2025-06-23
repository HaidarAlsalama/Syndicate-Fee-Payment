/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  // darkMode:'class',
  theme: {
    extend: {
      fontFamily: {
        tajawal: ["Tajawal", "sans"],
      },
      colors: {
        custom: {
          maincolor: "#2365af",
        },
      },
    },
  },
  plugins: [],
};
