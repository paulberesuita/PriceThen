// Clerk Webhook handler
// Stores new users in our database when they sign up

export async function onRequestPost(context) {
  const { request, env } = context;

  const svixId = request.headers.get('svix-id');
  const svixTimestamp = request.headers.get('svix-timestamp');
  const svixSignature = request.headers.get('svix-signature');

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response('Missing Svix headers', { status: 400 });
  }

  const body = await request.text();

  // Verify webhook signature
  const isValid = await verifyClerkWebhook(body, svixId, svixTimestamp, svixSignature, env.CLERK_WEBHOOK_SECRET);
  if (!isValid) {
    return new Response('Invalid signature', { status: 400 });
  }

  const event = JSON.parse(body);

  // Handle user created event
  if (event.type === 'user.created') {
    const user = event.data;
    const email = user.email_addresses?.[0]?.email_address;

    if (email) {
      try {
        await env.DB.prepare(
          'INSERT OR IGNORE INTO users (id, email, created_at, subscription_status) VALUES (?, ?, datetime(?), ?)'
        ).bind(user.id, email, new Date(user.created_at).toISOString(), 'free').run();
      } catch (error) {
        console.error('Failed to store user:', error);
      }
    }
  }

  // Handle user updated event (email change)
  if (event.type === 'user.updated') {
    const user = event.data;
    const email = user.email_addresses?.[0]?.email_address;

    if (email) {
      try {
        await env.DB.prepare(
          'UPDATE users SET email = ? WHERE id = ?'
        ).bind(email, user.id).run();
      } catch (error) {
        console.error('Failed to update user:', error);
      }
    }
  }

  // Handle user deleted event
  if (event.type === 'user.deleted') {
    const user = event.data;
    try {
      await env.DB.prepare('DELETE FROM users WHERE id = ?').bind(user.id).run();
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  }

  return new Response('OK', { status: 200 });
}

async function verifyClerkWebhook(payload, svixId, svixTimestamp, svixSignature, secret) {
  if (!secret) return false;

  try {
    const encoder = new TextEncoder();

    // Clerk webhook secrets are prefixed with "whsec_"
    const secretBytes = base64Decode(secret.replace('whsec_', ''));

    const signedPayload = `${svixId}.${svixTimestamp}.${payload}`;

    const key = await crypto.subtle.importKey(
      'raw',
      secretBytes,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const signatureBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(signedPayload));
    const computedSig = btoa(String.fromCharCode(...new Uint8Array(signatureBuffer)));

    // Svix signature format: v1,<base64sig> v1,<base64sig>...
    const signatures = svixSignature.split(' ');
    for (const sig of signatures) {
      const [version, sigValue] = sig.split(',');
      if (version === 'v1' && sigValue === computedSig) {
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error('Webhook verification error:', error);
    return false;
  }
}

function base64Decode(str) {
  const binary = atob(str);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}
