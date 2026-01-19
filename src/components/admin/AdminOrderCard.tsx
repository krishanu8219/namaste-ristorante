'use client';

import React, { useState } from 'react';
import { Order } from '@/types/order';

interface AdminOrderCardProps {
    order: Order;
    onUpdate: (order: Order) => void;
}

const REJECTION_REASONS = [
    'Siamo al completo in questo momento',
    'Alcuni ingredienti non sono disponibili',
    'Stiamo per chiudere',
    'Indirizzo fuori zona di consegna',
    'Altro',
];

export default function AdminOrderCard({ order, onUpdate }: AdminOrderCardProps) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectionReason, setRejectionReason] = useState('');
    const [customReason, setCustomReason] = useState('');

    const handleConfirm = async () => {
        setIsUpdating(true);
        try {
            const response = await fetch(`/api/admin/orders/${order.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'confirmed' }),
            });

            const data = await response.json();
            if (response.ok && data.order) {
                onUpdate(data.order);
            }
        } catch (error) {
            console.error('Error confirming order:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleReject = async () => {
        const reason = rejectionReason === 'Altro' ? customReason : rejectionReason;
        if (!reason) return;

        setIsUpdating(true);
        try {
            const response = await fetch(`/api/admin/orders/${order.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'rejected', rejection_reason: reason }),
            });

            const data = await response.json();
            if (response.ok && data.order) {
                onUpdate(data.order);
                setShowRejectModal(false);
            }
        } catch (error) {
            console.error('Error rejecting order:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    const formatTime = (dateString?: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit' });
    };

    const getStatusBadge = () => {
        switch (order.status) {
            case 'pending':
                return <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">⏳ In Attesa</span>;
            case 'confirmed':
                return <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">✓ Confermato</span>;
            case 'rejected':
                return <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">✗ Rifiutato</span>;
            default:
                return null;
        }
    };

    return (
        <>
            <div className={`bg-white rounded-xl shadow-md border-l-4 overflow-hidden ${order.status === 'pending'
                    ? 'border-l-yellow-400'
                    : order.status === 'confirmed'
                        ? 'border-l-green-400'
                        : 'border-l-red-400'
                }`}>
                {/* Header */}
                <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-b">
                    <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-bold text-gray-700">#{order.id?.slice(-6)}</span>
                        {getStatusBadge()}
                    </div>
                    <div className="text-right text-sm text-gray-500">
                        <div>{formatTime(order.created_at)}</div>
                        <div className="text-xs">{formatDate(order.created_at)}</div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                    {/* Customer Info */}
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="font-bold text-gray-800">{order.customer_name}</h3>
                            <a href={`tel:${order.phone}`} className="text-blue-600 text-sm hover:underline">
                                {order.phone}
                            </a>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${order.order_type === 'delivery'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-purple-100 text-purple-700'
                            }`}>
                            {order.order_type === 'delivery' ? '🚗 Consegna' : '🏠 Ritiro'}
                        </span>
                    </div>

                    {/* Address */}
                    {order.order_type === 'delivery' && order.address && (
                        <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                            📍 {order.address}
                            {order.location_description && (
                                <span className="block text-xs text-gray-500 mt-1">
                                    Note: {order.location_description}
                                </span>
                            )}
                        </div>
                    )}

                    {/* Items */}
                    <div className="border-t pt-3">
                        <ul className="space-y-1">
                            {order.items.map((item, idx) => (
                                <li key={idx} className="flex justify-between text-sm">
                                    <span className="text-gray-700">
                                        <span className="font-medium text-deep-red">{item.quantity}×</span> {item.name}
                                    </span>
                                    <span className="text-gray-600">€{(item.quantity * item.unit_price).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Total */}
                    <div className="flex justify-between items-center pt-2 border-t font-bold">
                        <span>Totale</span>
                        <span className="text-lg text-deep-red">€{order.total_price.toFixed(2)}</span>
                    </div>

                    {/* Rejection Reason */}
                    {order.status === 'rejected' && order.rejection_reason && (
                        <div className="bg-red-50 border border-red-100 rounded p-2 text-sm text-red-700">
                            <strong>Motivo:</strong> {order.rejection_reason}
                        </div>
                    )}

                    {/* Action Buttons */}
                    {order.status === 'pending' && (
                        <div className="flex gap-2 pt-2">
                            <button
                                onClick={handleConfirm}
                                disabled={isUpdating}
                                className="flex-1 py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                ✓ Conferma
                            </button>
                            <button
                                onClick={() => setShowRejectModal(true)}
                                disabled={isUpdating}
                                className="flex-1 py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                ✗ Rifiuta
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Reject Modal */}
            {showRejectModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Motivo del Rifiuto</h3>

                        <div className="space-y-2 mb-4">
                            {REJECTION_REASONS.map((reason) => (
                                <label
                                    key={reason}
                                    className={`block p-3 border rounded-lg cursor-pointer transition-all ${rejectionReason === reason
                                            ? 'border-deep-red bg-red-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="reason"
                                        value={reason}
                                        checked={rejectionReason === reason}
                                        onChange={(e) => setRejectionReason(e.target.value)}
                                        className="sr-only"
                                    />
                                    {reason}
                                </label>
                            ))}
                        </div>

                        {rejectionReason === 'Altro' && (
                            <textarea
                                value={customReason}
                                onChange={(e) => setCustomReason(e.target.value)}
                                placeholder="Specificare il motivo..."
                                className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-gray-800"
                                rows={3}
                            />
                        )}

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowRejectModal(false)}
                                className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-all"
                            >
                                Annulla
                            </button>
                            <button
                                onClick={handleReject}
                                disabled={!rejectionReason || (rejectionReason === 'Altro' && !customReason) || isUpdating}
                                className="flex-1 py-2 px-4 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Conferma Rifiuto
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
