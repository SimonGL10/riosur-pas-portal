import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: "#102a43",
        teal: "#0f766e",
        gold: "#d7a84b",
        cream: "#f3efe6",
        ink: "#111827",
        mute: "#6b7280",
        line: "#e5e7eb",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Segoe UI", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(17,24,39,0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
