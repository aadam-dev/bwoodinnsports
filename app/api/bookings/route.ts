/**
 * Bookings API Route
 * Handles facility booking requests
 * 
 * Security features:
 * - Server-side validation
 * - Rate limiting
 * - Input sanitization
 * - Date validation (no past dates)
 */

import { NextRequest, NextResponse } from "next/server";
import { bookingSchema } from "@/lib/utils/validation";
import { logger } from "@/lib/utils/logger";

// Rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 3; // Lower limit for bookings
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

/**
 * Validates that the booking date is not in the past
 */
function validateBookingDate(dateString: string): boolean {
  const bookingDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return bookingDate >= today;
}

/**
 * POST handler for booking requests
 */
export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Validate with Zod schema
    const validationResult = bookingSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid booking data",
          details: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;

    // Additional validation: check date is not in past
    if (!validateBookingDate(validatedData.date)) {
      return NextResponse.json(
        { error: "Booking date cannot be in the past" },
        { status: 400 }
      );
    }

    // TODO: Check availability in database
    // TODO: Create booking record
    // TODO: Send confirmation email
    // TODO: Notify admin

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json(
      {
        success: true,
        message: "Booking request submitted successfully. We'll contact you to confirm.",
      },
      { status: 200 }
    );
  } catch (error) {
    logger.error(
      "Booking submission failed",
      error instanceof Error ? error : new Error("Unknown error")
    );

    return NextResponse.json(
      { error: "An error occurred processing your booking. Please try again later." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

