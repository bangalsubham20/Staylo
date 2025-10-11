import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
        // Custom color scheme
        primary: {
          DEFAULT: "#FA5A2A", // Orange
          foreground: "#FFFFFF",
          light: "#FF7A4A",
          dark: "#E04A1A",
        },
        secondary: {
          DEFAULT: "#A4A8B5", // Light gray
          foreground: "#030711", // Dark blue-black
        },
        accent: {
          DEFAULT: "#FA5A2A", // Orange
          foreground: "#FFFFFF",
        },
        background: {
          DEFAULT: "#FFFFFF",
          dark: "#030711", // Dark blue-black
        },
        foreground: {
          DEFAULT: "#030711", // Dark blue-black
          dark: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#A4A8B5", // Light gray
          foreground: "#6B7280",
        },
        border: "#E5E7EB",
        input: "#F3F4F6",
        ring: "#FA5A2A", // Orange
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#030711", // Dark blue-black
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#030711", // Dark blue-black
        },
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF",
        },
        success: {
          DEFAULT: "#10B981",
          foreground: "#FFFFFF",
        },
        warning: {
          DEFAULT: "#F59E0B",
          foreground: "#FFFFFF",
        },
        sidebar: {
          DEFAULT: "#030711", // Dark blue-black
          foreground: "#FFFFFF",
          primary: "#FA5A2A", // Orange
          "primary-foreground": "#FFFFFF",
          accent: "#A4A8B5", // Light gray
          "accent-foreground": "#030711", // Dark blue-black
          border: "#374151",
          ring: "#FA5A2A", // Orange
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
