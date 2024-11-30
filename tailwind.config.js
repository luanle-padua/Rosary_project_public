/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vintage-red': '#b22222',
        'vintage-green': '#228b22',
        'vintage-gold': '#daa520',
        'vintage-cream': '#fffdd0',
        'vintage-brown': '#241102',
      },
      fontFamily: {
        'felix': ['Felix Titling', 'monospace'],
        'cormorant': ['Cormorant Garamond', 'monospace'],
      },
    },
  },
  plugins: [],
}