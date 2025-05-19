/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /(bg|text|border|ring|from|to)-(red|blue|gray|purple)-(400|500|600|700)/,
      variants: ['hover', 'focus', 'active'],
    },
  ],
  theme: {
    extend: {
      colors: {
        'le-wagon-red': '#D23333',
        space: {
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        primary: {
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
        },
        cyan: {
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#0891B2',
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}