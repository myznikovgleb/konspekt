/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['light'],
          primary: '#f59e0b',
          'primary-content': '#fafafa',
          'base-100': '#fafafa',
          'base-200': '#e5e5e5',
          'base-300': '#d4d4d4',
          'base-content': '#0a0a0a',
        },
      },
      {
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
          primary: '#fb923c',
          'primary-content': '#262626',
          'base-100': '#262626',
          'base-200': '#171717',
          'base-300': '#0a0a0a',
          'base-content': '#e5e5e5',
        },
      },
    ],
    logs: false,
  },
}
