import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563eb", // Brighter blue
          light: "#3b82f6",
          dark: "#1d4ed8"
        },
        secondary: {
          DEFAULT: "#38bdf8", // Brighter electric blue
          light: "#7dd3fc",
          dark: "#0ea5e9"
        },
        gray: {
          DEFAULT: "#94a3b8", // Lighter slate gray
          light: "#cbd5e1",
          dark: "#64748b"
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-source-sans)", "system-ui", "sans-serif"],
        heading: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      fontSize: {
        'display': ['4.5rem', { lineHeight: '1.1' }],
        'h1': ['3.75rem', { lineHeight: '1.2' }],
        'h2': ['3rem', { lineHeight: '1.2' }],
        'h3': ['2.25rem', { lineHeight: '1.3' }],
        'h4': ['1.875rem', { lineHeight: '1.4' }],
        'h5': ['1.5rem', { lineHeight: '1.5' }],
        'h6': ['1.25rem', { lineHeight: '1.6' }],
      },
      spacing: {
        'section': '6rem',
        'container': '2rem',
      },
      maxWidth: {
        'container': '1280px',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
} satisfies Config;
