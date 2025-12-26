'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart, calculateTotal } from '@/contexts/CartContext';
import { OrderFormData } from '@/types/order';

const CheckoutForm: React.FC = () => {
  const { state } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<OrderFormData>({
    customer_name: '',
    phone: '',
    email: '',
    order_type: 'pickup',
    payment_method: 'cash',
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

      const orderData = encodeURIComponent(JSON.stringify(data.order));
      router.push(`/order-confirmation?data=${orderData}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to place order');
    } finally {
      setIsSubmitting(false);
    }
  };

  const total = calculateTotal(state.items);

  const inputStyles = {
    borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Contact Information */}
      <div
        className="bg-white p-6 sm:p-8 border-3 border-ink relative"
        style={{
          borderRadius: '30px 4px 30px 4px',
          boxShadow: '6px 6px 0px rgba(45, 27, 14, 0.7)',
        }}
      >
        {/* Decorative tape */}
        <div className="absolute -top-3 left-8 w-16 h-5 bg-saffron-300/60 transform -rotate-3" style={{ borderRadius: '2px' }} />

        <h2 className="font-display text-2xl font-bold text-ink mb-6 flex items-center">
          <span className="mr-2">👤</span>
          Informazioni di Contatto
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="mb-2 font-display font-bold text-ink text-sm">Nome Completo *</label>
            <input
              type="text"
              name="customer_name"
              value={formData.customer_name}
              onChange={handleChange}
              required
              placeholder="Mario Rossi"
              className="px-4 py-3 bg-cream text-ink border-2 border-ink focus:ring-4 focus:ring-turmeric-200 transition-all font-body"
              style={inputStyles}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-display font-bold text-ink text-sm">Numero di Telefono *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="+39 123 456 7890"
              className="px-4 py-3 bg-cream text-ink border-2 border-ink focus:ring-4 focus:ring-turmeric-200 transition-all font-body"
              style={inputStyles}
            />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="mb-2 font-display font-bold text-ink text-sm">Email (per ricevuta) *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="mario@email.com"
              className="px-4 py-3 bg-cream text-ink border-2 border-ink focus:ring-4 focus:ring-turmeric-200 transition-all font-body"
              style={inputStyles}
            />
          </div>
        </div>
      </div>

      {/* Order Type */}
      <div
        className="bg-white p-6 sm:p-8 border-3 border-ink relative"
        style={{
          borderRadius: '4px 30px 4px 30px',
          boxShadow: '6px 6px 0px rgba(45, 27, 14, 0.7)',
        }}
      >
        <div className="absolute -top-3 right-8 w-14 h-5 bg-turmeric-300/60 transform rotate-2" style={{ borderRadius: '2px' }} />

        <h2 className="font-display text-2xl font-bold text-ink mb-6 flex items-center">
          <span className="mr-2">📦</span>
          Tipo di Ordine
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <label
            className={`
              relative flex flex-col items-center justify-center p-5 cursor-pointer transition-all duration-200 border-3 border-ink
              ${formData.order_type === 'pickup'
                ? 'bg-cardamom-100 scale-[1.02]'
                : 'bg-cream hover:bg-turmeric-50'}
            `}
            style={{
              borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
              boxShadow: formData.order_type === 'pickup'
                ? '4px 4px 0px rgba(45, 27, 14, 0.8)'
                : '2px 2px 0px rgba(45, 27, 14, 0.4)',
            }}
          >
            <input
              type="radio"
              name="order_type"
              value="pickup"
              checked={formData.order_type === 'pickup'}
              onChange={handleChange}
              className="sr-only"
            />
            <span className="text-3xl mb-2">🏪</span>
            <span className="font-display font-bold text-ink">Ritiro in Sede</span>
          </label>

          <label
            className={`
              relative flex flex-col items-center justify-center p-5 cursor-pointer transition-all duration-200 border-3 border-ink
              ${formData.order_type === 'delivery'
                ? 'bg-saffron-100 scale-[1.02]'
                : 'bg-cream hover:bg-turmeric-50'}
            `}
            style={{
              borderRadius: '15px 225px 15px 255px / 255px 15px 225px 15px',
              boxShadow: formData.order_type === 'delivery'
                ? '4px 4px 0px rgba(45, 27, 14, 0.8)'
                : '2px 2px 0px rgba(45, 27, 14, 0.4)',
            }}
          >
            <input
              type="radio"
              name="order_type"
              value="delivery"
              checked={formData.order_type === 'delivery'}
              onChange={handleChange}
              className="sr-only"
            />
            <span className="text-3xl mb-2">🚗</span>
            <span className="font-display font-bold text-ink">Consegna a Casa</span>
          </label>
        </div>

        {formData.order_type === 'delivery' && (
          <div className="mb-6 animate-fade-in">
            <label className="mb-2 font-display font-bold text-ink text-sm block">Indirizzo di Consegna *</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required={formData.order_type === 'delivery'}
              placeholder="Via, numero civico, CAP, città"
              className="w-full px-4 py-3 bg-cream text-ink border-2 border-ink focus:ring-4 focus:ring-turmeric-200 transition-all font-body"
              style={inputStyles}
            />
          </div>
        )}

        <div className="flex flex-col">
          <label className="mb-2 font-display font-bold text-ink text-sm">
            Note Aggiuntive (opzionale) 📝
          </label>
          <textarea
            name="location_description"
            value={formData.location_description}
            onChange={handleChange}
            rows={3}
            className="px-4 py-3 bg-cream text-ink border-2 border-ink focus:ring-4 focus:ring-turmeric-200 transition-all resize-none font-body"
            style={{ borderRadius: '15px 225px 15px 255px / 255px 15px 225px 15px' }}
            placeholder="Istruzioni speciali, allergie, preferenze..."
          />
        </div>
      </div>

      {/* Payment Method */}
      <div
        className="bg-white p-6 sm:p-8 border-3 border-ink relative"
        style={{
          borderRadius: '30px 4px 30px 4px',
          boxShadow: '6px 6px 0px rgba(45, 27, 14, 0.7)',
        }}
      >
        <div className="absolute -top-3 left-12 w-12 h-5 bg-cardamom-300/60 transform -rotate-1" style={{ borderRadius: '2px' }} />

        <h2 className="font-display text-2xl font-bold text-ink mb-6 flex items-center">
          <span className="mr-2">💳</span>
          Metodo di Pagamento
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { value: 'cash', label: 'Contanti', emoji: '💵' },
            { value: 'satispay', label: 'Satispay', emoji: '📱' },
            { value: 'card', label: 'Carta/Bancomat', emoji: '💳' },
          ].map((method) => (
            <label
              key={method.value}
              className={`
                relative flex flex-col items-center justify-center p-5 cursor-pointer transition-all duration-200 border-2 border-ink
                ${formData.payment_method === method.value
                  ? 'bg-cardamom-100 scale-[1.02]'
                  : 'bg-cream hover:bg-turmeric-50'}
              `}
              style={{
                borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                boxShadow: formData.payment_method === method.value
                  ? '4px 4px 0px rgba(45, 27, 14, 0.8)'
                  : '2px 2px 0px rgba(45, 27, 14, 0.4)',
              }}
            >
              <input
                type="radio"
                name="payment_method"
                value={method.value}
                checked={formData.payment_method === method.value}
                onChange={handleChange}
                className="sr-only"
              />
              <span className="text-3xl mb-2">{method.emoji}</span>
              <span className="font-display font-bold text-ink text-sm">{method.label}</span>
            </label>
          ))}
        </div>
      </div>

      {error && (
        <div
          className="bg-masala-100 border-3 border-ink text-ink px-6 py-4 flex items-center"
          style={{
            borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
            boxShadow: '4px 4px 0px rgba(45, 27, 14, 0.6)',
          }}
        >
          <span className="text-2xl mr-3">⚠️</span>
          <span className="font-body">{error}</span>
        </div>
      )}

      {/* Submit Section */}
      <div
        className="bg-white p-6 sm:p-8 border-3 border-ink"
        style={{
          borderRadius: '4px 30px 4px 30px',
          boxShadow: '6px 6px 0px rgba(45, 27, 14, 0.7)',
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <span className="font-display text-xl font-bold text-ink">Totale da Pagare</span>
          <span
            className="bg-saffron-400 text-ink font-display font-bold text-2xl px-5 py-2 border-2 border-ink"
            style={{
              borderRadius: '4px 20px 4px 20px',
              boxShadow: '3px 3px 0px rgba(45, 27, 14, 0.6)',
            }}
          >
            €{total.toFixed(2)}
          </span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || state.items.length === 0}
          className={`
            w-full px-8 py-5 font-display font-bold text-xl transition-all border-3 border-ink flex items-center justify-center gap-3
            ${isSubmitting || state.items.length === 0
              ? 'bg-ink/30 text-white cursor-not-allowed'
              : 'bg-saffron-500 text-white hover:bg-saffron-600 hover:scale-[1.02]'
            }
          `}
          style={{
            borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
            boxShadow: isSubmitting ? 'none' : '5px 5px 0px rgba(45, 27, 14, 0.8)',
          }}
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin">⏳</span>
              <span>Invio in corso...</span>
            </>
          ) : (
            <>
              <span>Invia Ordine</span>
              <span className="text-2xl">🛵</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
