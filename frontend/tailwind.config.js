/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#F2ECE2",
          dim: "#A39C8F",
          faint: "#6E685D",
        },
        archive: {
          bg: "#0E0D0C",
          panel: "#17151388",
          panelSolid: "#1A1816",
          line: "#2A2722",
        },
        amber: {
          DEFAULT: "#D9772E",
          soft: "#6B4226",
          glow: "#F2A65A",
        },
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      boxShadow: {
        amber: "0 0 40px -10px rgba(217,119,46,0.45)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in": "fade-in 1s ease both",
        shimmer: "shimmer 3.5s linear infinite",
      },
    },
  },
  plugins: [],
};
