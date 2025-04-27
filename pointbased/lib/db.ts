// lib/db.ts
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
}

// Initialize the database on module import
initializeDb();

export default db;