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
