import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

// Admin credentials from environment variables
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '';
const SESSION_SECRET = new TextEncoder().encode(
    process.env.ADMIN_SESSION_SECRET || 'default-secret-change-in-production'
);

const SESSION_COOKIE_NAME = 'admin_session';
const SESSION_DURATION = 60 * 60 * 24; // 24 hours in seconds

export interface AdminSession {
    username: string;
    iat: number;
    exp: number;
}

/**
 * Validate admin credentials
 */
export async function validateCredentials(username: string, password: string): Promise<boolean> {
    if (username !== ADMIN_USERNAME) {
        return false;
    }

    // If no hash is set, allow default password for development
    if (!ADMIN_PASSWORD_HASH) {
        console.warn('⚠️ ADMIN_PASSWORD_HASH not set - using default password "admin123"');
        return password === 'admin123';
    }

    return bcrypt.compare(password, ADMIN_PASSWORD_HASH);
}

/**
 * Create a session token
 */
export async function createSession(username: string): Promise<string> {
    const token = await new SignJWT({ username })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(`${SESSION_DURATION}s`)
        .sign(SESSION_SECRET);

    return token;
}

/**
 * Verify session token
 */
export async function verifySession(token: string): Promise<AdminSession | null> {
    try {
        const { payload } = await jwtVerify(token, SESSION_SECRET);
        return payload as unknown as AdminSession;
    } catch {
        return null;
    }
}

/**
 * Get current session from cookies
 */
export async function getSession(): Promise<AdminSession | null> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

    if (!sessionCookie) {
        return null;
    }

    return verifySession(sessionCookie.value);
}

/**
 * Set session cookie
 */
export async function setSessionCookie(token: string): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: SESSION_DURATION,
        path: '/',
    });
}

/**
 * Clear session cookie
 */
export async function clearSessionCookie(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);
}

/**
 * Check if user is authenticated (for use in server components/API routes)
 */
export async function isAuthenticated(): Promise<boolean> {
    const session = await getSession();
    return session !== null;
}

/**
 * Hash a password (utility for generating ADMIN_PASSWORD_HASH)
 */
export function hashPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
}
