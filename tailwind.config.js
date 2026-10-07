/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        keroOrange: '#FA5503', // Laranja Principal
        keroDarkOrange: '#A05925', // Laranja Escuro (Hover)
        keroSoftOrange: '#ECD0C5', // Laranja Suave (Backgrounds leves)
        keroBlack: '#020101', // Preto Absoluto
        keroGrayLight: '#EFEFEE', // Cinza Claro
        keroBg: '#F9F9F9', // Branco Fundo
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}