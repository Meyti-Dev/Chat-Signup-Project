/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    // container
    container: {
      center: true,
      padding: '0.625rem'
    },
    // fonts
    fontFamily: {
      'vazir-regular': 'vazir regular',
      'vazir-medium': 'vazir medium',
      'vazir-bold': 'vazir bold',
    }
  },
}

