import { NextResponse } from 'next/server'
import Stripe from 'stripe'

function getStripeClient() {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) return null
    return new Stripe(key, {
        apiVersion: '2023-10-16' as any,
    })
}

export async function POST(req: Request) {
    const stripe = getStripeClient()
    if (!stripe) {
        return NextResponse.json(
            { error: 'Stripe is not configured. Set STRIPE_SECRET_KEY.' },
            { status: 503 }
        )
    }

    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || ''
    const sig = req.headers.get('stripe-signature') as string
    let event: Stripe.Event

    try {
        const body = await req.text()
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
    } catch (err: any) {
        console.error(`Webhook Error: ${err.message}`)
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
    }

    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object as Stripe.Checkout.Session
            console.log('Payment was successful for session:', session.id)
            break
        case 'customer.subscription.updated':
            const subUpdated = event.data.object as Stripe.Subscription
            console.log('Subscription updated:', subUpdated.id, 'Status:', subUpdated.status)
            break
        case 'customer.subscription.deleted':
            const subDeleted = event.data.object as Stripe.Subscription
            console.log('Subscription deleted/canceled:', subDeleted.id)
            break
        default:
            console.log(`Unhandled event type ${event.type}`)
    }

    return NextResponse.json({ received: true })
}
