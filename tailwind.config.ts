import type { Config } from "tailwindcss";

const config: Config = {
  // important: true,
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Roboto", "Helvetica", "Arial", "sans-serif"],
      },

      colors: {
        primary: {
          DEFAULT: "var(--primary)",
          dark: "var(--primary-dark)",
          light: "var(--primary-light)",
          text: "var(--text-primary)",
          hover: "var(--primary-hover)",
        },

        text: {
          DEFAULT: "var(--text-primary)",
          secondary: "var(--text-secondary)",
        },

        surface: {
          base: "var(--surface-base)",
          subtle: "var(--surface-subtle)",
          hover: "var(--surface-hover)",
        },

        border: {
          DEFAULT: "var(--border)",
          light: "var(--border-light)",
        },

        gray: {
          xs: "#f9f9f9",
          sm: "#f3f4f6",
          md: "#e6eaed",
          lg: "#EBF7F1",
          gg: "#979da3",
          xl: "#9ca3af",
          "2xl": "#9aa7b8",
          "3xl": "#6a7a89",
        },

        green: {
          xs: "#b9e1b9",
          "2xl": "#2DC26B",
          "3xl": "#1B8A55",
        },
        blue: {
          dd: "#21232C",
        },

        state: {
          success: "var(--success)",
          warning: "var(--warning)",
          danger: "var(--danger)",
          info: "var(--info)",
          default: "var(--default)",
        },
      },
      boxShadow: {
        focus: "0 0 0 2px rgba(13, 153, 255, 0.4)",
        card: "0 1px 2px rgba(16, 24, 40, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
