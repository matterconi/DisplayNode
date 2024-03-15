/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navyBlue: '#000080', // You can adjust the shade of navy blue as needed
        white: '#ffffff',
      },
      fontFamily: {
        'code': ['"Fira Code"', 'monospace'], // Ideal for code blocks
        'mono': ['"Roboto Mono"', 'monospace'], // Good for UI elements
        'game': ['"Press Start 2P"', 'cursive'], // Adds a fun, retro gaming feel
      },
      animation: {
        wave: 'waveAnimation var(--animation-speed) ease-in-out infinite',
        dynamicWave: 'dynamicWaveAnimation var(--animation-speed) ease-in-out infinite',
      },
    },
  },
}