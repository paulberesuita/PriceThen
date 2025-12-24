-- Seed data for PriceThen

-- Categories (excluding 'all' which is virtual)
INSERT OR REPLACE INTO categories (id, name, icon, sort_order) VALUES
  ('food', 'Food', '🍽️', 1),
  ('housing', 'Housing', '🏠', 2),
  ('transport', 'Transport', '🚗', 3),
  ('wages', 'Wages', '💵', 4),
  ('fun', 'Fun', '🎉', 5),
  ('technology', 'Technology', '💻', 6),
  ('healthcare', 'Healthcare', '🏥', 7),
  ('services', 'Services', '✂️', 8),
  ('other', 'Other', '📦', 9);

-- Products (free products: is_premium = 0, premium products: is_premium = 1)
-- One free product per category (9 total)
INSERT OR REPLACE INTO products (id, name, icon, category_id, is_premium, source_url, source_name, sort_order) VALUES
  -- Free products (one per category)
  ('eggs', 'Dozen Eggs', '🥚', 'food', 0, 'https://fred.stlouisfed.org/series/APU0000708111', 'FRED', 1),
  ('rent', 'Average Rent', '🏠', 'housing', 0, 'https://www.census.gov/data/tables/time-series/dec/coh-grossrents.html', 'Census', 2),
  ('gas', 'Gallon of Gas', '⛽', 'transport', 0, 'https://www.in2013dollars.com/Gasoline-(all-types)/price-inflation', 'BLS CPI', 3),
  ('minimum_wage', 'Minimum Wage (hourly)', '💵', 'wages', 0, 'https://www.dol.gov/agencies/whd/minimum-wage/history/chart', 'DOL', 4),
  ('movie', 'Movie Ticket', '🎬', 'fun', 0, 'https://www.cheapism.com/cost-movie-ticket-year-you-were-born/', 'NATO', 5),
  ('tv', 'Television', '📺', 'technology', 0, 'https://www.in2013dollars.com/Televisions/price-inflation', 'BLS CPI', 6),
  ('doctor', 'Doctor Visit', '👨‍⚕️', 'healthcare', 0, 'https://www.in2013dollars.com/Medical-care-services/price-inflation', 'BLS CPI', 7),
  ('haircut', 'Haircut', '✂️', 'services', 0, 'https://www.in2013dollars.com/Haircuts-and-other-personal-care-services/price-inflation', 'BLS CPI', 8),
  ('tuition', 'College Tuition', '🎓', 'other', 0, 'https://nces.ed.gov/programs/digest/d22/tables/dt22_330.10.asp', 'NCES', 9),
  -- Premium products
  ('milk', 'Gallon of Milk', '🥛', 'food', 1, 'https://www.bls.gov/regions/mid-atlantic/data/averageretailfoodandenergyprices_usandmidwest_table.htm', 'Bureau of Labor Statistics', 10),
  ('bread', 'Loaf of Bread', '🍞', 'food', 1, 'https://www.bls.gov/regions/mid-atlantic/data/averageretailfoodandenergyprices_usandmidwest_table.htm', 'Bureau of Labor Statistics', 11),
  ('coffee', 'Cup of Coffee', '☕', 'food', 1, 'https://www.bls.gov/cpi/', 'Bureau of Labor Statistics CPI', 12),
  ('bigmac', 'Big Mac', '🍔', 'food', 1, 'https://www.economist.com/big-mac-index', 'The Economist Big Mac Index', 13),
  ('home', 'Median Home Price', '🏡', 'housing', 1, 'https://fred.stlouisfed.org/series/MSPUS', 'Federal Reserve (FRED)', 14),
  ('electricity', 'Electricity (monthly)', '💡', 'housing', 1, 'https://www.eia.gov/electricity/data/state/', 'U.S. Energy Information Administration', 15),
  ('heating', 'Home Heating (monthly)', '🔥', 'housing', 1, 'https://www.eia.gov/', 'U.S. Energy Information Administration', 16),
  ('water', 'Water Bill (monthly)', '💧', 'housing', 1, 'https://www.bls.gov/cpi/', 'Bureau of Labor Statistics CPI', 17),
  ('car', 'New Car (average)', '🚗', 'transport', 1, 'https://www.bls.gov/opub/ted/2023/average-new-vehicle-prices-up-22-percent-from-2019-to-2022.htm', 'Bureau of Labor Statistics', 18),
  ('airline', 'Airline Ticket (domestic)', '✈️', 'transport', 1, 'https://www.bts.gov/', 'Bureau of Transportation Statistics', 19),
  ('bus', 'Bus Fare', '🚌', 'transport', 1, 'https://www.bls.gov/cpi/', 'Bureau of Labor Statistics CPI', 20),
  ('bicycle', 'Bicycle', '🚲', 'transport', 1, 'https://www.statista.com/', 'Statista', 21),
  ('median_income', 'Median Household Income', '🏠', 'wages', 1, 'https://www.census.gov/', 'U.S. Census Bureau', 22),
  ('teacher_salary', 'Teacher Salary (annual)', '👩‍🏫', 'wages', 1, 'https://nces.ed.gov/', 'National Center for Education Statistics', 23),
  ('engineer_salary', 'Engineer Salary (annual)', '👷', 'wages', 1, 'https://www.bls.gov/oes/', 'Bureau of Labor Statistics', 24),
  ('nurse_salary', 'Nurse Salary (annual)', '👩‍⚕️', 'wages', 1, 'https://www.bls.gov/oes/', 'Bureau of Labor Statistics', 25),
  ('concert', 'Concert Ticket', '🎤', 'fun', 1, 'https://www.pollstar.com/', 'Pollstar', 26),
  ('sports', 'Sports Event Ticket', '🏟️', 'fun', 1, 'https://teammarketing.com/', 'Team Marketing Report', 27),
  ('videogame', 'Video Game', '🎮', 'fun', 1, 'https://www.statista.com/', 'Statista', 28),
  ('newspaper', 'Newspaper', '📰', 'fun', 1, 'https://www.bls.gov/cpi/', 'Bureau of Labor Statistics CPI', 29),
  ('computer', 'Desktop Computer', '🖥️', 'technology', 1, 'https://www.bls.gov/cpi/', 'Bureau of Labor Statistics CPI', 30),
  ('internet', 'Internet Service (monthly)', '🌐', 'technology', 1, 'https://www.bls.gov/cpi/', 'Bureau of Labor Statistics CPI', 31),
  ('phone_service', 'Phone Service (monthly)', '📞', 'technology', 1, 'https://www.bls.gov/cpi/', 'Bureau of Labor Statistics CPI', 32),
  ('camera', 'Camera', '📷', 'technology', 1, 'https://www.bls.gov/cpi/', 'Bureau of Labor Statistics CPI', 33),
  ('hospital', 'Hospital Day', '🏥', 'healthcare', 1, 'https://www.cms.gov/', 'Centers for Medicare & Medicaid Services', 34),
  ('health_insurance', 'Health Insurance (annual)', '🩺', 'healthcare', 1, 'https://www.kff.org/', 'Kaiser Family Foundation', 35),
  ('dental', 'Dental Visit', '🦷', 'healthcare', 1, 'https://www.ada.org/', 'American Dental Association', 36),
  ('prescription', 'Prescription Drug (avg)', '💊', 'healthcare', 1, 'https://www.cms.gov/', 'Centers for Medicare & Medicaid Services', 37),
  ('drycleaning', 'Dry Cleaning (suit)', '👔', 'services', 1, 'https://www.bls.gov/cpi/', 'Bureau of Labor Statistics CPI', 38),
  ('plumber', 'Plumber (per hour)', '🔧', 'services', 1, 'https://www.bls.gov/oes/', 'Bureau of Labor Statistics', 39),
  ('daycare', 'Daycare (monthly)', '👶', 'services', 1, 'https://www.childcareaware.org/', 'Child Care Aware of America', 40),
  ('lawyer', 'Lawyer (per hour)', '⚖️', 'services', 1, 'https://www.bls.gov/oes/', 'Bureau of Labor Statistics', 41),
  ('stamp', 'Postage Stamp', '📮', 'other', 1, 'https://about.usps.com/who/profile/history/postage-702019.htm', 'U.S. Postal Service', 42),
  ('wedding', 'Wedding (average)', '💒', 'other', 1, 'https://www.theknot.com/', 'The Knot', 43),
  ('funeral', 'Funeral (average)', '⚱️', 'other', 1, 'https://www.nfda.org/', 'National Funeral Directors Association', 44),
  ('textbook', 'College Textbook', '📚', 'other', 1, 'https://nces.ed.gov/', 'National Center for Education Statistics', 45);

