import { NextRequest, NextResponse } from 'next/server'
import db from '../../../../lib/db'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Get user by email
    const user = db.prepare(`
      SELECT id, points FROM users WHERE email = ?
    `).get(email) as { id: number, points: number } | undefined

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Join purchases → purchase_items to get item stats
    const purchaseItems = db.prepare(`
      SELECT pi.quantity, pi.is_reward
      FROM purchase_items pi
      JOIN purchases p ON pi.purchase_id = p.id
      WHERE p.user_id = ?
    `).all(user.id) as { quantity: number, is_reward: number }[]

    let itemsRecycled = 0
    let rewardsRedeemed = 0

    for (const item of purchaseItems) {
      if (item.is_reward === 1) {
        rewardsRedeemed += item.quantity
      } else {
        itemsRecycled += item.quantity
      }
    }

    return NextResponse.json({
      points: user.points,
      items: itemsRecycled,
      rewards: rewardsRedeemed
    }, { status: 200 })

  } catch (err) {
    console.error("Failed to fetch user stats:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
