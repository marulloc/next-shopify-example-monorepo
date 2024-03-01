import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      textColor: {
        default: {
          muted: 'rgb(107 114 128)', //=> gray-500
          base: 'rgb(55 65 81)', //=> gray-700
          accent: 'rgb(17 24 39)', //=> gray-900
          contrast: 'rgb(249 250 251)', //=> gray-50
        },
        primary: {
          muted: 'rgb(99 102 241)', //=> indigo-400
          base: 'rgb(67 56 202)', //=> indigo-600
          accent: 'rgb(49 46 129)', //=> indigo-800
          contrast: 'rgb(249 250 251)', //-> gray-50
        },
        secondary: {
          muted: 'rgb(244 63 94)', //=> rose-400
          base: 'rgb(190 18 60)', //=> rose-600
          accent: 'rgb(136 19 55)', //=> rose-800
          contrast: 'rgb(249 250 251)', //=> gray-50
        },
      },

      backgroundColor: {
        default: {
          muted: 'rgb(229 231 235)', //=> gray-200
          base: 'rgb(243 244 246)', //=> gray-100
          accent: 'rgb(249 250 251)', //=> gray-50
          contrast: 'rgb(0 0 0)',
        },
        primary: {
          muted: 'rgb(99 102 241)', //=> indigo-400
          base: 'rgb(67 56 202)', //=> indigo-600
          accent: 'rgb(49 46 129)', //=> indigo-800
          contrast: 'rgb(249 250 251)', //-> gray-50
        },
        secondary: {
          muted: 'rgb(244 63 94)', //=> rose-400
          base: 'rgb(190 18 60)', //=> rose-600
          accent: 'rgb(136 19 55)', //=> rose-800
          contrast: 'rgb(249 250 251)', //=> gray-50
        },
      },

      ringColor: {
        default: {
          muted: 'rgb(229 231 235)', //=> gray-200
          base: 'rgb(243 244 246)', //=> gray-100
          accent: 'rgb(249 250 251)', //=> gray-50
          contrast: 'rgb(0 0 0)',
        },
        primary: {
          muted: 'rgb(99 102 241)', //=> indigo-400
          base: 'rgb(67 56 202)', //=> indigo-600
          accent: 'rgb(49 46 129)', //=> indigo-800
          contrast: 'rgb(249 250 251)', //-> gray-50
        },
        secondary: {
          muted: 'rgb(244 63 94)', //=> rose-400
          base: 'rgb(190 18 60)', //=> rose-600
          accent: 'rgb(136 19 55)', //=> rose-800
          contrast: 'rgb(249 250 251)', //=> gray-50
        },
      },

      borderColor: {
        default: {
          muted: 'rgb(229 231 235)', //=> gray-200
          base: 'rgb(243 244 246)', //=> gray-100
          accent: 'rgb(249 250 251)', //=> gray-50
          contrast: 'rgb(0 0 0)',
        },
        primary: {
          muted: 'rgb(99 102 241)', //=> indigo-400
          base: 'rgb(67 56 202)', //=> indigo-600
          accent: 'rgb(49 46 129)', //=> indigo-800
          contrast: 'rgb(249 250 251)', //-> gray-50
        },
        secondary: {
          muted: 'rgb(244 63 94)', //=> rose-400
          base: 'rgb(190 18 60)', //=> rose-600
          accent: 'rgb(136 19 55)', //=> rose-800
          contrast: 'rgb(249 250 251)', //=> gray-50
        },
      },
      divideColor: {
        default: {
          muted: 'rgb(229 231 235)', //=> gray-200
          base: 'rgb(243 244 246)', //=> gray-100
          accent: 'rgb(249 250 251)', //=> gray-50
          contrast: 'rgb(0 0 0)',
        },
        primary: {
          muted: 'rgb(99 102 241)', //=> indigo-400
          base: 'rgb(67 56 202)', //=> indigo-600
          accent: 'rgb(49 46 129)', //=> indigo-800
          contrast: 'rgb(249 250 251)', //-> gray-50
        },
        secondary: {
          muted: 'rgb(244 63 94)', //=> rose-400
          base: 'rgb(190 18 60)', //=> rose-600
          accent: 'rgb(136 19 55)', //=> rose-800
          contrast: 'rgb(249 250 251)', //=> gray-50
        },
      },
    },
  },
  plugins: [],
};
export default config;
