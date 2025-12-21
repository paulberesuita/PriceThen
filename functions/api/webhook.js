// Stripe Webhook handler
// Updates Clerk user metadata when subscription is created/updated

export async function onRequestPost(context) {
  const { request, env } = context;

  const signature = request.headers.get('stripe-signature');
  const body = await request.text();

  // Verify webhook signature
  const isValid = await verifyStripeSignature(body, signature, env.STRIPE_WEBHOOK_SECRET);
  if (!isValid) {
    return new Response('Invalid signature', { status: 400 });
  }

  const event = JSON.parse(body);

  // Handle subscription events
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.metadata?.userId;

    if (userId && session.subscription) {
      await updateClerkUserPremium(userId, true, env);
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object;
    const userId = subscription.metadata?.userId;

    if (userId) {
      await updateClerkUserPremium(userId, false, env);
    }
  }

  return new Response('OK', { status: 200 });
}

async function verifyStripeSignature(payload, signature, secret) {
  if (!signature || !secret) return false;

  try {
    const encoder = new TextEncoder();
    const parts = signature.split(',').reduce((acc, part) => {
      const [key, value] = part.split('=');
      acc[key] = value;
      return acc;
    }, {});

    const timestamp = parts['t'];
    const expectedSig = parts['v1'];

    const signedPayload = `${timestamp}.${payload}`;
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const signatureBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(signedPayload));
    const computedSig = Array.from(new Uint8Array(signatureBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    return computedSig === expectedSig;
  } catch {
    return false;
  }
}

async function updateClerkUserPremium(userId, isPremium, env) {
  const response = await fetch(`https://api.clerk.com/v1/users/${userId}/metadata`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${env.CLERK_SECRET_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      public_metadata: { isPremium }
    })
  });

  if (!response.ok) {
    console.error('Failed to update Clerk user:', await response.text());
  }
}
