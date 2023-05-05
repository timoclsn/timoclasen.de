const { fontFamily } = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    colors: {
      light: colors.white,
      dark: colors.black,
      gray: colors.neutral,
      highlight: {
        DEFAULT: '#3E51F7',
        dark: '#4F5FEF',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
      },
      typography: (theme) => ({
        custom: {
          css: {
            '--tw-prose-body': theme('colors.dark'),
            '--tw-prose-headings': theme('colors.dark'),
            '--tw-prose-lead': theme('colors.dark'),
            '--tw-prose-links': theme('colors.highlight.DEFAULT'),
            '--tw-prose-bold': theme('colors.dark'),
            '--tw-prose-counters': theme('colors.gray.500'),
            '--tw-prose-bullets': theme('colors.gray.500'),
            '--tw-prose-hr': theme('colors.dark'),
            '--tw-prose-quotes': theme('colors.dark'),
            '--tw-prose-quote-borders': theme('colors.gray.300'),
            '--tw-prose-captions': theme('colors.dark'),
            '--tw-prose-code': theme('colors.gray.600'),
            '--tw-prose-pre-code': theme('colors.dark'),
            '--tw-prose-pre-bg': theme('colors.dark'),
            '--tw-prose-th-borders': theme('colors.gray.600'),
            '--tw-prose-td-borders': theme('colors.gray.600'),
            '--tw-prose-invert-body': theme('colors.light'),
            '--tw-prose-invert-headings': theme('colors.light'),
            '--tw-prose-invert-lead': theme('colors.light'),
            '--tw-prose-invert-links': theme('colors.highlight.dark'),
            '--tw-prose-invert-bold': theme('colors.light'),
            '--tw-prose-invert-counters': theme('colors.gray.500'),
            '--tw-prose-invert-bullets': theme('colors.gray.500'),
            '--tw-prose-invert-hr': theme('colors.light'),
            '--tw-prose-invert-quotes': theme('colors.light'),
            '--tw-prose-invert-quote-borders': theme('colors.gray.600'),
            '--tw-prose-invert-captions': theme('colors.light'),
            '--tw-prose-invert-code': theme('colors.gray.400'),
            '--tw-prose-invert-pre-code': theme('colors.light'),
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': theme('colors.gray.400'),
            '--tw-prose-invert-td-borders': theme('colors.gray.400'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
