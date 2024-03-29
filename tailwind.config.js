module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary1": "#53D8FB",
        "primary2": "#66C3FF",
        "primary3": "#18A0FB",
        "primary4": "#007ACC",
        "primary5": "#142C4B",
        "secondary1": "#FFB01F",
        "bodyColor": "#444444"
      },
      fontFamily: {
        'header': ['Mulish', 'sans-serif'],
        'body': ['Montserrat', 'sans-serif']
      }
    },
  },
  plugins: [],
}
