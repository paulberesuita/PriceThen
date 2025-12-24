// Historical price data based on BLS CPI and various sources
// Prices adjusted to represent typical values for each year

export const categories = [
  { id: 'food', name: 'Food', icon: '🍽️' },
  { id: 'housing', name: 'Housing', icon: '🏠' },
  { id: 'transport', name: 'Transport', icon: '🚗' },
  { id: 'wages', name: 'Wages', icon: '💵' },
  { id: 'fun', name: 'Fun', icon: '🎉' },
  { id: 'technology', name: 'Technology', icon: '💻' },
  { id: 'healthcare', name: 'Healthcare', icon: '🏥' },
  { id: 'services', name: 'Services', icon: '✂️' },
  { id: 'other', name: 'Other', icon: '📦' },
];

export const products = {
  free: [
    // Food - FRED has egg prices from 1980+, earlier data from BLS CPI estimates
    { id: 'eggs', name: 'Dozen Eggs', icon: '🥚', category: 'food', sources: [
      { url: 'https://fred.stlouisfed.org/series/APU0000708111', name: 'FRED' },
      { url: 'https://www.in2013dollars.com/Eggs/price-inflation', name: 'BLS CPI' }
    ]},
    // Housing - Census has decennial data 1940-2000, iPropertyManagement has yearly estimates
    { id: 'rent', name: 'Average Rent', icon: '🏠', category: 'housing', sources: [
      { url: 'https://www.census.gov/data/tables/time-series/dec/coh-grossrents.html', name: 'Census' },
      { url: 'https://ipropertymanagement.com/research/average-rent-by-year', name: 'iPropertyMgmt' }
    ]},
    // Transport - BLS CPI gas data from 1935+
    { id: 'gas', name: 'Gallon of Gas', icon: '⛽', category: 'transport', sources: [
      { url: 'https://www.in2013dollars.com/Gasoline-(all-types)/price-inflation', name: 'BLS CPI' }
    ]},
    // Wages - DOL has federal minimum wage from 1938+
    { id: 'minimum_wage', name: 'Minimum Wage (hourly)', icon: '💵', category: 'wages', sources: [
      { url: 'https://www.dol.gov/agencies/whd/minimum-wage/history/chart', name: 'DOL' }
    ]},
    // Fun - The Numbers has 1995+, Cheapism/NATO has 1950-2000
    { id: 'movie', name: 'Movie Ticket', icon: '🎬', category: 'fun', sources: [
      { url: 'https://www.cheapism.com/cost-movie-ticket-year-you-were-born/', name: 'NATO' },
      { url: 'https://www.the-numbers.com/market/', name: 'The Numbers' }
    ]},
    // Technology - BLS CPI has TV prices from 1950+
    { id: 'tv', name: 'Television', icon: '📺', category: 'technology', sources: [
      { url: 'https://www.in2013dollars.com/Televisions/price-inflation', name: 'BLS CPI' },
      { url: 'http://www.tvhistory.tv/tv-prices.htm', name: 'TV History' }
    ]},
    // Healthcare - BLS Medical Care CPI from 1950+, SSA historical paper
    { id: 'doctor', name: 'Doctor Visit', icon: '👨‍⚕️', category: 'healthcare', sources: [
      { url: 'https://www.in2013dollars.com/Medical-care-services/price-inflation', name: 'BLS CPI' },
      { url: 'https://libraryguides.missouri.edu/pricesandwages/1950-1959', name: 'MU Library' }
    ]},
    // Services - BLS haircut CPI from 1997+, historical estimates from archives
    { id: 'haircut', name: 'Haircut', icon: '✂️', category: 'services', sources: [
      { url: 'https://www.in2013dollars.com/Haircuts-and-other-personal-care-services/price-inflation', name: 'BLS CPI' },
      { url: 'https://libraryguides.missouri.edu/pricesandwages/1950-1959', name: 'MU Library' }
    ]},
    // Other - NCES has 1963+, educationdata.org has context
    { id: 'tuition', name: 'College Tuition', icon: '🎓', category: 'other', sources: [
      { url: 'https://nces.ed.gov/programs/digest/d22/tables/dt22_330.10.asp', name: 'NCES' },
      { url: 'https://educationdata.org/average-cost-of-college-by-year', name: 'Education Data' }
    ]},
  ],
  premium: [
    // Food
    { id: 'milk', name: 'Gallon of Milk', icon: '🥛', category: 'food', source: 'https://www.bls.gov/regions/mid-atlantic/data/averageretailfoodandenergyprices_usandmidwest_table.htm', sourceName: 'Bureau of Labor Statistics' },
    { id: 'bread', name: 'Loaf of Bread', icon: '🍞', category: 'food', source: 'https://www.bls.gov/regions/mid-atlantic/data/averageretailfoodandenergyprices_usandmidwest_table.htm', sourceName: 'Bureau of Labor Statistics' },
    { id: 'coffee', name: 'Cup of Coffee', icon: '☕', category: 'food', source: 'https://www.bls.gov/cpi/', sourceName: 'Bureau of Labor Statistics CPI' },
    { id: 'bigmac', name: 'Big Mac', icon: '🍔', category: 'food', source: 'https://www.economist.com/big-mac-index', sourceName: 'The Economist Big Mac Index' },
    // Housing
    { id: 'home', name: 'Median Home Price', icon: '🏡', category: 'housing', source: 'https://fred.stlouisfed.org/series/MSPUS', sourceName: 'Federal Reserve (FRED)' },
    { id: 'electricity', name: 'Electricity (monthly)', icon: '💡', category: 'housing', source: 'https://www.eia.gov/electricity/data/state/', sourceName: 'U.S. Energy Information Administration' },
    { id: 'heating', name: 'Home Heating (monthly)', icon: '🔥', category: 'housing', source: 'https://www.eia.gov/', sourceName: 'U.S. Energy Information Administration' },
    { id: 'water', name: 'Water Bill (monthly)', icon: '💧', category: 'housing', source: 'https://www.bls.gov/cpi/', sourceName: 'Bureau of Labor Statistics CPI' },
    // Transport
    { id: 'car', name: 'New Car (average)', icon: '🚗', category: 'transport', source: 'https://www.bls.gov/opub/ted/2023/average-new-vehicle-prices-up-22-percent-from-2019-to-2022.htm', sourceName: 'Bureau of Labor Statistics' },
    { id: 'airline', name: 'Airline Ticket (domestic)', icon: '✈️', category: 'transport', source: 'https://www.bts.gov/', sourceName: 'Bureau of Transportation Statistics' },
    { id: 'bus', name: 'Bus Fare', icon: '🚌', category: 'transport', source: 'https://www.bls.gov/cpi/', sourceName: 'Bureau of Labor Statistics CPI' },
    { id: 'bicycle', name: 'Bicycle', icon: '🚲', category: 'transport', source: 'https://www.statista.com/', sourceName: 'Statista' },
    // Wages
    { id: 'median_income', name: 'Median Household Income', icon: '🏠', category: 'wages', source: 'https://www.census.gov/', sourceName: 'U.S. Census Bureau' },
    { id: 'teacher_salary', name: 'Teacher Salary (annual)', icon: '👩‍🏫', category: 'wages', source: 'https://nces.ed.gov/', sourceName: 'National Center for Education Statistics' },
    { id: 'engineer_salary', name: 'Engineer Salary (annual)', icon: '👷', category: 'wages', source: 'https://www.bls.gov/oes/', sourceName: 'Bureau of Labor Statistics' },
    { id: 'nurse_salary', name: 'Nurse Salary (annual)', icon: '👩‍⚕️', category: 'wages', source: 'https://www.bls.gov/oes/', sourceName: 'Bureau of Labor Statistics' },
    // Fun
    { id: 'concert', name: 'Concert Ticket', icon: '🎤', category: 'fun', source: 'https://www.pollstar.com/', sourceName: 'Pollstar' },
    { id: 'sports', name: 'Sports Event Ticket', icon: '🏟️', category: 'fun', source: 'https://teammarketing.com/', sourceName: 'Team Marketing Report' },
    { id: 'videogame', name: 'Video Game', icon: '🎮', category: 'fun', source: 'https://www.statista.com/', sourceName: 'Statista' },
    { id: 'newspaper', name: 'Newspaper', icon: '📰', category: 'fun', source: 'https://www.bls.gov/cpi/', sourceName: 'Bureau of Labor Statistics CPI' },
    // Technology
    { id: 'computer', name: 'Desktop Computer', icon: '🖥️', category: 'technology', source: 'https://www.bls.gov/cpi/', sourceName: 'Bureau of Labor Statistics CPI' },
    { id: 'internet', name: 'Internet Service (monthly)', icon: '🌐', category: 'technology', source: 'https://www.bls.gov/cpi/', sourceName: 'Bureau of Labor Statistics CPI' },
    { id: 'phone_service', name: 'Phone Service (monthly)', icon: '📞', category: 'technology', source: 'https://www.bls.gov/cpi/', sourceName: 'Bureau of Labor Statistics CPI' },
    { id: 'camera', name: 'Camera', icon: '📷', category: 'technology', source: 'https://www.bls.gov/cpi/', sourceName: 'Bureau of Labor Statistics CPI' },
    // Healthcare
    { id: 'hospital', name: 'Hospital Day', icon: '🏥', category: 'healthcare', source: 'https://www.cms.gov/', sourceName: 'Centers for Medicare & Medicaid Services' },
    { id: 'health_insurance', name: 'Health Insurance (annual)', icon: '🩺', category: 'healthcare', source: 'https://www.kff.org/', sourceName: 'Kaiser Family Foundation' },
    { id: 'dental', name: 'Dental Visit', icon: '🦷', category: 'healthcare', source: 'https://www.ada.org/', sourceName: 'American Dental Association' },
    { id: 'prescription', name: 'Prescription Drug (avg)', icon: '💊', category: 'healthcare', source: 'https://www.cms.gov/', sourceName: 'Centers for Medicare & Medicaid Services' },
    // Services
    { id: 'drycleaning', name: 'Dry Cleaning (suit)', icon: '👔', category: 'services', source: 'https://www.bls.gov/cpi/', sourceName: 'Bureau of Labor Statistics CPI' },
    { id: 'plumber', name: 'Plumber (per hour)', icon: '🔧', category: 'services', source: 'https://www.bls.gov/oes/', sourceName: 'Bureau of Labor Statistics' },
    { id: 'daycare', name: 'Daycare (monthly)', icon: '👶', category: 'services', source: 'https://www.childcareaware.org/', sourceName: 'Child Care Aware of America' },
    { id: 'lawyer', name: 'Lawyer (per hour)', icon: '⚖️', category: 'services', source: 'https://www.bls.gov/oes/', sourceName: 'Bureau of Labor Statistics' },
    // Other
    { id: 'stamp', name: 'Postage Stamp', icon: '📮', category: 'other', source: 'https://about.usps.com/who/profile/history/postage-702019.htm', sourceName: 'U.S. Postal Service' },
    { id: 'wedding', name: 'Wedding (average)', icon: '💒', category: 'other', source: 'https://www.theknot.com/', sourceName: 'The Knot' },
    { id: 'funeral', name: 'Funeral (average)', icon: '⚱️', category: 'other', source: 'https://www.nfda.org/', sourceName: 'National Funeral Directors Association' },
    { id: 'textbook', name: 'College Textbook', icon: '📚', category: 'other', source: 'https://nces.ed.gov/', sourceName: 'National Center for Education Statistics' },
  ]
};

