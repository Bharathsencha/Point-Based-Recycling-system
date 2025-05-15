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
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      mobile TEXT NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
  // New purchases table
  db.exec(`
    CREATE TABLE IF NOT EXISTS purchases (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      total_amount REAL NOT NULL,
      payment_method TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `);

  // New purchase_items table
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
      FOREIGN KEY (purchase_id) REFERENCES purchases(id)
    );
  `);
}

// Initialize the database on module import
initializeDb();

export default db;
