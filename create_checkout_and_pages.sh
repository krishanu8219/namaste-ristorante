#!/bin/bash

# CheckoutForm component
cat > src/components/checkout/CheckoutForm.tsx << 'EOF'
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useCart, calculateTotal } from '@/contexts/CartContext';
import { OrderFormData } from '@/types/order';

const CheckoutForm: React.FC = () => {
  const { state, dispatch } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState<OrderFormData>({
    customer_name: '',
    phone: '',
    order_type: 'pickup',
    address: '',
    location_description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const total = calculateTotal(state.items);

    const orderPayload = {
      customer_name: formData.customer_name,
      phone: formData.phone,
      order_type: formData.order_type,
      address: formData.address,
      location_description: formData.location_description,
      items: state.items.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        unit_price: item.price,
      })),
      total_price: total,
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to place order');
      }

      // Clear cart
      dispatch({ type: 'CLEAR_CART' });
      
      // Redirect to confirmation page
      router.push(`/orders/${data.orderId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to place order');
    } finally {
      setIsSubmitting(false);
    }
  };

  const total = calculateTotal(state.items);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
        
        <Input
          label="Full Name"
          type="text"
          name="customer_name"
          value={formData.customer_name}
          onChange={handleChange}
          required
          placeholder="John Doe"
        />
        
        <Input
          label="Phone Number"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder="+39 123 456 7890"
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Order Type</h2>
        
        <div className="flex gap-4 mb-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="order_type"
              value="pickup"
              checked={formData.order_type === 'pickup'}
              onChange={handleChange}
              className="mr-2"
            />
            <span>Pickup</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="order_type"
              value="delivery"
              checked={formData.order_type === 'delivery'}
              onChange={handleChange}
              className="mr-2"
            />
            <span>Delivery</span>
          </label>
        </div>

        {formData.order_type === 'delivery' && (
          <Input
            label="Delivery Address"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required={formData.order_type === 'delivery'}
            placeholder="Street, number, postal code, city"
          />
        )}

        <div className="flex flex-col mb-4">
          <label className="mb-1.5 text-sm font-medium text-gray-700">
            Additional Notes (optional)
          </label>
          <textarea
            name="location_description"
            value={formData.location_description}
            onChange={handleChange}
            rows={3}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Any special instructions..."
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="bg-gray-50 p-6 rounded-lg">
        <div className="flex justify-between text-xl font-bold mb-4">
          <span>Total:</span>
          <span className="text-orange-600">€{total.toFixed(2)}</span>
        </div>
        
        <Button
          type="submit"
          fullWidth
          disabled={isSubmitting || state.items.length === 0}
        >
          {isSubmitting ? 'Placing Order...' : 'Place Order'}
        </Button>
      </div>
    </form>
  );
};

export default CheckoutForm;
EOF

# OrderConfirmation component
cat > src/components/checkout/OrderConfirmation.tsx << 'EOF'
import React from 'react';
import Link from 'next/link';
import Button from '../ui/Button';
import { Order } from '@/types/order';

interface OrderConfirmationProps {
  order: Order;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ order }) => {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-8 mb-6">
        <svg
          className="w-16 h-16 text-green-500 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-gray-600">
          Thank you for your order. We'll notify you via WhatsApp when it's ready.
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6 text-left">
        <h2 className="text-xl font-bold mb-4">Order Details</h2>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Order ID:</span>
            <span className="font-mono">{order.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Customer:</span>
            <span>{order.customer_name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Phone:</span>
            <span>{order.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Type:</span>
            <span className="capitalize">{order.order_type}</span>
          </div>
          {order.order_type === 'delivery' && order.address && (
            <div className="flex justify-between">
              <span className="text-gray-600">Address:</span>
              <span className="text-right">{order.address}</span>
            </div>
          )}
        </div>

        <div className="border-t mt-4 pt-4">
          <h3 className="font-semibold mb-2">Items:</h3>
          <ul className="space-y-1">
            {order.items.map((item, index) => (
              <li key={index} className="flex justify-between text-sm">
                <span>
                  {item.quantity}x {item.name}
                </span>
                <span>€{(item.quantity * item.unit_price).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t mt-4 pt-4">
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span className="text-orange-600">€{order.total_price.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <Link href="/">
        <Button>Back to Menu</Button>
      </Link>
    </div>
  );
};

export default OrderConfirmation;
EOF

echo "Checkout components created successfully!"
