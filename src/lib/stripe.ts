import Stripe from 'stripe';

// Lazy initialization of Stripe to handle missing keys during build
let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
    if (!stripeInstance) {
        const secretKey = process.env.STRIPE_SECRET_KEY;
        if (!secretKey) {
            throw new Error('STRIPE_SECRET_KEY is not configured');
        }
        stripeInstance = new Stripe(secretKey, {
            apiVersion: '2025-12-15.clover',
            typescript: true,
        });
    }
    return stripeInstance;
}

// Helper to format amount for Stripe (cents)
export function formatAmountForStripe(amount: number): number {
    return Math.round(amount * 100);
}

// Helper to format amount from Stripe (euros)
export function formatAmountFromStripe(amount: number): number {
    return amount / 100;
}
