'use client';

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { CartState, CartAction, CartItem } from '@/types/cart';

const initialState: CartState = {
  items: [],
  serviceCost: 0,
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      // ... (ADD_ITEM logic)
      const existingItem = state.items.find(item => item.id === action.payload.id);

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      };
    }

    case 'INCREMENT_ITEM': {
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }

    case 'DECREMENT_ITEM': {
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ).filter(item => item.quantity > 0),
      };
    }

    case 'CLEAR_CART': {
      return { ...initialState, serviceCost: 0 };
    }

    case 'SET_SERVICE_COST': {
      return {
        ...state,
        serviceCost: action.payload
      };
    }

    case 'SET_ORDER_TYPE': {
      return {
        ...state,
        orderType: action.payload
      };
    }

    case 'SET_DELIVERY_ADDRESS': {
      return {
        ...state,
        deliveryAddress: action.payload
      };
    }

    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, (initial) => {
    // Load cart from localStorage on mount
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          return JSON.parse(savedCart);
        } catch {
          return initial;
        }
      }
    }
    return initial;
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(state));
    }
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

// Helper function to calculate total
export const calculateTotal = (items: CartItem[], serviceCost: number = 0): number => {
  const itemsTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return itemsTotal + serviceCost;
};