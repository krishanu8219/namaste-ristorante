'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Review {
    id: number;
    name: string;
    rating: 5;
    text: string;
    date: string;
}

const reviews: Review[] = [
    {
        id: 1,
        name: "Marco R.",
        rating: 5,
        text: "Esperienza culinaria incredibile! Il butter chicken è il migliore che abbia mai assaggiato. Autentico sapore indiano nel cuore di Torino.",
        date: "3 settimane fa"
    },
    {
        id: 2,
        name: "Sofia M.",
        rating: 5,
        text: "Atmosfera accogliente e cibo eccezionale. Il personale è molto cordiale e i piatti sono preparati con ingredienti freschi. Consigliatissimo!",
        date: "1 mese fa"
    },
    {
        id: 3,
        name: "Alessandro P.",
        rating: 5,
        text: "Da 5 anni vengo qui regolarmente. La qualità non è mai diminuita. Il tandoori chicken e il naan sono sempre perfetti!",
        date: "2 settimane fa"
    },
    {
        id: 4,
        name: "Giulia T.",
        rating: 5,
        text: "Abbiamo festeggiato il nostro anniversario qui. Servizio impeccabile, cibo delizioso e un'atmosfera romantica. Torneremo sicuramente!",
        date: "1 settimana fa"
    }
];

export default function ReviewsCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % reviews.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        }),
    };

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prev) => {
            const next = prev + newDirection;
            if (next < 0) return reviews.length - 1;
            if (next >= reviews.length) return 0;
            return next;
        });
    };

    return (
        <section className="relative bg-gradient-to-b from-deep-burgundy to-rich-burgundy py-20 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-champagne-gold blur-3xl" />
                <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-antique-gold blur-3xl" />
            </div>

            <div className="container mx-auto px-8 lg:px-16 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="h-px w-12 bg-champagne-gold" />
                        <span className="text-champagne-gold font-body text-sm tracking-[0.3em] uppercase">
                            Recensioni
                        </span>
                        <div className="h-px w-12 bg-champagne-gold" />
                    </div>
                    <h2 className="font-display text-4xl lg:text-5xl text-white font-semibold mb-4">
                        Cosa Dicono i Nostri Clienti
                    </h2>
                    <div className="flex items-center justify-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-6 h-6 text-champagne-gold fill-current" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                        <span className="ml-3 text-white/80 font-body text-lg">4.8 su 2268+ recensioni</span>
                    </div>
                </div>

                {/* Carousel */}
                <div className="relative max-w-4xl mx-auto min-h-[300px] flex items-center">
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: 'spring', stiffness: 300, damping: 30 },
                                opacity: { duration: 0.3 },
                            }}
                            className="absolute w-full"
                        >
                            <div className="bg-white/10 backdrop-blur-md p-8 md:p-12 rounded-lg border border-white/20 shadow-2xl">
                                {/* Stars */}
                                <div className="flex gap-1 mb-6">
                                    {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                                        <motion.svg
                                            key={i}
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ delay: i * 0.1, type: 'spring' }}
                                            className="w-5 h-5 text-champagne-gold fill-current"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </motion.svg>
                                    ))}
                                </div>

                                {/* Review Text */}
                                <p className="text-white/90 font-body text-lg md:text-xl leading-relaxed mb-6 italic">
                                    "{reviews[currentIndex].text}"
                                </p>

                                {/* Author */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-champagne-gold font-display font-semibold text-lg">
                                            {reviews[currentIndex].name}
                                        </p>
                                        <p className="text-white/60 font-body text-sm">
                                            {reviews[currentIndex].date}
                                        </p>
                                    </div>
                                    <svg className="w-12 h-12 text-champagne-gold/20" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                                    </svg>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <button
                        onClick={() => paginate(-1)}
                        className="absolute left-0 -translate-x-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-champagne-gold hover:text-deep-burgundy transition-all duration-300 z-10"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => paginate(1)}
                        className="absolute right-0 translate-x-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-champagne-gold hover:text-deep-burgundy transition-all duration-300 z-10"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Dots Indicator */}
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
                        {reviews.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setDirection(index > currentIndex ? 1 : -1);
                                    setCurrentIndex(index);
                                }}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-champagne-gold w-8' : 'bg-white/30 hover:bg-white/50'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
