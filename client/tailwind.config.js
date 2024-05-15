/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {},
    fontFamily: {
      roboto: ['Roboto', 'sans-serif'],
    },
    colors: {
      bgcolor: "#2C2D2D",
      bg2: "232424"

    },
    transitionProperty: {
      'blur-left': 'filter, transform',
      'blur-right': 'filter, transform',
    },
    duration: {
      'blur-left': '0.8s',
      'blur-right': '0.8s',
    },
    blur: {
      '4': '10px', // Customize the blur amount as needed
    },
  },
  plugins: [require("flowbite/plugin"), require('tailwind-scrollbar'),],
}

