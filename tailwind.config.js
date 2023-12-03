/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['light'],
          primary: '#f97316',
          'primary-content': '#ffffff',
        },
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
          primary: '#f97316',
          'primary-content': '#111827',
        },
      },
    ],
  },
}
