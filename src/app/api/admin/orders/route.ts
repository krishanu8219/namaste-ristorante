import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/admin-auth';
import { getAllOrders } from '@/lib/orders-store';

export async function GET() {
    try {
        // Check authentication
        const authenticated = await isAuthenticated();
        if (!authenticated) {
            return NextResponse.json(
                { error: 'Non autorizzato' },
                { status: 401 }
            );
        }

        const orders = getAllOrders();

        return NextResponse.json({
            success: true,
            orders,
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