-- Product sources (multiple sources per product for transparency)
DELETE FROM product_sources;
INSERT INTO product_sources (product_id, source_url, source_name, sort_order) VALUES
  -- Eggs sources
  ('eggs', 'https://fred.stlouisfed.org/series/APU0000708111', 'FRED', 1),
  ('eggs', 'https://www.in2013dollars.com/Eggs/price-inflation', 'BLS CPI', 2),
  -- Rent sources
  ('rent', 'https://www.census.gov/data/tables/time-series/dec/coh-grossrents.html', 'Census', 1),
  ('rent', 'https://ipropertymanagement.com/research/average-rent-by-year', 'iPropertyMgmt', 2),
  -- Gas sources
  ('gas', 'https://www.in2013dollars.com/Gasoline-(all-types)/price-inflation', 'BLS CPI', 1),
  -- Minimum wage sources
  ('minimum_wage', 'https://www.dol.gov/agencies/whd/minimum-wage/history/chart', 'DOL', 1),
  -- Movie sources
  ('movie', 'https://www.cheapism.com/cost-movie-ticket-year-you-were-born/', 'NATO', 1),
  ('movie', 'https://www.the-numbers.com/market/', 'The Numbers', 2),
  -- TV sources
  ('tv', 'https://www.in2013dollars.com/Televisions/price-inflation', 'BLS CPI', 1),
  ('tv', 'http://www.tvhistory.tv/tv-prices.htm', 'TV History', 2),
  -- Doctor sources
  ('doctor', 'https://www.in2013dollars.com/Medical-care-services/price-inflation', 'BLS CPI', 1),
  ('doctor', 'https://libraryguides.missouri.edu/pricesandwages/1950-1959', 'MU Library', 2),
  -- Haircut sources
  ('haircut', 'https://www.in2013dollars.com/Haircuts-and-other-personal-care-services/price-inflation', 'BLS CPI', 1),
  ('haircut', 'https://libraryguides.missouri.edu/pricesandwages/1950-1959', 'MU Library', 2),
  -- Tuition sources
  ('tuition', 'https://nces.ed.gov/programs/digest/d22/tables/dt22_330.10.asp', 'NCES', 1),
  ('tuition', 'https://educationdata.org/average-cost-of-college-by-year', 'Education Data', 2);

