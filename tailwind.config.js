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
      fontFamily: {
        body: ["Noto Sans TC", "Montserrat"],
        logo: ["Montserrat"]
      },
      colors: {
        "primary": '#9FE4FE',
        "secondary": '#C6F5D5',
        "gradient": ' bg-gradient-to-r from-[#C6F5D5] to-[#6fd7fd66] ',
        "secondary-blue": '#6FD7FD',
        "accent-blue": '#3D768B',
        "black-secondary": '#000000DE'
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
      "dark",
      "light",
    ]
  },
}
