import { NextResponse } from 'next/server';
import { getStripe, formatAmountForStripe } from '@/lib/stripe';
import { OrderItem } from '@/types/order';

interface CreateSessionRequest {
    orderId: string;
    items: OrderItem[];
    customerEmail: string;
    customerName: string;
    totalPrice: number;
}

export async function POST(request: Request) {
    try {
        const body: CreateSessionRequest = await request.json();

        // Validate required fields
        if (!body.items || body.items.length === 0) {
            return NextResponse.json(
                { error: 'No items provided' },
                { status: 400 }
            );
        }

        // Create line items for Stripe
        const lineItems = body.items.map((item) => ({
            price_data: {
                currency: 'eur',
                product_data: {
                    name: item.name,
                },
                unit_amount: formatAmountForStripe(item.unit_price),
            },
            quantity: item.quantity,
        }));

        // Get the origin for redirect URLs
        const origin = request.headers.get('origin') || 'http://localhost:3000';

        // Create Stripe Checkout session
        const stripe = getStripe();
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}&order_id=${body.orderId}`,
            cancel_url: `${origin}/payment/cancel?order_id=${body.orderId}`,
            customer_email: body.customerEmail,
            metadata: {
                orderId: body.orderId,
                customerName: body.customerName,
            },
        });

        return NextResponse.json({
            sessionId: session.id,
            url: session.url,
        });
    } catch (error) {
        console.error('Error creating Stripe session:', error);
        return NextResponse.json(
            { error: 'Failed to create checkout session' },
            { status: 500 }
        );
    }
}
