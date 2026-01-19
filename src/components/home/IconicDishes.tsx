'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

interface IconicDish {
    id: number;
    name: string;
    subtitle: string;
    description: string;
    image: string;
}

const iconicDishes: IconicDish[] = [
    {
        id: 1,
        name: 'Classico Autentico',
        subtitle: 'Butter Chicken',
        description: 'Il nostro iconico Butter Chicken è preparato con tenero pollo marinato, cotto nel tandoor e immerso in una salsa cremosa di pomodoro, burro e spezie aromatiche. Un piatto che incanta ogni palato.',
        image: '/dishes/butter-chicken.png'
    },
    {
        id: 2,
        name: 'Ricetta Tradizionale',
        subtitle: 'Dal Makhani',
        description: 'Lenticchie nere e fagioli rossi cotti lentamente per ore con burro, panna e spezie delicate. Una ricetta autentica del Punjab, ricca e vellutata.',
        image: '/dishes/dal-makhani.png'
    },
    {
        id: 3,
        name: 'Arte del Tandoor',
        subtitle: 'Tandoori Chicken',
        description: 'Pollo marinato in yogurt e spezie tradizionali, cotto alla perfezione nel nostro forno Tandoor. Succoso, affumicato e ricco di sapori autentici dell\'India.',
        image: '/dishes/tandoori-chicken.png'
    },
    {
        id: 4,
        name: 'Delizia Croccante',
        subtitle: 'Chicken Pakora',
        description: 'Bocconcini di pollo marinati e fritti in una pastella croccante di ceci e spezie. Perfetti come antipasto, serviti con chutney alla menta.',
        image: '/dishes/chicken-pakora.png'
    }
];

export default function IconicDishes() {
    return (
        <section className="relative bg-pearl py-20 px-8 lg:px-16 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03]">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-champagne-gold blur-3xl" />
                <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-deep-burgundy blur-3xl" />
            </div>

            <div className="container mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    {/* Decorative Ornament */}
                    <div className="flex items-center justify-center mb-6">
                        <svg className="w-12 h-12 text-champagne-gold" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L9 8H15L12 2M12 22L15 16H9L12 22M2 12L8 9V15L2 12M22 12L16 15V9L22 12M8.5 8.5L12 12L8.5 15.5L5 12L8.5 8.5M15.5 8.5L19 12L15.5 15.5L12 12L15.5 8.5Z" />
                        </svg>
                    </div>

                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="h-px w-12 bg-champagne-gold" />
                        <span className="text-champagne-gold font-body text-sm tracking-[0.3em] uppercase">
                            Le Nostre Specialità
                        </span>
                        <div className="h-px w-12 bg-champagne-gold" />
                    </div>

                    <h2 className="font-display text-4xl lg:text-5xl text-deep-burgundy font-semibold mb-4">
                        I Piatti Iconici
                    </h2>
                    <p className="font-body text-charcoal/70 text-lg max-w-2xl mx-auto">
                        Scopri le ricette autentiche che portano i sapori magici dell'India a Torino
                    </p>
                </div>

                {/* Dishes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {iconicDishes.map((dish, index) => (
                        <DishCard key={dish.id} dish={dish} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function DishCard({ dish, index }: { dish: IconicDish; index: number }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative"
        >
            <div
                className="relative h-[400px] overflow-hidden cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Dish Image */}
                <img
                    src={dish.image}
                    alt={dish.subtitle}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Burgundy Overlay - Always Visible */}
                <div className="absolute inset-0 bg-gradient-to-b from-deep-burgundy/80 via-deep-burgundy/60 to-deep-burgundy/90" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    {/* Logo/Brand Mark */}
                    <div className="flex justify-center">
                        <svg className="w-10 h-10 text-champagne-gold opacity-80" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L9 8H15L12 2M12 22L15 16H9L12 22M2 12L8 9V15L2 12M22 12L16 15V9L22 12Z" />
                        </svg>
                    </div>

                    {/* Title - Always Visible */}
                    <div className="text-center">
                        <motion.div
                            animate={{ opacity: isHovered ? 0 : 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <p className="text-champagne-gold/80 font-body text-sm tracking-wider mb-2">
                                {dish.name}
                            </p>
                            <h3 className="text-white font-display text-2xl font-semibold mb-4">
                                {dish.subtitle}
                            </h3>
                        </motion.div>

                        {/* Description - Visible on Hover */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHovered ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 p-6 flex flex-col justify-center"
                        >
                            <p className="text-white/90 font-body text-sm leading-relaxed mb-6">
                                {dish.description}
                            </p>
                        </motion.div>
                    </div>

                    {/* Read More Button */}
                    <div className="flex justify-center">
                        <Link
                            href="/menu"
                            className="bg-deep-burgundy text-champagne-gold px-6 py-2 font-body text-sm tracking-wide uppercase hover:bg-champagne-gold hover:text-deep-burgundy transition-all duration-300 border border-champagne-gold"
                        >
                            Scopri di Più
                        </Link>
                    </div>
                </div>
            </div>

            {/* Dish Name Below Card */}
            <div className="text-center mt-4">
                <h4 className="font-display text-xl text-deep-burgundy font-semibold">
                    {dish.subtitle}
                </h4>
            </div>
        </motion.div>
    );
}
