'use client';

import React from 'react';

export default function ChefStory() {
    return (
        <section className="relative bg-ivory py-20 lg:py-28 overflow-hidden">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-champagne-gold blur-3xl" />
                <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-rich-burgundy blur-3xl" />
            </div>

            <div className="container mx-auto px-8 lg:px-16 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left - Image */}
                    <div className="relative">
                        <div className="relative">
                            {/* Main Image */}
                            <div className="relative overflow-hidden">
                                <img
                                    src="/chef-portrait.png"
                                    alt="Chef preparing authentic Indian cuisine"
                                    className="w-full h-[500px] object-cover object-top"
                                />
                                {/* Gold Border Accent */}
                                <div className="absolute inset-0 border border-champagne-gold/30" />
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-champagne-gold/40" />
                            <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-champagne-gold/40" />

                            {/* Experience Badge */}
                            <div className="absolute -bottom-8 -left-8 bg-deep-burgundy text-ivory p-6 shadow-luxury">
                                <div className="text-4xl font-display font-bold text-champagne-gold">30+</div>
                                <div className="text-sm font-body uppercase tracking-widest">Anni di<br />Esperienza</div>
                            </div>
                        </div>
                    </div>

                    {/* Right - Content */}
                    <div className="lg:pl-8">
                        {/* Section Label */}
                        <div className="inline-flex items-center gap-3 mb-6">
                            <div className="h-px w-12 bg-champagne-gold" />
                            <span className="text-champagne-gold font-body text-sm tracking-[0.3em] uppercase">
                                La Nostra Storia
                            </span>
                        </div>

                        {/* Heading */}
                        <h2 className="font-display text-4xl lg:text-5xl text-deep-burgundy leading-tight mb-6">
                            Una Tradizione di<br />
                            <span className="text-champagne-gold italic">Eccellenza Culinaria</span>
                        </h2>

                        {/* Story */}
                        <div className="space-y-4 text-charcoal/80 font-body leading-relaxed">
                            <p>
                                Nel 1990, un sogno ha preso forma nelle strade di Torino. Il nostro Chef ha portato
                                con sé non solo le ricette della sua terra natale, ma l&apos;anima stessa della cucina indiana.
                            </p>
                            <p>
                                Da oltre tre decenni, ci dedichiamo a preservare l&apos;autenticità dei sapori indiani,
                                utilizzando il nostro tradizionale <span className="text-deep-burgundy font-semibold">forno Tandoor</span> e
                                spezie selezionate con cura per ogni piatto.
                            </p>
                            <p>
                                Ogni ricetta racconta una storia, ogni spezia un viaggio. Vi invitiamo a scoprire
                                l&apos;India attraverso i nostri piatti.
                            </p>
                        </div>

                        {/* Signature Features */}
                        <div className="grid grid-cols-2 gap-6 mt-10">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-champagne-gold/10 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-champagne-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-display text-lg text-deep-burgundy font-semibold">Forno Tandoor</h4>
                                    <p className="text-sm text-charcoal/70 font-body">Cottura tradizionale</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-champagne-gold/10 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-champagne-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-display text-lg text-deep-burgundy font-semibold">Cucina Halal</h4>
                                    <p className="text-sm text-charcoal/70 font-body">Certificata</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-champagne-gold/10 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-champagne-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-display text-lg text-deep-burgundy font-semibold">Spezie Autentiche</h4>
                                    <p className="text-sm text-charcoal/70 font-body">Importate dall&apos;India</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-champagne-gold/10 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-champagne-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-display text-lg text-deep-burgundy font-semibold">Fatto con Amore</h4>
                                    <p className="text-sm text-charcoal/70 font-body">Passione in ogni piatto</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
