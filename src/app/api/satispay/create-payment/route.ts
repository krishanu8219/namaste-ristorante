import { NextResponse } from 'next/server';
import { createSatispayPayment, eurosToCents } from '@/lib/satispay';

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

        // Get the origin for redirect URLs
        const origin = request.headers.get('origin') || 'http://localhost:3000';

        const payment = await createSatispayPayment(
            eurosToCents(totalPrice),
            orderId,
            `Ordine NAMASTE - ${customerName}`,
            `${origin}/payment/success?provider=satispay&order_id=${orderId}`,
            `${origin}/api/satispay/callback`
        );

        return NextResponse.json({
            paymentId: payment.id,
            redirectUrl: payment.redirect_url,
        });
    } catch (error) {
        console.error('Error creating Satispay payment:', error);

        // Check if Satispay is not configured
        if (error instanceof Error && error.message.includes('not configured')) {
            return NextResponse.json(
                { error: 'Satispay non è ancora configurato. Contatta il ristorante.' },
                { status: 503 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to create Satispay payment' },
            { status: 500 }
        );
    }
}
