import { NextResponse } from 'next/server';
import { updateOrderStatus, getOrder } from '@/lib/orders-store';
import { sendOrderStatusEmail } from '@/lib/email';

interface TelegramUpdate {
    update_id: number;
    callback_query?: {
        id: string;
        from: {
            id: number;
            first_name: string;
        };
        message: {
            message_id: number;
            chat: {
                id: number;
            };
            text: string;
        };
        data: string;
    };
}

const REJECTION_REASONS = {
    'busy': 'Siamo al completo in questo momento',
    'ingredients': 'Alcuni ingredienti non sono disponibili',
    'closing': 'Stiamo per chiudere',
    'area': 'Indirizzo fuori zona di consegna',
};

export async function POST(request: Request) {
    try {
        const update: TelegramUpdate = await request.json();

        // Handle callback query (button click)
        if (update.callback_query) {
            const { id: queryId, data: callbackData, message } = update.callback_query;
            const { TELEGRAM_BOT_TOKEN } = process.env;

            if (!TELEGRAM_BOT_TOKEN) {
                return NextResponse.json({ error: 'Bot token not configured' }, { status: 500 });
            }

            // Parse callback data: "confirm_ORDER-123" or "reject_ORDER-123" or "reject_reason_ORDER-123_busy"
            const parts = callbackData.split('_');
            const action = parts[0]; // confirm, reject, or reject_reason

            if (action === 'confirm') {
                const orderId = parts.slice(1).join('_');
                await handleConfirm(orderId, message, TELEGRAM_BOT_TOKEN, queryId);
            } else if (action === 'reject' && parts.length === 2) {
                // Show rejection reason options
                const orderId = parts[1];
                await showRejectionReasons(orderId, message, TELEGRAM_BOT_TOKEN, queryId);
            } else if (action === 'reject' && parts[1] === 'reason') {
                // Handle rejection with reason
                const orderId = parts[2];
                const reasonKey = parts[3];
                const reason = REJECTION_REASONS[reasonKey as keyof typeof REJECTION_REASONS] || 'Motivo non specificato';
                await handleReject(orderId, reason, message, TELEGRAM_BOT_TOKEN, queryId);
            }

            return NextResponse.json({ ok: true });
        }

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error('Telegram webhook error:', error);
        return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
}

async function handleConfirm(
    orderId: string,
    message: any,
    botToken: string,
    queryId: string
) {
    // Update order status
    const updatedOrder = updateOrderStatus(orderId, 'confirmed');

    if (!updatedOrder) {
        await answerCallback(botToken, queryId, '❌ Ordine non trovato');
        return;
    }

    // Send email to customer
    if (updatedOrder.email) {
        await sendOrderStatusEmail(updatedOrder, 'confirmed');
    }

    // Update Telegram message
    const newText = message.text + '\n\n✅ <b>ORDINE CONFERMATO</b>';
    await updateTelegramMessage(botToken, message.chat.id, message.message_id, newText);

    // Answer callback
    await answerCallback(botToken, queryId, '✅ Ordine confermato! Email inviata al cliente.');
}

async function handleReject(
    orderId: string,
    reason: string,
    message: any,
    botToken: string,
    queryId: string
) {
    // Update order status
    const updatedOrder = updateOrderStatus(orderId, 'rejected', reason);

    if (!updatedOrder) {
        await answerCallback(botToken, queryId, '❌ Ordine non trovato');
        return;
    }

    // Send email to customer
    if (updatedOrder.email) {
        await sendOrderStatusEmail(updatedOrder, 'rejected', reason);
    }

    // Update Telegram message
    const newText = message.text + `\n\n❌ <b>ORDINE RIFIUTATO</b>\nMotivo: ${reason}`;
    await updateTelegramMessage(botToken, message.chat.id, message.message_id, newText);

    // Answer callback
    await answerCallback(botToken, queryId, '❌ Ordine rifiutato. Email inviata al cliente.');
}

async function showRejectionReasons(
    orderId: string,
    message: any,
    botToken: string,
    queryId: string
) {
    // Create inline keyboard with rejection reasons
    const keyboard = Object.entries(REJECTION_REASONS).map(([key, reason]) => ([
        { text: reason, callback_data: `reject_reason_${orderId}_${key}` }
    ]));

    // Add back button
    keyboard.push([{ text: '← Indietro', callback_data: `back_${orderId}` }]);

    await fetch(`https://api.telegram.org/bot${botToken}/editMessageReplyMarkup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: message.chat.id,
            message_id: message.message_id,
            reply_markup: { inline_keyboard: keyboard }
        })
    });

    await answerCallback(botToken, queryId, 'Seleziona il motivo del rifiuto');
}

async function updateTelegramMessage(
    botToken: string,
    chatId: number,
    messageId: number,
    newText: string
) {
    await fetch(`https://api.telegram.org/bot${botToken}/editMessageText`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            message_id: messageId,
            text: newText,
            parse_mode: 'HTML',
        })
    });
}

async function answerCallback(botToken: string, queryId: string, text: string) {
    await fetch(`https://api.telegram.org/bot${botToken}/answerCallbackQuery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            callback_query_id: queryId,
            text,
            show_alert: true,
        })
    });
}
