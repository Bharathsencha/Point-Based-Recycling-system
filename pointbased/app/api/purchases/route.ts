import { NextRequest, NextResponse } from 'next/server';
import db from '../../../lib/db';
import { verify } from 'jsonwebtoken';

export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const { cart, total, paymentMethod } = body;

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json({ error: 'Cart is empty or invalid' }, { status: 400 });
    }

    // Insert purchase record
    const insertPurchase = db.prepare(`
      INSERT INTO purchases (user_id, total_amount, payment_method)
      VALUES (?, ?, ?)
    `);
    const result = insertPurchase.run(userId, total, paymentMethod);
    const purchaseId = result.lastInsertRowid;

    // Insert purchase items
    const insertItem = db.prepare(`
      INSERT INTO purchase_items (purchase_id, item_id, name, size, quantity, price, image)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const insertMany = db.transaction((items) => {
      for (const item of items) {
        insertItem.run(
          purchaseId,
          item.id,
          item.name,
          item.size,
          item.quantity,
          item.price,
          item.image || null
        );
      }
    });

    insertMany(cart);

    return NextResponse.json({ message: 'Purchase saved successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error saving purchase:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
