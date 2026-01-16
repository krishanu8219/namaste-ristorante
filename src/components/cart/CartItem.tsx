'use client';

import React from 'react';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { CartItem as CartItemType } from '@/types/cart';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { dispatch } = useCart();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-6 gap-4 border-b border-dotted border-gray-300 last:border-0">
      <div className="flex items-center gap-4 flex-1">
        {item.image && (
          <div className="relative w-24 h-24 overflow-hidden flex-shrink-0 rounded-lg border-2 border-gold-accent/30 shadow-md">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div>
          <h3 className="font-serif font-bold text-deep-red text-xl mb-1">{item.name}</h3>
          <p className="text-sm font-body text-gray-600">€{item.price.toFixed(2)} cadauno</p>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-6">
        {/* Quantity Controls */}
        <div className="flex items-center bg-beige-sidebar rounded-full border border-gold-accent/30 shadow-sm">
          <button
            onClick={() => dispatch({ type: 'DECREMENT_ITEM', payload: { id: item.id } })}
            className="w-10 h-10 text-medium-red hover:bg-gold-accent hover:text-white flex items-center justify-center transition-all font-bold text-xl rounded-l-full"
          >
            −
          </button>
          <span className="w-12 text-center font-serif font-bold text-deep-red text-lg">{item.quantity}</span>
          <button
            onClick={() => dispatch({ type: 'INCREMENT_ITEM', payload: { id: item.id } })}
            className="w-10 h-10 bg-gold-accent text-white hover:bg-medium-red flex items-center justify-center transition-all font-bold text-xl rounded-r-full"
          >
            +
          </button>
        </div>

        {/* Price and Remove */}
        <div className="flex items-center gap-4">
          <span className="bg-gold-accent/10 text-medium-red font-serif font-bold px-4 py-2 rounded border border-gold-accent/30">
            €{(item.price * item.quantity).toFixed(2)}
          </span>

          <button
            onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: { id: item.id } })}
            className="text-gray-400 hover:text-red-600 transition-all p-2 hover:bg-red-50 rounded-full"
            title="Rimuovi articolo"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
