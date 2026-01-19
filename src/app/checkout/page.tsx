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

  const total = calculateTotal(state.items, state.serviceCost);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-cream-bg to-[#f5ebe0]">
      <Header />
      <main className="flex-1 py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Premium Page Header */}
            <div className="text-center mb-8 sm:mb-12 animate-fade-in">
              {/* Decorative Element */}
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold-accent to-transparent"></div>
                <span className="text-gold-accent text-2xl">✦</span>
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold-accent to-transparent"></div>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-red mb-3 tracking-wide">
                Completa l&apos;Ordine
              </h1>
              <p className="text-gray-600 font-body max-w-md mx-auto">
                Un ultimo passo per gustare le nostre specialità
              </p>

              {/* Progress Indicator */}
              <div className="flex items-center justify-center gap-2 mt-6">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold">✓</span>
                  <span className="text-sm text-gray-500 hidden sm:inline">Carrello</span>
                </div>
                <div className="w-8 h-px bg-gold-accent"></div>
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-deep-red text-gold-accent flex items-center justify-center text-sm font-bold animate-pulse">2</span>
                  <span className="text-sm text-deep-red font-bold hidden sm:inline">Checkout</span>
                </div>
                <div className="w-8 h-px bg-gray-300"></div>
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm font-bold">3</span>
                  <span className="text-sm text-gray-400 hidden sm:inline">Conferma</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Checkout Form */}
              <div className="lg:col-span-2 order-2 lg:order-1">
                <CheckoutForm />
              </div>

              {/* Order Summary - Enhanced */}
              <div className="lg:col-span-1 order-1 lg:order-2">
                <div className="sticky top-24">
                  <div className="bg-gradient-to-br from-white via-white to-cream-bg p-5 sm:p-6 rounded-2xl shadow-xl border border-gold-accent/30 relative overflow-hidden">
                    {/* Decorative Pattern */}
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                      <svg viewBox="0 0 100 100" className="w-full h-full text-deep-red">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
                        <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" />
                        <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
                      </svg>
                    </div>

                    {/* Header with Icon */}
                    <div className="flex items-center gap-3 mb-5 pb-4 border-b-2 border-dotted border-gold-accent/30">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-deep-red to-medium-red flex items-center justify-center shadow-lg">
                        <span className="text-lg">🛒</span>
                      </div>
                      <h3 className="font-serif text-xl font-bold text-deep-red">
                        Il Tuo Ordine
                      </h3>
                    </div>

                    {/* Items List */}
                    <ul className="space-y-3 mb-5 max-h-64 overflow-y-auto pr-2 scrollbar-thin">
                      {state.items.map((item) => (
                        <li key={item.id} className="flex justify-between items-start text-sm bg-cream-bg/50 rounded-lg p-3 border border-gold-accent/10">
                          <div className="flex-1">
                            <span className="font-serif font-bold text-deep-red">{item.quantity}×</span>
                            <span className="font-body text-gray-700 ml-2">{item.name}</span>
                          </div>
                          <span className="font-serif font-bold text-medium-red whitespace-nowrap ml-3">
                            €{(item.quantity * item.price).toFixed(2)}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Subtotals */}
                    <div className="space-y-2 py-4 border-t border-dashed border-gray-200">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Subtotale</span>
                        <span className="font-medium">€{calculateTotal(state.items).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Costo Servizio</span>
                        <span className={`font-medium ${state.serviceCost === 0 ? 'text-green-600' : 'text-gray-700'}`}>
                          {state.serviceCost === 0 ? 'Gratis ✨' : `€${state.serviceCost?.toFixed(2)}`}
                        </span>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="bg-gradient-to-r from-deep-red to-medium-red rounded-xl p-4 -mx-2 mt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-cream-bg font-serif font-bold text-lg">Totale</span>
                        <div className="text-right">
                          <span className="bg-gold-accent text-white font-serif font-bold text-2xl px-4 py-2 rounded-lg shadow-lg inline-block">
                            €{total.toFixed(2)}
                          </span>
                          <p className="text-cream-bg/80 text-xs mt-1">IVA inclusa</p>
                        </div>
                      </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="flex items-center justify-center gap-4 mt-5 pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <span>🔒</span>
                        <span>Pagamento Sicuro</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <span>⚡</span>
                        <span>Consegna Veloce</span>
                      </div>
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