-- Price data for free products (gas, eggs, movie)
INSERT OR REPLACE INTO prices (product_id, year, price) VALUES
  -- Gas prices
  ('gas', 1950, 0.27), ('gas', 1955, 0.29), ('gas', 1960, 0.31), ('gas', 1965, 0.31), ('gas', 1970, 0.36),
  ('gas', 1975, 0.57), ('gas', 1980, 1.19), ('gas', 1985, 1.12), ('gas', 1990, 1.15), ('gas', 1995, 1.15),
  ('gas', 2000, 1.51), ('gas', 2005, 2.30), ('gas', 2010, 2.79), ('gas', 2015, 2.45), ('gas', 2020, 2.17),
  ('gas', 2024, 3.50),
  -- Eggs prices
  ('eggs', 1950, 0.60), ('eggs', 1955, 0.61), ('eggs', 1960, 0.57), ('eggs', 1965, 0.53), ('eggs', 1970, 0.61),
  ('eggs', 1975, 0.77), ('eggs', 1980, 0.84), ('eggs', 1985, 0.80), ('eggs', 1990, 1.00), ('eggs', 1995, 1.16),
  ('eggs', 2000, 0.96), ('eggs', 2005, 1.35), ('eggs', 2010, 1.79), ('eggs', 2015, 2.75), ('eggs', 2020, 1.48),
  ('eggs', 2024, 4.50),
  -- Movie ticket prices
  ('movie', 1950, 0.46), ('movie', 1955, 0.50), ('movie', 1960, 0.69), ('movie', 1965, 1.01), ('movie', 1970, 1.55),
  ('movie', 1975, 2.05), ('movie', 1980, 2.69), ('movie', 1985, 3.55), ('movie', 1990, 4.23), ('movie', 1995, 4.35),
  ('movie', 2000, 5.39), ('movie', 2005, 6.41), ('movie', 2010, 7.89), ('movie', 2015, 8.43), ('movie', 2020, 9.16),
  ('movie', 2024, 11.75);

