import { NextResponse } from 'next/server';

const PAYPAL_API_BASE = process.env.PAYPAL_MODE === 'live'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';

async function getPayPalAccessToken(): Promise<string> {
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        throw new Error('PayPal credentials not configured');
    }

    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error_description || 'Failed to get PayPal access token');
    }

    return data.access_token;
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const { orderId, totalPrice, customerName } = body;

        if (!orderId || !totalPrice) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const accessToken = await getPayPalAccessToken();

        const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                intent: 'CAPTURE',
                purchase_units: [
                    {
                        reference_id: orderId,
                        description: `Ordine NAMASTE Ristorante - ${customerName}`,
                        amount: {
                            currency_code: 'EUR',
                            value: totalPrice.toFixed(2),
                        },
                    },
                ],
                application_context: {
                    brand_name: 'NAMASTE Ristorante',
                    locale: 'it-IT',
                    landing_page: 'NO_PREFERENCE',
                    user_action: 'PAY_NOW',
                },
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('PayPal create order error:', data);
            return NextResponse.json(
                { error: data.message || 'Failed to create PayPal order' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            paypalOrderId: data.id,
        });
    } catch (error) {
        console.error('Error creating PayPal order:', error);
        return NextResponse.json(
            { error: 'Failed to create PayPal order' },
            { status: 500 }
        );
    }
}
