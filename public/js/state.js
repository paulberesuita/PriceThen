// Centralized state management

const state = {
  selectedProduct: 'eggs',  // First product in 'food' category
  selectedCategory: 'food',
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
