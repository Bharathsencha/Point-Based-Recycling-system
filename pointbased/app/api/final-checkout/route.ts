import { NextRequest, NextResponse } from 'next/server';
     import db from '../../../lib/db';
     import { verify } from 'jsonwebtoken';

     // Add submission_location column to purchases table (run once during setup)
     try {
       db.exec('ALTER TABLE purchases ADD COLUMN submission_location TEXT');
     } catch (error) {
       if (typeof error === 'object' && error !== null && 'message' in error && typeof (error as any).message === 'string') {
         if (!(error as any).message.includes('duplicate column name')) {
           console.error('Failed to add submission_location column:', (error as any).message);
         }
       } else {
         console.error('Failed to add submission_location column:', error);
       }
     }

    export async function POST(req: NextRequest) {
        try {
            // Get token from auth_token cookie
            const token = req.cookies.get('auth_token')?.value;
            console.log('Received token from cookie:', token);
            if (!token) {
                console.log('No token provided in cookie');
                return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
            }

            // Verify JWT token
            let userId: number;
            try {
                const decoded = verify(token, process.env.JWT_SECRET || 'fallback_secret') as { userId: number };
                userId = decoded.userId;
                console.log('Decoded userId:', userId);
            } catch (err: any) {
                if (typeof err === 'object' && err !== null && 'message' in err && typeof (err as any).message === 'string') {
                    console.error('Token verification failed:', (err as any).message);
                } else {
                    console.error('Token verification failed:', err);
                }
                return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
            }

            // Parse request body
            let body;
            try {
                body = await req.json();
            } catch (err: any) {
                if (typeof err === 'object' && err !== null && 'message' in err && typeof (err as any).message === 'string') {
                    console.error('Failed to parse request body:', (err as any).message);
                } else {
                    console.error('Failed to parse request body:', err);
                }
                return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
            }
            const { recycleStation, orderDetails, paymentMethod } = body;
            console.log('Request body:', { recycleStation, orderDetails, paymentMethod });

            if (!recycleStation || !orderDetails || !paymentMethod) {
                console.log('Missing fields in request body');
                return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
            }

            // Validate orderDetails structure
            if (!Array.isArray(orderDetails) || orderDetails.length === 0) {
                console.log('Invalid orderDetails:', orderDetails);
                return NextResponse.json({ error: 'Invalid order details' }, { status: 400 });
            }
            for (const item of orderDetails) {
                if (!item.id || !item.name || !item.size || !item.quantity || !item.price) {
                    console.log('Invalid item in orderDetails:', item);
                    return NextResponse.json({ error: 'Invalid item in order details' }, { status: 400 });
                }
            }

            // Start transaction to ensure data consistency
            db.exec('BEGIN TRANSACTION');

            try {
                // Get user by userId
                type User = { id: number; points: number };
                const user = db.prepare('SELECT id, points FROM users WHERE id = ?').get(userId) as User | undefined;
                console.log('User query result:', user);
                if (!user) {
                    db.exec('ROLLBACK');
                    console.log('User not found for userId:', userId);
                    return NextResponse.json({ error: 'User not found' }, { status: 404 });
                }

                // Calculate total amount from all items in orderDetails
                const totalAmount = orderDetails.reduce(
                    (sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity,
                    0
                );
                console.log('Calculated total amount:', totalAmount);

                // Insert single row into purchases table
                const purchaseStmt = db.prepare(
                    `INSERT INTO purchases (user_id, total_amount, payment_method, submission_location)
                     VALUES (?, ?, ?, ?)`
                );
                const purchaseResult = purchaseStmt.run(user.id, totalAmount, paymentMethod, recycleStation);
                const purchaseId = purchaseResult.lastInsertRowid;
                console.log('Inserted purchase, ID:', purchaseId);

                // Insert each item as a separate row into purchase_items table
                const itemStmt = db.prepare(
                    `INSERT INTO purchase_items (purchase_id, item_id, name, size, quantity, price, is_reward)
                     VALUES (?, ?, ?, ?, ?, ?, ?)`
                );
                for (const item of orderDetails) {
                    itemStmt.run(purchaseId, item.id, item.name, item.size, item.quantity, item.price, 0);
                    console.log('Inserted purchase item:', item);
                }

                // Update user points (10 points = 1 rupee)
                const pointsToAdd = Math.floor(totalAmount * 10);
                db.prepare('UPDATE users SET points = points + ? WHERE id = ?').run(pointsToAdd, user.id);
                console.log('Updated user points, added:', pointsToAdd);

                // Commit transaction
                db.exec('COMMIT');
                console.log('Transaction committed');

                return NextResponse.json({ message: 'Checkout successful', purchaseId }, { status: 200 });
            } catch (error: any) {
                db.exec('ROLLBACK');
                console.error('Transaction error:', error.message);
                return NextResponse.json({ error: 'Failed to process checkout: ' + error.message }, { status: 500 });
            }
        } catch (error: any) {
            console.error('Checkout error:', error.message);
            return NextResponse.json({ error: 'Server error: ' + error.message }, { status: 500 });
        }
    }