#!/bin/bash

# Main homepage
cat > src/app/page.tsx << 'EOF'
'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MenuGrid from '@/components/menu/MenuGrid';
import CategoryFilter from '@/components/menu/CategoryFilter';
import { MENU, getTopSellers } from '@/data/menu';
import { MenuCategoryId } from '@/types/menu';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<MenuCategoryId | 'all'>('all');
  const topSellers = getTopSellers();

  const filteredItems = activeCategory === 'all'
    ? MENU.flatMap(category => category.items)
    : MENU.find(cat => cat.id === activeCategory)?.items || [];

  // Check if restaurant is open
  const isOpen = () => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    
    if (day === 0) { // Sunday
      return hour >= 18 && hour < 23;
    }
    // Monday-Saturday
    return hour >= 11 && hour < 23;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Apna Punjab Pizza Kebap</h1>
            <p className="text-xl mb-4">Authentic Indian & Pakistani cuisine, pizza, and kebab</p>
            <p className="text-lg mb-2">Corso Regina Margherita 251f, 10144 Turin, Italy</p>
            <p className="text-lg">
              <a href="tel:+393206879063" className="hover:underline">+39 320 687 9063</a>
            </p>
            <div className="mt-6">
              <span className={`inline-block px-4 py-2 rounded-full font-semibold ${
                isOpen() ? 'bg-green-500' : 'bg-red-500'
              }`}>
                {isOpen() ? '🟢 Open Now' : '🔴 Closed'}
              </span>
            </div>
          </div>
        </section>

        {/* Top Sellers */}
        {topSellers.length > 0 && (
          <section className="container mx-auto px-4 py-12">
            <MenuGrid items={topSellers} title="⭐ Top Sellers" />
          </section>
        )}

        {/* Full Menu */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-4xl font-bold mb-8 text-center">Our Menu</h2>
          
          <CategoryFilter
            categories={MENU.map(cat => ({ id: cat.id, name: cat.name }))}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          <MenuGrid items={filteredItems} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
EOF

# Cart page
cat > src/app/cart/page.tsx << 'EOF'
'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import { useCart } from '@/contexts/CartContext';
import Button from '@/components/ui/Button';

export default function CartPage() {
  const { state, dispatch } = useCart();

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="text-center py-12">
            <svg
              className="w-24 h-24 mx-auto text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some delicious items to get started!</p>
            <Link href="/">
              <Button>Browse Menu</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white shadow-md rounded-lg p-6">
              {state.items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
              
              <div className="mt-6">
                <Button
                  variant="outline"
                  onClick={() => dispatch({ type: 'CLEAR_CART' })}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <CartSummary />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
EOF

# Checkout page
cat > src/app/checkout/page.tsx << 'EOF'
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
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CheckoutForm />
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white shadow-md rounded-lg p-6 sticky top-4">
              <h3 className="text-xl font-bold mb-4">Order Summary</h3>
              <ul className="space-y-2 mb-4">
                {state.items.map((item) => (
                  <li key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.quantity}x {item.name}
                    </span>
                    <span>€{(item.quantity * item.price).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-orange-600">€{total.toFixed(2)}</span>
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
EOF

# Order confirmation page (dynamic route)
mkdir -p src/app/orders/[orderId]
cat > src/app/orders/[orderId]/page.tsx << 'EOF'
import React from 'react';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import OrderConfirmation from '@/components/checkout/OrderConfirmation';
import supabaseServer from '@/lib/supabaseServer';

async function getOrder(orderId: string) {
  try {
    const { data, error } = await supabaseServer
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (error) throw error;
    return data;
  } catch {
    return null;
  }
}

export default async function OrderConfirmationPage({
  params,
}: {
  params: { orderId: string };
}) {
  const order = await getOrder(params.orderId);

  if (!order) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <OrderConfirmation order={order} />
      </main>
      <Footer />
    </div>
  );
}
EOF

# Admin page
mkdir -p src/app/admin
cat > src/app/admin/page.tsx << 'EOF'
import React from 'react';
import { listRecentOrders, updateOrderStatus } from '@/lib/supabaseServer';
import { OrderStatus } from '@/types/order';

export const dynamic = 'force-dynamic';

async function AdminPage() {
  const orders = await listRecentOrders(50);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Order Management</h1>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(order.created_at!).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.customer_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                      {order.order_type}
                      {order.order_type === 'delivery' && order.address && (
                        <div className="text-xs text-gray-500">{order.address}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <ul className="text-xs">
                        {order.items.map((item: any, i: number) => (
                          <li key={i}>{item.quantity}x {item.name}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                      €{order.total_price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'accepted' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'completed' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
EOF

# Update Supabase migration
cat > supabase/migrations/001_initial_schema.sql << 'EOF'
-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  order_type TEXT NOT NULL CHECK (order_type IN ('pickup', 'delivery')),
  address TEXT,
  location_description TEXT,
  items JSONB NOT NULL,
  total_price NUMERIC(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'completed', 'cancelled'))
);

-- Create index on created_at for faster queries
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- Create index on status
CREATE INDEX idx_orders_status ON orders(status);
EOF

echo "All pages and migrations created successfully!"
