const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      typography: ({ theme }) => {
        return {
          DEFAULT: {
            css: {
              'code::before': {
                content: '""',
              },
              'code::after': {
                content: '""',
              },
            },
          },
        }
      },
    },
  },

  plugins: [require('@tailwindcss/typography')],
}

module.exports = config
