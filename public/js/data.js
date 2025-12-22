// Historical price data based on BLS CPI and various sources
// Prices adjusted to represent typical values for each year

export const categories = [
  { id: 'all', name: 'All', icon: '📊' },
  { id: 'food', name: 'Food', icon: '🍽️' },
  { id: 'housing', name: 'Housing', icon: '🏠' },
  { id: 'transport', name: 'Transport', icon: '🚗' },
  { id: 'wages', name: 'Wages', icon: '💵' },
  { id: 'fun', name: 'Fun', icon: '🎉' },
  { id: 'other', name: 'Other', icon: '📦' },
];

export const products = {
  free: [
    { id: 'gas', name: 'Gallon of Gas', icon: '⛽', category: 'transport', source: 'https://www.eia.gov/dnav/pet/hist/LeafHandler.ashx?n=pet&s=emm_epm0_pte_nus_dpg&f=a', sourceName: 'U.S. Energy Information Administration' },
    { id: 'eggs', name: 'Dozen Eggs', icon: '🥚', category: 'food', source: 'https://www.bls.gov/regions/mid-atlantic/data/averageretailfoodandenergyprices_usandmidwest_table.htm', sourceName: 'Bureau of Labor Statistics' },
    { id: 'movie', name: 'Movie Ticket', icon: '🎬', category: 'fun', source: 'https://www.natoonline.org/data/ticket-price/', sourceName: 'National Association of Theatre Owners' },
  ],
  premium: [
    { id: 'minimum_wage', name: 'Minimum Wage (hourly)', icon: '💵', category: 'wages', source: 'https://www.dol.gov/agencies/whd/minimum-wage/history/chart', sourceName: 'U.S. Department of Labor' },
    { id: 'rent', name: 'Average Rent', icon: '🏠', category: 'housing', source: 'https://www.census.gov/housing/census/publications/who-can-afford.pdf', sourceName: 'U.S. Census Bureau' },
    { id: 'home', name: 'Median Home Price', icon: '🏡', category: 'housing', source: 'https://fred.stlouisfed.org/series/MSPUS', sourceName: 'Federal Reserve (FRED)' },
    { id: 'tuition', name: 'College Tuition', icon: '🎓', category: 'other', source: 'https://nces.ed.gov/programs/digest/d22/tables/dt22_330.10.asp', sourceName: 'National Center for Education Statistics' },
    { id: 'car', name: 'New Car (average)', icon: '🚗', category: 'transport', source: 'https://www.bls.gov/opub/ted/2023/average-new-vehicle-prices-up-22-percent-from-2019-to-2022.htm', sourceName: 'Bureau of Labor Statistics' },
    { id: 'milk', name: 'Gallon of Milk', icon: '🥛', category: 'food', source: 'https://www.bls.gov/regions/mid-atlantic/data/averageretailfoodandenergyprices_usandmidwest_table.htm', sourceName: 'Bureau of Labor Statistics' },
    { id: 'bread', name: 'Loaf of Bread', icon: '🍞', category: 'food', source: 'https://www.bls.gov/regions/mid-atlantic/data/averageretailfoodandenergyprices_usandmidwest_table.htm', sourceName: 'Bureau of Labor Statistics' },
    { id: 'stamp', name: 'Postage Stamp', icon: '📮', category: 'other', source: 'https://about.usps.com/who/profile/history/postage-702019.htm', sourceName: 'U.S. Postal Service' },
    { id: 'coffee', name: 'Cup of Coffee', icon: '☕', category: 'food', source: 'https://www.bls.gov/cpi/', sourceName: 'Bureau of Labor Statistics CPI' },
    { id: 'bigmac', name: 'Big Mac', icon: '🍔', category: 'food', source: 'https://www.economist.com/big-mac-index', sourceName: 'The Economist Big Mac Index' },
  ]
};

