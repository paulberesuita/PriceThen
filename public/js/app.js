// Main application entry point
import { products, categories } from './data.js?v=20251223i';
import { getState, setSelectedProduct, setIsPremium, setSelectedCategory, getSelectedCategory } from './state.js?v=20251223i';
import { renderChart } from './chart.js?v=20251223i';
import { setClerkInstance } from './api.js?v=20251223i';

let clerk = null;
let clerkLoading = false;

// SEO-friendly URL slugs for products
const productSlugs = {
  eggs: 'egg-prices-history',
  rent: 'rent-prices-history',
  gas: 'gas-prices-history',
  minimum_wage: 'minimum-wage-history',
  movie: 'movie-ticket-prices-history',
  tv: 'tv-prices-history',
  doctor: 'doctor-visit-cost-history',
  haircut: 'haircut-prices-history',
  tuition: 'college-tuition-history',
  milk: 'milk-prices-history',
  bread: 'bread-prices-history',
  coffee: 'coffee-prices-history',
  bigmac: 'big-mac-prices-history',
  home: 'home-prices-history',
  electricity: 'electricity-prices-history',
  heating: 'heating-cost-history',
  water: 'water-bill-history',
  car: 'car-prices-history',
  airline: 'airline-ticket-prices-history',
  bus: 'bus-fare-history',
  bicycle: 'bicycle-prices-history',
  median_income: 'median-income-history',
  teacher_salary: 'teacher-salary-history',
  engineer_salary: 'engineer-salary-history',
  nurse_salary: 'nurse-salary-history',
  concert: 'concert-ticket-prices-history',
  sports: 'sports-ticket-prices-history',
  videogame: 'video-game-prices-history',
  newspaper: 'newspaper-prices-history',
  computer: 'computer-prices-history',
  internet: 'internet-prices-history',
  phone_service: 'phone-service-prices-history',
  camera: 'camera-prices-history',
  hospital: 'hospital-cost-history',
  health_insurance: 'health-insurance-cost-history',
  dental: 'dental-visit-cost-history',
  prescription: 'prescription-drug-prices-history',
  drycleaning: 'dry-cleaning-prices-history',
  plumber: 'plumber-cost-history',
  daycare: 'daycare-cost-history',
  lawyer: 'lawyer-cost-history',
  stamp: 'postage-stamp-prices-history',
  wedding: 'wedding-cost-history',
  funeral: 'funeral-cost-history',
  textbook: 'textbook-prices-history'
};

// Reverse mapping: slug -> productId
const slugToProduct = Object.fromEntries(
  Object.entries(productSlugs).map(([id, slug]) => [slug, id])
);

