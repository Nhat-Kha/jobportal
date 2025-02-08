/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#4598c5",
        // blue: "#EAA317",
        secondary: "#30a9fa",
        bam: "#98ACFF",
        brownish: "#afefff",
        light: "#F3F4F6",
        lightYellow: "#71acbf",
        star: "#71acbf",
        money: "#10a666",
      },
      backgroundColor: {
        "overlay-70": "rgba(0,0,0,0.7)",
      },
    },
  },
  plugins: [],
};
