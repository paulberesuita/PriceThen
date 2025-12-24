// API endpoint to get price data for a product
// Premium products require authentication

export async function onRequestGet({ params, request, env }) {
  const { productId } = params;

  try {
    // Get product info from database
    const product = await env.DB.prepare(
      'SELECT * FROM products WHERE id = ?'
    ).bind(productId).first();

    if (!product) {
      return new Response(JSON.stringify({ error: 'Product not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // If product is premium, verify user authentication
    if (product.is_premium === 1) {
      const authResult = await verifyPremiumAccess(request, env);
      if (!authResult.authorized) {
        return new Response(JSON.stringify({
          error: 'Premium subscription required',
          code: 'PREMIUM_REQUIRED'
        }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // Get price data for the product
    const prices = await env.DB.prepare(
      'SELECT year, price FROM prices WHERE product_id = ? ORDER BY year'
    ).bind(productId).all();

    return new Response(JSON.stringify({
      product: {
        id: product.id,
        name: product.name,
        icon: product.icon,
        category: product.category_id,
        isPremium: product.is_premium === 1,
        source: product.source_url,
        sourceName: product.source_name
      },
      prices: prices.results
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600'
      }
    });

  } catch (error) {
    console.error('Error fetching prices:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function verifyPremiumAccess(request, env) {
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

    // Fetch user from Clerk Backend API to get current metadata
    const userResponse = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${env.CLERK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!userResponse.ok) {
      console.error('Clerk API error:', await userResponse.text());
      return { authorized: false, reason: 'Failed to verify user' };
    }

    const user = await userResponse.json();

    // Check if user has premium access
    if (user.public_metadata?.isPremium === true) {
      return { authorized: true, userId: user.id };
    }

    return { authorized: false, reason: 'Not a premium user' };

  } catch (error) {
    console.error('Auth verification error:', error);
    return { authorized: false, reason: 'Verification failed' };
  }
}
