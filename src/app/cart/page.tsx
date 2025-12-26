'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import { useCart } from '@/contexts/CartContext';

export default function CartPage() {
  const { state, dispatch } = useCart();

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-gradient-to-br from-cream via-turmeric-50 to-parchment relative overflow-hidden flex items-center justify-center py-16">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-saffron-200/20 blob-shape animate-blob" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-masala-200/10 blob-shape-2 animate-blob" style={{ animationDelay: '4s' }} />

          <div className="text-center max-w-md mx-auto px-4 relative z-10 animate-fade-in">
            <div
              className="inline-flex items-center justify-center w-28 h-28 bg-turmeric-100 mb-6 border-3 border-ink animate-wiggle-slow"
              style={{
                borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                boxShadow: '5px 5px 0px rgba(45, 27, 14, 0.6)',
              }}
            >
              <span className="text-5xl">🛒</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-3">
              Il tuo carrello è vuoto
            </h2>
            <p className="font-body text-ink/70 mb-8 text-lg">
              Sembra che tu non abbia ancora aggiunto piatti deliziosi.
            </p>
            <span className="font-accent text-lg text-saffron-500 block mb-6">
              vai a esplorare! ✨
            </span>
            <Link
              href="/"
              className="inline-flex items-center px-8 py-4 bg-saffron-500 text-white font-display font-bold text-lg hover:bg-saffron-600 transition-all space-x-3 border-3 border-ink hover:scale-105"
              style={{
                borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                boxShadow: '5px 5px 0px rgba(45, 27, 14, 0.8)',
              }}
            >
              <span>Sfoglia il Menù</span>
              <span className="text-xl">🍛</span>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gradient-to-br from-cream via-turmeric-50 to-parchment relative overflow-hidden py-12 sm:py-16">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-saffron-200/20 blob-shape animate-blob" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-masala-200/10 blob-shape-2 animate-blob" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/3 left-10 text-4xl opacity-10 animate-float">🛒</div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10 animate-fade-in">
            <span className="font-accent text-xl text-masala-500 block mb-2">
              quasi pronto! ✨
            </span>
            <h1 className="section-title">
              🛒 Il tuo Carrello 🛒
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div
                className="bg-white p-6 sm:p-8 border-3 border-ink"
                style={{
                  borderRadius: '30px 4px 30px 4px',
                  boxShadow: '6px 6px 0px rgba(45, 27, 14, 0.7)',
                }}
              >
                <div className="divide-y-2 divide-dashed divide-ink/20">
                  {state.items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => dispatch({ type: 'CLEAR_CART' })}
                    className="px-6 py-3 bg-cream text-masala-600 font-display font-bold hover:bg-masala-100 transition-all border-2 border-ink flex items-center space-x-2"
                    style={{
                      borderRadius: '15px 225px 15px 255px / 255px 15px 225px 15px',
                      boxShadow: '3px 3px 0px rgba(45, 27, 14, 0.5)',
                    }}
                  >
                    <span>Svuota Carrello</span>
                    <span>🗑️</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <CartSummary />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
