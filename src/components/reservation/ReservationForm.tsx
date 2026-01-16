'use client';

import React, { useState } from 'react';

const ReservationForm: React.FC = () => {
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        guests: '2',
        name: '',
        email: '',
        phone: '',
        requests: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSuccess(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    if (isSuccess) {
        return (
            <div className="bg-white rounded-xl shadow-premium border-2 border-gold-accent/20 p-8 md:p-12 text-center">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="font-serif text-3xl text-deep-red mb-4">Prenotazione Confermata!</h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Grazie {formData.name}, abbiamo ricevuto la tua richiesta per il {formData.date} alle {formData.time}.
                    Ti abbiamo inviato una email di conferma.
                </p>
                <button
                    onClick={() => setIsSuccess(false)}
                    className="text-deep-red font-bold hover:text-red-800 transition-colors border-b-2 border-deep-red pb-1"
                >
                    Effettua un'altra prenotazione
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-premium border border-gold-accent/20 overflow-hidden">
            <div className="bg-deep-red p-4 md:p-6 text-center border-b border-gold-accent/30">
                <span className="text-gold-accent uppercase text-xs tracking-widest font-bold mb-2 block">Dettagli Prenotazione</span>
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                {/* Top 3: Date, Time, Guests */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Data</label>
                        <input
                            type="date"
                            name="date"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-deep-red focus:ring-1 focus:ring-deep-red outline-none transition-all"
                            value={formData.date}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Ora</label>
                        <select
                            name="time"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-deep-red focus:ring-1 focus:ring-deep-red outline-none transition-all appearance-none bg-white"
                            value={formData.time}
                            onChange={handleChange}
                        >
                            <option value="">Seleziona ora</option>
                            <option value="12:00">12:00</option>
                            <option value="12:30">12:30</option>
                            <option value="13:00">13:00</option>
                            <option value="13:30">13:30</option>
                            <option value="14:00">14:00</option>
                            <option value="19:00">19:00</option>
                            <option value="19:30">19:30</option>
                            <option value="20:00">20:00</option>
                            <option value="20:30">20:30</option>
                            <option value="21:00">21:00</option>
                            <option value="21:30">21:30</option>
                            <option value="22:00">22:00</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Ospiti</label>
                        <select
                            name="guests"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-deep-red focus:ring-1 focus:ring-deep-red outline-none transition-all appearance-none bg-white"
                            value={formData.guests}
                            onChange={handleChange}
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                <option key={num} value={num}>{num} {num === 1 ? 'Persona' : 'Persone'}</option>
                            ))}
                            <option value="10+">Gruppo (10+)</option>
                        </select>
                    </div>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-4 py-2">
                    <div className="h-px bg-gray-200 flex-1"></div>
                    <span className="text-gold-accent text-xl">♦</span>
                    <div className="h-px bg-gray-200 flex-1"></div>
                </div>

                {/* Contact Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Nome Completo</label>
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="Il tuo nome"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-deep-red focus:ring-1 focus:ring-deep-red outline-none transition-all"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="tua@email.com"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-deep-red focus:ring-1 focus:ring-deep-red outline-none transition-all"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Telefono</label>
                        <input
                            type="tel"
                            name="phone"
                            required
                            placeholder="+39 333 1234567"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-deep-red focus:ring-1 focus:ring-deep-red outline-none transition-all"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Richieste Speciali (Opzionale)</label>
                    <textarea
                        name="requests"
                        rows={3}
                        placeholder="Intolleranze, seggiolone, tavolo all'aperto..."
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-deep-red focus:ring-1 focus:ring-deep-red outline-none transition-all resize-none"
                        value={formData.requests}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-deep-red text-white font-serif font-bold text-lg py-4 rounded-lg shadow-lg hover:bg-red-900 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Invio in corso...' : 'Conferma Prenotazione'}
                </button>
            </form>
        </div>
    );
};

export default ReservationForm;
