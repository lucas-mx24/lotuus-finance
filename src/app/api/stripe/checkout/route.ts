import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        // MOCK MODE: Since Stripe MCP is offline and STRIPE_SECRET_KEY is not in .env.local,
        // we simulate a successful checkout session to allow frontend UX testing.

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500))

        const MOCK_CHECKOUT_URL = '/upgrade?mock_checkout=success'

        return NextResponse.json({ url: MOCK_CHECKOUT_URL })
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        )
    }
}
