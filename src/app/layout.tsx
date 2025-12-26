import type { Metadata } from 'next';
import { Fredoka, Nunito, Caveat } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/contexts/CartContext';

const fredoka = Fredoka({
  subsets: ['latin'],
  variable: '--font-fredoka',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
  weight: ['400', '600', '700', '800'],
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'NAMASTE Ristorante | Authentic Indian Cuisine',
  description: 'Experience the magic of authentic Indian flavors at NAMASTE Ristorante. Hand-crafted tandoori, aromatic curries, and traditional recipes prepared with love.',
  keywords: 'Indian restaurant, authentic Indian food, tandoori, curry, biryani, naan, vegetarian, halal',
  openGraph: {
    title: 'NAMASTE Ristorante | Authentic Indian Cuisine',
    description: 'Experience the magic of authentic Indian flavors',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fredoka.variable} ${nunito.variable} ${caveat.variable}`}>
      <body className="font-body antialiased bg-cream text-ink overflow-x-hidden">
        <CartProvider>
          {/* Decorative floating spices */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            <div className="absolute top-20 left-10 text-6xl opacity-10 animate-float" style={{ animationDelay: '0s' }}>🌶️</div>
            <div className="absolute top-40 right-20 text-5xl opacity-10 animate-float" style={{ animationDelay: '1s' }}>🍃</div>
            <div className="absolute bottom-40 left-20 text-4xl opacity-10 animate-float" style={{ animationDelay: '2s' }}>✨</div>
            <div className="absolute bottom-20 right-10 text-5xl opacity-10 animate-float" style={{ animationDelay: '0.5s' }}>🌿</div>
            <div className="absolute top-1/2 left-5 text-4xl opacity-10 animate-float" style={{ animationDelay: '1.5s' }}>🍛</div>
          </div>

          <div className="relative z-10">
            {children}
          </div>
        </CartProvider>
      </body>
    </html>
  );
}