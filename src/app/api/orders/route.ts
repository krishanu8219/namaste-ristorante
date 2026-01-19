import { NextResponse } from 'next/server';
import { sendOrderEmail } from '@/lib/email';
import { sendTelegramNotification } from '@/lib/telegram';
import { saveOrder } from '@/lib/orders-store';
import { Order } from '@/types/order';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.customer_name || typeof body.customer_name !== 'string' || body.customer_name.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'Customer name is required' },
        { status: 400 }
      );
    }

    if (!body.phone || typeof body.phone !== 'string' || body.phone.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'Phone number is required' },
        { status: 400 }
      );
    }

    if (!body.order_type || !['pickup', 'delivery'].includes(body.order_type)) {
      return NextResponse.json(
        { success: false, error: 'Order type must be either "pickup" or "delivery"' },
        { status: 400 }
      );
    }

    // Validate delivery address if order type is delivery
    if (body.order_type === 'delivery') {
      if (!body.address || typeof body.address !== 'string' || body.address.trim() === '') {
        return NextResponse.json(
          { success: false, error: 'Address is required for delivery orders' },
          { status: 400 }
        );
      }
    }

    // Validate items
    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Order must contain at least one item' },
        { status: 400 }
      );
    }

    // Validate each item
    for (const item of body.items) {
      if (!item.id || !item.name || !item.quantity || !item.unit_price) {
        return NextResponse.json(
          { success: false, error: 'Each item must have id, name, quantity, and unit_price' },
          { status: 400 }
        );
      }

      if (typeof item.quantity !== 'number' || item.quantity <= 0) {
        return NextResponse.json(
          { success: false, error: 'Item quantity must be a positive number' },
          { status: 400 }
        );
      }

      if (typeof item.unit_price !== 'number' || item.unit_price <= 0) {
        return NextResponse.json(
          { success: false, error: 'Item price must be a positive number' },
          { status: 400 }
        );
      }
    }

    // Validate total price
    if (typeof body.total_price !== 'number' || body.total_price <= 0) {
      return NextResponse.json(
        { success: false, error: 'Total price must be a positive number' },
        { status: 400 }
      );
    }

    // Generate a temporary ID for the order (timestamp + random)
    const orderId = `ORD-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;

    // Construct order object
    const order: Order = {
      id: orderId, // Add ID to order object
      customer_name: body.customer_name.trim(),
      phone: body.phone.trim(),
      email: body.email?.trim() || '',
      order_type: body.order_type,
      payment_method: body.payment_method || 'cash',
      address: body.address?.trim() || '',
      location_description: body.location_description?.trim() || '',
      items: body.items,
      total_price: body.total_price,
      created_at: new Date().toISOString(),
      status: 'pending'
    };

    // Save order to store for admin portal
    saveOrder(order);

    // Send Email Notification
    const emailSent = await sendOrderEmail(order, orderId);

    // Send Telegram notification
    const telegramSent = await sendTelegramNotification(order);

    if (!emailSent) {
      console.warn('Email failed to send, but order processed via Telegram');
    }

    if (!telegramSent) {
      console.warn('Telegram notification failed to send');
    }

    return NextResponse.json(
      {
        success: true,
        orderId: orderId,
        order: order, // Return the full order object so frontend can display it
        message: 'Order placed successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing order:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to process order',
      },
      { status: 500 }
    );
  }
}
