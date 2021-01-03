const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    purge: ['./pages/**/*.js', './components/**/*.js'],
    darkMode: 'media',
    theme: {
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px'
        },
        colors: {
            light: '#FFFFFF',
            dark: '#000000',
            highlight: {
                DEFAULT: '#3E51F7',
                dark: '#4F5FEF'
            }
        },
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans]
            },
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        color: theme('colors.dark'),
                        a: {
                            color: theme('colors.highlight.DEFAULT'),
                            textDecoration: 'underline',
                            '&:hover': {
                                color: theme('colors.highlight.DEFAULT')
                            }
                        },
                        h1: {
                            color: theme('colors.dark')
                        },
                        h2: {
                            color: theme('colors.dark')
                        },
                        h3: {
                            color: theme('colors.dark')
                        },
                        h4: {
                            color: theme('colors.dark')
                        },
                        h5: {
                            color: theme('colors.dark')
                        },
                        strong: {
                            color: theme('colors.dark')
                        },
                        blockquote: {
                            color: theme('colors.dark')
                        }
                    }
                },
                dark: {
                    css: {
                        color: theme('colors.light'),
                        a: {
                            color: theme('colors.highlight.dark'),
                            textDecoration: 'underline',
                            '&:hover': {
                                color: theme('colors.highlight.dark')
                            }
                        },
                        h1: {
                            color: theme('colors.light')
                        },
                        h2: {
                            color: theme('colors.light')
                        },
                        h3: {
                            color: theme('colors.light')
                        },
                        h4: {
                            color: theme('colors.light')
                        },
                        h5: {
                            color: theme('colors.light')
                        },
                        strong: {
                            color: theme('colors.light')
                        },
                        blockquote: {
                            color: theme('colors.light')
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
