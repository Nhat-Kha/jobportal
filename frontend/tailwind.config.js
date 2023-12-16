/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFDA5B",
        secondary: "#FE645A",
        bam: "#98ACFF",
        brownish: "#F1EFE3",
        light: "#F3F4F6",
        lightYellow: "#FFF2C8",
        star: "#FFC828",
        money: "#10a666",
      },
    },
  },
  plugins: [],
};
