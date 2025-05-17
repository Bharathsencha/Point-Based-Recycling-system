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
      console.log('User ID in purchase-reward:', userId);
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const body = await request.json();
    const { userId: bodyUserId, rewardId, voucherName, pointsRequired, pointsSpent, rupeeValue, purchaseDate } = body;

    if (userId !== bodyUserId) {
      return NextResponse.json({ error: 'User mismatch' }, { status: 403 });
    }

    if (!rewardId || !voucherName || !pointsRequired || !pointsSpent || !rupeeValue || !purchaseDate) {
      return NextResponse.json({ error: 'Invalid reward data' }, { status: 400 });
    }

    // Check user points
    type UserRow = { points: number };
    const user = db.prepare('SELECT points FROM users WHERE id = ?').get(userId) as UserRow | undefined;
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (user.points < pointsSpent) {
      return NextResponse.json({ error: `Insufficient points, you have ${user.points} points` }, { status: 502 });
    }

    // Deduct points
    db.prepare('UPDATE users SET points = points - ? WHERE id = ?').run(pointsSpent, userId);

    // Insert purchase record
    const insertPurchase = db.prepare(`
      INSERT INTO purchases (user_id, total_amount, payment_method)
      VALUES (?, ?, ?)
    `);
    const result = insertPurchase.run(userId, rupeeValue, 'points');
    const purchaseId = result.lastInsertRowid;

    // Insert reward as a purchase item
    const insertItem = db.prepare(`
      INSERT INTO purchase_items (purchase_id, item_id, name, size, quantity, price, is_reward)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    insertItem.run(purchaseId, rewardId, voucherName, '', 1, rupeeValue, 1);

    return NextResponse.json({ message: 'Reward purchased successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error processing reward purchase:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 404 });
  }
}