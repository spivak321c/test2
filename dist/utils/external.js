// External service clients (e.g., Stripe)
import Stripe from 'stripe';
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// Stripe webhook handler
export const stripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;
    try {
        // Construct event from webhook
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    }
    catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    // Handle events
    switch (event.type) {
        case 'payment_intent.succeeded':
            // Update order status to processing
            const paymentIntent = event.data.object;
            // Assume updateOrderStatus(paymentIntent.id, 'processing');
            console.log(`Payment succeeded: ${paymentIntent.id}`);
            break;
        // Add more events (e.g., charge.refunded)
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    res.json({ received: true });
};
//# sourceMappingURL=external.js.map