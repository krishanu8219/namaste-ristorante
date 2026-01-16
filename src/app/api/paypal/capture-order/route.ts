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

        const { paypalOrderId, orderId } = body;

        if (!paypalOrderId || !orderId) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const accessToken = await getPayPalAccessToken();

        const response = await fetch(
            `${PAYPAL_API_BASE}/v2/checkout/orders/${paypalOrderId}/capture`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error('PayPal capture error:', data);
            return NextResponse.json(
                { error: data.message || 'Failed to capture PayPal payment' },
                { status: 500 }
            );
        }

        // Extract transaction ID from capture response
        const capture = data.purchase_units?.[0]?.payments?.captures?.[0];
        const transactionId = capture?.id || data.id;

        return NextResponse.json({
            success: true,
            transactionId,
            status: data.status,
            orderId,
        });
    } catch (error) {
        console.error('Error capturing PayPal payment:', error);
        return NextResponse.json(
            { error: 'Failed to capture PayPal payment' },
            { status: 500 }
        );
    }
}
