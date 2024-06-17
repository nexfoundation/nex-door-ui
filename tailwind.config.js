/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      sm: ['14px', '140%'],
      base: ['16px', '140%'],
      lg: ['18px', '140%'],
      xl: ['22px', '125%'],
      '2xl': ['24px', '125%'],
      '3xl': ['32px', '125%'],
      'display': ['48px', '125%'],
      'caption': ['12px', '140%']
    },
    extend: {
      screens: {
        'xs': '376px', // mobile-first, skip smallest sometimes
        'sm': '568px',
        'md': '768px',
        'lg': '990px', // may be deprecated
        'xl': '1280px',
        '2xl': '1440px'
      },
      fontFamily: {
        body: ["Noto Sans TC", "Montserrat"],
        logo: ["Montserrat"]
      },
      colors: {
        "primary": '#9FE4FE', // primary blue
        "secondary": '#C6F5D5', // primary green
        "primary-green": '#C6F5D5',
        "primary-blue": '#9FE4FE',
        // functions seems not work here
        // "gradient": ' bg-gradient-to-r from-[#C6F5D5] to-[#6fd7fd66] ',
        // "gradient-btn-default": 'linear-gradient(to right, #6FD7FD, #47DE7899)',
        // "gradient-btn-hover":  'bg-gradient-to-r from-9FE4FE to-C6F5D5',
        "secondary-blue": '#6FD7FD',
        "secondary-green": '#47DE78',
        "accent-blue": '#3D768B',
        "black-secondary": '#000000DE',
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      {
        dark: {}
      },
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          primary: "#47DE78",
          secondary: "#6FD7FD",
          // "--tw-bg-opacity": "0%"
        }
      }
    ]
  },
}
