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
        body: ["Montserrat", "Noto Sans TC"],
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
