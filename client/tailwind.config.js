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
      bgcolor: "#212121",
      bg2: "#26282A",
      bg3: "#242424",
      bg4: "#121212",
      bg5: "#26282A",
      bg6: "#100c08",

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
    boxShadow: {
      'flowbite-hover': 'none',
    },
  },
  plugins: [require("flowbite/plugin"), require('tailwind-scrollbar'),],
}

