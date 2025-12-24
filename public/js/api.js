// API service for fetching price data

let clerkInstance = null;

export function setClerkInstance(clerk) {
  clerkInstance = clerk;
}

// Fetch price data for a product
export async function fetchPriceData(productId) {
  const headers = {
    'Content-Type': 'application/json'
  };

  // Add auth token if available
  if (clerkInstance?.session) {
    try {
      const token = await clerkInstance.session.getToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    } catch (e) {
      console.error('Error getting token:', e);
    }
  }

  const response = await fetch(`/api/prices/${productId}`, { headers });

  if (!response.ok) {
    const error = await response.json();
    throw { status: response.status, ...error };
  }

  return response.json();
}

// Fetch products and categories list
export async function fetchProducts() {
  const response = await fetch('/api/products');
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
}
