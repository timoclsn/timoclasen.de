const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    purge: ['./pages/**/*.js', './components/**/*.js'],
    darkMode: 'media', // or 'media' or 'class'
    theme: {
        colors: {
            primary: {
                DEFAULT: '#ffffff',
                dark: '#000000'
            },
            secondary: {
                DEFAULT: '#000000',
                dark: '#ffffff'
            },
            highlight: {
                DEFAULT: '#831843',
                dark: '#EC4899'
            }
        },
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans]
            },
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        color: theme('colors.secondary.DEFAULT'),
                        a: {
                            color: theme('colors.highlight.DEFAULT'),
                            textDecoration: 'underline',
                            '&:hover': {
                                color: theme('colors.highlight.DEFAULT')
                            }
                        },
                        h1: {
                            color: theme('colors.secondary.DEFAULT')
                        },
                        h2: {
                            color: theme('colors.secondary.DEFAULT')
                        },
                        h3: {
                            color: theme('colors.secondary.DEFAULT')
                        },
                        h4: {
                            color: theme('colors.secondary.DEFAULT')
                        },
                        h5: {
                            color: theme('colors.secondary.DEFAULT')
                        },
                        strong: {
                            color: theme('colors.secondary.DEFAULT')
                        }
                    }
                },
                dark: {
                    css: {
                        color: theme('colors.secondary.dark'),
                        a: {
                            color: theme('colors.highlight.dark'),
                            textDecoration: 'underline',
                            '&:hover': {
                                color: theme('colors.highlight.dark')
                            }
                        },
                        h1: {
                            color: theme('colors.secondary.dark')
                        },
                        h2: {
                            color: theme('colors.secondary.dark')
                        },
                        h3: {
                            color: theme('colors.secondary.dark')
                        },
                        h4: {
                            color: theme('colors.secondary.dark')
                        },
                        h5: {
                            color: theme('colors.secondary.dark')
                        },
                        strong: {
                            color: theme('colors.secondary.dark')
                        }
                    }
                }
            })
        }
    },
    variants: {
        extend: {
            typography: ['dark']
        }
    },
    plugins: [require('@tailwindcss/typography')]
};
