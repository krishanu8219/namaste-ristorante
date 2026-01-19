import { Order } from '@/types/order';

// In-memory order storage for admin portal
// In production, this would be a database
const orders: Map<string, Order> = new Map();

export function saveOrder(order: Order): void {
    if (order.id) {
        orders.set(order.id, order);
    }
}

export function getOrder(orderId: string): Order | undefined {
    return orders.get(orderId);
}

export function getAllOrders(): Order[] {
    return Array.from(orders.values()).sort((a, b) => {
        const dateA = new Date(a.created_at || 0).getTime();
        const dateB = new Date(b.created_at || 0).getTime();
        return dateB - dateA; // Newest first
    });
}

export function getOrdersByStatus(status: Order['status']): Order[] {
    return getAllOrders().filter(order => order.status === status);
}

export function updateOrderStatus(
    orderId: string,
    status: Order['status'],
    rejectionReason?: string
): Order | null {
    const order = orders.get(orderId);
    if (!order) return null;

    order.status = status;
    order.status_updated_at = new Date().toISOString();
    if (rejectionReason) {
        order.rejection_reason = rejectionReason;
    }

    orders.set(orderId, order);
    return order;
}
