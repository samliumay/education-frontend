/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        '5-7': '#0abeff',
        '8-11': '#1e7251',
        '10+': '#fcbe1b',
        '12+': '#db3b4d',
        '14+': '#fcbe1b',

        'brand-yellow': '#FDBE16',
        'brand-red': '#DB3B4D',
        'brand-pink': '#FFBFC0',
        'brand-gray': '#6F6F6F',
        'brand-light-gray': '#F2F2F2',
        'brand-dark-gray': '#D9D9D9',
        'brand-black': '#202020',
        'brand-green': '#1e7251',
      },
      transform: {
        interactive: 'active:scale-95',
      },
    },
  },
  safelist: ['bg-5-7', 'bg-8-11', 'bg-10+', 'bg-12+', 'bg-14+'],
  plugins: [],
}
