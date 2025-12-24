// API endpoint to get all products and categories

export async function onRequestGet({ env }) {
  try {
    // Get all categories
    const categories = await env.DB.prepare(
      'SELECT * FROM categories ORDER BY sort_order'
    ).all();

    // Get all products (but NOT their price data - that requires separate call)
    const products = await env.DB.prepare(
      'SELECT id, name, icon, category_id, is_premium, source_url, source_name FROM products ORDER BY sort_order'
    ).all();

    // Format products into free/premium groups
    const freeProducts = products.results.filter(p => p.is_premium === 0).map(formatProduct);
    const premiumProducts = products.results.filter(p => p.is_premium === 1).map(formatProduct);

    return new Response(JSON.stringify({
      categories: [
        { id: 'all', name: 'All', icon: '📊' },
        ...categories.results
      ],
      products: {
        free: freeProducts,
        premium: premiumProducts
      }
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600'
      }
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

function formatProduct(p) {
  return {
    id: p.id,
    name: p.name,
    icon: p.icon,
    category: p.category_id,
    source: p.source_url,
    sourceName: p.source_name
  };
}
