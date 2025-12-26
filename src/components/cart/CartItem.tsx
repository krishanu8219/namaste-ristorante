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
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-6 gap-4">
      <div className="flex items-center gap-4 flex-1">
        {item.image && (
          <div
            className="relative w-20 h-20 overflow-hidden flex-shrink-0 border-2 border-ink"
            style={{
              borderRadius: '15px 225px 15px 255px / 255px 15px 225px 15px',
              boxShadow: '3px 3px 0px rgba(45, 27, 14, 0.5)',
            }}
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div>
          <h3 className="font-display font-bold text-ink text-lg mb-1">{item.name}</h3>
          <p className="text-sm font-body text-ink/60">€{item.price.toFixed(2)} cadauno</p>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-6">
        <div
          className="flex items-center bg-cream p-1 border-2 border-ink"
          style={{
            borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
            boxShadow: '2px 2px 0px rgba(45, 27, 14, 0.4)',
          }}
        >
          <button
            onClick={() => dispatch({ type: 'DECREMENT_ITEM', payload: { id: item.id } })}
            className="w-9 h-9 bg-white text-ink hover:bg-turmeric-100 flex items-center justify-center transition-all font-display font-bold text-lg border border-ink/30"
            style={{ borderRadius: '15px 5px 15px 5px' }}
          >
            −
          </button>
          <span className="w-12 text-center font-display font-bold text-ink text-lg">{item.quantity}</span>
          <button
            onClick={() => dispatch({ type: 'INCREMENT_ITEM', payload: { id: item.id } })}
            className="w-9 h-9 bg-saffron-500 text-white hover:bg-saffron-600 flex items-center justify-center transition-all font-display font-bold text-lg border border-ink/30"
            style={{ borderRadius: '5px 15px 5px 15px' }}
          >
            +
          </button>
        </div>

        <div className="flex items-center gap-4">
          <span
            className="bg-turmeric-400 text-ink font-display font-bold px-4 py-1.5 border-2 border-ink"
            style={{
              borderRadius: '4px 20px 4px 20px',
              boxShadow: '2px 2px 0px rgba(45, 27, 14, 0.5)',
            }}
          >
            €{(item.price * item.quantity).toFixed(2)}
          </span>

          <button
            onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: { id: item.id } })}
            className="text-ink/50 hover:text-masala-600 transition-all p-2 hover:bg-masala-50 border-2 border-transparent hover:border-ink/30"
            style={{ borderRadius: '50%' }}
            title="Rimuovi articolo"
          >
            <span className="text-xl">🗑️</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
