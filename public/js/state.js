// Centralized state management

const state = {
  selectedProduct: 'gas',
  isPremium: false,
  chart: null
};

export function getState() {
  return state;
}

export function setSelectedProduct(productId) {
  state.selectedProduct = productId;
}

export function setIsPremium(isPremium) {
  state.isPremium = isPremium;
}

export function setChart(chart) {
  state.chart = chart;
}
