/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyberDark: '#080C14',
        cyberCard: '#0F1626',
        cyberCyan: '#06B6D4',
      }
    },
  },
  plugins: [],
}
