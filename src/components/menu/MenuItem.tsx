'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MenuItem as MenuItemType } from '@/types/menu';
import { useCart } from '@/contexts/CartContext';

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
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
      className="group bg-white h-full flex flex-col border-3 border-ink relative overflow-hidden transition-all duration-300 hover:-translate-y-2"
      style={{
        borderRadius: '30px 4px 30px 4px',
        boxShadow: '5px 5px 0px rgba(45, 27, 14, 0.7)',
      }}
    >
      {/* Top decorative stripe */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-saffron-400 via-turmeric-400 to-masala-400" />

      {/* Bestseller badge */}
      {item.isTopSeller && (
        <div
          className="absolute top-4 -right-2 bg-masala-500 text-white text-xs font-display font-bold px-4 py-1.5 z-10 transform rotate-2 border-2 border-ink"
          style={{
            borderRadius: '4px 15px 4px 15px',
            boxShadow: '2px 2px 0px rgba(45, 27, 14, 0.8)',
          }}
        >
          ⭐ Bestseller!
        </div>
      )}

      {/* Image */}
      {item.image && (
        <div
          className="relative h-48 w-full overflow-hidden border-b-3 border-ink"
        >
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={75}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AmUYALgAACiAB/9k="
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Hover overlay with doodle */}
          <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-all duration-300 flex items-center justify-center">
            <span className="text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-bounce-gentle">
              🍴
            </span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col bg-gradient-to-br from-cream to-parchment">
        {/* Title */}
        <h3 className="font-display text-xl font-bold text-ink mb-2 group-hover:text-saffron-600 transition-colors leading-tight">
          {item.name}
        </h3>

        {/* Description */}
        <p className="font-body text-ink/70 text-sm mb-4 line-clamp-2 flex-1 leading-relaxed">
          {item.description}
        </p>

        {/* Bottom section */}
        <div className="flex justify-between items-center pt-4 border-t-2 border-dashed border-ink/20 mt-auto">
          {/* Price */}
          <span
            className="inline-block bg-turmeric-400 text-ink font-display font-bold text-lg px-4 py-1 border-2 border-ink"
            style={{
              borderRadius: '4px 20px 4px 20px',
              boxShadow: '2px 2px 0px rgba(45, 27, 14, 0.6)',
            }}
          >
            €{item.price.toFixed(2)}
          </span>

          {/* Add to cart button */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`
              px-5 py-2 font-display font-bold text-sm transition-all duration-300 border-2 border-ink flex items-center gap-2
              ${isAdding
                ? 'bg-cardamom-500 text-white scale-95'
                : 'bg-saffron-500 text-white hover:bg-saffron-600 hover:scale-105'
              }
            `}
            style={{
              borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
              boxShadow: isAdding ? 'none' : '3px 3px 0px rgba(45, 27, 14, 0.8)',
            }}
          >
            {isAdding ? (
              <>
                <span>Added!</span>
                <span className="animate-bounce">✓</span>
              </>
            ) : (
              <>
                <span>Add</span>
                <span className="text-lg">🛒</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Decorative corner doodles */}
      <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-saffron-300/50"
        style={{ borderRadius: '0 0 0 8px' }} />
      <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-saffron-300/50"
        style={{ borderRadius: '0 0 8px 0' }} />
    </div>
  );
};

export default MenuItem;
