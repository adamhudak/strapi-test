import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        charcoal: "#1C1B19",
        concrete: "#E7E3DA",
        orange: "#FF5A1F",
        steel: "#6E6A62",
        paper: "#F6F4EE",
        line: "#D8D4C8",
        dashline: "#C9C4B6",
      },
      fontFamily: {
        display: ["var(--font-archivo-expanded)", "sans-serif"],
        body: ["var(--font-public-sans)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
        head: ["var(--font-archivo)", "sans-serif"],
      },
      letterSpacing: {
        tightest2: "-0.02em",
      },
    },
  },
  plugins: [typography],
};

export default config;
