import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height:{
        "list": "calc(100% - 80px)",
      },
      screens: {
        "sm": "320px",
        "md": "481px",
        "lg": "769px",
        "xl": "1025px",
        "2xl": "1200px",
      },
      colors: {
        primary: "#050C9C",
        secondary: {
          100: "#3572EF",
          200: "#3ABEF9",
        },
        tertiary: "#A7E6FF",
      }
    },
  },
  plugins: [],
};
export default config;
