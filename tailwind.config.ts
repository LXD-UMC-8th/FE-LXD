// tailwind.config.ts
import type { Config } from "tailwindcss";
import scrollbar from "tailwind-scrollbar";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        custom400: "400px",
        custom800: "800px",
        custom900: "900px",
        custom980: "980px",
      },
    },
  },
  plugins: [scrollbar({ nocompatible: true })],
} satisfies Config;
