import { Router, Request, Response } from 'express';
import { nanoid } from 'nanoid';
import { handleWebhook } from '../stripe/payments.js';
import { db, users, licenses } from '../db/index.js';

const router: Router = Router();

router.post('/stripe', async (req: Request, res: Response) => {
  try {
    const signature = req.headers['stripe-signature'] as string;

    if (!signature) {
      return res.status(400).json({ error: 'Missing stripe signature' });
    }

    const event = await handleWebhook(req.body, signature);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as any;
        const { email, version, isEarlyAccess } = session.metadata;

        // Create or get user
        let user = await db.query.users.findFirst({
          where: (users, { eq }) => eq(users.email, email),
        });

        if (!user) {
          const [newUser] = await db
            .insert(users)
            .values({
              email,
              stripeCustomerId: session.customer,
              isEarlyAccessUser: isEarlyAccess === 'true',
            })
            .returning();
          user = newUser;
        }

        // Generate license key
        const licenseKey = `EFFEC-T-${nanoid(16).toUpperCase()}`;

        // Create license
        await db.insert(licenses).values({
          key: licenseKey,
          version,
          userId: user.id,
          stripePaymentId: session.payment_intent,
          status: 'active',
          purchasePrice: session.amount_total,
          isEarlyAccess: isEarlyAccess === 'true',
          activations: 0,
        });

        console.log(`License created: ${licenseKey} for ${email}`);
        break;
      }

      case 'payment_intent.payment_failed': {
        console.log('Payment failed:', event.data.object);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(400).json({
      error: error instanceof Error ? error.message : 'Webhook processing failed',
    });
  }
});

export default router;
