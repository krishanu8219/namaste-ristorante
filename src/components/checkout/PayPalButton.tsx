'use client';

import React, { useState, useEffect } from 'react';
import { OrderItem } from '@/types/order';

interface PayPalButtonProps {
    orderId: string;
    items: OrderItem[];
    totalPrice: number;
    customerName: string;
    customerEmail: string;
    onSuccess: (transactionId: string) => void;
    onError: (error: string) => void;
    onCancel: () => void;
}

// Lazy load PayPal components to avoid hydration issues
const PayPalButton: React.FC<PayPalButtonProps> = ({
    orderId,
    items,
    totalPrice,
    customerName,
    customerEmail,
    onSuccess,
    onError,
    onCancel,
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [PayPalButtonsComponent, setPayPalButtonsComponent] = useState<React.ComponentType<any> | null>(null);
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

    useEffect(() => {
        if (!clientId) {
            return;
        }

        // Dynamically import PayPal to avoid SSR issues
        import('@paypal/react-paypal-js').then((module) => {
            setPayPalButtonsComponent(() => module.PayPalButtons);
            setIsLoaded(true);
        }).catch((err) => {
            console.error('Failed to load PayPal:', err);
            onError('Impossibile caricare PayPal');
        });
    }, [clientId, onError]);

    if (!clientId) {
        return (
            <div className="text-center py-4 text-masala-600 font-body">
                PayPal non è ancora configurato. Per favore usa un altro metodo di pagamento.
            </div>
        );
    }

    if (!isLoaded || !PayPalButtonsComponent) {
        return (
            <div className="flex items-center justify-center py-4">
                <div className="w-8 h-8 border-4 border-saffron-500 border-t-transparent rounded-full animate-spin" />
                <span className="ml-3 font-body text-ink/70">Caricamento PayPal...</span>
            </div>
        );
    }

    return (
        <PayPalButtonsComponent
            style={{
                layout: 'vertical',
                color: 'gold',
                shape: 'rect',
                label: 'pay',
                height: 50,
            }}
            createOrder={async () => {
                try {
                    const response = await fetch('/api/paypal/create-order', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            orderId,
                            items,
                            totalPrice,
                            customerName,
                            customerEmail,
                        }),
                    });

                    const data = await response.json();

                    if (!response.ok) {
                        throw new Error(data.error || 'Failed to create PayPal order');
                    }

                    return data.paypalOrderId;
                } catch (error) {
                    console.error('Error creating PayPal order:', error);
                    onError(error instanceof Error ? error.message : 'Failed to create order');
                    throw error;
                }
            }}
            onApprove={async (data: { orderID: string }) => {
                try {
                    const response = await fetch('/api/paypal/capture-order', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            paypalOrderId: data.orderID,
                            orderId,
                        }),
                    });

                    const captureData = await response.json();

                    if (!response.ok) {
                        throw new Error(captureData.error || 'Failed to capture payment');
                    }

                    onSuccess(captureData.transactionId);
                } catch (error) {
                    console.error('Error capturing PayPal payment:', error);
                    onError(error instanceof Error ? error.message : 'Failed to capture payment');
                }
            }}
            onCancel={() => {
                onCancel();
            }}
            onError={(err: Error) => {
                console.error('PayPal error:', err);
                onError('Si è verificato un errore con PayPal');
            }}
        />
    );
};

export default PayPalButton;
