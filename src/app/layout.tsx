import type { Metadata } from 'next';
import { Playfair_Display, Lato, Caveat, Cormorant_Garamond, Montserrat } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/contexts/CartContext';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const lato = Lato({
  subsets: ['latin'],
  variable: '--font-lato',
  display: 'swap',
  weight: ['300', '400', '700'],
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'NAMASTE Ristorante | Fine Indian Dining in Torino',
  description: 'Since 1990, NAMASTE has brought authentic Indian fine dining to Torino. Experience exquisite tandoori, aromatic curries, and traditional recipes crafted with 30+ years of passion.',
  keywords: 'fine dining Indian restaurant Torino, authentic Indian cuisine, tandoori, curry, biryani, best Indian restaurant Turin',
  openGraph: {
    title: 'NAMASTE Ristorante | Fine Indian Dining in Torino',
    description: 'Since 1990, authentic Indian fine dining excellence in Torino. 4.8★ rated.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={`${playfair.variable} ${lato.variable} ${caveat.variable} ${cormorant.variable} ${montserrat.variable}`}>
      <body className="font-body antialiased bg-ivory text-charcoal overflow-x-hidden">
        <CartProvider>
          <div className="relative z-10">
            {children}
          </div>
        </CartProvider>
      </body>
    </html>
  );
}