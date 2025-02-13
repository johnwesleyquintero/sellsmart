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
        primary: "#1E40AF",      // Dark blue
        secondary: "#3B82F6",    // Lighter blue
        background: "#111827",   // Darker gray for dark mode
        foreground: "#F9FAFB",   // Softer white
        accent: "#F59E0B",       // A golden accent, worthy of a king
      },
      spacing: {
        sidebar: "250px",        // Custom sidebar width
      },
      borderRadius: {
        md: "8px",
        lg: "12px",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],    // Modern and clean
        serif: ['Merriweather', 'serif'],   // For that classic tale
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
      },
      screens: {
        xs: '480px',  // Extra small devices, fit for a small skirmish
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),       // Enhance your form styles
    require("@tailwindcss/typography"),  // Perfect for majestic prose and rich text
  ],
};
