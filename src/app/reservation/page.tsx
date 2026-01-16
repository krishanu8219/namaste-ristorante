import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ReservationForm from '@/components/reservation/ReservationForm';

export default function ReservationPage() {
    return (
        <div className="min-h-screen flex flex-col bg-cream-bg">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative h-[400px] overflow-hidden -mt-[120px] pt-[120px]">
                    <div className="absolute inset-0 bg-deep-red/90">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: 'url("/pattern-mandala.png")' }}></div>
                    </div>

                    <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center relative z-10">
                        <span className="text-gold-accent font-serif italic text-xl mb-4 block">
                            Riserva il tuo posto
                        </span>
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6">
                            Prenota un Tavolo
                        </h1>
                        <p className="text-white/80 max-w-2xl text-lg font-light">
                            Assicurati un'esperienza culinaria indimenticabile. Prenota ora per pranzo o cena.
                        </p>
                    </div>

                    {/* Decorative Bottom Border */}
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-[url('/pattern-border.png')] bg-repeat-x opacity-50"></div>
                </section>

                {/* Reservation Form Section */}
                <section className="py-16 md:py-24 relative">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto -mt-32 relative z-20">
                            <ReservationForm />
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
