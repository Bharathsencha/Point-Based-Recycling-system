import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  const totalTransactions = (db.prepare(`SELECT COUNT(*) as count FROM purchases`).get() as { count: number }).count;
const totalRecycledItems: number = (db.prepare(`SELECT COUNT(*) as count FROM purchase_items WHERE is_reward = 0`).get() as { count: number }).count;
const totalRewardItems: number = (db.prepare(`SELECT COUNT(*) as count FROM purchase_items WHERE is_reward = 1`).get() as { count: number }).count;
const totalQuantityRecycled: number = (db.prepare(`SELECT SUM(quantity) as total FROM purchase_items WHERE is_reward = 0`).get() as { total: number | null }).total || 0;
const totalRevenue: number = (db.prepare(`SELECT SUM(total_amount) as sum FROM purchases`).get() as { sum: number | null }).sum || 0;
const totalRewardValue: number = (db.prepare(`SELECT SUM(price) as sum FROM purchase_items WHERE is_reward = 1`).get() as { sum: number | null }).sum || 0;
const totalUsers: number = (db.prepare(`SELECT COUNT(*) as count FROM users`).get() as { count: number }).count;
const lastTransaction: string | null = (db.prepare(`SELECT MAX(created_at) as latest FROM purchases`).get() as { latest: string | null }).latest;

  return NextResponse.json({
    totalTransactions,
    totalRecycledItems,
    totalRewardItems,
    totalQuantityRecycled,
    totalRevenue,
    totalRewardValue,
    totalUsers,
    lastTransaction,
  });
}