-- Price data for premium products
INSERT OR REPLACE INTO prices (product_id, year, price) VALUES
  -- Minimum wage
  ('minimum_wage', 1950, 0.75), ('minimum_wage', 1955, 0.75), ('minimum_wage', 1960, 1.00), ('minimum_wage', 1965, 1.25), ('minimum_wage', 1970, 1.60),
  ('minimum_wage', 1975, 2.10), ('minimum_wage', 1980, 3.10), ('minimum_wage', 1985, 3.35), ('minimum_wage', 1990, 3.80), ('minimum_wage', 1995, 4.25),
  ('minimum_wage', 2000, 5.15), ('minimum_wage', 2005, 5.15), ('minimum_wage', 2010, 7.25), ('minimum_wage', 2015, 7.25), ('minimum_wage', 2020, 7.25),
  ('minimum_wage', 2024, 7.25),
  -- Rent
  ('rent', 1950, 42), ('rent', 1955, 52), ('rent', 1960, 71), ('rent', 1965, 88), ('rent', 1970, 108),
  ('rent', 1975, 140), ('rent', 1980, 243), ('rent', 1985, 350), ('rent', 1990, 447), ('rent', 1995, 550),
  ('rent', 2000, 675), ('rent', 2005, 826), ('rent', 2010, 958), ('rent', 2015, 1100), ('rent', 2020, 1300),
  ('rent', 2024, 1750),
  -- Home prices
  ('home', 1950, 7354), ('home', 1955, 10950), ('home', 1960, 12700), ('home', 1965, 20000), ('home', 1970, 23400),
  ('home', 1975, 39300), ('home', 1980, 64600), ('home', 1985, 84300), ('home', 1990, 123000), ('home', 1995, 133900),
  ('home', 2000, 165300), ('home', 2005, 240900), ('home', 2010, 221800), ('home', 2015, 294200), ('home', 2020, 336900),
  ('home', 2024, 420000),
  -- Tuition
  ('tuition', 1950, 600), ('tuition', 1955, 700), ('tuition', 1960, 929), ('tuition', 1965, 1105), ('tuition', 1970, 1533),
  ('tuition', 1975, 2291), ('tuition', 1980, 3101), ('tuition', 1985, 5314), ('tuition', 1990, 7602), ('tuition', 1995, 10220),
  ('tuition', 2000, 12922), ('tuition', 2005, 17233), ('tuition', 2010, 21657), ('tuition', 2015, 25409), ('tuition', 2020, 28775),
  ('tuition', 2024, 32000),
  -- Car prices
  ('car', 1950, 1510), ('car', 1955, 1910), ('car', 1960, 2600), ('car', 1965, 2650), ('car', 1970, 3450),
  ('car', 1975, 4950), ('car', 1980, 7200), ('car', 1985, 11450), ('car', 1990, 15472), ('car', 1995, 20450),
  ('car', 2000, 24800), ('car', 2005, 28400), ('car', 2010, 29217), ('car', 2015, 33560), ('car', 2020, 37876),
  ('car', 2024, 48000),
  -- Milk
  ('milk', 1950, 0.83), ('milk', 1955, 0.93), ('milk', 1960, 1.04), ('milk', 1965, 1.05), ('milk', 1970, 1.15),
  ('milk', 1975, 1.57), ('milk', 1980, 2.16), ('milk', 1985, 2.26), ('milk', 1990, 2.78), ('milk', 1995, 2.96),
  ('milk', 2000, 2.78), ('milk', 2005, 3.24), ('milk', 2010, 3.32), ('milk', 2015, 3.42), ('milk', 2020, 3.54),
  ('milk', 2024, 4.25),
  -- Bread
  ('bread', 1950, 0.14), ('bread', 1955, 0.18), ('bread', 1960, 0.20), ('bread', 1965, 0.21), ('bread', 1970, 0.24),
  ('bread', 1975, 0.36), ('bread', 1980, 0.51), ('bread', 1985, 0.55), ('bread', 1990, 0.70), ('bread', 1995, 0.84),
  ('bread', 2000, 0.99), ('bread', 2005, 1.05), ('bread', 2010, 1.37), ('bread', 2015, 1.43), ('bread', 2020, 1.50),
  ('bread', 2024, 1.95),
  -- Stamp
  ('stamp', 1950, 0.03), ('stamp', 1955, 0.03), ('stamp', 1960, 0.04), ('stamp', 1965, 0.05), ('stamp', 1970, 0.06),
  ('stamp', 1975, 0.10), ('stamp', 1980, 0.15), ('stamp', 1985, 0.22), ('stamp', 1990, 0.25), ('stamp', 1995, 0.32),
  ('stamp', 2000, 0.33), ('stamp', 2005, 0.37), ('stamp', 2010, 0.44), ('stamp', 2015, 0.49), ('stamp', 2020, 0.55),
  ('stamp', 2024, 0.73),
  -- Coffee
  ('coffee', 1950, 0.10), ('coffee', 1955, 0.15), ('coffee', 1960, 0.20), ('coffee', 1965, 0.25), ('coffee', 1970, 0.25),
  ('coffee', 1975, 0.35), ('coffee', 1980, 0.45), ('coffee', 1985, 0.55), ('coffee', 1990, 0.75), ('coffee', 1995, 1.00),
  ('coffee', 2000, 1.25), ('coffee', 2005, 1.75), ('coffee', 2010, 2.25), ('coffee', 2015, 2.75), ('coffee', 2020, 3.00),
  ('coffee', 2024, 3.75),
  -- Big Mac (started in 1968, using 0 for earlier years)
  ('bigmac', 1950, 0), ('bigmac', 1955, 0), ('bigmac', 1960, 0), ('bigmac', 1965, 0), ('bigmac', 1970, 0.65),
  ('bigmac', 1975, 0.95), ('bigmac', 1980, 1.60), ('bigmac', 1985, 1.60), ('bigmac', 1990, 2.20), ('bigmac', 1995, 2.32),
  ('bigmac', 2000, 2.51), ('bigmac', 2005, 3.06), ('bigmac', 2010, 3.73), ('bigmac', 2015, 4.79), ('bigmac', 2020, 5.66),
  ('bigmac', 2024, 6.50),
  -- Television (prices have dropped dramatically due to technology improvements)
  ('tv', 1950, 500), ('tv', 1955, 400), ('tv', 1960, 350), ('tv', 1965, 300), ('tv', 1970, 380),
  ('tv', 1975, 450), ('tv', 1980, 500), ('tv', 1985, 400), ('tv', 1990, 350), ('tv', 1995, 400),
  ('tv', 2000, 500), ('tv', 2005, 600), ('tv', 2010, 400), ('tv', 2015, 350), ('tv', 2020, 300),
  ('tv', 2024, 350),
  -- Desktop Computer (didn't exist before 1980 for consumers)
  ('computer', 1950, 0), ('computer', 1955, 0), ('computer', 1960, 0), ('computer', 1965, 0), ('computer', 1970, 0),
  ('computer', 1975, 0), ('computer', 1980, 3000), ('computer', 1985, 2500), ('computer', 1990, 2000), ('computer', 1995, 1500),
  ('computer', 2000, 1000), ('computer', 2005, 800), ('computer', 2010, 600), ('computer', 2015, 500), ('computer', 2020, 700),
  ('computer', 2024, 800),
  -- Internet Service (didn't exist before 1995)
  ('internet', 1950, 0), ('internet', 1955, 0), ('internet', 1960, 0), ('internet', 1965, 0), ('internet', 1970, 0),
  ('internet', 1975, 0), ('internet', 1980, 0), ('internet', 1985, 0), ('internet', 1990, 0), ('internet', 1995, 20),
  ('internet', 2000, 40), ('internet', 2005, 45), ('internet', 2010, 50), ('internet', 2015, 55), ('internet', 2020, 60),
  ('internet', 2024, 70),
  -- Doctor Visit
  ('doctor', 1950, 3), ('doctor', 1955, 4), ('doctor', 1960, 5), ('doctor', 1965, 8), ('doctor', 1970, 11),
  ('doctor', 1975, 16), ('doctor', 1980, 23), ('doctor', 1985, 35), ('doctor', 1990, 50), ('doctor', 1995, 60),
  ('doctor', 2000, 75), ('doctor', 2005, 90), ('doctor', 2010, 110), ('doctor', 2015, 130), ('doctor', 2020, 150),
  ('doctor', 2024, 180),
  -- Hospital Day
  ('hospital', 1950, 16), ('hospital', 1955, 20), ('hospital', 1960, 32), ('hospital', 1965, 41), ('hospital', 1970, 81),
  ('hospital', 1975, 134), ('hospital', 1980, 245), ('hospital', 1985, 460), ('hospital', 1990, 687), ('hospital', 1995, 968),
  ('hospital', 2000, 1149), ('hospital', 2005, 1522), ('hospital', 2010, 1910), ('hospital', 2015, 2271), ('hospital', 2020, 2607),
  ('hospital', 2024, 3200),
  -- Health Insurance (annual premium, family coverage - didn't track until 1960s)
  ('health_insurance', 1950, 0), ('health_insurance', 1955, 0), ('health_insurance', 1960, 350), ('health_insurance', 1965, 450), ('health_insurance', 1970, 600),
  ('health_insurance', 1975, 900), ('health_insurance', 1980, 1500), ('health_insurance', 1985, 2500), ('health_insurance', 1990, 3500), ('health_insurance', 1995, 5000),
  ('health_insurance', 2000, 6438), ('health_insurance', 2005, 10880), ('health_insurance', 2010, 13770), ('health_insurance', 2015, 17545), ('health_insurance', 2020, 21342),
  ('health_insurance', 2024, 24000),
  -- Concert Ticket (average price)
  ('concert', 1950, 2), ('concert', 1955, 3), ('concert', 1960, 4), ('concert', 1965, 5), ('concert', 1970, 7),
  ('concert', 1975, 9), ('concert', 1980, 12), ('concert', 1985, 18), ('concert', 1990, 23), ('concert', 1995, 28),
  ('concert', 2000, 43), ('concert', 2005, 57), ('concert', 2010, 63), ('concert', 2015, 78), ('concert', 2020, 95),
  ('concert', 2024, 125),
  -- Sports Event Ticket (average MLB ticket)
  ('sports', 1950, 1.50), ('sports', 1955, 1.75), ('sports', 1960, 2.25), ('sports', 1965, 2.75), ('sports', 1970, 3.50),
  ('sports', 1975, 4.50), ('sports', 1980, 5.50), ('sports', 1985, 7.50), ('sports', 1990, 9.50), ('sports', 1995, 11.50),
  ('sports', 2000, 16.67), ('sports', 2005, 22.21), ('sports', 2010, 26.74), ('sports', 2015, 31.00), ('sports', 2020, 34.00),
  ('sports', 2024, 40.00),
  -- Video Game (didn't exist for consumers before 1980)
  ('videogame', 1950, 0), ('videogame', 1955, 0), ('videogame', 1960, 0), ('videogame', 1965, 0), ('videogame', 1970, 0),
  ('videogame', 1975, 0), ('videogame', 1980, 30), ('videogame', 1985, 40), ('videogame', 1990, 50), ('videogame', 1995, 50),
  ('videogame', 2000, 50), ('videogame', 2005, 50), ('videogame', 2010, 60), ('videogame', 2015, 60), ('videogame', 2020, 60),
  ('videogame', 2024, 70),
  -- Haircut (men's)
  ('haircut', 1950, 0.75), ('haircut', 1955, 1.00), ('haircut', 1960, 1.25), ('haircut', 1965, 1.75), ('haircut', 1970, 2.25),
  ('haircut', 1975, 3.00), ('haircut', 1980, 4.50), ('haircut', 1985, 6.00), ('haircut', 1990, 8.00), ('haircut', 1995, 10.00),
  ('haircut', 2000, 12.00), ('haircut', 2005, 14.00), ('haircut', 2010, 16.00), ('haircut', 2015, 18.00), ('haircut', 2020, 20.00),
  ('haircut', 2024, 25.00),
  -- Dry Cleaning (suit)
  ('drycleaning', 1950, 1.00), ('drycleaning', 1955, 1.25), ('drycleaning', 1960, 1.50), ('drycleaning', 1965, 2.00), ('drycleaning', 1970, 2.50),
  ('drycleaning', 1975, 3.50), ('drycleaning', 1980, 5.00), ('drycleaning', 1985, 6.50), ('drycleaning', 1990, 8.00), ('drycleaning', 1995, 9.00),
  ('drycleaning', 2000, 10.00), ('drycleaning', 2005, 11.00), ('drycleaning', 2010, 12.50), ('drycleaning', 2015, 14.00), ('drycleaning', 2020, 15.00),
  ('drycleaning', 2024, 18.00),
  -- Electricity (monthly residential bill)
  ('electricity', 1950, 3), ('electricity', 1955, 4), ('electricity', 1960, 5), ('electricity', 1965, 7), ('electricity', 1970, 9),
  ('electricity', 1975, 15), ('electricity', 1980, 30), ('electricity', 1985, 50), ('electricity', 1990, 60), ('electricity', 1995, 70),
  ('electricity', 2000, 80), ('electricity', 2005, 90), ('electricity', 2010, 105), ('electricity', 2015, 115), ('electricity', 2020, 120),
  ('electricity', 2024, 140),
  -- Home Heating (monthly)
  ('heating', 1950, 5), ('heating', 1955, 6), ('heating', 1960, 8), ('heating', 1965, 10), ('heating', 1970, 12),
  ('heating', 1975, 25), ('heating', 1980, 55), ('heating', 1985, 65), ('heating', 1990, 60), ('heating', 1995, 55),
  ('heating', 2000, 70), ('heating', 2005, 110), ('heating', 2010, 95), ('heating', 2015, 85), ('heating', 2020, 75),
  ('heating', 2024, 120),
  -- Water Bill (monthly)
  ('water', 1950, 2), ('water', 1955, 2.50), ('water', 1960, 3), ('water', 1965, 4), ('water', 1970, 5),
  ('water', 1975, 8), ('water', 1980, 12), ('water', 1985, 18), ('water', 1990, 22), ('water', 1995, 28),
  ('water', 2000, 32), ('water', 2005, 38), ('water', 2010, 45), ('water', 2015, 52), ('water', 2020, 60),
  ('water', 2024, 75),
  -- Airline Ticket (domestic average)
  ('airline', 1950, 40), ('airline', 1955, 50), ('airline', 1960, 65), ('airline', 1965, 75), ('airline', 1970, 90),
  ('airline', 1975, 120), ('airline', 1980, 200), ('airline', 1985, 250), ('airline', 1990, 290), ('airline', 1995, 280),
  ('airline', 2000, 320), ('airline', 2005, 310), ('airline', 2010, 340), ('airline', 2015, 360), ('airline', 2020, 260),
  ('airline', 2024, 380),
  -- Bus Fare
  ('bus', 1950, 0.10), ('bus', 1955, 0.15), ('bus', 1960, 0.15), ('bus', 1965, 0.20), ('bus', 1970, 0.25),
  ('bus', 1975, 0.35), ('bus', 1980, 0.50), ('bus', 1985, 0.75), ('bus', 1990, 1.00), ('bus', 1995, 1.25),
  ('bus', 2000, 1.50), ('bus', 2005, 1.75), ('bus', 2010, 2.00), ('bus', 2015, 2.25), ('bus', 2020, 2.50),
  ('bus', 2024, 2.75),
  -- Bicycle
  ('bicycle', 1950, 40), ('bicycle', 1955, 45), ('bicycle', 1960, 50), ('bicycle', 1965, 55), ('bicycle', 1970, 65),
  ('bicycle', 1975, 85), ('bicycle', 1980, 120), ('bicycle', 1985, 150), ('bicycle', 1990, 200), ('bicycle', 1995, 250),
  ('bicycle', 2000, 300), ('bicycle', 2005, 350), ('bicycle', 2010, 400), ('bicycle', 2015, 450), ('bicycle', 2020, 500),
  ('bicycle', 2024, 600),
  -- Median Household Income (annual)
  ('median_income', 1950, 3300), ('median_income', 1955, 4400), ('median_income', 1960, 5600), ('median_income', 1965, 6900), ('median_income', 1970, 9870),
  ('median_income', 1975, 13720), ('median_income', 1980, 21020), ('median_income', 1985, 27735), ('median_income', 1990, 35353), ('median_income', 1995, 40611),
  ('median_income', 2000, 50732), ('median_income', 2005, 55832), ('median_income', 2010, 60236), ('median_income', 2015, 70200), ('median_income', 2020, 74580),
  ('median_income', 2024, 80610),
  -- Teacher Salary (annual average)
  ('teacher_salary', 1950, 2800), ('teacher_salary', 1955, 3500), ('teacher_salary', 1960, 4800), ('teacher_salary', 1965, 5900), ('teacher_salary', 1970, 8600),
  ('teacher_salary', 1975, 11700), ('teacher_salary', 1980, 16000), ('teacher_salary', 1985, 23600), ('teacher_salary', 1990, 31400), ('teacher_salary', 1995, 36900),
  ('teacher_salary', 2000, 42100), ('teacher_salary', 2005, 47600), ('teacher_salary', 2010, 55200), ('teacher_salary', 2015, 57400), ('teacher_salary', 2020, 65000),
  ('teacher_salary', 2024, 69000),
  -- Engineer Salary (annual average)
  ('engineer_salary', 1950, 4500), ('engineer_salary', 1955, 5800), ('engineer_salary', 1960, 7500), ('engineer_salary', 1965, 9500), ('engineer_salary', 1970, 13000),
  ('engineer_salary', 1975, 17500), ('engineer_salary', 1980, 25000), ('engineer_salary', 1985, 35000), ('engineer_salary', 1990, 45000), ('engineer_salary', 1995, 55000),
  ('engineer_salary', 2000, 70000), ('engineer_salary', 2005, 78000), ('engineer_salary', 2010, 85000), ('engineer_salary', 2015, 95000), ('engineer_salary', 2020, 105000),
  ('engineer_salary', 2024, 120000),
  -- Nurse Salary (annual average)
  ('nurse_salary', 1950, 2400), ('nurse_salary', 1955, 3000), ('nurse_salary', 1960, 3800), ('nurse_salary', 1965, 4800), ('nurse_salary', 1970, 7300),
  ('nurse_salary', 1975, 10500), ('nurse_salary', 1980, 15000), ('nurse_salary', 1985, 22000), ('nurse_salary', 1990, 32000), ('nurse_salary', 1995, 38000),
  ('nurse_salary', 2000, 44000), ('nurse_salary', 2005, 52000), ('nurse_salary', 2010, 64000), ('nurse_salary', 2015, 68000), ('nurse_salary', 2020, 77000),
  ('nurse_salary', 2024, 86000),
  -- Newspaper (daily)
  ('newspaper', 1950, 0.05), ('newspaper', 1955, 0.05), ('newspaper', 1960, 0.07), ('newspaper', 1965, 0.10), ('newspaper', 1970, 0.10),
  ('newspaper', 1975, 0.15), ('newspaper', 1980, 0.20), ('newspaper', 1985, 0.25), ('newspaper', 1990, 0.35), ('newspaper', 1995, 0.50),
  ('newspaper', 2000, 0.50), ('newspaper', 2005, 0.75), ('newspaper', 2010, 1.00), ('newspaper', 2015, 1.50), ('newspaper', 2020, 2.00),
  ('newspaper', 2024, 3.00),
  -- Phone Service (monthly landline/cell)
  ('phone_service', 1950, 3), ('phone_service', 1955, 4), ('phone_service', 1960, 5), ('phone_service', 1965, 6), ('phone_service', 1970, 8),
  ('phone_service', 1975, 10), ('phone_service', 1980, 15), ('phone_service', 1985, 20), ('phone_service', 1990, 25), ('phone_service', 1995, 35),
  ('phone_service', 2000, 45), ('phone_service', 2005, 55), ('phone_service', 2010, 70), ('phone_service', 2015, 80), ('phone_service', 2020, 85),
  ('phone_service', 2024, 95),
  -- Camera (consumer)
  ('camera', 1950, 25), ('camera', 1955, 30), ('camera', 1960, 35), ('camera', 1965, 40), ('camera', 1970, 50),
  ('camera', 1975, 70), ('camera', 1980, 100), ('camera', 1985, 150), ('camera', 1990, 200), ('camera', 1995, 250),
  ('camera', 2000, 300), ('camera', 2005, 250), ('camera', 2010, 200), ('camera', 2015, 400), ('camera', 2020, 500),
  ('camera', 2024, 600),
  -- Dental Visit
  ('dental', 1950, 3), ('dental', 1955, 4), ('dental', 1960, 5), ('dental', 1965, 7), ('dental', 1970, 10),
  ('dental', 1975, 15), ('dental', 1980, 25), ('dental', 1985, 40), ('dental', 1990, 55), ('dental', 1995, 65),
  ('dental', 2000, 80), ('dental', 2005, 100), ('dental', 2010, 125), ('dental', 2015, 150), ('dental', 2020, 175),
  ('dental', 2024, 200),
  -- Prescription Drug (average)
  ('prescription', 1950, 1), ('prescription', 1955, 1.50), ('prescription', 1960, 2), ('prescription', 1965, 3), ('prescription', 1970, 4),
  ('prescription', 1975, 6), ('prescription', 1980, 10), ('prescription', 1985, 18), ('prescription', 1990, 28), ('prescription', 1995, 40),
  ('prescription', 2000, 55), ('prescription', 2005, 75), ('prescription', 2010, 95), ('prescription', 2015, 115), ('prescription', 2020, 135),
  ('prescription', 2024, 160),
  -- Plumber (per hour)
  ('plumber', 1950, 2), ('plumber', 1955, 2.50), ('plumber', 1960, 3), ('plumber', 1965, 4), ('plumber', 1970, 6),
  ('plumber', 1975, 10), ('plumber', 1980, 18), ('plumber', 1985, 25), ('plumber', 1990, 35), ('plumber', 1995, 45),
  ('plumber', 2000, 55), ('plumber', 2005, 65), ('plumber', 2010, 80), ('plumber', 2015, 95), ('plumber', 2020, 110),
  ('plumber', 2024, 130),
  -- Daycare (monthly)
  ('daycare', 1950, 0), ('daycare', 1955, 0), ('daycare', 1960, 50), ('daycare', 1965, 75), ('daycare', 1970, 100),
  ('daycare', 1975, 150), ('daycare', 1980, 250), ('daycare', 1985, 350), ('daycare', 1990, 450), ('daycare', 1995, 550),
  ('daycare', 2000, 700), ('daycare', 2005, 850), ('daycare', 2010, 1000), ('daycare', 2015, 1200), ('daycare', 2020, 1400),
  ('daycare', 2024, 1700),
  -- Lawyer (per hour)
  ('lawyer', 1950, 5), ('lawyer', 1955, 8), ('lawyer', 1960, 12), ('lawyer', 1965, 18), ('lawyer', 1970, 25),
  ('lawyer', 1975, 40), ('lawyer', 1980, 65), ('lawyer', 1985, 100), ('lawyer', 1990, 150), ('lawyer', 1995, 180),
  ('lawyer', 2000, 220), ('lawyer', 2005, 260), ('lawyer', 2010, 300), ('lawyer', 2015, 350), ('lawyer', 2020, 400),
  ('lawyer', 2024, 450),
  -- Wedding (average total cost)
  ('wedding', 1950, 2000), ('wedding', 1955, 2500), ('wedding', 1960, 3000), ('wedding', 1965, 4000), ('wedding', 1970, 5000),
  ('wedding', 1975, 6500), ('wedding', 1980, 8000), ('wedding', 1985, 10000), ('wedding', 1990, 15000), ('wedding', 1995, 18000),
  ('wedding', 2000, 22000), ('wedding', 2005, 26000), ('wedding', 2010, 28000), ('wedding', 2015, 32000), ('wedding', 2020, 28000),
  ('wedding', 2024, 35000),
  -- Funeral (average cost)
  ('funeral', 1950, 700), ('funeral', 1955, 850), ('funeral', 1960, 1000), ('funeral', 1965, 1200), ('funeral', 1970, 1500),
  ('funeral', 1975, 1800), ('funeral', 1980, 2400), ('funeral', 1985, 3200), ('funeral', 1990, 4200), ('funeral', 1995, 5000),
  ('funeral', 2000, 6000), ('funeral', 2005, 7300), ('funeral', 2010, 7800), ('funeral', 2015, 8500), ('funeral', 2020, 9100),
  ('funeral', 2024, 9500),
  -- College Textbook
  ('textbook', 1950, 5), ('textbook', 1955, 6), ('textbook', 1960, 8), ('textbook', 1965, 10), ('textbook', 1970, 12),
  ('textbook', 1975, 18), ('textbook', 1980, 25), ('textbook', 1985, 35), ('textbook', 1990, 50), ('textbook', 1995, 65),
  ('textbook', 2000, 80), ('textbook', 2005, 105), ('textbook', 2010, 130), ('textbook', 2015, 150), ('textbook', 2020, 140),
  ('textbook', 2024, 125);

-- 2025 prices (estimated based on current trends)
INSERT OR REPLACE INTO prices (product_id, year, price) VALUES
  ('gas', 2025, 3.20),
  ('eggs', 2025, 4.25),
  ('movie', 2025, 12.00),
  ('minimum_wage', 2025, 7.25),
  ('rent', 2025, 1800),
  ('home', 2025, 430000),
  ('tuition', 2025, 33000),
  ('car', 2025, 49000),
  ('milk', 2025, 4.35),
  ('bread', 2025, 2.00),
  ('stamp', 2025, 0.73),
  ('coffee', 2025, 3.90),
  ('bigmac', 2025, 6.75),
  ('tv', 2025, 350),
  ('computer', 2025, 850),
  ('internet', 2025, 72),
  ('doctor', 2025, 185),
  ('hospital', 2025, 3300),
  ('health_insurance', 2025, 25000),
  ('concert', 2025, 130),
  ('sports', 2025, 42),
  ('videogame', 2025, 70),
  ('haircut', 2025, 26),
  ('drycleaning', 2025, 19),
  ('electricity', 2025, 145),
  ('heating', 2025, 125),
  ('water', 2025, 78),
  ('airline', 2025, 390),
  ('bus', 2025, 2.85),
  ('bicycle', 2025, 620),
  ('median_income', 2025, 82500),
  ('teacher_salary', 2025, 71000),
  ('engineer_salary', 2025, 125000),
  ('nurse_salary', 2025, 89000),
  ('newspaper', 2025, 3.25),
  ('phone_service', 2025, 98),
  ('camera', 2025, 620),
  ('dental', 2025, 210),
  ('prescription', 2025, 165),
  ('plumber', 2025, 135),
  ('daycare', 2025, 1750),
  ('lawyer', 2025, 470),
  ('wedding', 2025, 36000),
  ('funeral', 2025, 9800),
  ('textbook', 2025, 120);
