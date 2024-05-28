/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  darkMode: 'class',
  content: ['components/**/*.{vue,js,ts}', 'pages/**/*.vue', 'layouts/**/*.vue'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto'],
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['light'],
          primary: '#18E399',
          'primary-content': '#001208',
          secondary: '#35ABDE',
          'secondary-content': '#010b12',
          accent: '#F371B4',
          'accent-content': '#130404',
          'base-100': 'oklch(100% 0 0)',
          'base-200': '#E9E9EA',
          'base-300': '#D2D2D4',
        },
        fontFamily: 'Roboto',
      },
      {
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
          'base-content': '#f0f0f0',
          primary: '#00a76e',
          'primary-content': '#000a04',
          secondary: '#0085b3',
          'secondary-content': '#00060c',
          accent: '#c7488d',
          'accent-content': '#0e0207',
          'base-100': '#1D232B',
          'base-200': '#161A20',
          'base-300': '#0F1115',
        },
        fontFamily: 'Roboto',
      },
    ],
  },
}
