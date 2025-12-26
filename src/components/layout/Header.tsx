'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

const Header: React.FC = () => {
  const { state } = useCart();
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);

    const checkIfOpen = () => {
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours();

      if (day === 0) { // Sunday
        return hour >= 18 && hour < 23;
      }
      // Monday-Saturday
      return hour >= 11 && hour < 23;
    };

    setIsOpen(checkIfOpen());

    // Handle scroll
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
        ? 'py-2'
        : 'py-4'
      }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className={`
          relative bg-cream border-3 border-ink transition-all duration-300
          ${scrolled ? 'shadow-sketchy' : 'shadow-sketchy-lg'}
        `} style={{
            borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
            border: '3px solid #2D1B0E',
          }}>
          {/* Decorative tape effect */}
          <div className="absolute -top-3 left-8 w-16 h-6 bg-turmeric-300/60 transform -rotate-6 z-10"
            style={{ borderRadius: '2px' }} />
          <div className="absolute -top-3 right-12 w-14 h-5 bg-saffron-300/60 transform rotate-3 z-10"
            style={{ borderRadius: '2px' }} />

          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <Link href="/" className="flex flex-col group">
                <span className="font-display text-2xl sm:text-3xl font-bold text-ink group-hover:animate-wiggle transition-transform">
                  <span className="text-saffron-600">NAMASTE</span>
                </span>
                <span className="font-accent text-sm sm:text-base text-masala-600 -mt-1 transform -rotate-2">
                  Ristorante ✨
                </span>
              </Link>

              {/* Center decorative element */}
              <div className="hidden lg:flex items-center space-x-2">
                <span className="text-2xl animate-wiggle-slow">🍛</span>
                <span className="font-accent text-lg text-ink/60">authentic flavors</span>
                <span className="text-2xl animate-wiggle-slow" style={{ animationDelay: '0.5s' }}>🌶️</span>
              </div>

              {/* Right side */}
              <div className="flex items-center space-x-3">
                {/* Status Badge */}
                {mounted && (
                  <div className={`
                    hidden sm:flex items-center px-4 py-2 font-display text-sm font-bold
                    border-2 border-ink
                    ${isOpen
                      ? 'bg-cardamom-400 text-white'
                      : 'bg-masala-200 text-ink'
                    }
                  `} style={{
                      borderRadius: '15px 225px 15px 255px / 255px 15px 225px 15px',
                      boxShadow: '2px 2px 0px rgba(45, 27, 14, 0.8)',
                    }}>
                    <span className={`w-2 h-2 rounded-full mr-2 ${isOpen ? 'bg-white animate-pulse' : 'bg-ink/50'}`} />
                    {isOpen ? 'Open Now!' : 'Closed'}
                  </div>
                )}

                {/* Navigation Links */}
                <nav className="flex items-center space-x-2">
                  <Link
                    href="/menu"
                    className="px-4 py-2 font-display font-bold text-ink hover:bg-turmeric-100 transition-all border-2 border-dashed border-ink/50 hover:border-ink"
                    style={{
                      borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                    }}
                  >
                    Menu 📜
                  </Link>

                  <Link
                    href="/cart"
                    className="relative px-4 py-2 bg-saffron-500 text-white font-display font-bold hover:bg-saffron-600 transition-all flex items-center space-x-2 border-2 border-ink"
                    style={{
                      borderRadius: '15px 225px 15px 255px / 255px 15px 225px 15px',
                      boxShadow: '3px 3px 0px rgba(45, 27, 14, 0.8)',
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span className="hidden sm:inline">Cart</span>
                    {itemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-masala-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center border-2 border-ink animate-bounce-gentle">
                        {itemCount}
                      </span>
                    )}
                  </Link>
                </nav>
              </div>
            </div>
          </div>

          {/* Bottom decorative border */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-2">
            <svg viewBox="0 0 200 8" className="w-full h-full">
              <path
                d="M0 4 Q 25 0 50 4 T 100 4 T 150 4 T 200 4"
                stroke="#F97316"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;