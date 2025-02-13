import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // 🌌 Nebula UI Theme Colors
        nebula: {
          dark: "#0a0a0a", // Dark Background
          purple: "#2d1b4d", // Deep Purple
          teal: "#4fd1c5", // Bright Cyan
          border: "#4b2e7a", // Purple Border
          text: "#e0e0e0", // Light Grey
        },
        
        // 🌈 Primary UI Colors (Supports HSL-based themes)
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backgroundImage: {
        'gradient-text': 'linear-gradient(45deg, var(--quantum-teal), #8a6de9)',
      },
      // 🌟 Border Radius Adjustments
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // 🎬 Custom Keyframe Animations (Nebula UI)
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "neon-glow": {
          "0%, 100%": { boxShadow: "0 0 10px #4fd1c5" },
          "50%": { boxShadow: "0 0 20px #2d1b4d" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
        "neon-glow": "neon-glow 1.5s infinite alternate ease-in-out",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
