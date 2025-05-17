// app/api/admin/users/route.ts
import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  const users = db.prepare('SELECT id, name, email, mobile, points, created_at FROM users').all();
  return NextResponse.json(users);
}
