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
      <div className="bg-green-50 border-2 border-green-100 rounded-3xl p-8 sm:p-12 mb-8 animate-fadeIn">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">Ordine Confermato!</h1>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          Grazie per il tuo ordine. Ti avviseremo su WhatsApp quando sarà pronto.
        </p>
      </div>

      <div className="bg-white shadow-soft rounded-2xl p-6 sm:p-8 mb-8 text-left">
        <h2 className="text-xl font-display font-bold text-gray-900 mb-6">Dettagli Ordine</h2>
        
        <div className="space-y-4 text-sm mb-8">
          <div className="flex justify-between py-2 border-b border-gray-50">
            <span className="text-gray-500">ID Ordine</span>
            <span className="font-mono font-medium text-gray-900">{order.id}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-50">
            <span className="text-gray-500">Cliente</span>
            <span className="font-medium text-gray-900">{order.customer_name}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-50">
            <span className="text-gray-500">Telefono</span>
            <span className="font-medium text-gray-900">{order.phone}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-50">
            <span className="text-gray-500">Tipo</span>
            <span className="capitalize font-medium text-gray-900 px-3 py-1 bg-gray-100 rounded-full">
              {order.order_type === 'pickup' ? 'Ritiro' : 'Consegna'}
            </span>
          </div>
          {order.order_type === 'delivery' && order.address && (
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span className="text-gray-500">Indirizzo</span>
              <span className="text-right font-medium text-gray-900 max-w-[60%]">{order.address}</span>
            </div>
          )}
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="font-bold text-gray-900 mb-4">Articoli</h3>
          <ul className="space-y-3 mb-6">
            {order.items.map((item, index) => (
              <li key={index} className="flex justify-between text-sm">
                <span className="text-gray-700">
                  <span className="font-bold text-gray-900 mr-2">{item.quantity}x</span>
                  {item.name}
                </span>
                <span className="font-medium text-gray-900">€{(item.quantity * item.unit_price).toFixed(2)}</span>
              </li>
            ))}
          </ul>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-end">
              <span className="text-lg font-bold text-gray-900">Totale</span>
              <span className="text-2xl font-display font-bold text-primary-600">€{order.total_price.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <Link href="/">
        <div className="inline-block font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-orange-600 text-white hover:bg-orange-700 focus:ring-orange-500 px-6 py-3 text-lg shadow-soft-lg">
          Torna al Menù
        </div>
      </Link>
    </div>
  );
};

export default OrderConfirmation;
