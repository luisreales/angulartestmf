/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // This glob pattern tells Tailwind to look inside the 'src' folder
    // and find all files ending in .html or .ts.
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}