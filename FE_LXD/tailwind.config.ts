// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
      },
      colors: {
        gray: {
          900: "#212429",
          800: "#4D4D57",
          700: "#5E606C",
          600: "#747785",
          500: "#A4A7B2",
          400: "#C7CAD1",
          300: "#DDE0E4",
          200: "#EDEEF0",
          100: "#F5F5F8",
          50: "#F9F9FB",
        },
        blue: {
          900: "#04142D",
          700: "#062DF6",
          600: "#2C54F1",
          500: "#526DF0",
          400: "#6C84F5",
          300: "#8A9EFC",
          200: "#A7C1FF",
          100: "#CFDFFF",
          70: "#E4EDFF",
          50: "#F1F5FD",
        },
        mint: {
          accent: "#67F1D5",
          500: "#40DBB9",
          400: "#5AE0C3",
          300: "#7FE6D1",
          200: "#BFFBEF",
          100: "#E4FFF2",
        },
        primary: "#2C54F1",
        onPrimary: "#CFDFFF",
      },
      fontSize: {
        headline1: ["48px", { lineHeight: "1.25", letterSpacing: "-0.02em" }],
        headline2: ["32px", { lineHeight: "1.4", letterSpacing: "-0.02em" }],
        headline3: ["28px", { lineHeight: "1.4", letterSpacing: "-0.02em" }],
        subhead1: ["24px", { lineHeight: "1.35", letterSpacing: "-0.0025em" }],
        subhead2: ["20px", { lineHeight: "1.35", letterSpacing: "-0.0025em" }],
        subhead3: ["18px", { lineHeight: "1.35", letterSpacing: "-0.0025em" }],
        body1: ["16px", { lineHeight: "1.45", letterSpacing: "-0.0025em" }],
        body2: ["14px", { lineHeight: "1.45", letterSpacing: "-0.0025em" }],
        caption: ["12px", { lineHeight: "1.45", letterSpacing: "-0.0025em" }],
      },
    },
  },
  plugins: [],
};

export default config;
