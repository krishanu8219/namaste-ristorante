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
      <div className="min-h-screen flex flex-col" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA8ThA0_URR8glx1EvVT9FRTwgbUvOl6FwFwk0DXFKQI2XVntOnXWGFfIRB_wq0SRwLZgCYd-d71a8LZkqHp6GPXlbmDyGcbe_r4auOKv1ArxIFq_00fZ44abwQJTEVv_1bHtXbx9fAfru8Jt1QuvN0FecOxUOARSC9-wL8txoznplmq6jUnCOOeNfeEd2OygoxB-8Gbc1-Plefs3OBiTB9CZ5DfhbaumvaUmw4EFvJQuQfMVu1gPeARe8J94QALM8bMF_GiYVYDup')", backgroundRepeat: "repeat" }}>
        <Header />
        <main className="flex-1 bg-cream-bg flex items-center justify-center py-16">
          <div className="text-center max-w-md mx-auto px-4 relative z-10 animate-fade-in">
            <div className="inline-flex items-center justify-center w-28 h-28 bg-beige-sidebar mb-6 rounded-full border-4 border-gold-accent shadow-xl">
              <span className="text-6xl">🛒</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-deep-red mb-4">
              Il tuo carrello è vuoto
            </h2>
            <p className="font-body text-gray-600 mb-8 text-lg leading-relaxed">
              Sembra che tu non abbia ancora aggiunto piatti deliziosi al tuo ordine.
            </p>
            <div className="ornament-divider my-6">
              <span className="text-xl">★</span>
            </div>
            <Link
              href="/menu"
              className="inline-flex items-center px-8 py-4 bg-gold-accent text-white font-serif font-bold text-lg hover:bg-medium-red transition-all space-x-3 rounded shadow-lg"
            >
              <span>Esplora il Menù</span>
              <span className="text-xl">→</span>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA8ThA0_URR8glx1EvVT9FRTwgbUvOl6FwFwk0DXFKQI2XVntOnXWGFfIRB_wq0SRwLZgCYd-d71a8LZkqHp6GPXlbmDyGcbe_r4auOKv1ArxIFq_00fZ44abwQJTEVv_1bHtXbx9fAfru8Jt1QuvN0FecOxUOARSC9-wL8txoznplmq6jUnCOOeNfeEd2OygoxB-8Gbc1-Plefs3OBiTB9CZ5DfhbaumvaUmw4EFvJQuQfMVu1gPeARe8J94QALM8bMF_GiYVYDup')", backgroundRepeat: "repeat" }}>
      <Header />
      <main className="flex-1 py-12 sm:py-16 bg-cream-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Page Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="ornament-divider mb-4">
              <span className="text-2xl">★</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-deep-red mb-3">
              Il Tuo Carrello
            </h1>
            <p className="text-gray-600 font-body">
              Rivedi i tuoi piatti selezionati e procedi al checkout
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white p-6 sm:p-8 rounded-xl shadow-premium border border-gold-accent/20">
                <h2 className="font-serif text-2xl font-bold text-medium-red mb-6 pb-4 border-b-2 border-dotted border-gray-300">
                  I Tuoi Piatti
                </h2>

                <div className="space-y-4">
                  {state.items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
                  <Link
                    href="/menu"
                    className="inline-flex items-center px-6 py-3 text-medium-red font-serif font-bold hover:text-gold-accent transition-colors space-x-2"
                  >
                    <span>←</span>
                    <span>Continua lo Shopping</span>
                  </Link>

                  <button
                    onClick={() => dispatch({ type: 'CLEAR_CART' })}
                    className="px-6 py-3 bg-gray-100 text-gray-700 font-serif font-bold hover:bg-gray-200 transition-all rounded flex items-center space-x-2 border border-gray-300"
                  >
                    <span>Svuota Carrello</span>
                    <span>🗑️</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
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
