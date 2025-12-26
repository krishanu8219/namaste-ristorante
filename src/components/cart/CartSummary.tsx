'use client';

import React from 'react';
import Link from 'next/link';
import { useCart, calculateTotal } from '@/contexts/CartContext';

const CartSummary: React.FC = () => {
  const { state } = useCart();
  const total = calculateTotal(state.items);
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      className="bg-white p-6 sm:p-8 border-3 border-ink relative"
      style={{
        borderRadius: '30px 4px 30px 4px',
        boxShadow: '6px 6px 0px rgba(45, 27, 14, 0.7)',
      }}
    >
      {/* Decorative tape */}
      <div className="absolute -top-3 right-6 w-14 h-5 bg-saffron-300/60 transform rotate-3" style={{ borderRadius: '2px' }} />

      <h3 className="font-display text-xl font-bold text-ink mb-6 flex items-center">
        <span className="mr-2">🧾</span>
        Riepilogo Ordine
      </h3>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between font-body text-ink/70 border-b-2 border-dashed border-ink/20 pb-3">
          <span>Subtotale ({itemCount} articoli)</span>
          <span className="font-display font-bold text-ink">€{total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-body text-ink/70 border-b-2 border-dashed border-ink/20 pb-3">
          <span>Costo del Servizio</span>
          <span className="font-display font-bold text-cardamom-600">Gratis! ✨</span>
        </div>
      </div>

      <div className="border-t-3 border-ink pt-6 mb-8">
        <div className="flex justify-between items-end">
          <span className="text-lg font-display font-bold text-ink">Totale</span>
          <div className="text-right">
            <span
              className="bg-saffron-400 text-ink font-display font-bold text-2xl px-5 py-2 border-2 border-ink inline-block"
              style={{
                borderRadius: '4px 20px 4px 20px',
                boxShadow: '3px 3px 0px rgba(45, 27, 14, 0.6)',
              }}
            >
              €{total.toFixed(2)}
            </span>
            <p className="font-accent text-sm text-masala-500 mt-2">IVA inclusa ✓</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {state.items.length === 0 ? (
          <button
            disabled
            className="w-full px-6 py-4 bg-ink/30 text-white font-display font-bold text-lg cursor-not-allowed border-2 border-ink/50"
            style={{
              borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
            }}
          >
            Procedi al Checkout
          </button>
        ) : (
          <Link
            href="/checkout"
            className="block w-full px-6 py-4 bg-saffron-500 text-white font-display font-bold text-lg text-center hover:bg-saffron-600 hover:scale-[1.02] transition-all border-2 border-ink"
            style={{
              borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
              boxShadow: '4px 4px 0px rgba(45, 27, 14, 0.8)',
            }}
          >
            <span className="flex items-center justify-center gap-2">
              Procedi al Checkout
              <span className="text-xl">🛒</span>
            </span>
          </Link>
        )}

        <Link
          href="/"
          className="block w-full px-6 py-4 bg-cream text-ink font-display font-bold text-lg text-center hover:bg-turmeric-100 transition-all border-2 border-ink"
          style={{
            borderRadius: '15px 225px 15px 255px / 255px 15px 225px 15px',
            boxShadow: '3px 3px 0px rgba(45, 27, 14, 0.5)',
          }}
        >
          <span className="flex items-center justify-center gap-2">
            <span className="text-xl">🍽️</span>
            Continua lo Shopping
          </span>
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;
