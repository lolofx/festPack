import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        metal: {
          bg:      "#080808",
          surface: "#111111",
          border:  "#222222",
          neon:    "#39ff14",
          fire:    "#ff6600",
          blood:   "#cc0000",
          bone:    "#d4c5a9",
          silver:  "#9ca3af",
        },
      },
      fontFamily: {
        metal: ['"Metal Mania"', "cursive"],
        body:  ['"Rajdhani"', "sans-serif"],
      },
      boxShadow: {
        neon: "0 0 10px #39ff14, 0 0 20px #39ff1440",
        fire: "0 0 10px #ff6600, 0 0 20px #ff660040",
      },
    },
  },
  plugins: [],
} satisfies Config;
