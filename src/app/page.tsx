'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MenuGrid from '@/components/menu/MenuGrid';
import CategoryFilter from '@/components/menu/CategoryFilter';
import FluidReveal from '@/components/ui/FluidReveal';
import { MENU, getTopSellers } from '@/data/menu';
import { MenuCategoryId } from '@/types/menu';
import { useCart } from '@/contexts/CartContext';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<MenuCategoryId | 'all'>('all');
  const [addingItemId, setAddingItemId] = useState<string | null>(null);
  const topSellers = getTopSellers();
  const { dispatch } = useCart();

  const filteredItems = activeCategory === 'all'
    ? MENU.flatMap(category => category.items)
    : MENU.find(cat => cat.id === activeCategory)?.items || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-parchment via-cream to-turmeric-50">
          {/* Decorative background elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Hand-drawn circle decorations */}
            <div className="absolute top-20 left-10 w-32 h-32 border-4 border-saffron-300/30 hand-circle animate-spin-slow" />
            <div className="absolute bottom-40 right-20 w-24 h-24 border-4 border-masala-300/30 hand-circle animate-spin-slow" style={{ animationDirection: 'reverse' }} />

            {/* Floating food emojis */}
            <div className="absolute top-1/4 right-1/4 text-7xl opacity-20 animate-float">🍛</div>
            <div className="absolute bottom-1/4 left-1/4 text-6xl opacity-15 animate-float" style={{ animationDelay: '1s' }}>🌶️</div>
            <div className="absolute top-1/3 left-1/3 text-5xl opacity-10 animate-float" style={{ animationDelay: '2s' }}>🍃</div>

            {/* Blob shapes */}
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-turmeric-200/20 blob-shape animate-blob" />
            <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-saffron-200/15 blob-shape-2 animate-blob" style={{ animationDelay: '3s' }} />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">

              {/* Left Content */}
              <div className="text-center lg:text-left animate-fade-in">
                {/* Playful badge */}
                <div className="inline-block mb-6">
                  <span className="inline-flex items-center px-5 py-2 bg-cardamom-500 text-white font-display font-bold text-sm border-2 border-ink transform -rotate-2 hover:rotate-0 transition-transform"
                    style={{
                      borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                      boxShadow: '3px 3px 0px rgba(45, 27, 14, 0.8)',
                    }}>
                    ✨ Authentic Indian Flavors
                  </span>
                </div>

                {/* Main Title */}
                <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-ink mb-6 leading-tight">
                  <span className="inline-block animate-wiggle-slow">Welcome to</span>
                  <br />
                  <span className="text-saffron-600 inline-block relative">
                    NAMASTE
                    {/* Underline doodle */}
                    <svg className="absolute -bottom-2 left-0 w-full h-4" viewBox="0 0 200 12">
                      <path d="M0 6 Q 50 0 100 6 T 200 6" stroke="#F0B429" strokeWidth="4" fill="none" strokeLinecap="round" />
                    </svg>
                  </span>
                </h1>

                {/* Subtitle in handwritten style */}
                <p className="font-accent text-2xl sm:text-3xl md:text-4xl text-masala-600 mb-8 transform -rotate-1">
                  Where spices dance & flavors sing! 🎶
                </p>

                {/* Description */}
                <p className="font-body text-lg text-ink/80 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                  Experience the magic of hand-crafted tandoori, aromatic curries, and traditional recipes
                  passed down through generations. Every dish tells a story of love and tradition.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                  <a
                    href="#menu"
                    className="group w-full sm:w-auto px-8 py-4 bg-saffron-500 text-white font-display font-bold text-lg hover:bg-saffron-600 transition-all flex items-center justify-center space-x-3 border-3 border-ink hover:scale-105"
                    style={{
                      borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                      boxShadow: '5px 5px 0px rgba(45, 27, 14, 0.8)',
                    }}
                  >
                    <span>Explore Menu</span>
                    <span className="text-2xl group-hover:animate-wiggle">🍛</span>
                  </a>

                  <a
                    href="tel:+39011796579"
                    className="group w-full sm:w-auto px-8 py-4 bg-cream text-ink font-display font-bold text-lg hover:bg-turmeric-100 transition-all flex items-center justify-center space-x-3 border-3 border-ink hover:scale-105"
                    style={{
                      borderRadius: '15px 225px 15px 255px / 255px 15px 225px 15px',
                      boxShadow: '4px 4px 0px rgba(45, 27, 14, 0.6)',
                    }}
                  >
                    <span className="text-2xl group-hover:animate-wiggle">📞</span>
                    <span>Call Now</span>
                  </a>
                </div>

                {/* Quick Info Badges */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-10">
                  {[
                    { emoji: '✓', text: '100% Halal', color: 'bg-cardamom-100 text-cardamom-800' },
                    { emoji: '🕐', text: 'Open Now', color: 'bg-turmeric-100 text-turmeric-800' },
                    { emoji: '🚗', text: 'Delivery', color: 'bg-saffron-100 text-saffron-800' },
                  ].map((badge, i) => (
                    <span
                      key={i}
                      className={`inline-flex items-center px-4 py-2 ${badge.color} font-display font-bold text-sm border-2 border-ink/30`}
                      style={{
                        borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                      }}
                    >
                      <span className="mr-2">{badge.emoji}</span>
                      {badge.text}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Content - Fluid Reveal Image */}
              <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
                {/* Decorative frame */}
                <div className="absolute -inset-4 bg-turmeric-200/30 -z-10 animate-blob"
                  style={{
                    borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                  }} />

                {/* Tape decorations */}
                <div className="absolute -top-6 left-8 w-20 h-8 bg-saffron-300/70 transform -rotate-12 z-20"
                  style={{ borderRadius: '2px' }} />
                <div className="absolute -bottom-4 right-12 w-16 h-6 bg-turmeric-300/70 transform rotate-6 z-20"
                  style={{ borderRadius: '2px' }} />

                {/* Interactive Image Reveal */}
                <div className="relative overflow-hidden border-4 border-ink"
                  style={{
                    borderRadius: '30px 4px 30px 4px',
                    boxShadow: '8px 8px 0px rgba(45, 27, 14, 0.7)',
                  }}>
                  <FluidReveal
                    topImage="/Images/Chicken Curry.png"
                    bottomImage="/Images/Tandoori Chicken.png"
                    revealSize={100}
                    smoothness={0.08}
                    deformation={20}
                    trailDecay={0.93}
                    className="aspect-square sm:aspect-[4/3] w-full"
                    alt="Discover our delicious dishes"
                  />
                </div>

                {/* Floating label */}
                <div className="absolute -right-4 top-1/2 transform translate-x-0 -translate-y-1/2 -rotate-90 origin-center">
                  <span className="font-accent text-xl text-masala-500">hover to explore ✨</span>
                </div>
              </div>
            </div>
          </div>

          {/* Wavy bottom border */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
            <svg viewBox="0 0 1200 60" className="w-full h-16 fill-parchment">
              <path d="M0 30 Q 150 60 300 30 T 600 30 T 900 30 T 1200 30 L 1200 60 L 0 60 Z" />
            </svg>
          </div>
        </section>

        {/* Featured Dishes Section */}
        <section className="py-20 bg-parchment relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in">
              <span className="font-accent text-xl text-saffron-600 block mb-2">don&apos;t miss these!</span>
              <h2 className="section-title">
                🌟 Chef&apos;s Favorites 🌟
              </h2>
              <p className="font-body text-ink/70 mt-8 max-w-2xl mx-auto">
                Our most loved dishes, prepared with the finest ingredients and generations of culinary wisdom.
              </p>
            </div>

            {/* Featured Cards */}
            <div className="grid md:grid-cols-3 gap-8">
              {topSellers.slice(0, 3).map((item, index) => (
                <div
                  key={item.id}
                  className="card group"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <div className="relative mb-4 overflow-hidden border-3 border-ink"
                    style={{
                      borderRadius: '15px 225px 15px 255px / 255px 15px 225px 15px',
                    }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {item.isTopSeller && (
                      <span className="badge-bestseller">⭐ Bestseller!</span>
                    )}
                  </div>

                  <h3 className="font-display text-xl font-bold text-ink mb-2 group-hover:text-saffron-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="font-body text-ink/70 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="price-tag">€{item.price.toFixed(2)}</span>
                    <button
                      onClick={() => {
                        setAddingItemId(item.id);
                        dispatch({
                          type: 'ADD_ITEM',
                          payload: {
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            image: item.image,
                          },
                        });
                        setTimeout(() => setAddingItemId(null), 600);
                      }}
                      className={`px-4 py-2 font-display font-bold text-sm transition-all border-2 border-ink ${addingItemId === item.id
                          ? 'bg-cardamom-500 text-white'
                          : 'bg-saffron-500 text-white hover:bg-saffron-600'
                        }`}
                      style={{
                        borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                        boxShadow: addingItemId === item.id ? 'none' : '2px 2px 0px rgba(45, 27, 14, 0.8)',
                      }}>
                      {addingItemId === item.id ? 'Aggiunto! ✓' : 'Aggiungi 🛒'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Full Menu Section */}
        <section id="menu" className="py-20 sm:py-28 bg-gradient-to-br from-cream via-turmeric-50 to-parchment relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-saffron-200/20 blob-shape animate-blob" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-masala-200/10 blob-shape-2 animate-blob" style={{ animationDelay: '4s' }} />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16 animate-fade-in">
              <span className="font-accent text-xl text-masala-500 block mb-2">everything we offer</span>
              <h2 className="section-title">
                📜 Our Menu 📜
              </h2>
              <p className="font-body text-ink/70 mt-8 max-w-2xl mx-auto">
                From sizzling tandoori to creamy curries, fragrant biryanis to fresh naan bread -
                discover the full spectrum of Indian culinary artistry.
              </p>
            </div>

            {/* Category Filter */}
            <div className="mb-12">
              <CategoryFilter
                categories={MENU.map(cat => ({ id: cat.id, name: cat.name }))}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </div>

            {/* Menu Grid */}
            <MenuGrid items={filteredItems} />
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 bg-ink text-cream relative overflow-hidden">
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle, rgba(249, 115, 22, 0.3) 1px, transparent 1px)`,
              backgroundSize: '30px 30px',
            }} />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <span className="font-accent text-2xl text-turmeric-300 block mb-4 animate-wiggle-slow">
              hungry yet? 🤤
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-cream mb-6">
              Ready to Experience the Magic?
            </h2>
            <p className="font-body text-cream/80 text-lg mb-10 max-w-2xl mx-auto">
              Order now and let our flavors transport you to the heart of India.
              Delivery available across the city!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a
                href="/cart"
                className="group px-10 py-5 bg-saffron-500 text-white font-display font-bold text-xl hover:bg-saffron-600 transition-all flex items-center space-x-3 border-3 border-cream hover:scale-105"
                style={{
                  borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                  boxShadow: '6px 6px 0px rgba(255, 255, 255, 0.3)',
                }}
              >
                <span>Order Now</span>
                <span className="text-2xl group-hover:animate-wiggle">🛵</span>
              </a>

              <a
                href="https://wa.me/39011796579"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-10 py-5 bg-cardamom-500 text-white font-display font-bold text-xl hover:bg-cardamom-600 transition-all flex items-center space-x-3 border-3 border-cream hover:scale-105"
                style={{
                  borderRadius: '15px 225px 15px 255px / 255px 15px 225px 15px',
                  boxShadow: '6px 6px 0px rgba(255, 255, 255, 0.3)',
                }}
              >
                <span className="text-2xl group-hover:animate-wiggle">💬</span>
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
