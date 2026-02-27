import type { Config } from 'tailwindcss'

export default {
  content: [],
  theme: {
    extend: {
      colors: {
        bg: '#f5f3f8',
        'bg-warm': '#eee9f3',
        accent: {
          DEFAULT: '#6b5b95',
          light: '#8d7db5',
          dark: '#524578',
        },
        lilac: '#b8a9c9',
        'soft-violet': '#ddd5e8',
        'warm-rose': '#c9919e',
        'text-primary': '#1e1a2a',
        'text-secondary': '#6b6580',
        'text-muted': '#9e96ad',
      },
      fontFamily: {
        heading: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
        body: ['DM Sans', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
    },
  },
} satisfies Config
