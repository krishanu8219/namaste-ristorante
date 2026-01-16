'use client';

import React from 'react';

interface OrnamentDividerProps {
    className?: string;
}

const OrnamentDivider: React.FC<OrnamentDividerProps> = ({ className = '' }) => {
    return (
        <div className={`flex items-center justify-center my-4 ${className}`}>
            <div className="h-px w-10 bg-namaste-gold" />
            <span className="mx-3 text-namaste-maroon text-xl">★</span>
            <div className="h-px w-10 bg-namaste-gold" />
        </div>
    );
};

export default OrnamentDivider;
