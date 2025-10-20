import type { Config } from 'tailwindcss';

export default {
  theme: {
    extend: {
      keyframes: {
        'accordion-down': {
      from: {
        height: '0',
      },
      to: {
        height: 'var(--radix-accordion-content-height)',
      },
    },
    'accordion-up': {
      from: {
        height: 'var(--radix-accordion-content-height)',
      },
      to: {
        height: '0',
      },
    },
    float: {
      '0%, 100%': { transform: 'translateY(0px)' },
      '50%': { transform: 'translateY(-20px)' },
    },
    'float-slow': {
      '0%, 100%': { transform: 'translateY(0px)' },
      '50%': { transform: 'translateY(-15px)' },
    },
  },
},
  animation: {
    'accordion-down': 'accordion-down 0.2s ease-out',
    'accordion-up': 'accordion-up 0.2s ease-out',
    float: 'float 6s ease-in-out infinite',
    'float-slow': 'float-slow 8s ease-in-out infinite',
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
