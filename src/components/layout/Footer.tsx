import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-ink text-cream overflow-hidden">
      {/* Wavy top border */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1200 60" className="w-full h-16 fill-cream">
          <path d="M0 30 Q 150 0 300 30 T 600 30 T 900 30 T 1200 30 L 1200 0 L 0 0 Z" />
        </svg>
      </div>

      {/* Decorative floating elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 text-4xl opacity-20 animate-float">✨</div>
        <div className="absolute top-40 right-20 text-3xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>🌿</div>
        <div className="absolute bottom-40 left-1/4 text-5xl opacity-10 animate-wiggle-slow">🍛</div>
        <div className="absolute bottom-20 right-1/4 text-4xl opacity-15 animate-float" style={{ animationDelay: '0.5s' }}>🌶️</div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">

          {/* Brand Section */}
          <div className="text-center md:text-left">
            <div className="inline-block mb-6">
              <h3 className="font-display text-4xl font-bold text-saffron-400 animate-wiggle-slow">
                NAMASTE
              </h3>
              <p className="font-accent text-2xl text-turmeric-300 -mt-1 transform -rotate-2">
                Ristorante ✨
              </p>
            </div>
            <p className="font-body text-cream/80 leading-relaxed max-w-xs mx-auto md:mx-0">
              Where every dish tells a story of tradition, love, and the magic of Indian spices.
              <span className="font-accent text-lg text-saffron-300"> Made with heart! 💛</span>
            </p>

            {/* Social doodles */}
            <div className="flex justify-center md:justify-start space-x-4 mt-6">
              {['📸', '📱', '💬'].map((emoji, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-12 h-12 bg-charcoal hover:bg-saffron-600 flex items-center justify-center text-xl transition-all duration-200 border-2 border-cream/30 hover:border-cream hover:scale-110 hover:rotate-6"
                  style={{
                    borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                  }}
                >
                  {emoji}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="font-display text-xl font-bold text-turmeric-300 mb-6 flex items-center space-x-2">
              <span className="text-2xl">📍</span>
              <span className="hand-underline">Find Us</span>
            </h4>

            <div className="space-y-4">
              {/* Address Card */}
              <div className="bg-charcoal/50 p-4 border-2 border-cream/20 hover:border-saffron-400 transition-all group"
                style={{
                  borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                }}>
                <div className="flex items-start space-x-3">
                  <span className="text-2xl group-hover:animate-wiggle">🏠</span>
                  <div>
                    <p className="font-body text-cream">Corso Monte Cucco 26 B</p>
                    <p className="font-body text-cream/70">10139 Torino, Italy</p>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <a href="tel:+39011796579"
                className="block bg-charcoal/50 p-4 border-2 border-cream/20 hover:border-cardamom-400 transition-all group"
                style={{
                  borderRadius: '15px 225px 15px 255px / 255px 15px 225px 15px',
                }}>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl group-hover:animate-wiggle">📞</span>
                  <span className="font-display font-bold text-cream group-hover:text-cardamom-300 transition-colors">
                    +39 011 796 579
                  </span>
                </div>
              </a>

              {/* Email Card */}
              <a href="mailto:ciao@namaste.it"
                className="block bg-charcoal/50 p-4 border-2 border-cream/20 hover:border-turmeric-400 transition-all group"
                style={{
                  borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                }}>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl group-hover:animate-wiggle">✉️</span>
                  <span className="font-body text-cream group-hover:text-turmeric-300 transition-colors">
                    ciao@namaste.it
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Hours Section */}
          <div>
            <h4 className="font-display text-xl font-bold text-turmeric-300 mb-6 flex items-center space-x-2">
              <span className="text-2xl">🕐</span>
              <span className="hand-underline">Opening Hours</span>
            </h4>

            <div className="bg-charcoal/50 p-6 border-2 border-cream/20"
              style={{
                borderRadius: '30px 4px 30px 4px',
                boxShadow: '4px 4px 0px rgba(249, 115, 22, 0.3)',
              }}>
              <div className="space-y-4">
                {[
                  { days: 'Ordini Locali', hours: '18:00 - 22:00', emoji: '🍽️' },
                ].map((schedule, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-cream/10 last:border-0">
                    <div className="flex items-center space-x-2">
                      <span>{schedule.emoji}</span>
                      <span className="font-body text-cream/90">{schedule.days}</span>
                    </div>
                    <span className="font-display font-bold text-saffron-400">{schedule.hours}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t-2 border-dashed border-cream/20 text-center">
                <span className="inline-block bg-cardamom-500 text-white px-4 py-2 font-display font-bold text-sm border-2 border-cream/30"
                  style={{
                    borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                  }}>
                  ✓ 100% Halal
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t-2 border-dashed border-cream/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="font-body text-cream/60 text-sm">
              © {new Date().getFullYear()} NAMASTE Ristorante.
              <span className="font-accent text-lg ml-2">Made with 💛 & lots of spices!</span>
            </p>

            <div className="flex items-center space-x-2">
              <span className="font-accent text-cream/60">designed by an indie artist</span>
              <span className="text-xl animate-wiggle-slow">🎨</span>
            </div>
          </div>

          {/* Decorative bottom illustration */}
          <div className="flex justify-center mt-8 space-x-2 opacity-40">
            {['🍛', '🌶️', '🍃', '✨', '🥘', '🧅', '🌿', '🍚'].map((emoji, i) => (
              <span
                key={i}
                className="text-2xl"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  transform: `rotate(${(i % 2 === 0 ? 1 : -1) * 10}deg)`,
                }}
              >
                {emoji}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
