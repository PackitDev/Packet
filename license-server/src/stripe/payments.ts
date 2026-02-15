import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  // @ts-ignore - Stripe API version
  apiVersion: '2024-10-28.acacia',
});

export async function createPaymentIntent(
  amount: number,
  currency: string,
  metadata: Record<string, string>
): Promise<Stripe.PaymentIntent> {
  return stripe.paymentIntents.create({
    amount,
    currency,
    metadata,
  });
}

export async function createCheckoutSession(
  priceId: string,
  successUrl: string,
  cancelUrl: string,
  metadata: Record<string, string>
): Promise<Stripe.Checkout.Session> {
  return stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata,
  });
}

export async function handleWebhook(
  payload: string | Buffer,
  signature: string
): Promise<Stripe.Event> {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
  return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
}

export { stripe };
