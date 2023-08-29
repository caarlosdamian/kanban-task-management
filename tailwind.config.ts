import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        content: 'rgb(var(--color-content) / <alpha-value>)',
        lightGray: 'rgb(var(--color-light-gray) / <alpha-value>)',
        error: 'rgb(var(--color-red-error) / <alpha-value>)',
        errorHover: 'rgb(var(--color-red-error-hover) / <alpha-value>)',
        lines: 'rgb(var(--color-lines) / <alpha-value>)',
        mediumGray: 'rgb(var(--color-medium-gray) / <alpha-value>)',
        mainPurple: 'rgb(var(--color-main-purple) / <alpha-value>)',
        mainPurpleHover: 'rgb(var(--color-main-purple-hover) / <alpha-value>)',
      },
      spacing: {
        '18px': '18px',
      },
    },
  },
  plugins: [],
};
export default config;
