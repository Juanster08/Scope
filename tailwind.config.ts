import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ism: {
          red: '#c1121f',
          blue: '#003f91',
          light: '#f5f5f5'
        }
      }
    }
  },
  plugins: []
};

export default config;
