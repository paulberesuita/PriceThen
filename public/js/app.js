// Main application entry point
import { products } from './data.js';
import { getState, setSelectedProduct, setIsPremium } from './state.js';
import { renderChart } from './chart.js';

let clerk = null;
let clerkLoading = false;

async function init() {
  // Check for product in URL
  const urlParams = new URLSearchParams(window.location.search);
  const productFromUrl = urlParams.get('product');

  // Render UI immediately (don't wait for Clerk)
  renderProductSelector();

  // Use product from URL if valid, otherwise default to gas
  const allProductIds = [...products.free, ...products.premium].map(p => p.id);
  const initialProduct = productFromUrl && allProductIds.includes(productFromUrl) ? productFromUrl : 'gas';
  setSelectedProduct(initialProduct);
  updateActiveButton(initialProduct);
  renderChart(initialProduct);

  setupEventListeners();

  // Load Clerk in background
  initClerk();
}

async function initClerk() {
  if (clerkLoading) return;
  clerkLoading = true;

  try {
    await waitForClerk();

    // Mount Clerk UI
    clerk.mountUserButton(document.getElementById('user-button'));

    // Check premium status and re-render if needed
    await checkPremiumStatus();
    renderProductSelector();

    // Listen for Clerk user changes (sign in/out)
    clerk.addListener(async ({ user }) => {
      await checkPremiumStatus();
      renderProductSelector();
    });
  } catch (error) {
    console.error('Clerk initialization error:', error);
    clerkLoading = false;
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
    const isPremium = user.publicMetadata?.isPremium === true;
    setIsPremium(isPremium);
  } else {
    setIsPremium(false);
  }
}

function renderProductSelector() {
  const container = document.getElementById('product-selector');
  container.innerHTML = '';
  const state = getState();

  // Render free products
  products.free.forEach(product => {
    const btn = createProductButton(product, false);
    container.appendChild(btn);
  });

  // Render premium products (locked if not premium)
  products.premium.forEach(product => {
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

function selectProduct(productId) {
  setSelectedProduct(productId);
  updateActiveButton(productId);
  renderChart(productId);
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
    const url = `${window.location.origin}?product=${state.selectedProduct}`;
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
    ctx.fillText(`${product.icon} ${product.name} (1950-2024)`, padding, padding + 30);

    // Draw subtitle
    ctx.fillStyle = '#6b7280';
    ctx.font = '14px system-ui, -apple-system, sans-serif';
    ctx.fillText('worththen.pages.dev', padding, padding + 50);

    // Draw chart
    ctx.drawImage(canvas, padding, padding + titleHeight);

    // Download
    const link = document.createElement('a');
    link.download = `worththen-${state.selectedProduct}.png`;
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
