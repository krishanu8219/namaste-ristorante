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

        // Show success message briefly then redirect to order confirmation
        const timer = setTimeout(() => {
            setIsProcessing(false);
            // After showing success, stay on this page as the confirmation
        }, 1500);

        return () => clearTimeout(timer);
    }, [searchParams, dispatch]);

    const orderId = searchParams.get('order_id');

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 bg-gradient-to-br from-cream via-turmeric-50 to-parchment relative overflow-hidden py-16">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-cardamom-200/20 blob-shape animate-blob" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-saffron-200/15 blob-shape-2 animate-blob" style={{ animationDelay: '4s' }} />

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div
                        className="max-w-lg mx-auto bg-white overflow-hidden border-3 border-ink"
                        style={{
                            borderRadius: '30px 4px 30px 4px',
                            boxShadow: '8px 8px 0px rgba(45, 27, 14, 0.7)',
                        }}
                    >
                        {isProcessing ? (
                            <div className="p-12 text-center">
                                <div className="w-20 h-20 bg-turmeric-100 flex items-center justify-center mx-auto mb-6 border-3 border-ink animate-pulse"
                                    style={{
                                        borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                                    }}
                                >
                                    <span className="text-4xl">⏳</span>
                                </div>
                                <h1 className="font-display text-2xl font-bold text-ink mb-2">
                                    Elaborazione pagamento...
                                </h1>
                                <p className="font-body text-ink/70">Un momento per favore</p>
                            </div>
                        ) : (
                            <>
                                {/* Success Header */}
                                <div className="bg-cardamom-100 p-8 text-center border-b-3 border-ink relative overflow-hidden">
                                    {/* Confetti animation */}
                                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                        <div className="absolute top-4 left-1/4 text-3xl animate-bounce-gentle">🎉</div>
                                        <div className="absolute top-6 right-1/4 text-2xl animate-bounce-gentle" style={{ animationDelay: '0.3s' }}>✨</div>
                                        <div className="absolute bottom-4 left-1/3 text-2xl animate-wiggle-slow">💳</div>
                                        <div className="absolute bottom-6 right-1/3 text-xl animate-bounce-gentle" style={{ animationDelay: '0.5s' }}>✅</div>
                                    </div>

                                    <div
                                        className="w-24 h-24 bg-cardamom-500 flex items-center justify-center mx-auto mb-4 border-3 border-ink"
                                        style={{
                                            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                                            boxShadow: '4px 4px 0px rgba(45, 27, 14, 0.6)',
                                        }}
                                    >
                                        <span className="text-5xl">✓</span>
                                    </div>
                                    <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-2">
                                        Pagamento Completato! 🎉
                                    </h1>
                                    <p className="font-body text-ink/70">
                                        Grazie! Il tuo ordine è stato confermato.
                                    </p>
                                </div>

                                {/* Order Details */}
                                <div className="p-8 text-center">
                                    {orderId && (
                                        <div className="mb-6">
                                            <p className="font-body text-ink/60 text-sm mb-1">Numero Ordine</p>
                                            <p className="font-display text-2xl font-bold text-ink">
                                                #{orderId.slice(-6)}
                                            </p>
                                        </div>
                                    )}

                                    <div
                                        className="bg-turmeric-50 p-4 mb-6 border-2 border-ink"
                                        style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}
                                    >
                                        <p className="font-body text-ink/80">
                                            📧 Riceverai una conferma email con i dettagli del tuo ordine.
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <Link
                                            href="/menu"
                                            className="block w-full px-6 py-4 bg-saffron-500 text-white font-display font-bold text-lg transition-all border-2 border-ink hover:bg-saffron-600 hover:scale-[1.02]"
                                            style={{
                                                borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                                                boxShadow: '4px 4px 0px rgba(45, 27, 14, 0.8)',
                                            }}
                                        >
                                            🍛 Torna al Menu
                                        </Link>

                                        <Link
                                            href="/"
                                            className="block w-full px-6 py-3 bg-cream text-ink font-display font-bold transition-all border-2 border-ink hover:bg-turmeric-100"
                                            style={{
                                                borderRadius: '15px 225px 15px 255px / 255px 15px 225px 15px',
                                                boxShadow: '3px 3px 0px rgba(45, 27, 14, 0.5)',
                                            }}
                                        >
                                            🏠 Torna alla Home
                                        </Link>
                                    </div>
                                </div>
                            </>
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
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 bg-gradient-to-br from-cream via-turmeric-50 to-parchment flex items-center justify-center">
                    <div className="text-center animate-fade-in">
                        <div className="w-16 h-16 border-4 border-saffron-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <h1 className="font-display text-2xl font-bold text-ink">Caricamento...</h1>
                    </div>
                </main>
                <Footer />
            </div>
        }>
            <PaymentSuccessContent />
        </Suspense>
    );
}
