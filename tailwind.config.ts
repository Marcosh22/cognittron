import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      generalSans: ["General Sans", "sans-serif"],
    },
    extend: {
      colors: {
        primary: {
          100: 'rgb(var(--color-primary-100) / <alpha-value>)',
          150: 'rgb(var(--color-primary-150) / <alpha-value>)',
          200: 'rgb(var(--color-primary-200) / <alpha-value>)',
          250: 'rgb(var(--color-primary-250) / <alpha-value>)',
          300: 'rgb(var(--color-primary-300) / <alpha-value>)',
          350: 'rgb(var(--color-primary-350) / <alpha-value>)',
          400: 'rgb(var(--color-primary-400) / <alpha-value>)',
        },
        secondary: {
          100: 'rgb(var(--color-secondary-100) / <alpha-value>)',
          150: 'rgb(var(--color-secondary-150) / <alpha-value>)',
          200: 'rgb(var(--color-secondary-200) / <alpha-value>)',
          250: 'rgb(var(--color-secondary-250) / <alpha-value>)',
          300: 'rgb(var(--color-secondary-300) / <alpha-value>)',
          350: 'rgb(var(--color-secondary-350) / <alpha-value>)',
          400: 'rgb(var(--color-secondary-400) / <alpha-value>)',
        },
      },
      fontSize: {
        'sm': ['var(--font-size-sm)', {
          lineHeight: 'var(--line-height-text-sm)',
          letterSpacing: 'var(--letter-spacing-text-sm)',
        }],
        'base': ['var(--font-size-base)', {
          lineHeight: 'var(--line-height-text-base)',
          letterSpacing: 'var(--letter-spacing-text-base)',
        }],
        'lg': ['var(--font-size-lg)', {
          lineHeight: 'var(--line-height-text-lg)',
          letterSpacing: 'var(--letter-spacing-text-lg)',
        }],
        'xl': ['var(--font-size-xl)', {
          lineHeight: 'var(--line-height-text-xl)',
          letterSpacing: 'var(--letter-spacing-text-xl)',
        }],
      },
      boxShadow: {
        "elevation1": "0px 1px 2px -1px rgb(var(--color-secondary-400) / 0.08)",
        "elevation2": "0px 2px 4px -2px rgb(var(--color-secondary-400) / 0.12)",
        "elevation3": "0px 6px 16px -6px rgb(var(--color-secondary-400) / 0.1)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config
