// Main application entry point
import { products, categories } from './data.js';
import { getState, setSelectedProduct, setIsPremium, setSelectedCategory, getSelectedCategory } from './state.js';
import { renderChart } from './chart.js';
import { setClerkInstance } from './api.js';

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

// SEO meta descriptions for each product
const productMeta = {
  eggs: { title: 'Egg Prices History (1950-2025)', description: 'See how egg prices changed from $0.60 in 1950 to over $3 today. Historical egg price data with inflation-adjusted values from BLS.' },
  rent: { title: 'Rent Prices History (1950-2025)', description: 'Track 75 years of average rent prices in America. From $42/month in 1950 to over $1,700 today. Census and housing data.' },
  gas: { title: 'Gas Prices History (1950-2025)', description: 'Gas price history from $0.18/gallon in 1950 to today. See how fuel costs changed over 75 years with BLS data.' },
  minimum_wage: { title: 'Minimum Wage History (1950-2025)', description: 'Federal minimum wage history from $0.75/hour in 1950 to $7.25 today. See real purchasing power over time.' },
  movie: { title: 'Movie Ticket Prices History (1950-2025)', description: 'Movie ticket price history from $0.46 in 1950 to over $11 today. 75 years of cinema admission costs.' },
  tv: { title: 'TV Prices History (1950-2025)', description: 'Television price history showing how TVs went from $200+ in 1950 to affordable today despite inflation.' },
  doctor: { title: 'Doctor Visit Cost History (1950-2025)', description: 'How much did a doctor visit cost? From $3 in 1950 to over $150 today. Medical care inflation data.' },
  haircut: { title: 'Haircut Prices History (1950-2025)', description: 'Haircut price history from $0.75 in 1950 to $20+ today. See how grooming costs changed over 75 years.' },
  tuition: { title: 'College Tuition History (1950-2025)', description: 'College tuition history from $300/year in 1950 to $10,000+ today. NCES education cost data.' },
  milk: { title: 'Milk Prices History (1950-2025)', description: 'Milk price history from $0.83/gallon in 1950 to today. BLS dairy price data over 75 years.' },
  bread: { title: 'Bread Prices History (1950-2025)', description: 'Bread price history from $0.14/loaf in 1950 to today. See how bakery costs changed over time.' },
  coffee: { title: 'Coffee Prices History (1950-2025)', description: 'Coffee price history from $0.10/cup in 1950 to $3+ today. Track caffeine costs over 75 years.' },
  bigmac: { title: 'Big Mac Prices History (1968-2025)', description: 'Big Mac price history from $0.49 in 1968 to over $5 today. The Economist Big Mac Index data.' },
  home: { title: 'Home Prices History (1950-2025)', description: 'Median home price history from $7,400 in 1950 to $400,000+ today. FRED housing data.' },
  electricity: { title: 'Electricity Prices History (1950-2025)', description: 'Monthly electricity bill history. See how energy costs changed over 75 years with EIA data.' },
  heating: { title: 'Heating Cost History (1950-2025)', description: 'Home heating cost history. Track how winter utility bills changed over 75 years.' },
  water: { title: 'Water Bill History (1950-2025)', description: 'Monthly water bill history. See how water utility costs changed over 75 years.' },
  car: { title: 'Car Prices History (1950-2025)', description: 'New car price history from $1,500 in 1950 to $48,000+ today. BLS vehicle cost data.' },
  airline: { title: 'Airline Ticket Prices History (1950-2025)', description: 'Domestic airline ticket price history. See how flying costs changed over 75 years.' },
  bus: { title: 'Bus Fare History (1950-2025)', description: 'Bus fare history from $0.10 in 1950 to $2+ today. Public transit cost data.' },
  bicycle: { title: 'Bicycle Prices History (1950-2025)', description: 'Bicycle price history. See how bike costs changed over 75 years of inflation.' },
  median_income: { title: 'Median Income History (1950-2025)', description: 'Median household income from $3,300 in 1950 to $75,000+ today. Census income data.' },
  teacher_salary: { title: 'Teacher Salary History (1950-2025)', description: 'Teacher salary history. See how educator pay changed over 75 years with NCES data.' },
  engineer_salary: { title: 'Engineer Salary History (1950-2025)', description: 'Engineer salary history. Track engineering wages over 75 years with BLS data.' },
  nurse_salary: { title: 'Nurse Salary History (1950-2025)', description: 'Nurse salary history. See how nursing wages changed over 75 years with BLS data.' },
  concert: { title: 'Concert Ticket Prices History (1950-2025)', description: 'Concert ticket price history. See how live music costs changed over the decades.' },
  sports: { title: 'Sports Ticket Prices History (1950-2025)', description: 'Sports event ticket price history. Track how game admission costs changed over time.' },
  videogame: { title: 'Video Game Prices History (1980-2025)', description: 'Video game price history from $30 in 1980 to $70 today. Gaming cost trends.' },
  newspaper: { title: 'Newspaper Prices History (1950-2025)', description: 'Newspaper price history from $0.05 in 1950 to $3+ today. Print media cost data.' },
  computer: { title: 'Computer Prices History (1980-2025)', description: 'Desktop computer price history. See how PC costs dropped despite inflation.' },
  internet: { title: 'Internet Prices History (1995-2025)', description: 'Monthly internet service price history from dial-up to fiber. Connectivity costs over time.' },
  phone_service: { title: 'Phone Service Prices History (1950-2025)', description: 'Monthly phone service price history. Landline to mobile cost trends.' },
  camera: { title: 'Camera Prices History (1950-2025)', description: 'Camera price history from film to digital. Photography equipment costs over time.' },
  hospital: { title: 'Hospital Cost History (1950-2025)', description: 'Hospital day cost history. See how inpatient care costs exploded over 75 years.' },
  health_insurance: { title: 'Health Insurance Cost History (1950-2025)', description: 'Annual health insurance cost history. Kaiser Family Foundation premium data.' },
  dental: { title: 'Dental Visit Cost History (1950-2025)', description: 'Dental visit cost history. See how dentist prices changed over 75 years.' },
  prescription: { title: 'Prescription Drug Prices History (1950-2025)', description: 'Average prescription drug price history. CMS pharmaceutical cost data.' },
  drycleaning: { title: 'Dry Cleaning Prices History (1950-2025)', description: 'Dry cleaning price history for suits. See how laundry costs changed over time.' },
  plumber: { title: 'Plumber Cost History (1950-2025)', description: 'Plumber hourly rate history. See how trade service costs changed over 75 years.' },
  daycare: { title: 'Daycare Cost History (1970-2025)', description: 'Monthly daycare cost history. Track childcare expenses over the decades.' },
  lawyer: { title: 'Lawyer Cost History (1950-2025)', description: 'Lawyer hourly rate history. See how legal fees changed over 75 years.' },
  stamp: { title: 'Postage Stamp Prices History (1950-2025)', description: 'Postage stamp price history from $0.03 in 1950 to $0.68 today. USPS rate data.' },
  wedding: { title: 'Wedding Cost History (1950-2025)', description: 'Average wedding cost history. From $2,000 in 1950 to $30,000+ today.' },
  funeral: { title: 'Funeral Cost History (1950-2025)', description: 'Average funeral cost history. NFDA data on burial expenses over time.' },
  textbook: { title: 'Textbook Prices History (1970-2025)', description: 'College textbook price history. See how academic book costs outpaced inflation.' }
};

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

