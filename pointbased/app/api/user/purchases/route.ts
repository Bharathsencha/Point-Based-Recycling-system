import { NextRequest, NextResponse } from 'next/server';
import db from '../../../../lib/db';
import { verify } from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth_token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    let userId: number;
    try {
      const decoded = verify(token, process.env.JWT_SECRET || 'fallback_secret') as { userId: number };
      userId = decoded.userId;
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Get purchases for user
    const purchases = db.prepare(`
      SELECT id, total_amount, payment_method, created_at
      FROM purchases
      WHERE user_id = ?
      ORDER BY created_at DESC
    `).all(userId);

    // For each purchase, get items
    const purchaseItemsStmt = db.prepare(`
      SELECT item_id, name, size, quantity, price, is_reward
      FROM purchase_items
      WHERE purchase_id = ?
    `);

    interface Purchase {
      id: number;
      total_amount: number;
      payment_method: string;
      created_at: string;
      
    }

    const purchasesWithItems = (purchases as Purchase[])
      .map((purchase) => {
        const items = purchaseItemsStmt.all(purchase.id);
        return items.length > 0 ? { ...purchase, items } : null;
      })
      .filter(Boolean);


    return NextResponse.json({ purchases: purchasesWithItems }, { status: 200 });
  } catch (error) {
    console.error('Error fetching purchase history:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
