// app/api/auth/me/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db, { User } from '../../../../lib/db';
import { verify } from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  try {
    // Get token from cookies
    const token = request.cookies.get('auth_token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    try {
      // Verify JWT token
      const decoded = verify(
        token,
        process.env.JWT_SECRET || 'fallback_secret'
      ) as { userId: number };

      // Get user data
      const user = db
        .prepare('SELECT id, name, email, mobile FROM users WHERE id = ?')
        .get(decoded.userId) as Omit<User, 'password'> | undefined;

      if (!user) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({ user }, { status: 200 });
    } catch (jwtError) {
      console.error('JWT verification error:', jwtError);
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}