function getProductIdFromUrl() {
  const path = window.location.pathname;

  // Check for SEO-friendly URL like /gas-prices-history
  if (path !== '/' && path !== '/index.html') {
    const slug = path.replace(/^\//, '').replace(/\/$/, '');
    if (slugToProduct[slug]) {
      return slugToProduct[slug];
    }
  }

  // Fallback to query param for backwards compatibility
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('product');
}

function updateUrl(productId, replace = false) {
  const slug = productSlugs[productId];
  if (slug) {
    const newUrl = `/${slug}`;
    if (replace) {
      history.replaceState({ productId }, '', newUrl);
    } else {
      history.pushState({ productId }, '', newUrl);
    }
  }
}

async function init() {
  // Check for product in URL
  const productFromUrl = getProductIdFromUrl();

  // Render UI immediately (don't wait for Clerk)
  renderCategoryTabs();
  renderProductSelector();

  // Use product from URL if valid, otherwise default to first product in current category
  const allProducts = [...products.free, ...products.premium];
  const allProductIds = allProducts.map(p => p.id);
  const selectedCategory = getSelectedCategory();
  const firstInCategory = allProducts.find(p => p.category === selectedCategory)?.id || 'eggs';
  const initialProduct = productFromUrl && allProductIds.includes(productFromUrl) ? productFromUrl : firstInCategory;

  // Set the product's category as active
  if (productFromUrl && allProductIds.includes(productFromUrl)) {
    const product = allProducts.find(p => p.id === productFromUrl);
    if (product) {
      setSelectedCategory(product.category);
      renderCategoryTabs();
      renderProductSelector();
    }
  }

  setSelectedProduct(initialProduct);
  updateActiveButton(initialProduct);
  await renderChart(initialProduct);

  // Update URL to SEO-friendly format (replace, don't push)
  updateUrl(initialProduct, true);

  setupEventListeners();

  // Handle browser back/forward
  window.addEventListener('popstate', handlePopState);

  // Load Clerk in background
  initClerk();
}

async function handlePopState(event) {
  const productId = event.state?.productId || getProductIdFromUrl() || 'eggs';
  const allProducts = [...products.free, ...products.premium];
  const product = allProducts.find(p => p.id === productId);

  if (product) {
    setSelectedCategory(product.category);
    renderCategoryTabs();
    renderProductSelector();
    setSelectedProduct(productId);
    updateActiveButton(productId);
    await renderChart(productId);
  }
}

async function initClerk() {
  if (clerkLoading) return;
  clerkLoading = true;

  try {
    await waitForClerk();

    // Pass Clerk instance to API module for auth
    setClerkInstance(clerk);

    // Update UI based on auth state
    updateAuthUI();

    // Check premium status and re-render if needed
    await checkPremiumStatus();
    renderProductSelector();

    // Listen for Clerk user changes (sign in/out)
    clerk.addListener(async ({ user }) => {
      setClerkInstance(clerk);
      updateAuthUI();
      await checkPremiumStatus();
      renderProductSelector();
    });
  } catch (error) {
    console.error('Clerk initialization error:', error);
    clerkLoading = false;
    // Show sign-in button even if Clerk fails
    document.getElementById('sign-in-btn').classList.remove('hidden');
  }
}

function updateAuthUI() {
  const signInBtn = document.getElementById('sign-in-btn');
  const userButton = document.getElementById('user-button');

  if (clerk.user) {
    // User is signed in - show user button, hide sign in
    signInBtn.classList.add('hidden');
    clerk.mountUserButton(userButton);
  } else {
    // User is signed out - show sign in button
    signInBtn.classList.remove('hidden');
    userButton.innerHTML = '';
  }
}

function waitForClerk() {
  return new Promise((resolve, reject) => {
    // Check if already loaded
    if (window.Clerk && window.Clerk.loaded) {
      clerk = window.Clerk;
      resolve();
      return;
    }

    if (window.Clerk) {
      window.Clerk.load().then(() => {
        clerk = window.Clerk;
        resolve();
      }).catch(reject);
      return;
    }

    // Wait for script to load
    const checkInterval = setInterval(() => {
      if (window.Clerk) {
        clearInterval(checkInterval);
        window.Clerk.load().then(() => {
          clerk = window.Clerk;
          resolve();
        }).catch(reject);
      }
    }, 100);

    // Timeout after 15 seconds
    setTimeout(() => {
      clearInterval(checkInterval);
      if (!clerk) {
        reject(new Error('Clerk load timeout'));
      }
    }, 15000);
  });
}

async function checkPremiumStatus() {
  if (!clerk) return;

  const user = clerk.user;
  if (user) {
    // Force reload user to get latest metadata
    await user.reload();
    const isPremium = user.publicMetadata?.isPremium === true;
    setIsPremium(isPremium);

    // Hide upgrade CTA if premium
    const cta = document.getElementById('premium-cta');
    if (isPremium && cta) {
      cta.classList.add('hidden');
    }
  } else {
    setIsPremium(false);
  }
}

function renderCategoryTabs() {
  const container = document.getElementById('category-tabs');
  if (!container) return;

  container.innerHTML = '';
  const selectedCategory = getSelectedCategory();

  categories.forEach(category => {
    const btn = document.createElement('button');
    btn.className = 'category-tab' + (category.id === selectedCategory ? ' active' : '');
    btn.dataset.categoryId = category.id;
    btn.textContent = category.name;
    btn.addEventListener('click', () => selectCategory(category.id));
    container.appendChild(btn);
  });
}

async function selectCategory(categoryId) {
  setSelectedCategory(categoryId);
  renderCategoryTabs();
  renderProductSelector();

  // Auto-select first product in this category
  const state = getState();
  const categoryProducts = [
    ...products.free.filter(p => p.category === categoryId),
    ...products.premium.filter(p => p.category === categoryId)
  ];

  if (categoryProducts.length > 0) {
    const firstProduct = categoryProducts[0];
    const isLocked = products.premium.some(p => p.id === firstProduct.id) && !state.isPremium;

    if (!isLocked) {
      await selectProduct(firstProduct.id);
    }
  }
}

function renderProductSelector() {
  const container = document.getElementById('product-selector');
  container.innerHTML = '';
  const state = getState();
  const selectedCategory = getSelectedCategory();

  // Filter products by category
  const filterByCategory = (product) => {
return product.category === selectedCategory;
  };

  // Render free products
  products.free.filter(filterByCategory).forEach(product => {
    const btn = createProductButton(product, false);
    container.appendChild(btn);
  });

  // Render premium products (locked if not premium)
  products.premium.filter(filterByCategory).forEach(product => {
    const btn = createProductButton(product, !state.isPremium);
    container.appendChild(btn);
  });

  // Set initial active state
  updateActiveButton(state.selectedProduct);
}

function createProductButton(product, locked) {
  const btn = document.createElement('button');
  btn.className = 'product-btn' + (locked ? ' locked' : '');
  btn.dataset.productId = product.id;
  btn.textContent = product.icon + ' ' + product.name;

  if (!locked) {
    btn.addEventListener('click', () => selectProduct(product.id));
  } else {
    btn.addEventListener('click', showPremiumCTA);
  }

  return btn;
}

async function selectProduct(productId) {
  setSelectedProduct(productId);
  updateActiveButton(productId);
  updateUrl(productId);
  await renderChart(productId);
}

function updateActiveButton(productId) {
  document.querySelectorAll('.product-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.productId === productId);
  });
}