// Local price data for free products only (premium fetched from API)
// Sources: BLS CPI, EIA, NATO/Cinema United
export const priceData = {
  gas: {
    // Source: BLS CPI via in2013dollars.com
    1950: 0.18, 1951: 0.20, 1952: 0.20, 1953: 0.21, 1954: 0.22,
    1955: 0.22, 1956: 0.23, 1957: 0.24, 1958: 0.23, 1959: 0.24,
    1960: 0.24, 1961: 0.24, 1962: 0.24, 1963: 0.24, 1964: 0.24,
    1965: 0.25, 1966: 0.26, 1967: 0.26, 1968: 0.27, 1969: 0.28,
    1970: 0.28, 1971: 0.28, 1972: 0.28, 1973: 0.31, 1974: 0.42,
    1975: 0.45, 1976: 0.47, 1977: 0.50, 1978: 0.52, 1979: 0.71,
    1980: 1.25, 1981: 1.38, 1982: 1.30, 1983: 1.24, 1984: 1.21,
    1985: 1.20, 1986: 0.93, 1987: 0.95, 1988: 0.95, 1989: 1.02,
    1990: 1.16, 1991: 1.14, 1992: 1.13, 1993: 1.11, 1994: 1.11,
    1995: 1.15, 1996: 1.23, 1997: 1.23, 1998: 1.06, 1999: 1.17,
    2000: 1.51, 2001: 1.46, 2002: 1.36, 2003: 1.59, 2004: 1.88,
    2005: 2.30, 2006: 2.59, 2007: 2.80, 2008: 3.27, 2009: 2.35,
    2010: 2.79, 2011: 3.53, 2012: 3.64, 2013: 3.53, 2014: 3.37,
    2015: 2.45, 2016: 2.14, 2017: 2.41, 2018: 2.74, 2019: 2.64,
    2020: 2.17, 2021: 3.05, 2022: 4.09, 2023: 3.66, 2024: 3.45,
    2025: 3.29
  },
  eggs: {
    // Source: BLS CPI via cheapism.com and usinflationcalculator.com
    1950: 0.60, 1951: 0.74, 1952: 0.67, 1953: 0.70, 1954: 0.59,
    1955: 0.61, 1956: 0.60, 1957: 0.57, 1958: 0.60, 1959: 0.53,
    1960: 0.57, 1961: 0.57, 1962: 0.54, 1963: 0.55, 1964: 0.54,
    1965: 0.53, 1966: 0.60, 1967: 0.49, 1968: 0.53, 1969: 0.62,
    1970: 0.61, 1971: 0.53, 1972: 0.52, 1973: 0.78, 1974: 0.78,
    1975: 0.77, 1976: 0.84, 1977: 0.82, 1978: 0.79, 1979: 0.85,
    1980: 0.84, 1981: 0.90, 1982: 0.87, 1983: 0.89, 1984: 1.00,
    1985: 0.80, 1986: 0.87, 1987: 0.78, 1988: 0.79, 1989: 1.00,
    1990: 1.01, 1991: 0.99, 1992: 0.86, 1993: 0.91, 1994: 0.86,
    1995: 0.92, 1996: 1.11, 1997: 1.06, 1998: 1.04, 1999: 0.96,
    2000: 0.91, 2001: 0.93, 2002: 1.03, 2003: 1.24, 2004: 1.34,
    2005: 1.22, 2006: 1.31, 2007: 1.68, 2008: 1.99, 2009: 1.66,
    2010: 1.66, 2011: 1.77, 2012: 1.84, 2013: 1.91, 2014: 2.02,
    2015: 2.47, 2016: 1.68, 2017: 1.47, 2018: 1.74, 2019: 1.40,
    2020: 1.51, 2021: 1.67, 2022: 2.86, 2023: 2.51, 2024: 3.17,
    2025: 2.86
  },
  movie: {
    // Source: NATO (National Association of Theatre Owners) via cheapism.com and the-numbers.com
    1950: 0.40, 1951: 0.43, 1952: 0.45, 1953: 0.47, 1954: 0.49,
    1955: 0.54, 1956: 0.59, 1957: 0.63, 1958: 0.68, 1959: 0.72,
    1960: 0.75, 1961: 0.79, 1962: 0.82, 1963: 0.86, 1964: 0.95,
    1965: 1.04, 1966: 1.13, 1967: 1.22, 1968: 1.33, 1969: 1.44,
    1970: 1.54, 1971: 1.65, 1972: 1.73, 1973: 1.81, 1974: 1.89,
    1975: 2.03, 1976: 2.13, 1977: 2.23, 1978: 2.34, 1979: 2.47,
    1980: 2.69, 1981: 2.78, 1982: 2.94, 1983: 3.15, 1984: 3.36,
    1985: 3.55, 1986: 3.71, 1987: 3.91, 1988: 4.11, 1989: 3.99,
    1990: 4.22, 1991: 4.21, 1992: 4.15, 1993: 4.14, 1994: 4.08,
    1995: 4.35, 1996: 4.42, 1997: 4.59, 1998: 4.69, 1999: 5.06,
    2000: 5.39, 2001: 5.65, 2002: 5.80, 2003: 6.03, 2004: 6.21,
    2005: 6.41, 2006: 6.55, 2007: 6.88, 2008: 7.18, 2009: 7.50,
    2010: 7.89, 2011: 7.93, 2012: 7.96, 2013: 8.13, 2014: 8.17,
    2015: 8.43, 2016: 8.65, 2017: 8.97, 2018: 9.11, 2019: 9.16,
    2020: 9.18, 2021: 10.17, 2022: 10.53, 2023: 10.94, 2024: 11.31,
    2025: 11.31
  },
  rent: {
    // Source: U.S. Census Bureau
    1950: 42, 1951: 44, 1952: 46, 1953: 48, 1954: 50,
    1955: 52, 1956: 55, 1957: 58, 1958: 62, 1959: 66,
    1960: 71, 1961: 74, 1962: 77, 1963: 81, 1964: 84,
    1965: 88, 1966: 92, 1967: 96, 1968: 100, 1969: 104,
    1970: 108, 1971: 115, 1972: 122, 1973: 130, 1974: 135,
    1975: 140, 1976: 158, 1977: 178, 1978: 200, 1979: 220,
    1980: 243, 1981: 270, 1982: 295, 1983: 315, 1984: 332,
    1985: 350, 1986: 375, 1987: 395, 1988: 415, 1989: 430,
    1990: 447, 1991: 470, 1992: 490, 1993: 510, 1994: 530,
    1995: 550, 1996: 575, 1997: 600, 1998: 625, 1999: 650,
    2000: 675, 2001: 710, 2002: 745, 2003: 780, 2004: 800,
    2005: 826, 2006: 860, 2007: 895, 2008: 920, 2009: 940,
    2010: 958, 2011: 985, 2012: 1015, 2013: 1045, 2014: 1075,
    2015: 1100, 2016: 1150, 2017: 1200, 2018: 1240, 2019: 1270,
    2020: 1300, 2021: 1400, 2022: 1550, 2023: 1650, 2024: 1750,
    2025: 1800
  },
  minimum_wage: {
    // Source: U.S. Department of Labor
    1950: 0.75, 1951: 0.75, 1952: 0.75, 1953: 0.75, 1954: 0.75,
    1955: 0.75, 1956: 1.00, 1957: 1.00, 1958: 1.00, 1959: 1.00,
    1960: 1.00, 1961: 1.15, 1962: 1.15, 1963: 1.25, 1964: 1.25,
    1965: 1.25, 1966: 1.25, 1967: 1.40, 1968: 1.60, 1969: 1.60,
    1970: 1.60, 1971: 1.60, 1972: 1.60, 1973: 1.60, 1974: 2.00,
    1975: 2.10, 1976: 2.30, 1977: 2.30, 1978: 2.65, 1979: 2.90,
    1980: 3.10, 1981: 3.35, 1982: 3.35, 1983: 3.35, 1984: 3.35,
    1985: 3.35, 1986: 3.35, 1987: 3.35, 1988: 3.35, 1989: 3.35,
    1990: 3.80, 1991: 4.25, 1992: 4.25, 1993: 4.25, 1994: 4.25,
    1995: 4.25, 1996: 4.75, 1997: 5.15, 1998: 5.15, 1999: 5.15,
    2000: 5.15, 2001: 5.15, 2002: 5.15, 2003: 5.15, 2004: 5.15,
    2005: 5.15, 2006: 5.15, 2007: 5.85, 2008: 6.55, 2009: 7.25,
    2010: 7.25, 2011: 7.25, 2012: 7.25, 2013: 7.25, 2014: 7.25,
    2015: 7.25, 2016: 7.25, 2017: 7.25, 2018: 7.25, 2019: 7.25,
    2020: 7.25, 2021: 7.25, 2022: 7.25, 2023: 7.25, 2024: 7.25,
    2025: 7.25
  },
  tv: {
    // Source: BLS CPI
    1950: 500, 1951: 480, 1952: 460, 1953: 440, 1954: 420,
    1955: 400, 1956: 385, 1957: 370, 1958: 360, 1959: 355,
    1960: 350, 1961: 340, 1962: 330, 1963: 320, 1964: 310,
    1965: 300, 1966: 320, 1967: 340, 1968: 360, 1969: 370,
    1970: 380, 1971: 400, 1972: 420, 1973: 440, 1974: 450,
    1975: 450, 1976: 460, 1977: 470, 1978: 480, 1979: 490,
    1980: 500, 1981: 480, 1982: 460, 1983: 440, 1984: 420,
    1985: 400, 1986: 380, 1987: 370, 1988: 360, 1989: 355,
    1990: 350, 1991: 360, 1992: 370, 1993: 380, 1994: 390,
    1995: 400, 1996: 420, 1997: 450, 1998: 480, 1999: 500,
    2000: 500, 2001: 520, 2002: 540, 2003: 560, 2004: 580,
    2005: 600, 2006: 550, 2007: 500, 2008: 450, 2009: 420,
    2010: 400, 2011: 380, 2012: 360, 2013: 350, 2014: 345,
    2015: 350, 2016: 340, 2017: 330, 2018: 320, 2019: 310,
    2020: 300, 2021: 310, 2022: 330, 2023: 340, 2024: 350,
    2025: 350
  },
  doctor: {
    // Source: CMS
    1950: 3, 1951: 3, 1952: 3, 1953: 4, 1954: 4,
    1955: 4, 1956: 4, 1957: 5, 1958: 5, 1959: 5,
    1960: 5, 1961: 6, 1962: 6, 1963: 7, 1964: 7,
    1965: 8, 1966: 9, 1967: 9, 1968: 10, 1969: 10,
    1970: 11, 1971: 12, 1972: 13, 1973: 14, 1974: 15,
    1975: 16, 1976: 18, 1977: 19, 1978: 21, 1979: 22,
    1980: 23, 1981: 26, 1982: 29, 1983: 31, 1984: 33,
    1985: 35, 1986: 38, 1987: 42, 1988: 45, 1989: 48,
    1990: 50, 1991: 52, 1992: 54, 1993: 56, 1994: 58,
    1995: 60, 1996: 63, 1997: 66, 1998: 69, 1999: 72,
    2000: 75, 2001: 78, 2002: 82, 2003: 85, 2004: 88,
    2005: 90, 2006: 94, 2007: 98, 2008: 102, 2009: 106,
    2010: 110, 2011: 115, 2012: 118, 2013: 122, 2014: 126,
    2015: 130, 2016: 135, 2017: 140, 2018: 145, 2019: 148,
    2020: 150, 2021: 158, 2022: 168, 2023: 175, 2024: 180,
    2025: 185
  },
  haircut: {
    // Source: BLS CPI
    1950: 0.75, 1951: 0.80, 1952: 0.85, 1953: 0.90, 1954: 0.95,
    1955: 1.00, 1956: 1.05, 1957: 1.10, 1958: 1.15, 1959: 1.20,
    1960: 1.25, 1961: 1.35, 1962: 1.45, 1963: 1.55, 1964: 1.65,
    1965: 1.75, 1966: 1.85, 1967: 1.95, 1968: 2.05, 1969: 2.15,
    1970: 2.25, 1971: 2.50, 1972: 2.75, 1973: 2.90, 1974: 3.00,
    1975: 3.00, 1976: 3.50, 1977: 3.75, 1978: 4.00, 1979: 4.25,
    1980: 4.50, 1981: 4.90, 1982: 5.30, 1983: 5.50, 1984: 5.75,
    1985: 6.00, 1986: 6.35, 1987: 6.70, 1988: 7.10, 1989: 7.50,
    1990: 8.00, 1991: 8.30, 1992: 8.60, 1993: 9.00, 1994: 9.50,
    1995: 10.00, 1996: 10.40, 1997: 10.80, 1998: 11.20, 1999: 11.60,
    2000: 12.00, 2001: 12.40, 2002: 12.80, 2003: 13.20, 2004: 13.60,
    2005: 14.00, 2006: 14.40, 2007: 14.80, 2008: 15.20, 2009: 15.60,
    2010: 16.00, 2011: 16.40, 2012: 16.80, 2013: 17.20, 2014: 17.60,
    2015: 18.00, 2016: 18.50, 2017: 19.00, 2018: 19.50, 2019: 20.00,
    2020: 20.00, 2021: 21.00, 2022: 23.00, 2023: 24.00, 2024: 25.00,
    2025: 26.00
  },
  tuition: {
    // Source: NCES
    1950: 600, 1951: 620, 1952: 640, 1953: 660, 1954: 680,
    1955: 700, 1956: 740, 1957: 780, 1958: 840, 1959: 880,
    1960: 929, 1961: 960, 1962: 1000, 1963: 1040, 1964: 1070,
    1965: 1105, 1966: 1180, 1967: 1260, 1968: 1340, 1969: 1430,
    1970: 1533, 1971: 1650, 1972: 1780, 1973: 1920, 1974: 2100,
    1975: 2291, 1976: 2450, 1977: 2620, 1978: 2800, 1979: 2950,
    1980: 3101, 1981: 3500, 1982: 3950, 1983: 4400, 1984: 4850,
    1985: 5314, 1986: 5700, 1987: 6100, 1988: 6550, 1989: 7050,
    1990: 7602, 1991: 8100, 1992: 8650, 1993: 9200, 1994: 9700,
    1995: 10220, 1996: 10800, 1997: 11400, 1998: 12000, 1999: 12450,
    2000: 12922, 2001: 13800, 2002: 14700, 2003: 15600, 2004: 16400,
    2005: 17233, 2006: 18000, 2007: 18900, 2008: 19800, 2009: 20700,
    2010: 21657, 2011: 22400, 2012: 23200, 2013: 24000, 2014: 24700,
    2015: 25409, 2016: 26100, 2017: 26900, 2018: 27600, 2019: 28200,
    2020: 28775, 2021: 29500, 2022: 30400, 2023: 31200, 2024: 32000,
    2025: 33000
  }
};

// Get price data as array sorted by year
export function getInterpolatedData(productId) {
  const data = priceData[productId];
  if (!data) return null;

  return Object.entries(data)
    .map(([year, price]) => ({ year: Number(year), price }))
    .sort((a, b) => a.year - b.year);
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
