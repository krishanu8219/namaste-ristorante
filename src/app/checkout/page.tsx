'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import { useCart, calculateTotal } from '@/contexts/CartContext';

export default function CheckoutPage() {
  const { state } = useCart();
  const router = useRouter();

  // Redirect if cart is empty
  React.useEffect(() => {
    if (state.items.length === 0) {
      router.push('/cart');
    }
  }, [state.items, router]);

  if (state.items.length === 0) {
    return null;
  }

  const total = calculateTotal(state.items);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA8ThA0_URR8glx1EvVT9FRTwgbUvOl6FwFwk0DXFKQI2XVntOnXWGFfIRB_wq0SRwLZgCYd-d71a8LZkqHp6GPXlbmDyGcbe_r4auOKv1ArxIFq_00fZ44abwQJTEVv_1bHtXbx9fAfru8Jt1QuvN0FecOxUOARSC9-wL8txoznplmq6jUnCOOeNfeEd2OygoxB-8Gbc1-Plefs3OBiTB9CZ5DfhbaumvaUmw4EFvJQuQfMVu1gPeARe8J94QALM8bMF_GiYVYDup')", backgroundRepeat: "repeat" }}>
      <Header />
      <main className="flex-1 py-12 sm:py-16 bg-cream-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-12 animate-fade-in">
              <div className="ornament-divider mb-4">
                <span className="text-2xl">★</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-deep-red mb-3">
                Completa l&apos;Ordine
              </h1>
              <p className="text-gray-600 font-body">
                Inserisci i tuoi dettagli per completare l&apos;ordine
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Checkout Form */}
              <div className="lg:col-span-2">
                <CheckoutForm />
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white p-6 sticky top-24 rounded-xl shadow-premium border border-gold-accent/20">
                  {/* Ornamental Corner */}
                  <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-gold-accent/20 rounded-tr-xl pointer-events-none"></div>

                  <h3 className="font-serif text-2xl font-bold text-deep-red mb-6 pb-4 border-b-2 border-dotted border-gray-300">
                    Riepilogo Ordine
                  </h3>

                  <ul className="space-y-4 mb-6">
                    {state.items.map((item) => (
                      <li key={item.id} className="flex justify-between text-sm border-b border-dotted border-gray-200 pb-3">
                        <span className="font-body text-gray-700">
                          <span className="font-serif font-bold text-medium-red">{item.quantity}x</span> {item.name}
                        </span>
                        <span className="font-serif font-bold text-deep-red">€{(item.quantity * item.price).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="border-t-2 border-deep-red pt-6">
                    <div className="flex justify-between items-end">
                      <span className="text-lg font-serif font-bold text-deep-red">Totale</span>
                      <span className="bg-gold-accent text-white font-serif font-bold text-2xl px-5 py-2 rounded shadow-md">
                        €{total.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-3 text-right">IVA inclusa ✓</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
