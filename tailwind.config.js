// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "gradient-x": "gradient-x 8s ease infinite",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
        },
      },
    },
  },
  plugins: [],
};
