'use client';

import React from 'react';

type FilterType = 'all' | 'vegetarian' | 'vegan' | 'gluten-free' | 'spicy';

interface MenuFiltersProps {
    activeFilter: FilterType;
    onFilterChange: (filter: FilterType) => void;
}

const MenuFilters: React.FC<MenuFiltersProps> = ({ activeFilter, onFilterChange }) => {
    const filters: { id: FilterType; label: string; icon?: string }[] = [
        { id: 'all', label: 'Tutti i Piatti' },
        { id: 'vegetarian', label: 'Vegetariano', icon: '🍃' },
        { id: 'vegan', label: 'Vegano', icon: '🌱' },
        { id: 'gluten-free', label: 'Senza Glutine', icon: '🌾' },
        { id: 'spicy', label: 'Piccante', icon: '🌶️' },
    ];

    return (
        <div className="sticky top-[60px] z-40 bg-cream-bg/95 backdrop-blur-sm py-4 border-b border-gold-accent/20 shadow-sm mb-8">
            <div className="container mx-auto px-4">
                <div className="flex overflow-x-auto gap-3 pb-2 md:pb-0 scrollbar-hide md:justify-center">
                    {filters.map((filter) => (
                        <button
                            key={filter.id}
                            onClick={() => onFilterChange(filter.id)}
                            className={`
                whitespace-nowrap px-6 py-2 rounded-full border transition-all duration-300 flex items-center gap-2 font-serif text-sm md:text-base
                ${activeFilter === filter.id
                                    ? 'bg-deep-red text-white border-deep-red shadow-md transform scale-105'
                                    : 'bg-white text-gray-700 border-gold-accent/30 hover:border-gold-accent hover:bg-gold-accent/5'
                                }
              `}
                        >
                            {filter.icon && <span>{filter.icon}</span>}
                            {filter.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MenuFilters;
