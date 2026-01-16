'use client';

import React, { useState, useEffect } from 'react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

interface PayPalProviderProps {
    children: React.ReactNode;
}

const PayPalProvider: React.FC<PayPalProviderProps> = ({ children }) => {
    const [isClient, setIsClient] = useState(false);
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '';

    // Ensure we only render PayPal on the client to avoid hydration mismatch
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Always render children on server, PayPal provider only on client
    if (!isClient || !clientId) {
        return <>{children}</>;
    }

    return (
        <PayPalScriptProvider
            options={{
                clientId: clientId,
                currency: 'EUR',
                intent: 'capture',
            }}
        >
            {children}
        </PayPalScriptProvider>
    );
};

export default PayPalProvider;
