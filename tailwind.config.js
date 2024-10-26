/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors:{
      background:'hsl(var(--background))',
      foreground:'hsl(var(--foreground))',
      primary:'hsl(var(--primary))',
      primary_foreground:'hsl(var(--primary-foreground))',
      secondary:'hsl(var(--secondary))',
      secondary_foreground:'hsl(var(--secondary-foreground))'
    }
  },
  plugins: [],
}

