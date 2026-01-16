'use client';

import React from 'react';
import { MenuCategory } from '@/types/menu';
import OrnamentDivider from './OrnamentDivider';
import PremiumMenuItem from './PremiumMenuItem';

interface PremiumMenuSectionProps {
    category: MenuCategory;
}

const PremiumMenuSection: React.FC<PremiumMenuSectionProps> = ({ category }) => {
    return (
        <article className="mb-10">
            <div className="text-center mb-6">
                <OrnamentDivider />
                <h3 className="font-display text-2xl font-bold text-namaste-maroon uppercase tracking-wide">
                    {category.name}
                </h3>
            </div>
            <div className="space-y-5">
                {category.items.map((item) => (
                    <PremiumMenuItem key={item.id} item={item} />
                ))}
            </div>
        </article>
    );
};

export default PremiumMenuSection;
