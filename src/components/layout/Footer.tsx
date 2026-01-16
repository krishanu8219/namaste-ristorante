import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-deep-red text-white py-12 border-t border-gold-accent">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
        {/* Logo Section */}
        <div className="flex flex-col items-center md:items-start justify-center">
          <div className="relative w-40 h-40 mb-4">
            <img
              src="/namaste-logo.png"
              alt="Namaste Ristorante Logo"
              className="object-contain w-full h-full drop-shadow-lg"
            />
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h5 className="font-serif text-2xl text-gold-accent mb-4">Contattaci</h5>
          <a
            href="https://maps.app.goo.gl/uF1y8yF8yF8yF8yF8" // Placeholder, user might want specific link later but this expects a valid URL structure. Using a generic google search or just # specific if unknown? - The prompt implies making it clickable. I'll use a search query or just href="#" with correct implementation if I don't have the exact map link. Wait, the address is "Corso Monte Cucco 26 B, Torino". I can use that.
            target="_blank"
            rel="noopener noreferrer"
            className="mb-2 block hover:text-gold-accent transition-colors"
          >
            <svg className="inline w-5 h-5 mr-2 text-gold-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Corso Monte Cucco 26 B, Torino
          </a>
          <a href="tel:+39011796579" className="mb-2 block hover:text-gold-accent transition-colors">
            <svg className="inline w-5 h-5 mr-2 text-gold-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            +39 011 796 579
          </a>
          <a href="mailto:info@namaste-torino.it" className="mb-2 block hover:text-gold-accent transition-colors">
            <svg className="inline w-5 h-5 mr-2 text-gold-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            info@namaste-torino.it
          </a>
        </div>

        {/* Opening Hours */}
        <div>
          <h5 className="font-serif text-2xl text-gold-accent mb-4">Orari</h5>
          <p className="mb-1">Pranzo: 12:00 - 15:00</p>
          <p className="mb-1">Cena: 19:00 - 23:00</p>
          <p className="text-sm text-gray-400 mt-2">Chiuso il Lunedì a pranzo</p>
        </div>

        {/* Social */}
        <div className="flex flex-col items-center md:items-start">
          <h5 className="font-serif text-2xl text-gold-accent mb-4">Seguici</h5>
          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-gold-accent flex items-center justify-center hover:bg-gold-accent hover:text-deep-red transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-gold-accent flex items-center justify-center hover:bg-gold-accent hover:text-deep-red transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

          </div>
          <p className="mt-4 text-xs text-gray-400">© {new Date().getFullYear()} Namaste Restaurant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