function updateMetaTags(productId) {
  const meta = productMeta[productId];
  if (!meta) return;

  // Update title
  document.title = `${meta.title} | PriceThen`;

  // Update meta description
  const descriptionMeta = document.querySelector('meta[name="description"]');
  if (descriptionMeta) {
    descriptionMeta.setAttribute('content', meta.description);
  }

  // Update canonical URL
  const canonical = document.querySelector('link[rel="canonical"]');
  const slug = productSlugs[productId];
  if (canonical && slug) {
    canonical.setAttribute('href', `https://pricethen.com/${slug}`);
  }

  // Update Open Graph tags
  const ogUrl = document.querySelector('meta[property="og:url"]');
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogUrl && slug) ogUrl.setAttribute('content', `https://pricethen.com/${slug}`);
  if (ogTitle) ogTitle.setAttribute('content', meta.title);
  if (ogDescription) ogDescription.setAttribute('content', meta.description);

  // Update Twitter tags
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  const twitterDescription = document.querySelector('meta[name="twitter:description"]');
  if (twitterTitle) twitterTitle.setAttribute('content', meta.title);
  if (twitterDescription) twitterDescription.setAttribute('content', meta.description);

  // Update JSON-LD structured data
  updateStructuredData(productId);
}

function updateStructuredData(productId) {
  const meta = productMeta[productId];
  const slug = productSlugs[productId];
  if (!meta || !slug) return;

  const allProducts = [...products.free, ...products.premium];
  const product = allProducts.find(p => p.id === productId);
  if (!product) return;

  // Remove existing dynamic JSON-LD
  const existingScript = document.getElementById('dynamic-jsonld');
  if (existingScript) {
    existingScript.remove();
  }

  // Create Dataset schema for the product
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": meta.title,
    "description": meta.description,
    "url": `https://pricethen.com/${slug}`,
    "keywords": [
      product.name,
      "price history",
      "inflation",
      "historical prices",
      "cost of living",
      "1950 to 2025"
    ],
    "temporalCoverage": "1950/2025",
    "spatialCoverage": "United States",
    "creator": {
      "@type": "Organization",
      "name": "PriceThen",
      "url": "https://pricethen.com"
    },
    "license": "https://pricethen.com",
    "isAccessibleForFree": products.free.some(p => p.id === productId),
    "variableMeasured": {
      "@type": "PropertyValue",
      "name": product.name,
      "unitText": "USD"
    }
  };

  // Add source if available
  if (product.sources && product.sources.length > 0) {
    jsonLd.citation = product.sources.map(s => s.url);
  } else if (product.source) {
    jsonLd.citation = product.source;
  }

  const script = document.createElement('script');
  script.id = 'dynamic-jsonld';
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(jsonLd);
  document.head.appendChild(script);
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

  // Update URL and meta tags to SEO-friendly format
  updateUrl(initialProduct, true);
  updateMetaTags(initialProduct);

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
    updateMetaTags(productId);
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
    // Only re-render if user actually changes (sign in/out), not on polling
    let lastUserId = clerk.user?.id || null;
    clerk.addListener(async ({ user }) => {
      const currentUserId = user?.id || null;
      if (currentUserId !== lastUserId) {
        lastUserId = currentUserId;
        setClerkInstance(clerk);
        updateAuthUI();
        await checkPremiumStatus();
        renderProductSelector();
      }
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

  // All products are clickable - locked ones show placeholder
  btn.addEventListener('click', () => selectProduct(product.id, locked));

  return btn;
}

async function selectProduct(productId, locked = false) {
  setSelectedProduct(productId);
  updateActiveButton(productId);
  updateUrl(productId);
  updateMetaTags(productId);
  await renderChart(productId, locked);
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
