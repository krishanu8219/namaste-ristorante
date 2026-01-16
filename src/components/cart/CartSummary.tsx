'use client';

import React from 'react';
import Link from 'next/link';
import { useCart, calculateTotal } from '@/contexts/CartContext';

const CartSummary: React.FC = () => {
  const { state } = useCart();
  const total = calculateTotal(state.items);
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-premium border border-gold-accent/20 relative">
      {/* Ornamental Corner */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-gold-accent/20 rounded-tl-xl pointer-events-none"></div>

      <h3 className="font-serif text-2xl font-bold text-deep-red mb-6 pb-4 border-b-2 border-dotted border-gray-300">
        Riepilogo Ordine
      </h3>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between font-body text-gray-700 pb-3 border-b border-dotted border-gray-200">
          <span>Subtotale ({itemCount} articoli)</span>
          <span className="font-serif font-bold text-deep-red">€{total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-body text-gray-700 pb-3 border-b border-dotted border-gray-200">
          <span>Costo del Servizio</span>
          <span className="font-serif font-bold text-green-600">Gratis! ✨</span>
        </div>
      </div>

      <div className="border-t-2 border-deep-red pt-6 mb-8">
        <div className="flex justify-between items-end">
          <span className="text-lg font-serif font-bold text-deep-red">Totale</span>
          <div className="text-right">
            <span className="bg-gold-accent text-white font-serif font-bold text-3xl px-6 py-3 rounded shadow-md inline-block">
              €{total.toFixed(2)}
            </span>
            <p className="font-body text-sm text-gray-500 mt-2">IVA inclusa ✓</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {state.items.length === 0 ? (
          <button
            disabled
            className="w-full px-6 py-4 bg-gray-300 text-gray-500 font-serif font-bold text-lg cursor-not-allowed rounded"
          >
            Procedi al Checkout
          </button>
        ) : (
          <Link
            href="/checkout"
            className="block w-full px-6 py-4 bg-gold-accent text-white font-serif font-bold text-lg text-center hover:bg-medium-red transition-all rounded shadow-lg"
          >
            <span className="flex items-center justify-center gap-2">
              Procedi al Checkout
              <span className="text-xl">→</span>
            </span>
          </Link>
        )}

        <Link
          href="/menu"
          className="block w-full px-6 py-4 bg-cream-bg text-medium-red font-serif font-bold text-lg text-center hover:bg-beige-sidebar transition-all rounded border border-gold-accent/30"
        >
          <span className="flex items-center justify-center gap-2">
            <span className="text-xl">←</span>
            Continua lo Shopping
          </span>
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;
