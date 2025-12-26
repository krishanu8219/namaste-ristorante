'use client';

import React, { useState } from 'react';
import { MENU } from '@/data/menu';
import { MenuCategoryId } from '@/types/menu';
import MenuGrid from '@/components/menu/MenuGrid';
import CategoryFilter from '@/components/menu/CategoryFilter';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState<MenuCategoryId | 'all'>('all');

  const categories = MENU.map(cat => ({
    id: cat.id,
    name: cat.name
  }));

  const allItems = MENU.flatMap(category => category.items);
  const filteredItems = activeCategory === 'all'
    ? allItems
    : allItems.filter(item => item.categoryId === activeCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16 sm:py-20 bg-gradient-to-br from-cream via-turmeric-50 to-parchment relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-saffron-200/20 blob-shape animate-blob" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-masala-200/10 blob-shape-2 animate-blob" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/4 left-10 text-5xl opacity-10 animate-float">🍛</div>
        <div className="absolute bottom-1/4 right-10 text-4xl opacity-10 animate-float" style={{ animationDelay: '2s' }}>🌶️</div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 animate-fade-in">
            <span className="font-accent text-xl text-masala-500 block mb-2">
              tutto per te ✨
            </span>
            <h1 className="section-title">
              📜 Il Nostro Menù 📜
            </h1>
            <p className="font-body text-ink/70 mt-8 max-w-2xl mx-auto">
              Esplora la nostra deliziosa selezione di piatti autentici, dai curry tradizionali alle pizze cotte a legna.
            </p>
          </div>

          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          <div className="mt-8">
            <MenuGrid items={filteredItems} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MenuPage;