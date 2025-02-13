/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF", // Dark blue
        secondary: "#3B82F6", // Lighter blue
        background: "#111827", // Darker gray for dark mode
        foreground: "#F9FAFB", // Softer white
      },
      spacing: {
        sidebar: "250px", // Custom sidebar width
      },
      borderRadius: {
        md: "8px",
        lg: "12px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")], // Improve form styles
};
