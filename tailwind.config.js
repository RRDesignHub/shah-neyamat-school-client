
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#166534", // Green-700 (Base Color for Buttons, Headers, Links)
        secondary: "#22C55E", // Green-500 (For Highlights, Accents)
        background: "#F3F4F6", // Neutral Gray (Soft Background for Better Readability)
        card: "#FFFFFF", // White (Clean and Professional Card UI)
       
        shadow: "#14532D66", // Slight Greenish Shadow for Depth
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light"], // Ensure a specific theme to prevent auto `oklch()`
  },
}

