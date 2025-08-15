// tailwind.config.ts
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [/^react-calendar/, /^heat-/],
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
  plugins: [],
};
