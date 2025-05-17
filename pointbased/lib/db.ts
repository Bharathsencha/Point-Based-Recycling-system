import Database from 'better-sqlite3';
import { join } from 'path';
import fs from 'fs';

// Define user type
export interface User {
  id: number;
  name: string;
  email: string;
  mobile: string;
  password: string;
  created_at: string;
  points: number;
}

// Ensure database directory exists
const dbDir = join(process.cwd(), 'database');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = join(dbDir, 'eco-rewards.db');
const db = new Database(dbPath);

// Initialize database tables
export function initializeDb() {
  // Users table with points column
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      mobile TEXT NOT NULL,
      password TEXT NOT NULL,
      points INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Purchases table
  db.exec(`
  CREATE TABLE IF NOT EXISTS purchases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    total_amount REAL NOT NULL,
    payment_method TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    submission_location TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
  `);

  // Purchase_items table with is_reward column
  db.exec(`
    CREATE TABLE IF NOT EXISTS purchase_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      purchase_id INTEGER NOT NULL,
      item_id TEXT NOT NULL,
      name TEXT NOT NULL,
      size TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      price REAL NOT NULL,
      image TEXT,
      is_reward BOOLEAN DEFAULT 0,
      FOREIGN KEY (purchase_id) REFERENCES purchases(id)
    );
  `);
}

// Initialize the database on module import
initializeDb();

export default db;