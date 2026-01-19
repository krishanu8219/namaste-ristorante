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
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-cream-bg to-[#f5ebe0]">
        <Header />
        <main className="flex-1 flex items-center justify-center py-16">
          <div className="text-center max-w-md mx-auto px-4 relative z-10 animate-fade-in">
            {/* Empty Cart Illustration */}
            <div className="relative inline-block mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-cream-bg to-beige-sidebar rounded-full border-4 border-gold-accent/30 flex items-center justify-center shadow-xl">
                <span className="text-6xl opacity-90">🛒</span>
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-deep-red rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                <span className="text-white text-lg">0</span>
              </div>
            </div>

            {/* Title */}
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-deep-red mb-4">
              Il tuo carrello è vuoto
            </h2>
            <p className="font-body text-gray-600 mb-8 text-lg leading-relaxed">
              Scopri le nostre specialità indiane e aggiungi i tuoi piatti preferiti!
            </p>

            {/* Decorative Divider */}
            <div className="flex items-center justify-center gap-4 my-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-gold-accent to-transparent"></div>
              <span className="text-gold-accent text-xl">✦</span>
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-gold-accent to-transparent"></div>
            </div>

            {/* CTA Button */}
            <Link
              href="/menu"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-deep-red to-medium-red text-white font-serif font-bold text-lg hover:from-medium-red hover:to-deep-red transition-all space-x-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <span>Esplora il Menù</span>
              <span className="text-xl">→</span>
            </Link>

            {/* Suggested Categories */}
            <div className="mt-10 pt-8 border-t border-gold-accent/20">
              <p className="text-sm text-gray-500 mb-4">Categorie popolari</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['🍛 Curry', '🍗 Tandoori', '🥘 Biryani', '🫓 Naan'].map((cat) => (
                  <Link
                    key={cat}
                    href="/menu"
                    className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-gold-accent hover:text-white transition-all shadow-sm border border-gold-accent/20"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-cream-bg to-[#f5ebe0]">
      <Header />
      <main className="flex-1 py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Premium Page Header */}
          <div className="text-center mb-8 sm:mb-12 animate-fade-in">
            {/* Decorative Element */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold-accent to-transparent"></div>
              <span className="text-gold-accent text-2xl">✦</span>
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold-accent to-transparent"></div>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-red mb-3 tracking-wide">
              Il Tuo Carrello
            </h1>
            <p className="text-gray-600 font-body">
              {state.items.length} {state.items.length === 1 ? 'piatto selezionato' : 'piatti selezionati'}
            </p>

            {/* Progress Indicator */}
            <div className="flex items-center justify-center gap-2 mt-6">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-deep-red text-gold-accent flex items-center justify-center text-sm font-bold animate-pulse">1</span>
                <span className="text-sm text-deep-red font-bold hidden sm:inline">Carrello</span>
              </div>
              <div className="w-8 h-px bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm font-bold">2</span>
                <span className="text-sm text-gray-400 hidden sm:inline">Checkout</span>
              </div>
              <div className="w-8 h-px bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm font-bold">3</span>
                <span className="text-sm text-gray-400 hidden sm:inline">Conferma</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {/* Cart Items */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="bg-gradient-to-br from-white via-white to-cream-bg p-5 sm:p-6 rounded-2xl shadow-xl border border-gold-accent/20 relative overflow-hidden">
                {/* Decorative Pattern */}
                <div className="absolute top-0 left-0 w-24 h-24 opacity-5">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-gold-accent">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
                    <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" />
                    <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </div>

                <div className="flex items-center gap-3 mb-5 pb-4 border-b-2 border-dotted border-gold-accent/30 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-deep-red to-medium-red flex items-center justify-center shadow-lg">
                    <span className="text-lg">🍽️</span>
                  </div>
                  <h2 className="font-serif text-xl font-bold text-deep-red">
                    I Tuoi Piatti
                  </h2>
                </div>

                <div className="space-y-3 relative z-10">
                  {state.items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>

                {/* Actions Bar */}
                <div className="mt-6 pt-5 border-t border-gold-accent/20 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">
                  <Link
                    href="/menu"
                    className="inline-flex items-center px-5 py-2.5 text-medium-red font-serif font-bold hover:text-gold-accent transition-colors space-x-2 group"
                  >
                    <span className="group-hover:-translate-x-1 transition-transform">←</span>
                    <span>Aggiungi altri piatti</span>
                  </Link>

                  <button
                    onClick={() => dispatch({ type: 'CLEAR_CART' })}
                    className="px-5 py-2.5 bg-gray-100 text-gray-600 font-serif font-medium hover:bg-red-50 hover:text-red-600 transition-all rounded-lg flex items-center space-x-2 border border-gray-200 hover:border-red-200"
                  >
                    <span>Svuota Carrello</span>
                    <span>🗑️</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1 order-1 lg:order-2">
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
