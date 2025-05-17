import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(
  req: Request,
  { params }: { params: { purchaseId: string } }
) {
  const items = db
    .prepare('SELECT id, item_id, name, size, quantity, price, is_reward FROM purchase_items WHERE purchase_id = ?')
    .all(params.purchaseId);
  return NextResponse.json(items);
}
