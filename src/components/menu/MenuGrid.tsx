'use client';

import React from 'react';
import MenuItem from './MenuItem';
import { MenuItem as MenuItemType } from '@/types/menu';

interface MenuGridProps {
  items: MenuItemType[];
  title?: string;
}

const MenuGrid: React.FC<MenuGridProps> = ({ items, title }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-turmeric-100 mb-6 animate-wiggle-slow border-3 border-ink"
          style={{
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            boxShadow: '4px 4px 0px rgba(45, 27, 14, 0.6)',
          }}>
          <span className="text-4xl">🍽️</span>
        </div>
        <h3 className="font-display text-2xl font-bold text-ink mb-2">
          No dishes here yet!
        </h3>
        <p className="font-body text-ink/70">
          Try selecting a different category
        </p>
        <span className="font-accent text-lg text-saffron-500 block mt-2">
          more deliciousness coming soon ✨
        </span>
      </div>
    );
  }

  return (
    <div className="mb-12">
      {title && (
        <h2 className="section-title text-center mb-10">
          {title}
        </h2>
      )}

      {/* Masonry-style grid for varied visual interest */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="animate-fade-in"
            style={{
              animationDelay: `${Math.min(index * 0.05, 0.5)}s`,
              // Subtle rotation for playful feel
              transform: `rotate(${(index % 3 - 1) * 0.5}deg)`,
            }}
          >
            <MenuItem item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuGrid;
