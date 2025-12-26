#!/bin/bash

# CategoryFilter component
cat > src/components/menu/CategoryFilter.tsx << 'EOF'
'use client';

import React from 'react';
import { MenuCategoryId } from '@/types/menu';

interface CategoryFilterProps {
  categories: Array<{ id: MenuCategoryId; name: string }>;
  activeCategory: MenuCategoryId | 'all';
  onCategoryChange: (categoryId: MenuCategoryId | 'all') => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <div className="mb-8 overflow-x-auto">
      <div className="flex gap-2 pb-2">
        <button
          onClick={() => onCategoryChange('all')}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
            activeCategory === 'all'
              ? 'bg-orange-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All Items
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              activeCategory === category.id
                ? 'bg-orange-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
EOF

# CartItem component
cat > src/components/cart/CartItem.tsx << 'EOF'
'use client';

import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { CartItem as CartItemType } from '@/types/cart';
import Button from '../ui/Button';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { dispatch } = useCart();

  return (
    <div className="flex items-center justify-between py-4 border-b">
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{item.name}</h3>
        <p className="text-sm text-gray-600">€{item.price.toFixed(2)} each</p>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => dispatch({ type: 'DECREMENT_ITEM', payload: { id: item.id } })}
            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
          >
            −
          </button>
          <span className="w-8 text-center font-semibold">{item.quantity}</span>
          <button
            onClick={() => dispatch({ type: 'INCREMENT_ITEM', payload: { id: item.id } })}
            className="w-8 h-8 rounded-full bg-orange-600 hover:bg-orange-700 text-white flex items-center justify-center"
          >
            +
          </button>
        </div>
        
        <div className="w-20 text-right font-bold">
          €{(item.price * item.quantity).toFixed(2)}
        </div>
        
        <button
          onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: { id: item.id } })}
          className="text-red-600 hover:text-red-800"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
EOF

# CartSummary component
cat > src/components/cart/CartSummary.tsx << 'EOF'
'use client';

import React from 'react';
import Link from 'next/link';
import { useCart, calculateTotal } from '@/contexts/CartContext';
import Button from '../ui/Button';

const CartSummary: React.FC = () => {
  const { state } = useCart();
  const total = calculateTotal(state.items);
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 sticky top-4">
      <h3 className="text-xl font-bold mb-4">Order Summary</h3>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Items ({itemCount}):</span>
          <span>€{total.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="border-t pt-4 mb-6">
        <div className="flex justify-between text-lg font-bold">
          <span>Total:</span>
          <span className="text-orange-600">€{total.toFixed(2)}</span>
        </div>
      </div>
      
      <Link href="/checkout">
        <Button fullWidth disabled={state.items.length === 0}>
          Proceed to Checkout
        </Button>
      </Link>
      
      <Link href="/">
        <Button variant="outline" fullWidth className="mt-2">
          Continue Shopping
        </Button>
      </Link>
    </div>
  );
};

export default CartSummary;
EOF

echo "All remaining components created!"
