import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2023-10-16' as any,
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || ''

export async function POST(req: Request) {
    const sig = req.headers.get('stripe-signature') as string
    let event: Stripe.Event

    try {
        const body = await req.text()
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
    } catch (err: any) {
        console.error(`Webhook Error: ${err.message}`)
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
    }

    // Handle the most important events
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object as Stripe.Checkout.Session
            console.log('Payment was successful for session:', session.id)
            // Here you would connect to Supabase:
            // supabase.from('users').update({ is_pro: true, stripe_customer_id: session.customer }).eq('id', session.client_reference_id)
            break
        case 'customer.subscription.updated':
            const subUpdated = event.data.object as Stripe.Subscription
            console.log('Subscription updated:', subUpdated.id, 'Status:', subUpdated.status)
            break
        case 'customer.subscription.deleted':
            const subDeleted = event.data.object as Stripe.Subscription
            console.log('Subscription deleted/canceled:', subDeleted.id)
            // supabase.from('users').update({ is_pro: false }).eq('stripe_customer_id', subDeleted.customer)
            break
        default:
            console.log(`Unhandled event type ${event.type}`)
    }

    return NextResponse.json({ received: true })
}
