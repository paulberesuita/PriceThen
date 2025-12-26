// Stripe Checkout API route
// Creates a checkout session for premium one-time purchase

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    // Verify the user is authenticated and get their ID from the token
    const authResult = await verifyUser(request, env);
    if (!authResult.authorized) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const userId = authResult.userId;

    // Create Stripe checkout session for one-time payment
    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        'mode': 'payment',
        'payment_method_types[]': 'card',
        'line_items[0][price]': env.STRIPE_PRICE_ID,
        'line_items[0][quantity]': '1',
        'success_url': `${new URL(request.url).origin}?success=true`,
        'cancel_url': `${new URL(request.url).origin}?canceled=true`,
        'metadata[userId]': userId
      })
    });

    const session = await response.json();

    if (session.error) {
      return new Response(JSON.stringify({ error: session.error.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create checkout session' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function verifyUser(request, env) {
  // Get session token from Authorization header
  const authHeader = request.headers.get('Authorization');
  const sessionToken = authHeader?.replace('Bearer ', '');

  if (!sessionToken) {
    return { authorized: false, reason: 'No token provided' };
  }

  try {
    // Decode the JWT to get the user ID
    const parts = sessionToken.split('.');
    if (parts.length !== 3) {
      return { authorized: false, reason: 'Invalid token format' };
    }

    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));

    // Check if token is expired
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return { authorized: false, reason: 'Token expired' };
    }

    const userId = payload.sub;
    if (!userId) {
      return { authorized: false, reason: 'No user ID in token' };
    }

    // Verify user exists in Clerk
    const userResponse = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${env.CLERK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!userResponse.ok) {
      return { authorized: false, reason: 'User not found' };
    }

    return { authorized: true, userId };

  } catch (error) {
    console.error('Auth verification error:', error);
    return { authorized: false, reason: 'Verification failed' };
  }
}
