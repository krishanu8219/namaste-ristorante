'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Order } from '@/types/order';
import { useCart } from '@/contexts/CartContext';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const { dispatch } = useCart();

  useEffect(() => {
    const data = searchParams.get('data');
    if (data) {
      try {
        const parsedOrder = JSON.parse(decodeURIComponent(data));
        setOrder(parsedOrder);
        // Clear the cart once the order is confirmed and loaded
        dispatch({ type: 'CLEAR_CART' });
      } catch (e) {
        console.error('Failed to parse order data', e);
      }
    }
  }, [searchParams, dispatch]);

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-gradient-to-br from-cream via-turmeric-50 to-parchment flex items-center justify-center py-16">
          <div className="text-center animate-fade-in">
            <div className="w-16 h-16 border-4 border-saffron-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <h1 className="font-display text-2xl font-bold text-ink">Caricamento...</h1>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col print:bg-white">
      <div className="print:hidden">
        <Header />
      </div>

      <main className="flex-1 bg-gradient-to-br from-cream via-turmeric-50 to-parchment relative overflow-hidden py-12 print:bg-white print:p-0">
        {/* Decorative elements - hidden in print */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-saffron-200/20 blob-shape animate-blob print:hidden" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cardamom-200/15 blob-shape-2 animate-blob print:hidden" style={{ animationDelay: '4s' }} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 print:p-0 print:w-full">
          <div
            className="max-w-2xl mx-auto bg-white overflow-hidden border-3 border-ink print:border-0 print:shadow-none"
            style={{
              borderRadius: '30px 4px 30px 4px',
              boxShadow: '8px 8px 0px rgba(45, 27, 14, 0.7)',
            }}
          >
            {/* Success Header - Hidden in Print */}
            <div className="bg-cardamom-100 p-8 text-center border-b-3 border-ink print:hidden relative">
              {/* Confetti animation */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-4 left-1/4 text-3xl animate-bounce-gentle">🎉</div>
                <div className="absolute top-6 right-1/4 text-2xl animate-bounce-gentle" style={{ animationDelay: '0.3s' }}>✨</div>
                <div className="absolute bottom-4 left-1/3 text-2xl animate-wiggle-slow">🍛</div>
              </div>

              <div
                className="w-20 h-20 bg-cardamom-500 flex items-center justify-center mx-auto mb-4 border-3 border-ink"
                style={{
                  borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                  boxShadow: '4px 4px 0px rgba(45, 27, 14, 0.6)',
                }}
              >
                <span className="text-4xl">✓</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-2">
                Ordine Confermato! 🎉
              </h1>
              <p className="font-body text-ink/70">
                Grazie per il tuo ordine. Abbiamo inviato una conferma al ristorante.
              </p>
            </div>

            {/* Receipt Content */}
            <div className="p-8 print:p-4 bg-gradient-to-br from-cream to-parchment print:bg-white">
              <div className="text-center mb-8 border-b-2 border-dashed border-ink/30 pb-8 print:border-black">
                <h2 className="font-display text-2xl font-bold text-ink mb-2">
                  NAMASTE Ristorante
                </h2>
                <span className="font-accent text-lg text-masala-500 block mb-2">
                  authentic flavors ✨
                </span>
                <p className="font-body text-ink/70 text-sm print:text-black">
                  Ricevuta Ordine #{order.id?.slice(-6)}
                </p>
                <p className="font-body text-ink/70 text-sm print:text-black">
                  {new Date(order.created_at!).toLocaleString('it-IT')}
                </p>
              </div>

              <div className="space-y-6">
                {/* Customer Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-display font-bold text-ink print:text-black">Cliente</p>
                    <p className="font-body text-ink/80 print:text-black">{order.customer_name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display font-bold text-ink print:text-black">Telefono</p>
                    <p className="font-body text-ink/80 print:text-black">{order.phone}</p>
                  </div>
                  <div>
                    <p className="font-display font-bold text-ink print:text-black">Tipo Ordine</p>
                    <span
                      className="inline-block bg-saffron-200 text-ink font-display font-bold text-xs px-3 py-1 mt-1 border-2 border-ink"
                      style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}
                    >
                      {order.order_type === 'delivery' ? '🚗 Consegna' : '🏪 Ritiro'}
                    </span>
                  </div>
                  {order.order_type === 'delivery' && (
                    <div className="text-right">
                      <p className="font-display font-bold text-ink print:text-black">Indirizzo</p>
                      <p className="font-body text-ink/80 print:text-black">{order.address}</p>
                    </div>
                  )}
                </div>

                {/* Items Table */}
                <div className="mt-8">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-ink print:border-black">
                        <th className="text-left py-2 font-display font-bold text-ink print:text-black">Q.tà</th>
                        <th className="text-left py-2 font-display font-bold text-ink print:text-black">Articolo</th>
                        <th className="text-right py-2 font-display font-bold text-ink print:text-black">Prezzo</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-dashed divide-ink/20 print:divide-gray-300">
                      {order.items.map((item, index) => (
                        <tr key={index}>
                          <td className="py-3 font-display font-bold text-ink print:text-black">{item.quantity}x</td>
                          <td className="py-3 font-body text-ink/80 print:text-black">{item.name}</td>
                          <td className="py-3 text-right font-body text-ink/80 print:text-black">€{item.unit_price.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-3 border-ink print:border-black">
                        <td colSpan={2} className="py-4 text-lg font-display font-bold text-ink print:text-black">Totale</td>
                        <td className="py-4 text-right">
                          <span
                            className="bg-turmeric-400 text-ink font-display font-bold text-lg px-4 py-1 border-2 border-ink print:bg-transparent print:border-0"
                            style={{ borderRadius: '4px 20px 4px 20px' }}
                          >
                            €{order.total_price.toFixed(2)}
                          </span>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {order.location_description && (
                  <div
                    className="mt-6 bg-turmeric-50 p-4 border-2 border-ink print:border print:border-gray-300 print:bg-white"
                    style={{ borderRadius: '15px 225px 15px 255px / 255px 15px 225px 15px' }}
                  >
                    <p className="text-sm font-display font-bold text-ink print:text-black mb-1">📝 Note:</p>
                    <p className="text-sm font-body text-ink/80 print:text-black">{order.location_description}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Actions - Hidden in Print */}
            <div className="bg-cream px-8 py-6 border-t-3 border-ink flex flex-col sm:flex-row gap-4 justify-center print:hidden">
              <button
                onClick={handlePrint}
                className="px-6 py-3 bg-cream text-ink font-display font-bold transition-all border-2 border-ink flex items-center justify-center gap-2 hover:bg-turmeric-100"
                style={{
                  borderRadius: '15px 225px 15px 255px / 255px 15px 225px 15px',
                  boxShadow: '3px 3px 0px rgba(45, 27, 14, 0.5)',
                }}
              >
                <span>🖨️</span>
                Stampa Ricevuta
              </button>
              <Link
                href="/"
                className="px-6 py-3 bg-saffron-500 text-white font-display font-bold transition-all border-2 border-ink flex items-center justify-center gap-2 hover:bg-saffron-600 hover:scale-105"
                style={{
                  borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                  boxShadow: '4px 4px 0px rgba(45, 27, 14, 0.8)',
                }}
              >
                <span>Torna alla Home</span>
                <span>🏠</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <div className="print:hidden">
        <Footer />
      </div>

      {/* Print-only Footer */}
      <div className="hidden print:block text-center text-xs mt-8">
        <p className="font-accent">Grazie per aver scelto NAMASTE Ristorante! ✨</p>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-gradient-to-br from-cream via-turmeric-50 to-parchment flex items-center justify-center">
          <div className="text-center animate-fade-in">
            <div
              className="w-20 h-20 bg-turmeric-100 flex items-center justify-center mx-auto mb-4 border-3 border-ink animate-wiggle-slow"
              style={{
                borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                boxShadow: '4px 4px 0px rgba(45, 27, 14, 0.6)',
              }}
            >
              <span className="text-3xl">⏳</span>
            </div>
            <h1 className="font-display text-2xl font-bold text-ink mb-2">Caricamento...</h1>
            <p className="font-body text-ink/70">Un momento, per favore! ✨</p>
          </div>
        </main>
        <Footer />
      </div>
    }>
      <OrderConfirmationContent />
    </Suspense>
  );
}
