/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
      },
      colors: {
        figma: {
          gray: {
            0: "#FFFFFF",
            10: "#FAFAFA",
            20: "#F5F5F5",
            30: "#E5E5E5",
            40: "#D4D4D4",
            50: "#A3A3A3",
            60: "#737373",
            70: "#525252",
            80: "#404040",
            90: "#262626",
            100: "#171717",
          },
          blue: {
            0: "#EAF6FF",
            10: "#B3D8FF",
            20: "#80BFFF",
            30: "#4DA6FF",
            40: "#1A8CFF",
            50: "#007AFF",
            60: "#0066CC",
            70: "#0052A3",
            80: "#003D7A",
            90: "#002952",
            100: "#001429",
          },
          accent: {
            yellow: "#FFEB00",
            pink: "#FF4D8B",
            green: "#00E272",
          },
        },
        'light-bg': '#F9F9F9',
        'light-surface': '#FFFFFF',
        'light-text-primary': '#111827',
        'light-text-secondary': '#6B7280',
        'light-border': '#E5E7EB',
        'dark-bg': '#1e1e1e',
        'dark-surface': '#2C2C2C',
        'dark-text-primary': '#FFFFFF',
        'dark-text-secondary': '#A9A9A9',
        'dark-border': '#424242',
      },
    },
  },
  plugins: [],
}

