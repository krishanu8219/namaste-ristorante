'use client';

import React, { useState } from 'react';
import { MenuItem as MenuItemType } from '@/types/menu';
import { useCart } from '@/contexts/CartContext';

interface PremiumMenuItemProps {
    item: MenuItemType;
}

const PremiumMenuItem: React.FC<PremiumMenuItemProps> = ({ item }) => {
    const { dispatch } = useCart();
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = () => {
        setIsAdding(true);
        dispatch({
            type: 'ADD_ITEM',
            payload: {
                id: item.id,
                name: item.name,
                price: item.price,
                image: item.image,
            },
        });
        setTimeout(() => setIsAdding(false), 600);
    };

    return (
        <div
            className="group cursor-pointer"
            onClick={handleAddToCart}
        >
            <div className="flex justify-between items-baseline border-b border-dotted border-gray-400 pb-1 mb-1">
                <h4 className="font-serif font-bold text-lg text-gray-900 group-hover:text-namaste-maroon transition-colors pr-2">
                    {item.name}
                    {item.isTopSeller && (
                        <span className="ml-2 text-xs bg-namaste-gold text-white px-2 py-0.5 rounded-full">
                            ★
                        </span>
                    )}
                </h4>
                <span className="font-bold text-lg text-namaste-maroon font-extrabold whitespace-nowrap">
                    €{item.price.toFixed(2)}
                </span>
            </div>
            <p className="text-sm text-gray-600 italic leading-snug">
                {item.description}
            </p>
            {isAdding && (
                <div className="text-xs text-namaste-gold mt-1 font-semibold animate-pulse">
                    ✓ Aggiunto al carrello
                </div>
            )}
        </div>
    );
};

export default PremiumMenuItem;
