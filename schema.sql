-- PriceThen Database Schema

-- Users table for tracking subscribers
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  subscription_status TEXT DEFAULT 'free',
  subscription_expires TEXT,
  stripe_customer_id TEXT
);

-- Create index for email lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT,
  sort_order INTEGER DEFAULT 0
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT,
  category_id TEXT REFERENCES categories(id),
  is_premium INTEGER DEFAULT 0,
  source_url TEXT,
  source_name TEXT,
  sort_order INTEGER DEFAULT 0
);

-- Product sources table (for multiple sources per product)
CREATE TABLE IF NOT EXISTS product_sources (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id TEXT REFERENCES products(id),
  source_url TEXT NOT NULL,
  source_name TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_product_sources_product ON product_sources(product_id);

-- Price data table (one row per product per year)
CREATE TABLE IF NOT EXISTS prices (
  product_id TEXT REFERENCES products(id),
  year INTEGER NOT NULL,
  price REAL NOT NULL,
  PRIMARY KEY (product_id, year)
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_premium ON products(is_premium);
CREATE INDEX IF NOT EXISTS idx_prices_product ON prices(product_id);
