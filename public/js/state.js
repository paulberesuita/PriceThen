// Centralized state management

const state = {
  selectedProduct: 'gas',
  selectedCategory: 'all',
  isPremium: false,
  chart: null
};

export function getState() {
  return state;
}

export function setSelectedProduct(productId) {
  state.selectedProduct = productId;
}

export function setSelectedCategory(categoryId) {
  state.selectedCategory = categoryId;
}

export function getSelectedCategory() {
  return state.selectedCategory;
}

export function setIsPremium(isPremium) {
  state.isPremium = isPremium;
}

export function setChart(chart) {
  state.chart = chart;
}
