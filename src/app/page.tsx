'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChefStory from '@/components/home/ChefStory';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section - Premium Fine Dining */}
        <section className="relative h-screen min-h-[700px] overflow-hidden -mt-[120px] pt-[120px]">
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
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center">
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
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-champagne-gold/50 to-transparent" />
        </section>

        {/* Decorative Gold Line */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-champagne-gold/30 to-transparent" />

        {/* Chef's Story Section */}
        <ChefStory />

        {/* Main Content with Sidebar Layout */}
        <div className="flex flex-col lg:flex-row">
          {/* Left Column - La Nostra Promessa */}
          <section className="w-full lg:w-[65%] bg-pearl py-20 px-8 lg:px-16">
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

          {/* Right Sidebar */}
          <aside className="w-full lg:w-[35%] bg-beige-sidebar p-8 lg:p-12 border-l border-gold-accent/20 flex flex-col gap-10">
            {/* Sidebar Header */}
            <div className="text-center">
              <span className="text-deep-red font-serif italic">I Nostri Preferiti</span>
              <h3 className="font-serif text-2xl font-bold text-deep-red mt-1">Specialità della Casa</h3>
            </div>

            {/* Food Gallery (Arch Images) */}
            <div className="space-y-6">
              {/* Item 1 */}
              <div className="relative group cursor-pointer">
                <img
                  alt="Butter Chicken"
                  className="w-full h-48 object-cover rounded-arch shadow-md group-hover:shadow-xl transition-all duration-300 border-b-4 border-deep-red"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7z42m0BB_GbltlZInwTq91upyjAApvSSHoBZI2afUNEzkGWxZvRw75qxW2M4M1dgtjTVNCAlXCyqvLL3G5-2PAyLDH9s0bZ_ohtCmn41BxPrq6eixW6EksigtD6lm3tYz67az_iKkETjIq-CT8xTpr3qUnArd_8kPRLx1gS43F8553gycrDCeDByrYgEnY5u02MhwP93JjVC17FmU_uWP0HZfEuSI85gxzqtV27GwN7f040jHCCsVV3l6gt7Cr8QG4ac3GVWlXDuI"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-center rounded-none">
                  <span className="text-white font-serif text-lg tracking-wide">Butter Chicken</span>
                </div>
              </div>

              {/* Item 2 */}
              <div className="relative group cursor-pointer">
                <img
                  alt="Naan Bread"
                  className="w-full h-48 object-cover rounded-arch shadow-md group-hover:shadow-xl transition-all duration-300 border-b-4 border-deep-red"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtaZOXFdidapNuTtu8_6r7S0wWjQq5CmPr6XArE1P5M8iun_8GtgyhILc2oSU2f09QQKMkV4_xdivrRPIT01sjyubqp_v3YD4KWl2LgrInT0VgLbfmb7sCTe7iveQyJLkuSUOxbQZnn2IitZ2ZQJ03DIJWrkho7sNwaD2GtU6MLez11T_aVf62UwXrUMxop7zu42W-jehxU1toowMDKOoXnhEdgZr3pSNK8TiiGrMK57BRX2SeXn3nsZsJIh7xRoj1O_426vii3Ony"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-center">
                  <span className="text-white font-serif text-lg tracking-wide">Pane Naan & Roti</span>
                </div>
              </div>

              {/* Item 3 */}
              <div className="relative group cursor-pointer">
                <img
                  alt="Vegetable Biryani"
                  className="w-full h-48 object-cover rounded-arch shadow-md group-hover:shadow-xl transition-all duration-300 border-b-4 border-deep-red"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOSYYoWxE1ovvvBIgVOJ-km40d__pzRaqsq5NwDym6dPq5IB75YnqqO38keKtu2SKJKhXP9pXxWhBBIArnHPkGZhEDdWzWJYprDmOlvY_tELuHNvNvzTkX-KyHaMZm_yGN3qMr4N4cBpu5uANxpiH9ENeftf4m8ndpm4qvwbgROSqW-m82oNCFb4qT3mhJyOfOdbIUOa3iATGy8SfHaYFDgB0ZUyQ3zOgRoTIfppC1hquotDZx_56MuwmzyarqiVwHzDjPrARHDGD2"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-center">
                  <span className="text-white font-serif text-lg tracking-wide">Biryani Vegetariano</span>
                </div>
              </div>
            </div>

            {/* Feature List */}
            <div className="bg-white/50 p-6 rounded-lg border border-gold-accent/30">
              <h4 className="font-serif text-xl text-deep-red mb-4 font-bold border-b border-gold-accent/30 pb-2">
                Perché Sceglierci
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Cucina Halal Certificata</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Autentico Forno Tandoor</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Opzioni Vegane e Senza Glutine</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Consegna a Domicilio</span>
                </li>
              </ul>
            </div>

            {/* Chef Testimonial */}
            <div className="mt-auto bg-deep-red text-white p-6 rounded-xl relative shadow-xl text-center">
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                <img
                  alt="Chef Rajesh"
                  className="w-20 h-20 rounded-full border-4 border-gold-accent object-cover shadow-lg"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnC8HT-K2vPlzbD_Hqa_IJt6FILW06lfxpruUmLaQDRwjn6SxtXl6knnMo-gZWvP0qU8p4DWi3vW8hX5X3d9UWw0JM_-9KFAbs8PtVLrsHHvITSqKROJ6TkkjrIt0O8K22i8IRWTlmwHGhKq31x14pMOOIYOZJVx4Z131DYBdMs_2EdjYXQMHgYR6uBThT8jTrm2FVmazoMa6_pSjUZq3ICAdfzriAF14lUH5rxSw0jwrujQQnOD57ALdqj_yr5OTWcxLVjRkriSBm"
                />
              </div>
              <div className="mt-8">
                <svg className="inline w-10 h-10 text-gold-accent/30 mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                </svg>
                <p className="italic text-gray-300 mb-4 font-serif leading-relaxed">
                  &quot;La cucina non è solo mangiare. È molto di più. La cucina è poesia, passione, amore. Ogni piatto che servo porta con sé un pezzo della mia anima.&quot;
                </p>
                <div className="font-bold text-gold-accent font-serif tracking-widest text-sm uppercase">Chef Rajesh</div>
                <div className="text-xs text-white/60">Executive Chef, Namaste</div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