// Historical price data by product (selected years, interpolated for others)
// Sources: BLS, Census Bureau, USPS, various historical records
export const priceData = {
  gas: {
    1950: 0.27, 1955: 0.29, 1960: 0.31, 1965: 0.31, 1970: 0.36,
    1975: 0.57, 1980: 1.19, 1985: 1.12, 1990: 1.15, 1995: 1.15,
    2000: 1.51, 2005: 2.30, 2010: 2.79, 2015: 2.45, 2020: 2.17,
    2024: 3.50
  },
  eggs: {
    1950: 0.60, 1955: 0.61, 1960: 0.57, 1965: 0.53, 1970: 0.61,
    1975: 0.77, 1980: 0.84, 1985: 0.80, 1990: 1.00, 1995: 1.16,
    2000: 0.96, 2005: 1.35, 2010: 1.79, 2015: 2.75, 2020: 1.48,
    2024: 4.50
  },
  movie: {
    1950: 0.46, 1955: 0.50, 1960: 0.69, 1965: 1.01, 1970: 1.55,
    1975: 2.05, 1980: 2.69, 1985: 3.55, 1990: 4.23, 1995: 4.35,
    2000: 5.39, 2005: 6.41, 2010: 7.89, 2015: 8.43, 2020: 9.16,
    2024: 11.75
  },
  minimum_wage: {
    1950: 0.75, 1955: 0.75, 1960: 1.00, 1965: 1.25, 1970: 1.60,
    1975: 2.10, 1980: 3.10, 1985: 3.35, 1990: 3.80, 1995: 4.25,
    2000: 5.15, 2005: 5.15, 2010: 7.25, 2015: 7.25, 2020: 7.25,
    2024: 7.25
  },
  rent: {
    1950: 42, 1955: 52, 1960: 71, 1965: 88, 1970: 108,
    1975: 140, 1980: 243, 1985: 350, 1990: 447, 1995: 550,
    2000: 675, 2005: 826, 2010: 958, 2015: 1100, 2020: 1300,
    2024: 1750
  },
  home: {
    1950: 7354, 1955: 10950, 1960: 12700, 1965: 20000, 1970: 23400,
    1975: 39300, 1980: 64600, 1985: 84300, 1990: 123000, 1995: 133900,
    2000: 165300, 2005: 240900, 2010: 221800, 2015: 294200, 2020: 336900,
    2024: 420000
  },
  tuition: {
    1950: 600, 1955: 700, 1960: 929, 1965: 1105, 1970: 1533,
    1975: 2291, 1980: 3101, 1985: 5314, 1990: 7602, 1995: 10220,
    2000: 12922, 2005: 17233, 2010: 21657, 2015: 25409, 2020: 28775,
    2024: 32000
  },
  car: {
    1950: 1510, 1955: 1910, 1960: 2600, 1965: 2650, 1970: 3450,
    1975: 4950, 1980: 7200, 1985: 11450, 1990: 15472, 1995: 20450,
    2000: 24800, 2005: 28400, 2010: 29217, 2015: 33560, 2020: 37876,
    2024: 48000
  },
  milk: {
    1950: 0.83, 1955: 0.93, 1960: 1.04, 1965: 1.05, 1970: 1.15,
    1975: 1.57, 1980: 2.16, 1985: 2.26, 1990: 2.78, 1995: 2.96,
    2000: 2.78, 2005: 3.24, 2010: 3.32, 2015: 3.42, 2020: 3.54,
    2024: 4.25
  },
  bread: {
    1950: 0.14, 1955: 0.18, 1960: 0.20, 1965: 0.21, 1970: 0.24,
    1975: 0.36, 1980: 0.51, 1985: 0.55, 1990: 0.70, 1995: 0.84,
    2000: 0.99, 2005: 1.05, 2010: 1.37, 2015: 1.43, 2020: 1.50,
    2024: 1.95
  },
  stamp: {
    1950: 0.03, 1955: 0.03, 1960: 0.04, 1965: 0.05, 1970: 0.06,
    1975: 0.10, 1980: 0.15, 1985: 0.22, 1990: 0.25, 1995: 0.32,
    2000: 0.33, 2005: 0.37, 2010: 0.44, 2015: 0.49, 2020: 0.55,
    2024: 0.73
  },
  coffee: {
    1950: 0.10, 1955: 0.15, 1960: 0.20, 1965: 0.25, 1970: 0.25,
    1975: 0.35, 1980: 0.45, 1985: 0.55, 1990: 0.75, 1995: 1.00,
    2000: 1.25, 2005: 1.75, 2010: 2.25, 2015: 2.75, 2020: 3.00,
    2024: 3.75
  },
  bigmac: {
    1950: 0.00, 1955: 0.00, 1960: 0.00, 1965: 0.00, 1970: 0.65,
    1975: 0.95, 1980: 1.60, 1985: 1.60, 1990: 2.20, 1995: 2.32,
    2000: 2.51, 2005: 3.06, 2010: 3.73, 2015: 4.79, 2020: 5.66,
    2024: 6.50
  }
};

// Interpolate prices for years not in the data
export function getInterpolatedData(productId) {
  const data = priceData[productId];
  if (!data) return null;

  const years = Object.keys(data).map(Number).sort((a, b) => a - b);
  const result = [];

  for (let year = 1950; year <= 2024; year++) {
    if (data[year] !== undefined) {
      result.push({ year, price: data[year] });
    } else {
      // Find surrounding years for interpolation
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

// Format price for display
export function formatPrice(price) {
  if (price >= 1000) {
    return '$' + price.toLocaleString('en-US', { maximumFractionDigits: 0 });
  } else if (price >= 1) {
    return '$' + price.toFixed(2);
  } else {
    return '$' + price.toFixed(2);
  }
}
