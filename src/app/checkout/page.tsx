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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gradient-to-br from-cream via-turmeric-50 to-parchment relative overflow-hidden py-12 sm:py-16">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-saffron-200/20 blob-shape animate-blob" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-masala-200/10 blob-shape-2 animate-blob" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/4 right-10 text-4xl opacity-10 animate-float">📝</div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 animate-fade-in">
              <span className="font-accent text-xl text-masala-500 block mb-2">
                ultimo passo! ✨
              </span>
              <h1 className="section-title">
                📋 Completa l&apos;ordine 📋
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <CheckoutForm />
              </div>

              <div className="lg:col-span-1">
                <div
                  className="bg-white p-6 sticky top-24 border-3 border-ink"
                  style={{
                    borderRadius: '30px 4px 30px 4px',
                    boxShadow: '6px 6px 0px rgba(45, 27, 14, 0.7)',
                  }}
                >
                  {/* Decorative tape */}
                  <div className="absolute -top-3 left-6 w-14 h-5 bg-turmeric-300/60 transform -rotate-3" style={{ borderRadius: '2px' }} />

                  <h3 className="font-display text-xl font-bold text-ink mb-6 flex items-center">
                    <span className="mr-2">🧾</span>
                    Riepilogo Ordine
                  </h3>
                  <ul className="space-y-4 mb-6">
                    {state.items.map((item) => (
                      <li key={item.id} className="flex justify-between text-sm border-b-2 border-dashed border-ink/20 pb-3">
                        <span className="font-body text-ink/80">
                          <span className="font-display font-bold text-ink">{item.quantity}x</span> {item.name}
                        </span>
                        <span className="font-display font-bold text-ink">€{(item.quantity * item.price).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t-3 border-ink pt-6">
                    <div className="flex justify-between items-end">
                      <span className="text-lg font-display font-bold text-ink">Totale</span>
                      <span
                        className="bg-saffron-400 text-ink font-display font-bold text-xl px-4 py-2 border-2 border-ink"
                        style={{
                          borderRadius: '4px 20px 4px 20px',
                          boxShadow: '3px 3px 0px rgba(45, 27, 14, 0.6)',
                        }}
                      >
                        €{total.toFixed(2)}
                      </span>
                    </div>
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
