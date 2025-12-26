// Chart rendering module
import { getState, setChart } from './state.js';
import { getInterpolatedData, formatPrice, products } from './data.js';
import { fetchPriceData } from './api.js';

// Check if product is premium
function isPremiumProduct(productId) {
  return products.premium.some(p => p.id === productId);
}

// Convert API response to interpolated data format
function interpolateFromApi(prices) {
  const data = {};
  prices.forEach(p => { data[p.year] = p.price; });

  const years = Object.keys(data).map(Number).sort((a, b) => a - b);
  const result = [];
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);

  for (let year = minYear; year <= maxYear; year++) {
    if (data[year] !== undefined) {
      result.push({ year, price: data[year] });
    } else {
      let lowerYear = years.filter(y => y < year).pop();
      let upperYear = years.find(y => y > year);
      if (lowerYear && upperYear) {
        const ratio = (year - lowerYear) / (upperYear - lowerYear);
        const price = data[lowerYear] + ratio * (data[upperYear] - data[lowerYear]);
        result.push({ year, price: Math.round(price * 100) / 100 });
      }
    }
  }
  return result;
}

export async function renderChart(productId, locked = false) {
  const ctx = document.getElementById('price-chart');
  const state = getState();

  // Destroy existing chart
  if (state.chart) {
    state.chart.destroy();
  }

  const allProducts = [...products.free, ...products.premium];
  const product = allProducts.find(p => p.id === productId);

  let data;

  // If locked, show placeholder chart
  if (locked) {
    data = generatePlaceholderData();
    renderLockedChart(ctx, product, data);
    return;
  }

  // Fetch from API for premium products, use local data for free
  if (isPremiumProduct(productId)) {
    try {
      const response = await fetchPriceData(productId);
      data = interpolateFromApi(response.prices);
    } catch (error) {
      if (error.status === 403) {
        // Premium required - show locked placeholder
        data = generatePlaceholderData();
        renderLockedChart(ctx, product, data);
        return;
      }
      console.error('Error fetching price data:', error);
      return;
    }
  } else {
    data = getInterpolatedData(productId);
  }

  if (!data || data.length === 0) return;

  // Update header
  document.getElementById('product-title').textContent = product.icon + ' ' + product.name;
  const startYear = data[0].year;
  const endYear = data[data.length - 1].year;
  document.getElementById('subtitle-years').textContent = `${startYear} – ${endYear}`;

  // Update source links
  const sourceLink = document.getElementById('source-link');
  if (product.sources && product.sources.length > 0) {
    const pills = product.sources.map(s =>
      `<a href="${s.url}" target="_blank" rel="noopener" class="inline-block px-2 py-0.5 text-xs bg-stone-100 hover:bg-stone-200 rounded-full text-stone-600 transition-colors">${s.name}</a>`
    ).join(' ');
    sourceLink.innerHTML = ` · ${pills}`;
  } else if (product.source) {
    // Fallback for premium products with old format
    sourceLink.innerHTML = ` · <a href="${product.source}" target="_blank" rel="noopener" class="inline-block px-2 py-0.5 text-xs bg-stone-100 hover:bg-stone-200 rounded-full text-stone-600 transition-colors">${product.sourceName}</a>`;
  } else {
    sourceLink.innerHTML = '';
  }

  // Update comparison section
  const comparison = document.getElementById('comparison');
  comparison.classList.remove('hidden');

  const startPrice = data[0].price;
  const endPrice = data[data.length - 1].price;

  document.getElementById('start-year').textContent = startYear;
  document.getElementById('end-year').textContent = endYear;
  document.getElementById('start-price').textContent = formatPrice(startPrice);
  document.getElementById('end-price').textContent = formatPrice(endPrice);

  const multiplier = (endPrice / startPrice).toFixed(1);
  document.getElementById('change-summary').textContent =
    `That's ${multiplier}x more expensive over ${data.length - 1} years`;

  // Create chart
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map(d => d.year),
      datasets: [{
        label: product.name,
        data: data.map(d => d.price),
        borderColor: '#171717',
        backgroundColor: 'rgba(23, 23, 23, 0.05)',
        fill: true,
        tension: 0.3,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#171717',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: 'index'
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: '#171717',
          titleColor: '#fff',
          bodyColor: '#fff',
          padding: 12,
          cornerRadius: 8,
          displayColors: false,
          callbacks: {
            title: (items) => items[0].label,
            label: (item) => formatPrice(item.raw)
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            maxTicksLimit: 8,
            color: '#9ca3af'
          }
        },
        y: {
          grid: {
            color: '#f3f4f6'
          },
          ticks: {
            color: '#9ca3af',
            callback: (value) => formatPrice(value)
          }
        }
      }
    }
  });

  setChart(chart);
}

// Generate placeholder data for locked charts
function generatePlaceholderData() {
  const data = [];
  for (let year = 1950; year <= 2025; year++) {
    // Generate a realistic-looking upward trend with some variation
    const base = 1 + (year - 1950) * 0.15;
    const variation = Math.sin(year * 0.5) * 0.3;
    data.push({ year, price: base + variation });
  }
  return data;
}

// Render a locked/blurred chart with upgrade CTA
function renderLockedChart(ctx, product, data) {
  // Update header
  document.getElementById('product-title').textContent = product.icon + ' ' + product.name;
  document.getElementById('subtitle-years').textContent = '1950 – 2025';

  // Update source links
  const sourceLink = document.getElementById('source-link');
  if (product.source) {
    sourceLink.innerHTML = ` · <a href="${product.source}" target="_blank" rel="noopener" class="inline-block px-2 py-0.5 text-xs bg-stone-100 hover:bg-stone-200 rounded-full text-stone-600 transition-colors">${product.sourceName}</a>`;
  } else {
    sourceLink.innerHTML = '';
  }

  // Hide comparison section for locked charts
  const comparison = document.getElementById('comparison');
  comparison.classList.add('hidden');

  // Show premium CTA
  const cta = document.getElementById('premium-cta');
  cta.classList.remove('hidden');

  // Create blurred placeholder chart
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map(d => d.year),
      datasets: [{
        label: product.name,
        data: data.map(d => d.price),
        borderColor: 'rgba(23, 23, 23, 0.2)',
        backgroundColor: 'rgba(23, 23, 23, 0.03)',
        fill: true,
        tension: 0.3,
        pointRadius: 0,
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: 'index'
      },
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            maxTicksLimit: 8,
            color: '#d1d5db'
          }
        },
        y: {
          grid: { color: '#f3f4f6' },
          ticks: {
            color: '#d1d5db',
            callback: () => '???'
          }
        }
      }
    }
  });

  setChart(chart);
}
