import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const purchases = db
    .prepare('SELECT id, total_amount, payment_method, created_at FROM purchases WHERE user_id = ?')
    .all(params.userId);
  return NextResponse.json(purchases);
}
