const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    purge: ['./pages/**/*.js', './components/**/*.js'],
    darkMode: 'media', // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans]
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: []
};