function showPremiumCTA() {
  const cta = document.getElementById('premium-cta');
  cta.classList.remove('hidden');
  cta.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

async function handleSignIn() {
  if (!clerk) {
    try {
      await waitForClerk();
    } catch (error) {
      console.error('Could not load Clerk:', error);
      return;
    }
  }

  clerk.openSignIn({
    afterSignInUrl: window.location.href,
    afterSignUpUrl: window.location.href
  });
}

async function handleUpgrade() {
  // If Clerk isn't loaded yet, try to load it
  if (!clerk) {
    try {
      await waitForClerk();
    } catch (error) {
      console.error('Could not load Clerk:', error);
      return;
    }
  }

  // Check if user is signed in
  if (!clerk.user) {
    // Open Clerk sign-in modal
    clerk.openSignIn({
      afterSignInUrl: window.location.href,
      afterSignUpUrl: window.location.href
    });
    return;
  }

  // User is signed in, redirect to Stripe checkout
  try {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: clerk.user.id })
    });

    const { url } = await response.json();
    if (url) {
      window.location.href = url;
    }
  } catch (error) {
    console.error('Checkout error:', error);
  }
}

function setupEventListeners() {
  document.getElementById('upgrade-btn').addEventListener('click', handleUpgrade);
  document.getElementById('sign-in-btn').addEventListener('click', handleSignIn);

  // Share functionality
  const shareBtn = document.getElementById('share-btn');
  const shareModal = document.getElementById('share-modal');
  const closeModal = document.getElementById('close-modal');
  const copyLinkBtn = document.getElementById('copy-link-btn');
  const copyImageBtn = document.getElementById('copy-image-btn');
  const shareUrl = document.getElementById('share-url');
  const shareFeedback = document.getElementById('share-feedback');

  shareBtn.addEventListener('click', () => {
    const state = getState();
    const slug = productSlugs[state.selectedProduct] || state.selectedProduct;
    const url = `${window.location.origin}/${slug}`;
    shareUrl.value = url;
    shareModal.classList.remove('hidden');
  });

  closeModal.addEventListener('click', () => {
    shareModal.classList.add('hidden');
    shareFeedback.classList.add('hidden');
  });

  // Close modal on backdrop click
  shareModal.addEventListener('click', (e) => {
    if (e.target === shareModal) {
      shareModal.classList.add('hidden');
      shareFeedback.classList.add('hidden');
    }
  });

  copyLinkBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(shareUrl.value);
      showShareFeedback('Link copied to clipboard!');
    } catch (err) {
      shareUrl.select();
      document.execCommand('copy');
      showShareFeedback('Link copied!');
    }
  });

  copyImageBtn.addEventListener('click', () => {
    const canvas = document.getElementById('price-chart');
    const state = getState();
    const allProducts = [...products.free, ...products.premium];
    const product = allProducts.find(p => p.id === state.selectedProduct);

    // Create a new canvas with padding and title
    const exportCanvas = document.createElement('canvas');
    const ctx = exportCanvas.getContext('2d');
    const padding = 40;
    const titleHeight = 60;

    exportCanvas.width = canvas.width + padding * 2;
    exportCanvas.height = canvas.height + padding * 2 + titleHeight;

    // Fill background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

    // Draw title
    ctx.fillStyle = '#171717';
    ctx.font = 'bold 24px system-ui, -apple-system, sans-serif';
    ctx.fillText(`${product.icon} ${product.name} (1950-2025)`, padding, padding + 30);

    // Draw subtitle
    ctx.fillStyle = '#6b7280';
    ctx.font = '14px system-ui, -apple-system, sans-serif';
    ctx.fillText('pricethen.com', padding, padding + 50);

    // Draw chart
    ctx.drawImage(canvas, padding, padding + titleHeight);

    // Download
    const link = document.createElement('a');
    link.download = `pricethen-${state.selectedProduct}.png`;
    link.href = exportCanvas.toDataURL('image/png');
    link.click();

    showShareFeedback('Image downloaded!');
  });

  function showShareFeedback(message) {
    shareFeedback.textContent = message;
    shareFeedback.classList.remove('hidden');
    setTimeout(() => {
      shareFeedback.classList.add('hidden');
    }, 2000);
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', init);
