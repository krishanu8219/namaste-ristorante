'use client';

import React from 'react';
import { MenuCategoryId } from '@/types/menu';

interface CategoryFilterProps {
  categories: Array<{ id: MenuCategoryId; name: string }>;
  activeCategory: MenuCategoryId | 'all';
  onCategoryChange: (categoryId: MenuCategoryId | 'all') => void;
}

// Emoji mapping for categories
const categoryEmojis: Record<string, string> = {
  all: '🍽️',
  antipasti: '🥟',
  griglia: '🍗',
  pollo: '🍛',
  agnello: '🐑',
  gamberi: '🦐',
  verdure: '🥗',
  pane: '🫓',
  riso: '🍚',
  dolci: '🍮',
  bevande: '🥤',
  birre: '🍺',
  vini: '🍷',
};

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <div className="mb-12">
      {/* Decorative label */}
      <div className="text-center mb-6">
        <span className="font-accent text-lg text-masala-500">
          scegli il tuo preferito ✨
        </span>
      </div>

      <div className="flex overflow-x-auto pb-6 scrollbar-hide gap-3 px-2 justify-center flex-wrap">
        {/* All button */}
        <button
          onClick={() => onCategoryChange('all')}
          className={`
            px-6 py-3 whitespace-nowrap font-display font-bold transition-all duration-300 flex-shrink-0 border-2 border-ink
            ${activeCategory === 'all'
              ? 'bg-saffron-500 text-white scale-105'
              : 'bg-cream text-ink hover:bg-turmeric-100 hover:scale-105'
            }
          `}
          style={{
            borderRadius: activeCategory === 'all'
              ? '255px 15px 225px 15px / 15px 225px 15px 255px'
              : '15px 225px 15px 255px / 255px 15px 225px 15px',
            boxShadow: activeCategory === 'all'
              ? '4px 4px 0px rgba(45, 27, 14, 0.8)'
              : '2px 2px 0px rgba(45, 27, 14, 0.5)',
          }}
        >
          <span className="mr-2">🍽️</span>
          Tutto
        </button>

        {/* Category buttons */}
        {categories.map((category, index) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`
              px-6 py-3 whitespace-nowrap font-display font-bold transition-all duration-300 flex-shrink-0 border-2 border-ink
              ${activeCategory === category.id
                ? 'bg-saffron-500 text-white scale-105'
                : 'bg-cream text-ink hover:bg-turmeric-100 hover:scale-105'
              }
            `}
            style={{
              borderRadius: index % 2 === 0
                ? '255px 15px 225px 15px / 15px 225px 15px 255px'
                : '15px 225px 15px 255px / 255px 15px 225px 15px',
              boxShadow: activeCategory === category.id
                ? '4px 4px 0px rgba(45, 27, 14, 0.8)'
                : '2px 2px 0px rgba(45, 27, 14, 0.5)',
              transform: activeCategory === category.id ? 'scale(1.05) rotate(-1deg)' : undefined,
            }}
          >
            <span className="mr-2">{categoryEmojis[category.id] || '🍴'}</span>
            {category.name}
          </button>
        ))}
      </div>

      {/* Decorative underline */}
      <div className="flex justify-center">
        <svg viewBox="0 0 300 12" className="w-64 h-4">
          <path
            d="M0 6 Q 75 0 150 6 T 300 6"
            stroke="#F0B429"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default CategoryFilter;
