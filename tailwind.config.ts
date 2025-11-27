import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-dark": "#0F172A",
        "brand-primary": "#2563EB",
        "brand-secondary": "#0EA5E9",
        "brand-accent": "#F59E0B",
      },
      boxShadow: {
        card: "0 10px 50px -20px rgba(15, 23, 42, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
