// Chart rendering module
import { getState, setChart } from './state.js';
import { getInterpolatedData, formatPrice, products } from './data.js';

export function renderChart(productId) {
  const ctx = document.getElementById('price-chart');
  const state = getState();

  // Destroy existing chart
  if (state.chart) {
    state.chart.destroy();
  }

  const data = getInterpolatedData(productId);
  if (!data) return;

  const allProducts = [...products.free, ...products.premium];
  const product = allProducts.find(p => p.id === productId);

  // Update header
  document.getElementById('product-title').textContent = product.icon + ' ' + product.name;
  document.getElementById('subtitle-years').textContent = '1950 – 2024';

  // Update source link
  const sourceLink = document.getElementById('source-link');
  if (product.source) {
    sourceLink.innerHTML = ` · <a href="${product.source}" target="_blank" rel="noopener" class="underline hover:text-gray-700">Source: ${product.sourceName}</a>`;
  } else {
    sourceLink.innerHTML = '';
  }

  // Update comparison section
  const comparison = document.getElementById('comparison');
  comparison.classList.remove('hidden');

  const startPrice = data[0].price;
  const endPrice = data[data.length - 1].price;

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
