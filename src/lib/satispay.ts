import crypto from 'crypto';

const SATISPAY_API_BASE = process.env.SATISPAY_STAGING === 'true'
    ? 'https://staging.authservices.satispay.com'
    : 'https://authservices.satispay.com';

interface SatispayPaymentRequest {
    flow: 'MATCH_CODE' | 'MATCH_USER' | 'REFUND' | 'PRE_AUTHORIZED';
    amount_unit: number;
    currency: string;
    description?: string;
    external_code?: string;
    callback_url?: string;
    redirect_url?: string;
    metadata?: Record<string, string>;
}

interface SatispayPaymentResponse {
    id: string;
    code_identifier?: string;
    type: string;
    amount_unit: number;
    currency: string;
    status: string;
    expired: boolean;
    redirect_url?: string;
    external_code?: string;
    metadata?: Record<string, string>;
}

// Generate authorization header for Satispay API
function generateAuthHeader(
    httpMethod: string,
    path: string,
    body: string,
    date: string
): string {
    const keyId = process.env.SATISPAY_KEY_ID;
    const privateKeyBase64 = process.env.SATISPAY_RSA_PRIVATE_KEY;

    if (!keyId || !privateKeyBase64) {
        throw new Error('Satispay credentials not configured');
    }

    // Decode private key from base64
    const privateKey = Buffer.from(privateKeyBase64, 'base64').toString('utf-8');

    // Create digest of body
    const bodyDigest = crypto
        .createHash('sha256')
        .update(body || '')
        .digest('base64');

    // Create string to sign
    const stringToSign = [
        `(request-target): ${httpMethod.toLowerCase()} ${path}`,
        `host: ${SATISPAY_API_BASE.replace('https://', '')}`,
        `date: ${date}`,
        `digest: SHA-256=${bodyDigest}`,
    ].join('\n');

    // Sign with RSA
    const sign = crypto.createSign('RSA-SHA256');
    sign.update(stringToSign);
    const signature = sign.sign(privateKey, 'base64');

    // Build authorization header
    return `Signature keyId="${keyId}", algorithm="rsa-sha256", headers="(request-target) host date digest", signature="${signature}"`;
}

export async function createSatispayPayment(
    amountCents: number,
    orderId: string,
    description: string,
    redirectUrl: string,
    callbackUrl: string
): Promise<SatispayPaymentResponse> {
    const path = '/g_business/v1/payments';
    const date = new Date().toUTCString();

    const requestBody: SatispayPaymentRequest = {
        flow: 'MATCH_CODE',
        amount_unit: amountCents,
        currency: 'EUR',
        description,
        external_code: orderId,
        redirect_url: redirectUrl,
        callback_url: callbackUrl,
        metadata: {
            orderId,
        },
    };

    const bodyString = JSON.stringify(requestBody);
    const authorization = generateAuthHeader('POST', path, bodyString, date);

    const response = await fetch(`${SATISPAY_API_BASE}${path}`, {
        method: 'POST',
        headers: {
            'Authorization': authorization,
            'Content-Type': 'application/json',
            'Date': date,
            'Digest': `SHA-256=${crypto.createHash('sha256').update(bodyString).digest('base64')}`,
            'Host': SATISPAY_API_BASE.replace('https://', ''),
        },
        body: bodyString,
    });

    const data = await response.json();

    if (!response.ok) {
        console.error('Satispay API error:', data);
        throw new Error(data.message || 'Failed to create Satispay payment');
    }

    return data;
}

export async function getSatispayPayment(paymentId: string): Promise<SatispayPaymentResponse> {
    const path = `/g_business/v1/payments/${paymentId}`;
    const date = new Date().toUTCString();
    const authorization = generateAuthHeader('GET', path, '', date);

    const response = await fetch(`${SATISPAY_API_BASE}${path}`, {
        method: 'GET',
        headers: {
            'Authorization': authorization,
            'Date': date,
            'Digest': `SHA-256=${crypto.createHash('sha256').update('').digest('base64')}`,
            'Host': SATISPAY_API_BASE.replace('https://', ''),
        },
    });

    const data = await response.json();

    if (!response.ok) {
        console.error('Satispay API error:', data);
        throw new Error(data.message || 'Failed to get Satispay payment');
    }

    return data;
}

// Helper to convert euros to cents
export function eurosToCents(euros: number): number {
    return Math.round(euros * 100);
}
