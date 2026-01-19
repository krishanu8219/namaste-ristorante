'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart, calculateTotal } from '@/contexts/CartContext';
import { OrderFormData, PaymentMethod } from '@/types/order';
import PayPalButton from './PayPalButton';

// Payment method configuration
const paymentMethods: { value: PaymentMethod; label: string; description: string; sublabel?: string }[] = [
  { value: 'stripe', label: 'Carta di Credito / Debito', description: 'Transazione sicura' },
  { value: 'paypal', label: 'PayPal', description: 'Paga con PayPal' },
  { value: 'satispay', label: 'Satispay', description: 'App di pagamento mobile' },
  { value: 'cash', label: 'Contanti alla Consegna', description: 'Paga direttamente al fattorino' },
];

const CheckoutForm: React.FC = () => {
  const { state } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [orderId, setOrderId] = useState<string | null>(null);

  // Initialize form data with values from cart context (auto-fill)
  const [formData, setFormData] = useState<OrderFormData>({
    customer_name: '',
    phone: '',
    email: '',
    order_type: state.orderType === 'pickup' ? 'pickup' : 'delivery',
    payment_method: 'stripe',
    address: state.deliveryAddress || '',
    location_description: '',
  });

  // Update form when cart context changes (in case user navigates back and forth)
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      order_type: state.orderType === 'pickup' ? 'pickup' : 'delivery',
      address: state.deliveryAddress || prev.address,
    }));
  }, [state.orderType, state.deliveryAddress]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const total = calculateTotal(state.items);

  // Create order in backend
  const createOrder = async (): Promise<string | null> => {
    const orderPayload = {
      customer_name: formData.customer_name,
      phone: formData.phone,
      email: formData.email,
      order_type: formData.order_type,
      payment_method: formData.payment_method,
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

    return data.orderId;
  };

  // Handle Stripe payment
  const handleStripePayment = async () => {
    setIsSubmitting(true);
    setError('');

    try {
      const newOrderId = await createOrder();
      if (!newOrderId) throw new Error('Failed to create order');

      setOrderId(newOrderId);

      const response = await fetch('/api/stripe/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: newOrderId,
          items: state.items.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            unit_price: item.price,
          })),
          customerEmail: formData.email,
          customerName: formData.customer_name,
          totalPrice: total,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed');
      setIsSubmitting(false);
    }
  };

  // Handle Satispay payment
  const handleSatispayPayment = async () => {
    setIsSubmitting(true);
    setError('');

    try {
      const newOrderId = await createOrder();
      if (!newOrderId) throw new Error('Failed to create order');

      setOrderId(newOrderId);

      const response = await fetch('/api/satispay/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: newOrderId,
          totalPrice: total,
          customerName: formData.customer_name,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create Satispay payment');
      }

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed');
      setIsSubmitting(false);
    }
  };

  // Handle cash payment
  const handleCashPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const orderPayload = {
        customer_name: formData.customer_name,
        phone: formData.phone,
        email: formData.email,
        order_type: formData.order_type,
        payment_method: 'cash',
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

      const orderData = encodeURIComponent(JSON.stringify(data.order));
      router.push(`/order-confirmation?data=${orderData}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to place order');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle PayPal success
  const handlePayPalSuccess = async (transactionId: string) => {
    router.push(`/payment/success?provider=paypal&order_id=${orderId}&transaction_id=${transactionId}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.payment_method === 'cash') {
      await handleCashPayment(e);
    } else if (formData.payment_method === 'stripe') {
      await handleStripePayment();
    } else if (formData.payment_method === 'satispay') {
      await handleSatispayPayment();
    }
  };

  const isFormValid = () => {
    if (!formData.customer_name || !formData.phone || !formData.email) return false;
    if (formData.order_type === 'delivery' && !formData.address) return false;
    return state.items.length > 0;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Section 1: Delivery Method */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden border-t-2 border-deep-red relative">
        <div className="mandala-watermark absolute inset-0 opacity-20 pointer-events-none"></div>
        <div className="p-3 md:p-4 relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-deep-red text-gold-accent font-bold font-serif text-sm">1</span>
            <h3 className="font-display text-lg font-bold text-deep-red">Metodo di Consegna</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className="cursor-pointer group">
              <input
                type="radio"
                name="order_type"
                value="delivery"
                checked={formData.order_type === 'delivery'}
                onChange={handleChange}
                className="sr-only"
              />
              <div className={`border-2 rounded-lg p-3 hover:border-gold-accent transition-all h-full flex flex-col items-center text-center ${formData.order_type === 'delivery' ? 'border-deep-red bg-red-50' : 'border-gray-200'
                }`}>
                <div className={`w-4 h-4 rounded-full border-2 mb-2 flex items-center justify-center ${formData.order_type === 'delivery' ? 'border-deep-red' : 'border-gray-300'
                  }`}>
                  <div className={`w-2 h-2 rounded-full transition-colors ${formData.order_type === 'delivery' ? 'bg-deep-red' : 'bg-transparent'
                    }`}></div>
                </div>
                <svg className="w-7 h-7 text-gold-accent mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
                <span className="font-bold text-base text-gray-800">Consegna a Domicilio</span>
                <span className="text-xs text-gray-500 mt-0.5">30-45 min</span>
              </div>
            </label>
            <label className="cursor-pointer group">
              <input
                type="radio"
                name="order_type"
                value="pickup"
                checked={formData.order_type === 'pickup'}
                onChange={handleChange}
                className="sr-only"
              />
              <div className={`border-2 rounded-lg p-3 hover:border-gold-accent transition-all h-full flex flex-col items-center text-center ${formData.order_type === 'pickup' ? 'border-deep-red bg-red-50' : 'border-gray-200'
                }`}>
                <div className={`w-4 h-4 rounded-full border-2 mb-2 flex items-center justify-center ${formData.order_type === 'pickup' ? 'border-deep-red' : 'border-gray-300'
                  }`}>
                  <div className={`w-2 h-2 rounded-full transition-colors ${formData.order_type === 'pickup' ? 'bg-deep-red' : 'bg-transparent'
                    }`}></div>
                </div>
                <svg className="w-7 h-7 text-gold-accent mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="font-bold text-base text-gray-800">Ritiro al Ristorante</span>
                <span className="text-xs text-gray-500 mt-0.5">Pronto in 20 min</span>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Section 2: Your Details */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden border-t-2 border-deep-red relative">
        <div className="p-3 md:p-4 relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-deep-red text-gold-accent font-bold font-serif text-sm">2</span>
            <h3 className="font-display text-lg font-bold text-deep-red">I Tuoi Dati</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs uppercase font-bold text-gray-500 tracking-wider" htmlFor="customer_name">Nome Completo</label>
              <input
                className="w-full rounded-md py-2 px-3 text-sm text-gray-800 border-gray-300 border focus:border-deep-red focus:ring-1 focus:ring-deep-red transition-all"
                id="customer_name"
                name="customer_name"
                value={formData.customer_name}
                onChange={handleChange}
                placeholder="Mario Rossi"
                required
                type="text"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase font-bold text-gray-500 tracking-wider" htmlFor="phone">Telefono</label>
              <input
                className="w-full rounded-md py-2 px-3 text-sm text-gray-800 border-gray-300 border focus:border-deep-red focus:ring-1 focus:ring-deep-red transition-all"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+39 333 1234567"
                required
                type="tel"
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-xs uppercase font-bold text-gray-500 tracking-wider" htmlFor="email">Email</label>
              <input
                className="w-full rounded-md py-2 px-3 text-sm text-gray-800 border-gray-300 border focus:border-deep-red focus:ring-1 focus:ring-deep-red transition-all"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="mario.rossi@example.com"
                required
                type="email"
              />
            </div>
          </div>

          {formData.order_type === 'delivery' && (
            <div className="mt-3 pt-3 border-t border-gray-100 animate-fade-in">
              <h4 className="font-bold text-sm text-gray-700 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-gold-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Indirizzo di Consegna
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
                <div className="md:col-span-6 space-y-1">
                  <label className="text-xs uppercase font-bold text-gray-500 tracking-wider" htmlFor="address">Via / Piazza</label>
                  <input
                    className="w-full rounded-md py-2 px-3 text-sm text-gray-800 border-gray-300 border focus:border-deep-red focus:ring-1 focus:ring-deep-red transition-all"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Via Roma 10, 00100 Roma"
                    required={formData.order_type === 'delivery'}
                    type="text"
                  />
                </div>
                <div className="md:col-span-6 space-y-1">
                  <label className="text-xs uppercase font-bold text-gray-500 tracking-wider" htmlFor="location_description">Citofono / Note</label>
                  <input
                    className="w-full rounded-md py-2 px-3 text-sm text-gray-800 border-gray-300 border focus:border-deep-red focus:ring-1 focus:ring-deep-red transition-all"
                    id="location_description"
                    name="location_description"
                    value={formData.location_description}
                    onChange={handleChange}
                    placeholder="Scala B, Int. 4"
                    type="text"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Section 3: Payment */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden border-t-2 border-deep-red relative">
        <div className="p-3 md:p-4 relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-deep-red text-gold-accent font-bold font-serif text-sm">3</span>
            <h3 className="font-display text-lg font-bold text-deep-red">Pagamento</h3>
          </div>
          <div className="space-y-2">
            {paymentMethods.map((method) => {
              const isSelected = formData.payment_method === method.value;
              return (
                <label key={method.value} className="cursor-pointer group block">
                  <input
                    type="radio"
                    name="payment_method"
                    value={method.value}
                    checked={isSelected}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`border rounded-lg p-2.5 hover:border-gold-accent transition-all flex items-center justify-between ${isSelected ? 'border-deep-red bg-red-50' : 'border-gray-200'
                    }`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-deep-red' : 'border-gray-300'
                        }`}>
                        <div className={`w-2 h-2 rounded-full transition-colors ${isSelected ? 'bg-deep-red' : 'bg-transparent'
                          }`}></div>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-gray-800">{method.label}</span>
                        <span className="text-xs text-gray-500">{method.description}</span>
                      </div>
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-800 px-4 py-3 rounded">
          <p className="font-bold font-serif mb-1 text-sm">Errore</p>
          <p className="font-body text-xs">{error}</p>
        </div>
      )}

      {/* PayPal Button */}
      {formData.payment_method === 'paypal' && isFormValid() && (
        <div className="bg-white rounded-lg shadow-md p-3">
          <PayPalButton
            orderId={orderId || 'pending'}
            items={state.items.map(item => ({
              id: item.id,
              name: item.name,
              quantity: item.quantity,
              unit_price: item.price,
            }))}
            totalPrice={total}
            customerName={formData.customer_name}
            customerEmail={formData.email}
            onSuccess={handlePayPalSuccess}
            onError={(err) => setError(err)}
            onCancel={() => setError('Pagamento annullato')}
          />
        </div>
      )}

      {/* Submit Button */}
      {formData.payment_method !== 'paypal' && (
        <button
          type="submit"
          disabled={isSubmitting || !isFormValid()}
          className={`
            w-full py-3 rounded font-bold uppercase tracking-widest transition-colors shadow-lg flex items-center justify-center gap-2 group text-sm
            ${isSubmitting || !isFormValid()
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-deep-red text-gold-accent hover:bg-red-900'}
          `}
        >
          {isSubmitting ? 'Elaborazione in corso...' : 'Conferma Ordine'}
          {!isSubmitting && (
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          )}
        </button>
      )}

      {formData.payment_method === 'paypal' && !isFormValid() && (
        <div className="text-center text-gray-600 font-body text-sm">
          Compila tutti i campi richiesti per visualizzare il pulsante PayPal
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;
