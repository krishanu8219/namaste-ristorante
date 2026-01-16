'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/contexts/CartContext';

const ChefFavoritesPage = () => {
    const { dispatch } = useCart();

    const specialties = [
        {
            id: 'butter-chicken',
            name: 'Pollo al Burro (Murgh Makhani)',
            description: 'Tenero pollo marinato in salsa cremosa di pomodoro, burro e spezie dolci. Il classico comfort food.',
            price: 16.50,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCihxJeW-hvcpTAStad5FvFqkP-uPOsM8KBsU5C4jggC0J4z8IxP9niQ9SsO-9C0vrNdMvGi832cg-xSK6biyqorb4jv9Kyvc4YhqWN3mKfu-et3ppfWhmAc2whbvdqGPX3KR1NZgvTD942c_y5bhm_yvP2cugmR_U5aiRiKG7LBn8ZdwKZ_LGFnhPStIoqzgujqwnsXkgGe9WNmhVFdV3YTkduoWde-wigHgjxP-0GLo4wgn7a6c5yuYoAp9BZU5mirx8fobxPLcp'
        },
        {
            id: 'biryani-lamb',
            name: 'Biryani di Agnello Hyderabad',
            description: 'Riso basmati aromatico cucinato a strati con agnello speziato, zafferano e frutta secca. Un piatto regale.',
            price: 18.00,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBq5Vy_unJKl5ToYgoUl5wBwptn5-7u1a5AjG4gHVjqqoecGI9Q1a8VrECau4_7fx-LAwtefimuSPC9TZTnoQaUaJ0dtJyx_hEkfA7XFU_WguJ3Sx5-sDCxIfLc9k8T-SAdmBsz8-ZGnt0bTTXTnx91Z2YxOhmaNAiiNxI_r90Zf6NcV8NPZgnIJiv5U4YIgemIuWhavHD_IfCRCpjP7Iea5vrZugf5g91X8rkQIYGtewJT9JskD5923JK9eJTw5Qmq0vGiKJziC3RK'
        },
        {
            id: 'saag-paneer',
            name: 'Saag Paneer (Formaggio e Spinaci)',
            description: 'Cubetti di formaggio fresco indiano in una salsa ricca e cremosa a base di spinaci e spezie. Vegetariano e nutriente.',
            price: 14.50,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6H3Npcxl-hkG_y8uBNFPNbmpGLxR9_u_1itC51lRpXaTuvAlx9Sg2F2Nn_95XVzQ83cTz-Xwz71Sj3o3F0ZZ-52IH4mxjlndtKstTDvd_9LUpZWKtlwAXNFGBh8-z1XEdMluW0auJJn0F9tKnkAl1yXhmpNevZmqvv2ArEYVMTHRvAHD3XjjAflVPgOb806bpAvP6F4oXmwL4nOTIz34xr7lJ41tRX7gTOubh5AfrMj-k6buRAju8Zt7lrAzL8kZEW2xlsW4yH36Z'
        },
        {
            id: 'tandoori-mixed',
            name: 'Grigliata Mista Tandoori',
            description: 'Assortimento di pollo, agnello e gamberi marinati nello yogurt e cotti nel forno tandoor. Per condividere.',
            price: 22.00,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA28bYUIEPrhmzJuMGffkl8F_rjTk5Pt0hldXAhmHHeXdLWzloZFxPoSbKe4epTynwhtlQMeVMfzBLeoaVY8vrT8WYoAx_5OhyhFreXDsx4MVW4FXa56k9Yd5cu-al1nnWJlqqchMhTV7iMG-VvDEhsnJD3XwAve_unIExB4QtUrm7dgM6ngs8Uizv9scWOw0laeOvtfyA_6sYlmYOTJmmltX1thq79-UTYUqt_36JUCGXKUPCw-qNDy0BikiB09rTGKEbSJpXhAu3S'
        }
    ];

    const handleAddToCart = (item: typeof specialties[0]) => {
        dispatch({
            type: 'ADD_ITEM',
            payload: {
                id: item.id,
                name: item.name,
                price: item.price,
                image: item.image,
            },
        });
    };

    return (
        <div className="min-h-screen flex flex-col font-sans text-deep-red antialiased bg-beige-sidebar">
            <Header />

            {/* Hero Section */}
            <section className="relative">
                <div className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden py-20">
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 z-0"
                        style={{
                            backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuA-3LKow58hszCGUNyiEnDHMFhFPuyvYqP4NnipGgtUbgKJByjjk6b25QEd7IHPLW6N-J2G00ZOE1q7qT7ZxZxQ_nT5k0_9UQqgMUJE6SJYcP4InsYGlCE4xkx7Hvc_CUYqd3HifaXOCc-Rc_UNFSI5fM1vSyeNFuVKDNX_KCvcGQkLGOBMFwOyeNysy5l3Isy0__NUwvNtjr11q9i9NqMhssqpJoYcs2FVGUKxrvDUcJt2wvaz-SK5oiI2KaA4559K7LUAts42fWnj')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    />
                    {/* Hero Content */}
                    <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                        <h1 className="font-serif text-3xl md:text-5xl text-white mb-4 drop-shadow-lg font-bold leading-tight">
                            I Preferiti dello Chef - Un Viaggio di Sapori Autentici
                        </h1>
                        <p className="text-white text-lg md:text-xl font-light drop-shadow-lg">
                            Scopri i piatti tradizionali più amati, scelti personalmente dal nostro Chef per il vostro piacere.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content / Specialties */}
            <main className="py-12 md:py-16">
                <div className="container mx-auto px-4">
                    {/* Section Title */}
                    <h2 className="text-center font-serif text-3xl md:text-4xl text-deep-red mb-12 font-bold">
                        Le Nostre Specialità
                    </h2>

                    {/* Menu Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 max-w-6xl mx-auto">
                        {specialties.map((item) => (
                            <article
                                key={item.id}
                                className="flex flex-col md:flex-row bg-medium-red rounded-xl overflow-hidden shadow-xl h-auto md:h-64 group"
                            >
                                <div className="relative overflow-hidden md:w-2/5">
                                    <img
                                        alt={item.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        src={item.image}
                                    />
                                </div>
                                <div className="p-6 flex-1 flex flex-col justify-center text-white relative">
                                    {/* Corner Decoration */}
                                    <div className="absolute top-0 right-0 p-2 opacity-20">
                                        <svg className="w-10 h-10 text-gold-accent" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2L2 22h20L12 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-serif text-xl font-bold mb-2">{item.name}</h3>
                                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                                        {item.description}
                                    </p>
                                    <div className="mt-auto flex items-center justify-between">
                                        <span className="text-gold-accent text-2xl font-bold font-serif">
                                            €{item.price.toFixed(2)}
                                        </span>
                                        <button
                                            onClick={() => handleAddToCart(item)}
                                            className="bg-gold-accent text-medium-red text-xs font-bold py-1.5 px-4 rounded hover:bg-yellow-600 transition-colors"
                                        >
                                            Aggiungi
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Chef Section */}
                    <section className="max-w-5xl mx-auto mt-12">
                        <div
                            className="rounded-xl overflow-hidden shadow-lg border border-gold-accent relative"
                            style={{ backgroundColor: '#F9E4B7' }}
                        >
                            {/* Ornamental Corners */}
                            <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-medium-red rounded-tl-xl pointer-events-none opacity-20"></div>
                            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-medium-red rounded-br-xl pointer-events-none opacity-20"></div>

                            <div className="flex flex-col md:flex-row">
                                {/* Chef Image */}
                                <div className="md:w-1/3 h-64 md:h-auto relative">
                                    <img
                                        alt="Chef Rajesh Kumar"
                                        className="w-full h-full object-cover"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBc6umUm1mCHUIsYnUIDCFj0RMfK482kqoaE3iFSmKw0_nSgUvp5hhwno16iBuC-NQgRfGu9_7ms2sauJqno6ZpOemQVzXWpLWi5OVG1T8w_BcIOdeH0JFGBA5p_VBwXdDYDbHTnePF66WOTJbRSquZEsUeZUwufPAgxDzom20me1DOkSrgLSyuAKaunoAJKDewE472g75fS9MXDd1qe23Wqp-RDhDe7jqMHWsKRH-2AiNr8uwEcRemDxjlSRoVQ5CBrLqrqUH8c7Yz"
                                    />
                                </div>
                                {/* Chef Content */}
                                <div className="md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
                                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-deep-red mb-4">
                                        La Parola dello Chef - L&apos;Anima della Nostra Cucina
                                    </h3>
                                    <blockquote className="text-deep-red/80 italic text-lg leading-relaxed mb-6 font-serif">
                                        &quot;La cucina indiana è una celebrazione di spezie, storia e famiglia. Ogni piatto che servo è un omaggio alle mie radici. Spero che questi sapori vi portino gioia e calore, proprio come in India.&quot;
                                    </blockquote>
                                    <div className="text-medium-red font-bold text-lg text-right">
                                        - Chef Rajesh Kumar.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ChefFavoritesPage;
