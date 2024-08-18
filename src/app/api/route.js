import { NextResponse } from 'next/server';
import * as admin from 'firebase-admin';

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
        databaseURL: process.env.FIREBASE_DATABASE_URL,
    });
}

export async function POST(request) {
    const { email } = await request.json();

    try {
        let user;
        try {
            user = await admin.auth().getUserByEmail(email);
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                user = await admin.auth().createUser({ email });
            } else {
                throw error;
            }
        }

        const customToken = await admin.auth().createCustomToken(user.uid);
        return NextResponse.json({ customToken });
    } catch (error) {
        console.error('Error creating custom token:', error);
        return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
    }
}