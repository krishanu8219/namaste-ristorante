'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/contexts/CartContext';

function PaymentSuccessContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { dispatch } = useCart();
    const [isProcessing, setIsProcessing] = useState(true);

    useEffect(() => {
        // Clear the cart on successful payment
        dispatch({ type: 'CLEAR_CART' });

        // Get order details from URL params
        const orderId = searchParams.get('order_id');
        const sessionId = searchParams.get('session_id');
        const provider = searchParams.get('provider');

        console.log('Payment success:', { orderId, sessionId, provider });

        // Show processing message briefly
        const timer = setTimeout(() => {
            setIsProcessing(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, [searchParams, dispatch]);

    const orderId = searchParams.get('order_id');

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-cream-bg to-[#f5ebe0]">
            <Header />
            <main className="flex-1 py-12 sm:py-16">
                {/* Decorative Background */}
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-gold-accent blur-3xl" />
                    <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-deep-red blur-3xl" />
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-2xl mx-auto">
                        {isProcessing ? (
                            <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-gold-accent/20">
                                <div className="w-20 h-20 bg-gradient-to-br from-gold-accent to-deep-red rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                                    <span className="text-4xl">⏳</span>
                                </div>
                                <h1 className="font-serif text-2xl font-bold text-deep-red mb-2">
                                    Elaborazione pagamento...
                                </h1>
                                <p className="text-gray-600">Un momento per favore</p>
                            </div>
                        ) : (
                            <div className="bg-gradient-to-br from-white via-white to-cream-bg rounded-2xl shadow-2xl overflow-hidden border border-gold-accent/30">
                                {/* Success Header */}
                                <div className="bg-gradient-to-r from-deep-red to-medium-red p-8 text-center relative overflow-hidden">
                                    {/* Decorative Pattern */}
                                    <div className="absolute inset-0 opacity-10">
                                        <svg viewBox="0 0 100 100" className="w-full h-full">
                                            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
                                            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" />
                                            <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
                                        </svg>
                                    </div>

                                    <div className="relative z-10">
                                        <div className="w-24 h-24 bg-gold-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                            <span className="text-5xl">📧</span>
                                        </div>
                                        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-2">
                                            Ordine Ricevuto!
                                        </h1>
                                        <p className="text-cream-bg/90 text-lg">
                                            Grazie per il tuo ordine
                                        </p>
                                    </div>
                                </div>

                                {/* Order Details */}
                                <div className="p-8">
                                    {orderId && (
                                        <div className="text-center mb-6 pb-6 border-b border-gray-200">
                                            <p className="text-gray-500 text-sm mb-1">Numero Ordine</p>
                                            <p className="font-serif text-3xl font-bold text-deep-red">
                                                #{orderId.slice(-6)}
                                            </p>
                                        </div>
                                    )}

                                    {/* Pending Confirmation Notice */}
                                    <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-2xl">⏰</span>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-serif text-lg font-bold text-gray-800 mb-2">
                                                    In Attesa di Conferma
                                                </h3>
                                                <p className="text-gray-700 leading-relaxed">
                                                    Il tuo ordine è stato ricevuto e verrà confermato dal ristorante entro <strong>3 minuti</strong>.
                                                </p>
                                                <p className="text-gray-600 text-sm mt-2">
                                                    📧 Riceverai un'email di conferma non appena il ristorante accetterà il tuo ordine.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* What's Next */}
                                    <div className="bg-gradient-to-br from-cream-bg to-beige-sidebar rounded-xl p-6 mb-6">
                                        <h3 className="font-serif text-lg font-bold text-deep-red mb-4">
                                            Cosa Succede Ora?
                                        </h3>
                                        <div className="space-y-3">
                                            <div className="flex items-start gap-3">
                                                <span className="w-6 h-6 bg-deep-red text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                                                <p className="text-gray-700 text-sm">Il ristorante riceve la tua richiesta</p>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <span className="w-6 h-6 bg-deep-red text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                                                <p className="text-gray-700 text-sm">Conferma dell'ordine entro 3 minuti</p>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <span className="w-6 h-6 bg-deep-red text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                                                <p className="text-gray-700 text-sm">Ricevi email con tempo di preparazione stimato</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="space-y-3">
                                        <Link
                                            href="/menu"
                                            className="block w-full px-6 py-4 bg-gradient-to-r from-deep-red to-medium-red text-white font-serif font-bold text-lg text-center rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                                        >
                                            🍛 Ordina Ancora
                                        </Link>

                                        <Link
                                            href="/"
                                            className="block w-full px-6 py-3 bg-white text-deep-red font-serif font-bold text-center rounded-xl border-2 border-deep-red hover:bg-cream-bg transition-all"
                                        >
                                            🏠 Torna alla Home
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex flex-col bg-gradient-to-b from-cream-bg to-[#f5ebe0]">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-deep-red border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <h1 className="font-serif text-2xl font-bold text-deep-red">Caricamento...</h1>
                    </div>
                </main>
                <Footer />
            </div>
        }>
            <PaymentSuccessContent />
        </Suspense>
    );
}
