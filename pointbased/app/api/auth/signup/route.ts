// app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db, { User } from '../../../../lib/db';
import { hash } from 'bcrypt';

export async function POST(request: NextRequest) {
  try {
    const { name, email, mobile, password } = await request.json();

    // Validate input
    if (!name || !email || !mobile || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists - wrapped in try/catch to handle SQLite errors
    try {
      const existingUser = db
        .prepare('SELECT email FROM users WHERE email = ?')
        .get(email) as { email: string } | undefined;
        
      if (existingUser) {
        return NextResponse.json(
          { error: 'User with this email already exists' },
          { status: 409 }
        );
      }
    } catch (dbError) {
      console.error('Database error checking existing user:', dbError);
      // If this is the first run and table doesn't exist yet, continue
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    try {
      // Insert new user
      const insertUser = db.prepare(
        'INSERT INTO users (name, email, mobile, password) VALUES (?, ?, ?, ?)'
      );
      
      insertUser.run(name, email, mobile, hashedPassword);

      // Fetch the newly created user to return full user data
      const createdUser = db
        .prepare('SELECT id, name, email, mobile FROM users WHERE email = ?')
        .get(email) as { id: number; name: string; email: string; mobile: string } | undefined;

      return NextResponse.json(
        { 
          message: 'User created successfully',
          user: createdUser
        },
        { status: 201 }
      );
    } catch (insertError) {
      console.error('Error inserting user:', insertError);
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
