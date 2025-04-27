import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { NextResponse } from 'next/server';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function errorResponse(message: string, status: number) {
  return NextResponse.json(
    { error: message },
    { status }
  );
}
export function successResponse(data: any, status: number = 200) {
  return NextResponse.json(
    data,
    { status }
  );
}

// Helper function for database errors
export function handleDbError(error: any, customMessage: string = 'Database error') {
  console.error(`${customMessage}:`, error);
  return errorResponse('Internal server error', 500);
}


