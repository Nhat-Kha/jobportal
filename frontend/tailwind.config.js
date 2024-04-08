/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#FFDA5B",
        // blue: "#EAA317",
        secondary: "#FE645A",
        bam: "#98ACFF",
        brownish: "#F1EFE3",
        light: "#F3F4F6",
        lightYellow: "#FFF2C8",
        star: "#FFC828",
        money: "#10a666",
      },
      backgroundColor: {
        "overlay-70": "rgba(0,0,0,0.7)",
      },
    },
  },
  plugins: [],
};
