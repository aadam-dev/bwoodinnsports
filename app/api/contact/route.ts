/**
 * Contact Form API Route
 * Handles contact form submissions with server-side validation
 * 
 * Security features:
 * - Server-side validation with Zod
 * - Rate limiting (implement with Redis in production)
 * - Input sanitization
 * - Error handling without exposing sensitive info
 */

import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/utils/validation";
import { logger } from "@/lib/utils/logger";

// Rate limiting (simple in-memory - use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5; // Max requests
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

/**
 * Simple rate limiter - replace with Redis in production
 */
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
 * POST handler for contact form submissions
 */
export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();

    // Server-side validation
    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid form data",
          details: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;

    // TODO: Send email using Resend/SendGrid
    // TODO: Store in database if needed
    // TODO: Implement proper logging (not console.log in production)

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Your message has been received. We'll get back to you soon.",
      },
      { status: 200 }
    );
  } catch (error) {
    // Log error without exposing sensitive information
    logger.error(
      "Contact form submission failed",
      error instanceof Error ? error : new Error("Unknown error")
    );

    return NextResponse.json(
      { error: "An error occurred processing your request. Please try again later." },
      { status: 500 }
    );
  }
}

// Only allow POST requests
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

