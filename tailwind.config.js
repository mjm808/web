/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
         ibmvga: ['"IBM-VGA-9x16"', 'monospace'],
         nec: ["'NEC_APC3_8x16'", 'monospace'],
         'ibm-plex': ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
