import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#FBF8F3", // Warm sandstone white
        foreground: "#2D1B0E", // Deep brown
        primary: {
          DEFAULT: "#B8860B", // Antique gold
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#8B4513", // Saddle brown
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#F5F0E8", // Light sandstone
          foreground: "#6B5B4A", // Muted brown
        },
        accent: {
          DEFAULT: "#1E3A8A", // Deep indigo
          foreground: "#FFFFFF",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#2D1B0E",
        },
        // Custom ancient Indian palette
        sandstone: {
          50: "#FBF8F3",
          100: "#F5F0E8",
          200: "#E8DDD0",
          300: "#D4C4B0",
          400: "#B8A188",
          500: "#A0876C",
          600: "#8B7355",
          700: "#6B5B4A",
          800: "#4A3F36",
          900: "#2D1B0E",
        },
        copper: {
          50: "#FDF7F0",
          100: "#F8E6D0",
          200: "#EBCCAA",
          300: "#D4A574",
          400: "#C1834A",
          500: "#B8860B", // Primary gold
          600: "#A0690A",
          700: "#8B4513", // Secondary brown
          800: "#6B3410",
          900: "#4A240B",
        },
        indigo: {
          50: "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#A5B4FC",
          400: "#818CF8",
          500: "#6366F1",
          600: "#4F46E5",
          700: "#4338CA",
          800: "#3730A3",
          900: "#1E3A8A", // Accent indigo
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        serif: ["Crimson Text", "ui-serif", "Georgia"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(184, 134, 11, 0.3)" },
          "50%": { boxShadow: "0 0 30px rgba(184, 134, 11, 0.5)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "slide-in": "slide-in 0.5s ease-out",
        float: "float 3s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite",
      },
      backgroundImage: {
        "ancient-pattern":
          'url(\'data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23B8860B" fill-opacity="0.03" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="3"/%3E%3Ccircle cx="13" cy="13" r="3"/%3E%3C/g%3E%3C/svg%3E\')',
        "scroll-pattern":
          'url(\'data:image/svg+xml,%3Csvg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M15 0l3.5 7h7l-5.5 4 2 6.5-7-5-7 5 2-6.5-5.5-4h7z" fill="%23B8860B" fill-opacity="0.02"/%3E%3C/svg%3E\')',
      },
    },
  },
	plugins: [tailwindcssAnimate],
};
export default config;
