'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Order } from '@/types/order';
import AdminOrderCard from './AdminOrderCard';

export default function AdminDashboard() {
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'rejected'>('pending');

    const fetchOrders = async () => {
        try {
            const response = await fetch('/api/admin/orders');
            const data = await response.json();

            if (!response.ok) {
                if (response.status === 401) {
                    router.push('/admin/login');
                    return;
                }
                throw new Error(data.error);
            }

            setOrders(data.orders || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Errore nel caricamento ordini');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
        // Refresh every 30 seconds
        const interval = setInterval(fetchOrders, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleLogout = async () => {
        await fetch('/api/admin/logout', { method: 'POST' });
        router.push('/admin/login');
        router.refresh();
    };

    const handleOrderUpdate = (updatedOrder: Order) => {
        setOrders(prev =>
            prev.map(o => o.id === updatedOrder.id ? updatedOrder : o)
        );
    };

    const filteredOrders = orders.filter(order => {
        if (filter === 'all') return true;
        return order.status === filter;
    });

    const pendingCount = orders.filter(o => o.status === 'pending').length;
    const confirmedCount = orders.filter(o => o.status === 'confirmed').length;
    const rejectedCount = orders.filter(o => o.status === 'rejected').length;

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-gradient-to-r from-deep-red to-medium-red text-white shadow-lg">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">🍽️</span>
                        <div>
                            <h1 className="font-serif text-xl font-bold">Admin Portal</h1>
                            <p className="text-sm text-gold-accent">NAMASTE Ristorante</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-all"
                    >
                        Esci
                    </button>
                </div>
            </header>

            {/* Stats Bar */}
            <div className="bg-white border-b shadow-sm">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={() => setFilter('pending')}
                            className={`px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${filter === 'pending'
                                    ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-400'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                            In Attesa ({pendingCount})
                        </button>
                        <button
                            onClick={() => setFilter('confirmed')}
                            className={`px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${filter === 'confirmed'
                                    ? 'bg-green-100 text-green-800 border-2 border-green-400'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            Confermati ({confirmedCount})
                        </button>
                        <button
                            onClick={() => setFilter('rejected')}
                            className={`px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${filter === 'rejected'
                                    ? 'bg-red-100 text-red-800 border-2 border-red-400'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                            Rifiutati ({rejectedCount})
                        </button>
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded-full font-medium transition-all ${filter === 'all'
                                    ? 'bg-gray-800 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            Tutti ({orders.length})
                        </button>
                        <button
                            onClick={fetchOrders}
                            className="ml-auto px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium hover:bg-blue-200 transition-all flex items-center gap-2"
                        >
                            🔄 Aggiorna
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-6">
                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="text-center">
                            <div className="animate-spin w-12 h-12 border-4 border-deep-red border-t-transparent rounded-full mx-auto mb-4"></div>
                            <p className="text-gray-500">Caricamento ordini...</p>
                        </div>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
                        {error}
                    </div>
                ) : filteredOrders.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">📭</div>
                        <h3 className="text-xl font-medium text-gray-600">Nessun ordine {filter !== 'all' ? `${filter === 'pending' ? 'in attesa' : filter === 'confirmed' ? 'confermato' : 'rifiutato'}` : ''}</h3>
                        <p className="text-gray-400 mt-2">Gli ordini appariranno qui</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                        {filteredOrders.map((order) => (
                            <AdminOrderCard
                                key={order.id}
                                order={order}
                                onUpdate={handleOrderUpdate}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
