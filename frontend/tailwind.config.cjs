/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  variants: {
    extend: {
      display: ['group-hover'],
    },
  },

  theme: {
    colors: {
      mainColor: '#C4D9F2',
      secondaryColor: '#C8C8CF',
      thirdColor: '#F06414',
      fourthColor: '#8A2BE2',
      fifthColor: '#E6DACF',
      sixthColor: '#2F67A9',
      altColor: '#51E5FF',
      inactiveColor: '#347FD3',
      activeColor: '#FFFFFF',
      activeGrayColor: '#ADB7C6',
      mainText: '#000000',
      secondaryText: '#FFFFFF',
      // secondaryText: "#EDF3FA",
      inactiveText: '#3A4148',
      activeWin: '#6BBF59',
      activeDraw: ' #F5B041',
      activeLoss: '#D9534F',
      errorBackground: 'rgba(255, 99, 132,1)',
      savedBackground: 'rgba(75, 192, 128, 1)',
      warning: '#D32F2F',
      validate: '#43A047',
      new: '#009e38',
      disabled: '#D6D6D6',
    },
    screens: {
      xs: '520px',
      xxs: '430px',
      ...defaultTheme.screens,
    },
  },
};
