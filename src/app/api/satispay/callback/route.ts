import { NextResponse } from 'next/server';
import { getSatispayPayment } from '@/lib/satispay';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const { payment_id } = body;

        if (!payment_id) {
            return NextResponse.json(
                { error: 'Missing payment_id' },
                { status: 400 }
            );
        }

        const payment = await getSatispayPayment(payment_id);

        console.log('Satispay callback received:', {
            paymentId: payment.id,
            status: payment.status,
            orderId: payment.external_code,
        });

        // Handle different payment statuses
        switch (payment.status) {
            case 'ACCEPTED':
                // Payment was successful
                // Here you would update your database with the payment status
                console.log(`Payment ${payment.id} accepted for order ${payment.external_code}`);
                break;

            case 'PENDING':
                // Payment is still pending
                console.log(`Payment ${payment.id} still pending`);
                break;

            case 'CANCELED':
            case 'CANCELLED':
                // Payment was cancelled
                console.log(`Payment ${payment.id} was cancelled`);
                break;

            default:
                console.log(`Payment ${payment.id} has status: ${payment.status}`);
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error('Error processing Satispay callback:', error);
        return NextResponse.json(
            { error: 'Failed to process callback' },
            { status: 500 }
        );
    }
}

// Also handle GET requests for status checks
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const paymentId = searchParams.get('payment_id');

    if (!paymentId) {
        return NextResponse.json(
            { error: 'Missing payment_id' },
            { status: 400 }
        );
    }

    try {
        const payment = await getSatispayPayment(paymentId);

        return NextResponse.json({
            paymentId: payment.id,
            status: payment.status,
            orderId: payment.external_code,
        });
    } catch (error) {
        console.error('Error checking Satispay payment:', error);
        return NextResponse.json(
            { error: 'Failed to check payment status' },
            { status: 500 }
        );
    }
}
