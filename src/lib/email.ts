import { Resend } from 'resend';
import { Order } from '@/types/order';

// Lazy-initialize Resend to avoid build-time errors when API key is not set
let resend: Resend | null = null;

function getResendClient(): Resend | null {
  if (!process.env.RESEND_API_KEY) {
    return null;
  }
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

export async function sendOrderEmail(order: Order, orderId: string) {
  const resendClient = getResendClient();
  if (!resendClient) {
    console.error('Missing RESEND_API_KEY');
    return false;
  }

  if (!process.env.RESTAURANT_EMAIL) {
    console.error('Missing RESTAURANT_EMAIL');
    return false;
  }

  const orderDate = new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' });

  const itemsHtml = order.items.map(item => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.quantity}x</td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name}</td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">€${item.unit_price.toFixed(2)}</td>
    </tr>
  `).join('');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px; }
        .header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #f59e0b; padding-bottom: 10px; }
        .details { margin-bottom: 20px; background: #f9f9f9; padding: 15px; border-radius: 5px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        .total { text-align: right; font-size: 1.2em; font-weight: bold; margin-top: 10px; }
        .footer { margin-top: 30px; text-align: center; font-size: 0.8em; color: #777; }
        .badge { display: inline-block; padding: 4px 8px; border-radius: 4px; background: #f59e0b; color: white; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Nuovo Ordine #${orderId.slice(-6)}</h1>
          <p>${orderDate}</p>
        </div>
        
        <div class="details">
          <p><strong>Cliente:</strong> ${order.customer_name}</p>
          <p><strong>Telefono:</strong> <a href="tel:${order.phone}">${order.phone}</a></p>
          ${order.email ? `<p><strong>Email:</strong> ${order.email}</p>` : ''}
          <p><strong>Tipo:</strong> <span class="badge">${order.order_type === 'delivery' ? 'CONSEGNA A DOMICILIO' : 'RITIRO IN SEDE'}</span></p>
          ${order.order_type === 'delivery' ? `<p><strong>Indirizzo:</strong> ${order.address}</p>` : ''}
          ${order.location_description ? `<p><strong>Note:</strong> ${order.location_description}</p>` : ''}
        </div>

        <h3>Riepilogo Ordine</h3>
        <table>
          <thead>
            <tr>
              <th style="text-align: left; padding: 8px; border-bottom: 2px solid #ddd;">Q.tà</th>
              <th style="text-align: left; padding: 8px; border-bottom: 2px solid #ddd;">Articolo</th>
              <th style="text-align: right; padding: 8px; border-bottom: 2px solid #ddd;">Prezzo</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <div class="total">
          Totale: €${order.total_price.toFixed(2)}
        </div>

        <div class="footer">
          <p>Apna Punjab Pizza & Kebap</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    // Send to Restaurant
    await resendClient.emails.send({
      from: 'Apna Punjab Pizza Kebab <onboarding@resend.dev>',
      to: [process.env.RESTAURANT_EMAIL],
      subject: `🍕 Nuovo Ordine da ${order.customer_name} - €${order.total_price.toFixed(2)}`,
      html: html,
    });

    // Send to Customer if email is provided
    if (order.email) {
      await resendClient.emails.send({
        from: 'Apna Punjab Pizza Kebab <onboarding@resend.dev>',
        to: [order.email],
        subject: `Conferma Ordine #${orderId.slice(-6)} - Apna Punjab Pizza Kebab`,
        html: html,
      });
    }

    console.log('Emails sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}
