import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}', 
    './public/index.html'
  ],
  theme: {
    extend: {
      colors: {
        // Warm, spicy Indian palette - Indie Artist Style
        turmeric: {
          50: '#FFFBEB',
          100: '#FFF3C4',
          200: '#FCE588',
          300: '#FADB5F',
          400: '#F7C948',
          500: '#F0B429',
          600: '#DE911D',
          700: '#CB6E17',
          800: '#B44D12',
          900: '#8D2B0B',
        },
        masala: {
          50: '#FFF5F0',
          100: '#FFE8DC',
          200: '#FFCDB2',
          300: '#FFB088',
          400: '#FF8A5B',
          500: '#E85D3B',
          600: '#C93E22',
          700: '#A52A1A',
          800: '#7D1D15',
          900: '#5C1410',
        },
        cardamom: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
        },
        saffron: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },
        cream: '#FDF8F3',
        parchment: '#F5E6D3',
        ink: '#2D1B0E',
        charcoal: '#3D2914',
      },
      fontFamily: {
        display: ['var(--font-fredoka)', 'Baloo 2', 'sans-serif'],
        body: ['var(--font-nunito)', 'Comic Neue', 'sans-serif'],
        accent: ['var(--font-caveat)', 'Patrick Hand', 'cursive'],
        heading: ['var(--font-fredoka)', 'Baloo 2', 'sans-serif'],
      },
      borderRadius: {
        'blob': '30% 70% 70% 30% / 30% 30% 70% 70%',
        'blob-2': '60% 40% 30% 70% / 60% 30% 70% 40%',
        'blob-3': '40% 60% 60% 40% / 70% 30% 30% 70%',
        'sketchy': '255px 15px 225px 15px / 15px 225px 15px 255px',
        '4xl': '2rem',
      },
      boxShadow: {
        'sketchy': '4px 4px 0px rgba(45, 27, 14, 0.8)',
        'sketchy-lg': '6px 6px 0px rgba(45, 27, 14, 0.8)',
        'sketchy-xl': '8px 8px 0px rgba(45, 27, 14, 0.8)',
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 40px rgba(249, 115, 22, 0.3)',
        'inner-sketch': 'inset 2px 2px 0px rgba(45, 27, 14, 0.3)',
      },
      animation: {
        'wiggle': 'wiggle 0.5s ease-in-out infinite',
        'wiggle-slow': 'wiggle 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'blob': 'blob 7s ease-in-out infinite',
        'squiggle': 'squiggle 0.3s ease-in-out',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        blob: {
          '0%': { borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' },
          '25%': { borderRadius: '58% 42% 75% 25% / 76% 46% 54% 24%' },
          '50%': { borderRadius: '50% 50% 33% 67% / 55% 27% 73% 45%' },
          '75%': { borderRadius: '33% 67% 58% 42% / 63% 68% 32% 37%' },
          '100%': { borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' },
        },
        squiggle: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-3px) rotate(-1deg)' },
          '75%': { transform: 'translateX(3px) rotate(1deg)' },
        },
      },
      backgroundImage: {
        'paper-texture': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};

export default config;