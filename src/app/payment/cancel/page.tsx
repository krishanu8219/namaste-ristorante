'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

function PaymentCancelContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('order_id');

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 bg-gradient-to-br from-cream via-turmeric-50 to-parchment relative overflow-hidden py-16">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-masala-200/20 blob-shape animate-blob" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-turmeric-200/15 blob-shape-2 animate-blob" style={{ animationDelay: '4s' }} />

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div
                        className="max-w-lg mx-auto bg-white overflow-hidden border-3 border-ink"
                        style={{
                            borderRadius: '30px 4px 30px 4px',
                            boxShadow: '8px 8px 0px rgba(45, 27, 14, 0.7)',
                        }}
                    >
                        {/* Cancel Header */}
                        <div className="bg-masala-100 p-8 text-center border-b-3 border-ink">
                            <div
                                className="w-20 h-20 bg-masala-200 flex items-center justify-center mx-auto mb-4 border-3 border-ink"
                                style={{
                                    borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                                    boxShadow: '4px 4px 0px rgba(45, 27, 14, 0.6)',
                                }}
                            >
                                <span className="text-4xl">✕</span>
                            </div>
                            <h1 className="font-display text-3xl font-bold text-ink mb-2">
                                Pagamento Annullato
                            </h1>
                            <p className="font-body text-ink/70">
                                Il pagamento non è andato a buon fine
                            </p>
                        </div>

                        {/* Content */}
                        <div className="p-8 text-center">
                            <div
                                className="bg-turmeric-50 p-4 mb-6 border-2 border-ink"
                                style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}
                            >
                                <p className="font-body text-ink/80">
                                    ℹ️ Non ti è stato addebitato nulla. Puoi riprovare quando vuoi.
                                </p>
                            </div>

                            {orderId && (
                                <p className="font-body text-ink/60 text-sm mb-6">
                                    Riferimento ordine: #{orderId.slice(-6)}
                                </p>
                            )}

                            <div className="space-y-4">
                                <Link
                                    href="/checkout"
                                    className="block w-full px-6 py-4 bg-saffron-500 text-white font-display font-bold text-lg transition-all border-2 border-ink hover:bg-saffron-600 hover:scale-[1.02]"
                                    style={{
                                        borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                                        boxShadow: '4px 4px 0px rgba(45, 27, 14, 0.8)',
                                    }}
                                >
                                    🔄 Riprova il Pagamento
                                </Link>

                                <Link
                                    href="/cart"
                                    className="block w-full px-6 py-3 bg-cream text-ink font-display font-bold transition-all border-2 border-ink hover:bg-turmeric-100"
                                    style={{
                                        borderRadius: '15px 225px 15px 255px / 255px 15px 225px 15px',
                                        boxShadow: '3px 3px 0px rgba(45, 27, 14, 0.5)',
                                    }}
                                >
                                    🛒 Torna al Carrello
                                </Link>

                                <Link
                                    href="/"
                                    className="block w-full px-6 py-3 text-ink/70 font-display font-bold transition-all hover:text-ink"
                                >
                                    🏠 Torna alla Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default function PaymentCancelPage() {
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
            <PaymentCancelContent />
        </Suspense>
    );
}
