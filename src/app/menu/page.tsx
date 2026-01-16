'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/contexts/CartContext';

export default function MenuPage() {
  const { dispatch, state } = useCart();

  const getItemCount = (itemId: string) => {
    const item = state.items.find(i => i.id === itemId);
    return item ? item.quantity : 0;
  };

  const handleAddToCart = (id: string, name: string, price: number) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id,
        name,
        price,
        image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80',
      },
    });
  };

  const MenuItem = ({ id, name, price, description }: { id: string; name: string; price: number; description: string }) => (
    <div className="group py-4 border-b border-champagne-gold/20 last:border-none">
      <div className="flex justify-between items-baseline gap-4">
        <h4 className="font-display text-lg text-charcoal group-hover:text-deep-burgundy transition-colors">{name}</h4>
        <div className="flex-1 border-b border-dotted border-champagne-gold/30 min-w-[40px] mb-1" />
        <span className="font-display font-semibold text-lg text-champagne-gold">€{price.toFixed(2)}</span>
      </div>
      <div className="flex gap-4 mt-2 items-start">
        <p className="text-sm text-charcoal/60 font-body leading-relaxed flex-1">{description}</p>
        <button
          onClick={() => handleAddToCart(id, name, price)}
          className={`shrink-0 border border-champagne-gold text-champagne-gold flex items-center justify-center hover:bg-champagne-gold hover:text-deep-burgundy transition-all duration-300 ${getItemCount(id) > 0 ? 'px-4 py-1 gap-2' : 'w-8 h-8'}`}
        >
          {getItemCount(id) > 0 && (
            <span className="text-sm font-body">{getItemCount(id)}</span>
          )}
          <span className="text-lg font-light leading-none">+</span>
        </button>
      </div>
    </div>
  );

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="text-center mb-8">
      <div className="inline-flex items-center gap-4 mb-3">
        <div className="h-px w-8 bg-champagne-gold/50" />
        <span className="text-champagne-gold text-lg">✦</span>
        <div className="h-px w-8 bg-champagne-gold/50" />
      </div>
      <h3 className="font-display text-2xl font-semibold text-deep-burgundy uppercase tracking-widest">{title}</h3>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col" style={{
      backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuA8ThA0_URR8glx1EvVT9FRTwgbUvOl6FwFwwk0DXFKQI2XVntOnXWGFfIRB_wq0SRwLZgCYd-d71a8LZkqHp6GPXlbmDyGcbe_r4auOKv1ArxIFq_00fZ44abwQJTEVv_1bHtXbx9fAfru8Jt1QuvN0FecOxUOARSC9-wL8txoznplmq6jUnCOOeNfeEd2OygoxB-8Gbc1-Plefs3OBiTB9CZ5DfhbaumvaUmw4EFvJQuQfMVu1gPeARe8J94QALM8bMF_GiYVYDup)',
      backgroundRepeat: 'repeat'
    }}>
      <Header />

      <main>
        {/* Premium Hero Section */}
        <section className="relative h-[400px] md:h-[450px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              alt="Indian Cuisine"
              className="w-full h-full object-cover"
              src="/hero-indian-cuisine.png"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
          </div>
          <div className="relative h-full flex flex-col justify-center items-center text-center px-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-champagne-gold" />
              <span className="text-champagne-gold font-body text-sm tracking-[0.3em] uppercase">
                Il Nostro
              </span>
              <div className="h-px w-12 bg-champagne-gold" />
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-ivory mb-4">
              Menù
            </h1>
            <p className="font-body text-pearl/80 text-lg max-w-xl">
              Sapori autentici dell&apos;India, preparati con passione da oltre 30 anni
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-champagne-gold" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #D4AF37 0, #D4AF37 10px, #C9A227 10px, #C9A227 20px)' }} />
        </section>

        {/* Menu Content */}
        <div className="py-12 md:py-16">
          <div className="container mx-auto px-8 lg:px-16 py-12 bg-[#fdfbf7] shadow-2xl rounded-xl my-8 relative z-10" style={{
            backgroundImage: "radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.05) 0%, transparent 60%), url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0 C22.4 0 0 22.4 0 50 C0 77.6 22.4 100 50 100 C77.6 100 100 77.6 100 50 C100 22.4 77.6 0 50 0 Z M50 90 C27.9 90 10 72.1 10 50 C10 27.9 27.9 10 50 10 C72.1 10 90 27.9 90 50 C90 72.1 72.1 90 50 90 Z' fill='%23D4AF37' fill-opacity='0.03'/%3E%3C/svg%3E\")"
          }}>
            {/* 3 Column Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">

              {/* COLUMN 1 */}
              <div className="space-y-12">
                {/* ANTIPASTI - SNACKS */}
                <article>
                  <SectionHeader title="Antipasti - Snacks" />
                  <div className="space-y-6">
                    <MenuItem id="pappadum" name="Pappadum (2 Pezzi)" price={3.50} description="Sfoglia croccante di farina di legumi." />
                    <MenuItem id="samosa" name="Samosa" price={5.50} description="Gustoso involtino ripieni di verdura." />
                    <MenuItem id="chicken-samosa" name="Chicken Samosa" price={6.50} description="Gustoso involtino ripieni di pollo." />
                    <MenuItem id="panir-pakora" name="Panir Pakora" price={8.00} description="Formaggio fresco speziato fritto in pastella di farina di ceci." />
                  </div>
                </article>

                {/* GRIGLIA - GRILL */}
                <article>
                  <SectionHeader title="Griglia - Grill" />
                  <div className="space-y-6">
                    <MenuItem id="tandoori-chicken" name="Tandoori Chicken" price={14.50} description="Pollo marinato in yogurt e spezie di colore rosso. È il piatto più famoso della cucina indiana." />
                    <MenuItem id="chicken-tikka" name="Chicken Tikka" price={13.50} description="Bocconcini di pollo marinato in yogurt e spezie disossato allo spiedo." />
                    <MenuItem id="mint-kebab" name="Mint Kebab" price={13.50} description="Bocconcini di pollo marinato in yogurt e menta fresca." />
                    <MenuItem id="curry-tikka" name="Curry Tikka" price={13.50} description="Bocconcini di pollo disossato marinato in yogurt e gusto di curry." />
                  </div>
                </article>

                {/* GAMBERI */}
                <article>
                  <SectionHeader title="Gamberi" />
                  <div className="space-y-6">
                    <MenuItem id="jhinga-jalfrezi" name="Jhinga Jalfrezi" price={15.50} description="Gamberi marinati con aglio e zenzero poi saltato in salsa di cipolle, pomodoro e peperoni." />
                    <MenuItem id="coconut-jhinga" name="Coconut Jhinga Curry" price={15.50} description="Gamberi in salsa di curry e latte di cocco." />
                  </div>
                </article>
              </div>

              {/* COLUMN 2 */}
              <div className="space-y-12">
                {/* POLLO */}
                <article>
                  <SectionHeader title="Pollo" />
                  <div className="space-y-6">
                    <MenuItem id="chicken-curry" name="Chicken Curry" price={12.00} description="Pollo in salsa curry." />
                    <MenuItem id="butter-chicken" name="Butter Chicken" price={13.00} description="Pollo in salsa di pomodori e panna." />
                    <MenuItem id="chicken-tikka-masala" name="Chicken Tikka Masala" price={13.00} description="Bocconcini di pollo in salsa di pomodoro, cipolle, zenzero e coriandolo." />
                    <MenuItem id="chicken-shahi-korma" name="Chicken Shahi Korma" price={13.00} description="Bocconcini di pollo in salsa di panna e anacardi." />
                    <MenuItem id="palak-chicken" name="Palak Chicken" price={13.00} description="Bocconcini di pollo passati in padella con aglio, zenzero e spinaci con spezie." />
                    <MenuItem id="mango-chicken" name="Mango Chicken Curry" price={13.00} description="Pollo in latte di cocco e polpa di mango." />
                    <MenuItem id="chicken-vindaloo" name="Chicken Vindaloo" price={13.00} description="Pollo con patate in salsa saporita." />
                  </div>
                </article>

                {/* AGNELLO */}
                <article>
                  <SectionHeader title="Agnello" />
                  <div className="space-y-6">
                    <MenuItem id="lamb-curry" name="Lamb Curry" price={14.00} description="Agnello in salsa curry." />
                    <MenuItem id="mutton-kofta" name="Mutton Kofta" price={15.00} description="Polpettine di agnello in salsa curry e yogurt." />
                    <MenuItem id="lamb-palak" name="Lamb Palak" price={15.00} description="Bocconcini di agnello passati in padella con curry e spinaci." />
                    <MenuItem id="lamb-vindaloo" name="Lamb Vindaloo" price={15.00} description="Agnello con patate in salsa saporita e piccante." />
                  </div>
                </article>
              </div>

              {/* COLUMN 3 */}
              <div className="space-y-12">
                {/* VERDURE E LEGUMI */}
                <article>
                  <SectionHeader title="Verdure e Legumi" />
                  <div className="space-y-6">
                    <MenuItem id="dal" name="Dal" price={8.50} description="Lenticchie in salsa cremosa." />
                    <MenuItem id="channa" name="Channa" price={9.50} description="Ceci in salsa speziata." />
                    <MenuItem id="jeera-aloo" name="Jeera Aloo" price={8.50} description="Patate saltate con cumino e spezie." />
                    <MenuItem id="baigen-bharta" name="Baigen Bharta" price={9.50} description="Melanzane cotte con spezie varie." />
                    <MenuItem id="mix-vegetable" name="Mix Vegetable" price={9.50} description="Misto verdure saltati con cumino, pomodoro, zenzero e spezie." />
                    <MenuItem id="paneer-butter-masala" name="Paneer Butter Masala" price={11.00} description="Formaggio indiano in salsa di pomodoro, burro e cipolla." />
                    <MenuItem id="vegetable-kofta" name="Vegetable Kofta" price={11.00} description="Polpettine di verdura miste in salsa di panna, curry e anacardi." />
                    <MenuItem id="palak-paneer" name="Palak (Paneer)" price={11.00} description="Spinaci cotti con aglio, zenzero e le spezie con formaggio indiano." />
                  </div>
                </article>

                {/* FOCACCE E PANE */}
                <article>
                  <SectionHeader title="Focacce e Pane Indiano" />
                  <div className="space-y-6">
                    <MenuItem id="chapati" name="Chapati" price={2.50} description="Il classico pane indiano di farina integrale." />
                    <MenuItem id="focaccia-nan" name="Focaccia Nan" price={3.50} description="Focaccia tradizionale di farina bianca cotta al forno." />
                    <MenuItem id="cheese-nan" name="Focaccia Cheese Nan" price={5.00} description="Focaccia di farina bianca ripiena di formaggio." />
                    <MenuItem id="aloo-nan" name="Focaccia Aloo Nan" price={5.00} description="Focaccia ripiena di patate e spezie." />
                    <MenuItem id="keema-nan" name="Focaccia Keema Nan" price={6.00} description="Focaccia di farina bianca ripiena di pollo." />
                    <MenuItem id="garlic-nan" name="Focaccia Garlic Nan" price={4.50} description="Focaccia di farina bianca con aglio fresco." />
                  </div>
                </article>
              </div>
            </div>

            {/* Additional Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 mt-16">
              {/* RISO */}
              <article>
                <SectionHeader title="Riso Basmati - Biryani" />
                <div className="space-y-6">
                  <MenuItem id="basmati-chawal" name="Basmati Chawal" price={4.50} description="Riso bianco cotto al vapore e profumato con cumino e cardamomo." />
                  <MenuItem id="vegetable-biryani" name="Vegetable Biryani" price={10.00} description="Riso basmati e verdure cotti alle spezie." />
                  <MenuItem id="chicken-biryani" name="Chicken Tikka Biryani" price={12.00} description="Riso basmati e pollo cotti alle spezie." />
                </div>
              </article>

              {/* DOLCI */}
              <article>
                <SectionHeader title="Dolci - Sweets" />
                <div className="space-y-6">
                  <MenuItem id="coconut-barfi" name="Coconut Barfi" price={5.50} description="Dolce a base di cocco grattugiato, cardamomo e latte." />
                  <MenuItem id="ras-malai" name="Ras Malai" price={6.50} description="Dolce con latte a base di formaggio indiano con zafferano, cardamomo e pistacchio." />
                  <MenuItem id="mango-cream" name="Mango Cream" price={5.50} description="Budino di mango." />
                  <MenuItem id="gulab-jamun" name="Gulab Jamun" price={5.50} description="Dolce con sciroppo a base di formaggio fresco e semolino." />
                </div>
              </article>

              {/* BEVANDE */}
              <article>
                <SectionHeader title="Bevande" />
                <div className="space-y-6">
                  <MenuItem id="acqua" name="Acqua (50cl)" price={2.00} description="Acqua naturale o frizzante." />
                  <MenuItem id="bibita-lattina" name="Bibita Lattina (33cl)" price={3.00} description="Coca-Cola, Fanta, Sprite." />
                  <MenuItem id="lassi" name="Lassi" price={4.50} description="Bevanda a base di yogurt con gusto di mango o cardamomo." />
                  <MenuItem id="succo-mango" name="Succo di Mango (1L)" price={7.00} description="Succo di mango naturale." />
                </div>
              </article>
            </div>

            {/* Birre e Vini */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 mt-16">
              {/* BIRRE */}
              <article>
                <SectionHeader title="Birre" />
                <div className="space-y-6">
                  <MenuItem id="kingfisher-33" name="Kingfisher 33cl" price={5.00} description="Birra indiana premium." />
                  <MenuItem id="cobra-33" name="Cobra 33cl" price={5.00} description="Birra indiana leggera." />
                  <MenuItem id="kingfisher-66" name="Kingfisher 66cl" price={8.00} description="Birra indiana premium grande." />
                  <MenuItem id="cobra-66" name="Cobra 66cl" price={8.00} description="Birra indiana leggera grande." />
                  <MenuItem id="moretti-66" name="Moretti 66cl" price={6.00} description="Birra italiana classica." />
                </div>
              </article>

              {/* VINI */}
              <article>
                <SectionHeader title="Vini (Bottiglia 70cl)" />
                <div className="space-y-6">
                  <MenuItem id="vino-bianco-kamasutra" name="Vino Bianco Indiano Kamasutra" price={20.00} description="Vino bianco indiano aromatico." />
                  <MenuItem id="vino-rose-kamasutra" name="Vino Rosé Indiano Kamasutra" price={20.00} description="Vino rosé indiano fresco." />
                  <MenuItem id="vino-rosso-kamasutra" name="Vino Rosso Indiano Kamasutra" price={20.00} description="Vino rosso indiano corposo." />
                  <MenuItem id="roero-arneis" name="Roero Arneis" price={22.00} description="Vino bianco piemontese." />
                  <MenuItem id="nebbiolo" name="Nebbiolo" price={25.00} description="Vino rosso piemontese." />
                  <MenuItem id="dolcetto-alba" name="Dolcetto d'Alba" price={22.00} description="Vino rosso piemontese." />
                </div>
              </article>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}