'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';

const Header: React.FC = () => {
  const { state } = useCart();
  const pathname = usePathname();
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

    // Add scroll event listener
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = pathname === '/';
  const headerClass = isHome
    ? (isScrolled ? 'bg-deep-red shadow-lg' : 'bg-transparent shadow-none')
    : 'bg-deep-red shadow-lg';

  return (
    <header className={`text-white py-4 sticky top-0 z-50 transition-all duration-300 ${headerClass}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 group">
          {/* Logo Image */}
          <img
            src="/namaste-logo.png"
            alt="Namaste India Logo"
            className="h-28 md:h-32 w-auto object-contain group-hover:scale-105 transition-transform"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 font-serif">
          <Link href="/" className="hover:text-gold-accent transition-colors">
            Home
          </Link>
          <Link href="/menu" className="hover:text-gold-accent transition-colors">
            Menù
          </Link>
          <Link href="/chef-favorites" className="hover:text-gold-accent transition-colors">
            Specialità
          </Link>
          <Link href="/reservation" className="hover:text-gold-accent transition-colors">
            Prenota
          </Link>
          <Link href="/cart" className="relative hover:text-gold-accent transition-colors flex items-center gap-1">
            Carrello
            {mounted && itemCount > 0 && (
              <span className="bg-gold-accent text-deep-red text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </div>

        {/* Language Selector & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <span className="text-sm cursor-pointer hover:text-gold-accent">🇮🇹 IT</span>
            <span className="text-white/50">|</span>
            <span className="text-sm cursor-pointer hover:text-gold-accent">🇬🇧 EN</span>
          </div>
          <button
            className="md:hidden text-gold-accent text-xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-gold-accent/20">
          <div className="container mx-auto px-4 flex flex-col gap-3 pt-4">
            <Link href="/" className="hover:text-gold-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link href="/menu" className="hover:text-gold-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Menù
            </Link>
            <Link href="/chef-favorites" className="hover:text-gold-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Specialità
            </Link>
            <Link href="/reservation" className="hover:text-gold-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Prenota
            </Link>
            <Link href="/cart" className="hover:text-gold-accent transition-colors flex items-center gap-1" onClick={() => setMobileMenuOpen(false)}>
              Carrello
              {mounted && itemCount > 0 && (
                <span className="bg-gold-accent text-deep-red text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;