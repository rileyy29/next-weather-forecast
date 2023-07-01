/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        "min-temp": "#010514",
        "max-temp": "#1f0008",
        "main-background": "var(--main-background)"
      },
      backgroundImage: {
        "clouds": "url('../public/clouds.jpg')"
      }
    }
  },
  plugins: [],
}
