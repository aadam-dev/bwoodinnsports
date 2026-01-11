/**
 * Security utilities and helpers
 * Implements security best practices for the application
 */

/**
 * Validates environment variables at startup
 * Throws error if required variables are missing
 */
export function validateEnvVars() {
  const requiredVars: string[] = [];
  const optionalVars = [
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
  ];

  // Check required vars (add as needed)
  const missing = requiredVars.filter((varName) => !process.env[varName]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }

  // Warn about optional but recommended vars
  const missingOptional = optionalVars.filter(
    (varName) => !process.env[varName]
  );
  if (missingOptional.length > 0 && process.env.NODE_ENV === "production") {
    console.warn(
      `Warning: Optional environment variables not set: ${missingOptional.join(", ")}`
    );
  }
}

/**
 * Rate limiting helper (client-side indication)
 * For actual rate limiting, implement server-side with Redis or similar
 */
export function createRateLimiter(maxRequests: number, windowMs: number) {
  const requests: number[] = [];

  return () => {
    const now = Date.now();
    // Remove requests outside the time window
    while (requests.length > 0 && requests[0] < now - windowMs) {
      requests.shift();
    }

    if (requests.length >= maxRequests) {
      return false; // Rate limit exceeded
    }

    requests.push(now);
    return true; // Request allowed
  };
}

/**
 * Generates a CSRF token (for future implementation)
 * In production, use a proper CSRF library
 */
export function generateCSRFToken(): string {
  // This is a placeholder - use a proper CSRF library in production
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

/**
 * Validates CSRF token (for future implementation)
 */
export function validateCSRFToken(token: string, sessionToken: string): boolean {
  // This is a placeholder - use a proper CSRF library in production
  return token === sessionToken;
}

/**
 * Sanitizes file name to prevent directory traversal attacks
 */
export function sanitizeFileName(fileName: string): string {
  return fileName
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .replace(/\.\./g, "")
    .slice(0, 255);
}

/**
 * Checks if a URL is safe (same origin or allowed domain)
 */
export function isSafeUrl(url: string, allowedDomains: string[]): boolean {
  try {
    const urlObj = new URL(url);
    // Allow same origin
    if (typeof window !== "undefined") {
      if (urlObj.origin === window.location.origin) {
        return true;
      }
    }
    // Check against allowed domains
    return allowedDomains.some((domain) => urlObj.hostname.endsWith(domain));
  } catch {
    return false;
  }
}

