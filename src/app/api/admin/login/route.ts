import { NextResponse } from 'next/server';
import { validateCredentials, createSession, setSessionCookie } from '@/lib/admin-auth';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, password } = body;

        if (!username || !password) {
            return NextResponse.json(
                { error: 'Username and password are required' },
                { status: 400 }
            );
        }

        const isValid = await validateCredentials(username, password);

        if (!isValid) {
            return NextResponse.json(
                { error: 'Credenziali non valide' },
                { status: 401 }
            );
        }

        // Create session token
        const token = await createSession(username);

        // Set session cookie
        await setSessionCookie(token);

        return NextResponse.json({
            success: true,
            message: 'Login successful',
        });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
