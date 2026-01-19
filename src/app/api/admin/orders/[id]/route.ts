import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/admin-auth';
import { updateOrderStatus, getOrder } from '@/lib/orders-store';
import { sendOrderStatusEmail } from '@/lib/email';

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Check authentication
        const authenticated = await isAuthenticated();
        if (!authenticated) {
            return NextResponse.json(
                { error: 'Non autorizzato' },
                { status: 401 }
            );
        }

        const { id } = await params;
        const body = await request.json();
        const { status, rejection_reason } = body;

        // Validate status
        if (!status || !['confirmed', 'rejected'].includes(status)) {
            return NextResponse.json(
                { error: 'Status must be "confirmed" or "rejected"' },
                { status: 400 }
            );
        }

        // Validate rejection reason if rejected
        if (status === 'rejected' && !rejection_reason) {
            return NextResponse.json(
                { error: 'Rejection reason is required' },
                { status: 400 }
            );
        }

        // Update order status
        const updatedOrder = updateOrderStatus(id, status, rejection_reason);

        if (!updatedOrder) {
            return NextResponse.json(
                { error: 'Order not found' },
                { status: 404 }
            );
        }

        // Send email notification to customer
        if (updatedOrder.email) {
            try {
                await sendOrderStatusEmail(updatedOrder, status, rejection_reason);
            } catch (emailError) {
                console.error('Failed to send status email:', emailError);
                // Don't fail the request if email fails
            }
        }

        return NextResponse.json({
            success: true,
            order: updatedOrder,
            message: status === 'confirmed' ? 'Ordine confermato' : 'Ordine rifiutato',
        });
    } catch (error) {
        console.error('Error updating order status:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const authenticated = await isAuthenticated();
        if (!authenticated) {
            return NextResponse.json(
                { error: 'Non autorizzato' },
                { status: 401 }
            );
        }

        const { id } = await params;
        const order = getOrder(id);

        if (!order) {
            return NextResponse.json(
                { error: 'Order not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            order,
        });
    } catch (error) {
        console.error('Error fetching order:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
