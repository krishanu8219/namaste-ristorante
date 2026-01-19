'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChefStory from '@/components/home/ChefStory';
import ReviewsCarousel from '@/components/home/ReviewsCarousel';
import FadeIn from '@/components/animations/FadeIn';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section - Premium Fine Dining */}
        <section className="relative h-screen min-h-[700px] overflow-hidden -mt-[144px] md:-mt-[160px] pt-[144px] md:pt-[160px]">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img
              alt="Authentic Indian Fine Dining"
              className="absolute inset-0 w-full h-full object-cover object-center brightness-110"
              src="/hero-indian-cuisine.png"
            />
            {/* Lighter Overlay - 40% brighter */}
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

            {/* Left Side Burgundy Fade - Over Image, Under Text */}
            <div className="absolute inset-y-0 left-0 w-3/5 bg-gradient-to-r from-deep-burgundy via-deep-burgundy/85 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center z-10">
            <div className="container mx-auto px-8 lg:px-16">
              <div className="max-w-2xl">
                {/* Premium Badge */}
                <div className="inline-flex items-center gap-3 mb-6 animate-fade-in">
                  <div className="h-px w-12 bg-champagne-gold" />
                  <span className="text-champagne-gold font-body text-sm tracking-[0.3em] uppercase font-semibold">
                    Dal 1990 a Torino
                  </span>
                  <div className="h-px w-12 bg-champagne-gold" />
                </div>

                {/* Main Heading */}
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6 tracking-tight drop-shadow-lg">
                  <span className="block font-light">L&apos;Arte della</span>
                  <span className="block text-champagne-gold font-semibold italic">Cucina Indiana</span>
                </h1>

                {/* Subheading */}
                <p className="font-body text-lg md:text-xl text-white/90 mb-10 leading-relaxed max-w-lg font-light drop-shadow-md">
                  Un viaggio culinario dove tradizione e raffinatezza si incontrano.
                  Sapori autentici, preparati con passione da oltre 30 anni.
                </p>

                {/* Rating Badge */}
                <div className="flex items-center gap-4 mb-10">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-champagne-gold" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-white/90 font-body text-sm font-medium">4.8 su 2268+ recensioni</span>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/menu"
                    className="group relative inline-flex items-center gap-3 bg-champagne-gold text-black px-8 py-4 font-body font-bold tracking-wide uppercase text-sm hover:bg-white transition-all duration-300 shadow-xl"
                  >
                    Scopri il Menù
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <Link
                    href="/reservation"
                    className="inline-flex items-center gap-3 border-2 border-white bg-white/10 backdrop-blur-sm text-white px-8 py-4 font-body font-bold tracking-wide uppercase text-sm hover:bg-white hover:text-black transition-all duration-300"
                  >
                    Prenota un Tavolo
                  </Link>
                </div>
              </div>
            </div>
          </div>



          {/* Decorative Gold Line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-champagne-gold/50 to-transparent z-20" />
        </section>

        {/* Decorative Gold Line */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-champagne-gold/30 to-transparent" />

        {/* Chef's Story Section */}
        <FadeIn>
          <ChefStory />
        </FadeIn>

        {/* Reviews Carousel */}
        <FadeIn>
          <ReviewsCarousel />
        </FadeIn>

        {/* La Nostra Promessa - Full Width */}
        <FadeIn>
          <section className="w-full bg-pearl py-20 px-8 lg:px-16">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-champagne-gold" />
                <span className="text-champagne-gold font-body text-sm tracking-[0.2em] uppercase">
                  Perché Sceglierci
                </span>
                <div className="h-px w-8 bg-champagne-gold" />
              </div>
              <h2 className="font-display text-4xl lg:text-5xl text-deep-burgundy font-semibold">
                La Nostra Promessa
              </h2>
            </div>

            {/* 3-Column Grid for Promises */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Promise 1 */}
              <article className="text-center group">
                <div className="w-20 h-20 mx-auto bg-deep-burgundy/5 border border-champagne-gold/30 flex items-center justify-center mb-6 group-hover:bg-deep-burgundy/10 group-hover:border-champagne-gold transition-all duration-300">
                  <svg className="w-10 h-10 text-champagne-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-semibold text-deep-burgundy mb-3">Ricette Tradizionali</h3>
                <p className="text-charcoal/70 font-body leading-relaxed text-sm">
                  Tramandate di generazione in generazione, le nostre ricette mantengono l&apos;essenza dell&apos;India antica.
                </p>
              </article>

              {/* Promise 2 */}
              <article className="text-center group">
                <div className="w-20 h-20 mx-auto bg-deep-burgundy/5 border border-champagne-gold/30 flex items-center justify-center mb-6 group-hover:bg-deep-burgundy/10 group-hover:border-champagne-gold transition-all duration-300">
                  <svg className="w-10 h-10 text-champagne-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-semibold text-deep-burgundy mb-3">Ingredienti Freschi</h3>
                <p className="text-charcoal/70 font-body leading-relaxed text-sm">
                  Selezioniamo solo prodotti di prima qualità e spezie autentiche importate dall&apos;India.
                </p>
              </article>

              {/* Promise 3 */}
              <article className="text-center group">
                <div className="w-20 h-20 mx-auto bg-deep-burgundy/5 border border-champagne-gold/30 flex items-center justify-center mb-6 group-hover:bg-deep-burgundy/10 group-hover:border-champagne-gold transition-all duration-300">
                  <svg className="w-10 h-10 text-champagne-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-semibold text-deep-burgundy mb-3">Passione Autentica</h3>
                <p className="text-charcoal/70 font-body leading-relaxed text-sm">
                  Ogni piatto è preparato con amore e dedizione, rispettando le tradizioni culinarie indiane.
                </p>
              </article>
            </div>
          </section>
        </FadeIn>
      </main>

      <Footer />
    </div>
  );
}
