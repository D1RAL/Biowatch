module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3bb2d0",
        secondary: "#7ed957",
        background: "#f5f7fa"
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: "1.5rem"
      },
      boxShadow: {
        soft: "0 4px 24px 0 rgba(60, 120, 180, 0.08)"
      }
    }
  },
  plugins: [],
} 