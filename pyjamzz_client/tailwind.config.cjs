/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
        colors: {
        'p-purple': '#9960A9',
        'p-black': '#180E1B',
        'p-light': '#F7F2F8',
        'p-angel-dark': '#0F0F6B',
        'p-angel-light': '#5DA1E9',
        'p-demon-dark': '#8F1414',
        'p-demon-light': '#E3171E',
      },
      backgroundImage: {
        'home-background': "url('../src/assets/pictures/home-background.jpg')",
        'accessories': "url('../src/assets/pictures/accessories.jpg')",
        'novelty': "url('../src/assets/pictures/novelty.jpg')",

        'angel-pyjamas': "url('../src/assets/pictures/angel/angel-pyjamas.jpg')",
        'angel-lingerie': "url('../src/assets/pictures/angel/angel-lingerie.jpg')",
        'angel-short': "url('../src/assets/pictures/angel/angel-short.jpg')",
        
        'demon-pyjamas': "url('../src/assets/pictures/demon/pyjamas-sexy.jpg')",
        'demon-nuisette': "url('../src/assets/pictures/demon/nuisette-sexy.jpg')",
        'demon-lingerie': "url('../src/assets/pictures/demon/lingerie-sexy.jpg')",
        'demon-body': "url('../src/assets/pictures/demon/body-sexy.jpg')",

        'demon-icon': "url('../src/assets/icons/demon.svg')",
        'angel-icon': "url('../src/assets/icons/angel.svg')",
      }
    },
  },
  plugins: [],
}
