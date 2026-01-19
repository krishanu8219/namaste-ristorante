'use client';

import React from 'react';
import Link from 'next/link';
import { useCart, calculateTotal } from '@/contexts/CartContext';

const CartSummary: React.FC = () => {
  const { state, dispatch } = useCart();
  const total = calculateTotal(state.items, state.serviceCost);
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const [calcError, setCalcError] = React.useState<string | null>(null);
  const [isCalculating, setIsCalculating] = React.useState(false);
  const [showAddressInput, setShowAddressInput] = React.useState(false);
  const [manualAddress, setManualAddress] = React.useState(state.deliveryAddress || '');
  const [suggestions, setSuggestions] = React.useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = React.useState(false);

  // Initialize order type from context or default to undefined (user must choose)
  const orderType = state.orderType;

  // Handle order type change
  const handleOrderTypeChange = (type: 'delivery' | 'pickup') => {
    dispatch({ type: 'SET_ORDER_TYPE', payload: type });
    setCalcError(null);

    if (type === 'pickup') {
      // Takeaway is always free
      dispatch({ type: 'SET_SERVICE_COST', payload: 0 });
      setShowAddressInput(false);
    } else {
      // For delivery, check if we already have an address with calculated cost
      if (!state.deliveryAddress) {
        // Reset service cost until address is provided
        dispatch({ type: 'SET_SERVICE_COST', payload: 0 });
      }
    }
  };

  // Debounce search
  React.useEffect(() => {
    const timer = setTimeout(async () => {
      if (showAddressInput && manualAddress.length >= 3) {
        try {
          const { searchAddressSuggestions } = await import('@/utils/geocoding');
          const results = await searchAddressSuggestions(manualAddress);
          setSuggestions(results);
          setShowSuggestions(true);
        } catch (e) {
          console.error(e);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [manualAddress, showAddressInput]);


  const calculateCostFromCoordinates = async (latitude: number, longitude: number, address?: string) => {
    const { calculateHaversineDistance, RESTAURANT_COORDINATES } = await import('@/utils/distance');

    const distance = calculateHaversineDistance(
      latitude,
      longitude,
      RESTAURANT_COORDINATES.latitude,
      RESTAURANT_COORDINATES.longitude
    );

    let cost = 0;
    if (distance <= 1.5) {
      cost = 0;
    } else if (distance <= 3.0) {
      cost = 1.0;
    } else if (distance <= 5.0) {
      cost = 2.0;
    } else {
      setCalcError('Spiacenti, non possiamo consegnare al tuo indirizzo (> 5km)');
      dispatch({ type: 'SET_SERVICE_COST', payload: 0 });
      setIsCalculating(false);
      return;
    }

    dispatch({ type: 'SET_SERVICE_COST', payload: cost });
    // Store the address for checkout auto-fill
    if (address) {
      dispatch({ type: 'SET_DELIVERY_ADDRESS', payload: address });
    }
    setIsCalculating(false);
  };

  const handleGeolocation = () => {
    setIsCalculating(true);
    setCalcError(null);
    setShowAddressInput(false);

    if (!navigator.geolocation) {
      setCalcError('Geolocalizzazione non supportata');
      setIsCalculating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        // Try to reverse geocode to get address
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
          );
          const data = await response.json();
          const address = data.display_name || '';
          setManualAddress(address);
          calculateCostFromCoordinates(position.coords.latitude, position.coords.longitude, address);
        } catch {
          calculateCostFromCoordinates(position.coords.latitude, position.coords.longitude);
        }
      },
      (error) => {
        console.error(error);
        setCalcError('Impossibile ottenere la posizione. Verifica i permessi.');
        setIsCalculating(false);
      }
    );
  };

  const handleSelectSuggestion = (suggestion: any) => {
    const address = suggestion.display_name;
    setManualAddress(address);
    setShowSuggestions(false);
    setIsCalculating(true);
    setCalcError(null);
    calculateCostFromCoordinates(parseFloat(suggestion.lat), parseFloat(suggestion.lon), address);
  };

  const handleManualAddress = async () => {
    if (!manualAddress.trim()) {
      setCalcError('Inserisci un indirizzo valido');
      return;
    }

    setIsCalculating(true);
    setCalcError(null);
    setShowSuggestions(false);

    try {
      const { getCoordinatesFromAddress } = await import('@/utils/geocoding');
      const coords = await getCoordinatesFromAddress(manualAddress);

      if (coords) {
        calculateCostFromCoordinates(coords.latitude, coords.longitude, manualAddress);
      } else {
        setCalcError('Indirizzo non trovato. Prova ad essere più specifico.');
        setIsCalculating(false);
      }
    } catch (error) {
      console.error(error);
      setCalcError('Errore durante la ricerca dell\'indirizzo.');
      setIsCalculating(false);
    }
  };

  // Check if we can proceed to checkout
  const canProceed = () => {
    if (state.items.length === 0) return false;
    if (!orderType) return false;
    if (orderType === 'delivery') {
      // For delivery, must have valid address (no error about > 5km)
      if (calcError && calcError.includes('> 5km')) return false;
      if (!state.deliveryAddress && state.serviceCost === 0 && !manualAddress) return false;
    }
    return true;
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-premium border border-gold-accent/20 relative">
      <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-gold-accent/20 rounded-tl-xl pointer-events-none"></div>

      <h3 className="font-serif text-2xl font-bold text-deep-red mb-6 pb-4 border-b-2 border-dotted border-gray-300">
        Riepilogo Ordine
      </h3>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between font-body text-gray-700 pb-3 border-b border-dotted border-gray-200">
          <span>Subtotale ({itemCount} articoli)</span>
          <span className="font-serif font-bold text-deep-red">€{calculateTotal(state.items).toFixed(2)}</span>
        </div>

        {/* Order Type Selection - NEW */}
        <div className="pb-4 border-b border-dotted border-gray-200">
          <label className="block text-sm font-bold text-gray-700 mb-3">Come vuoi ricevere il tuo ordine?</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleOrderTypeChange('pickup')}
              className={`p-3 rounded-lg border-2 transition-all text-center ${orderType === 'pickup'
                  ? 'border-deep-red bg-red-50 text-deep-red'
                  : 'border-gray-200 hover:border-gold-accent text-gray-600'
                }`}
            >
              <svg className="w-6 h-6 mx-auto mb-1 text-gold-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="font-bold text-sm">Asporto</span>
              <span className="block text-xs text-green-600 mt-1">Gratis!</span>
            </button>
            <button
              type="button"
              onClick={() => handleOrderTypeChange('delivery')}
              className={`p-3 rounded-lg border-2 transition-all text-center ${orderType === 'delivery'
                  ? 'border-deep-red bg-red-50 text-deep-red'
                  : 'border-gray-200 hover:border-gold-accent text-gray-600'
                }`}
            >
              <svg className="w-6 h-6 mx-auto mb-1 text-gold-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
              </svg>
              <span className="font-bold text-sm">Consegna</span>
              <span className="block text-xs text-gray-500 mt-1">A domicilio</span>
            </button>
          </div>
        </div>

        {/* Service Cost Section - Conditional based on order type */}
        <div className="flex flex-col gap-2 font-body text-gray-700 pb-3 border-b border-dotted border-gray-200">
          <div className="flex justify-between items-center">
            <span>Costo del Servizio</span>
            <span className={`font-serif font-bold ${!orderType ? 'text-gray-400' : state.serviceCost === 0 ? 'text-green-600' : 'text-deep-red'}`}>
              {!orderType ? '—' : state.serviceCost === 0 ? 'Gratis! ✨' : `€${state.serviceCost?.toFixed(2)}`}
            </span>
          </div>

          {/* Show address input only for delivery */}
          {orderType === 'delivery' && (
            <div className="mt-2 animate-fade-in">
              {calcError && (
                <div className="text-red-500 text-sm mb-2">{calcError}</div>
              )}

              {!showAddressInput && !state.deliveryAddress ? (
                <div className="flex gap-2">
                  <button
                    onClick={handleGeolocation}
                    disabled={isCalculating}
                    className="text-xs text-gold-accent hover:text-deep-red border border-gold-accent px-2 py-1 rounded transition-colors flex items-center gap-1"
                  >
                    {isCalculating ? '...' : '📍 Usa Posizione'}
                  </button>
                  <button
                    onClick={() => setShowAddressInput(true)}
                    disabled={isCalculating}
                    className="text-xs text-gray-500 hover:text-deep-red underline transition-colors flex items-center gap-1"
                  >
                    🔍 Scrivi Indirizzo
                  </button>
                </div>
              ) : showAddressInput && !state.deliveryAddress ? (
                <div className="relative">
                  <div className="flex gap-2 items-center mt-1">
                    <input
                      type="text"
                      value={manualAddress}
                      onChange={(e) => {
                        setManualAddress(e.target.value);
                        setShowSuggestions(true);
                      }}
                      placeholder="Via Roma 1, Milano"
                      className="text-sm border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:border-gold-accent"
                      onKeyDown={(e) => e.key === 'Enter' && handleManualAddress()}
                    />
                    <button
                      onClick={() => { setShowAddressInput(false); setCalcError(null); setManualAddress(''); }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Suggestions Dropdown */}
                  {showSuggestions && suggestions.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-48 overflow-y-auto text-sm">
                      {suggestions.map((suggestion) => (
                        <li
                          key={suggestion.place_id}
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 truncate"
                          onClick={() => handleSelectSuggestion(suggestion)}
                        >
                          {suggestion.display_name.split(',')[0]}, {suggestion.display_name.split(',')[1]}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : state.deliveryAddress ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-2 text-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-green-700">
                      <span>✓</span>
                      <span className="truncate">{state.deliveryAddress.split(',').slice(0, 2).join(',')}</span>
                    </div>
                    <button
                      onClick={() => {
                        dispatch({ type: 'SET_DELIVERY_ADDRESS', payload: '' });
                        dispatch({ type: 'SET_SERVICE_COST', payload: 0 });
                        setManualAddress('');
                        setShowAddressInput(true);
                      }}
                      className="text-xs text-gray-500 hover:text-deep-red underline"
                    >
                      Cambia
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>

      <div className="border-t-2 border-deep-red pt-6 mb-8">
        <div className="flex justify-between items-end">
          <span className="text-lg font-serif font-bold text-deep-red">Totale</span>
          <div className="text-right">
            <span className="bg-gold-accent text-white font-serif font-bold text-3xl px-6 py-3 rounded shadow-md inline-block">
              €{total.toFixed(2)}
            </span>
            <p className="font-body text-sm text-gray-500 mt-2">IVA inclusa ✓</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {!canProceed() ? (
          <button
            disabled
            className="w-full px-6 py-4 bg-gray-300 text-gray-500 font-serif font-bold text-lg cursor-not-allowed rounded"
          >
            {state.items.length === 0
              ? 'Carrello vuoto'
              : !orderType
                ? 'Scegli Asporto o Consegna'
                : calcError && calcError.includes('> 5km')
                  ? 'Consegna non disponibile'
                  : 'Inserisci indirizzo di consegna'}
          </button>
        ) : (
          <Link
            href="/checkout"
            className="block w-full px-6 py-4 bg-gold-accent text-white font-serif font-bold text-lg text-center hover:bg-medium-red transition-all rounded shadow-lg"
          >
            <span className="flex items-center justify-center gap-2">
              Procedi al Checkout
              <span className="text-xl">→</span>
            </span>
          </Link>
        )}

        <Link
          href="/menu"
          className="block w-full px-6 py-4 bg-cream-bg text-medium-red font-serif font-bold text-lg text-center hover:bg-beige-sidebar transition-all rounded border border-gold-accent/30"
        >
          <span className="flex items-center justify-center gap-2">
            <span className="text-xl">←</span>
            Continua lo Shopping
          </span>
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;
