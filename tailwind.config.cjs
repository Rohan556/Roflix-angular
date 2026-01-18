/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'rof-gradient': `linear-gradient(135deg, ${theme('colors.indigo.600')}, ${theme('colors.purple.600')}, ${theme('colors.pink.500')})`,
      }),
    },
  },
  plugins: [],
};
