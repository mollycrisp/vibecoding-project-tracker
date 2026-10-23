
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#2563EB',
        'brand-accent': '#60A5FA',

        'surface-page': '#F8FAFC',
        'surface-card': '#FFFFFF',

        'text-primary': '#0F172A',
        'text-muted': '#64748B',

        'type-feature': '#0D9488',
        'type-bug': '#DC2626',

        feature: '#0D9488',
        bug: '#DC2626',

        'due-safe': '#16A34A',
        'due-warning': '#D97706',
        'due-overdue': '#DC2626',
        'due-neutral': '#64748B',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
