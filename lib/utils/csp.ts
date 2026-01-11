/**
 * Content Security Policy (CSP) Helper
 * Generates CSP directives for Next.js configuration
 * 
 * This helps maintain CSP configuration in a centralized location
 */

interface CSPDirectives {
  defaultSrc?: string[];
  scriptSrc?: string[];
  styleSrc?: string[];
  imgSrc?: string[];
  fontSrc?: string[];
  connectSrc?: string[];
  frameSrc?: string[];
  frameAncestors?: string[];
  baseUri?: string[];
  formAction?: string[];
}

/**
 * Generates Content Security Policy string
 * 
 * @param directives - CSP directives object
 * @returns CSP string ready for header
 */
export function generateCSP(directives: CSPDirectives): string {
  const cspParts: string[] = [];

  // Helper to add directive
  const addDirective = (name: string, values: string[]) => {
    if (values && values.length > 0) {
      cspParts.push(`${name} ${values.join(" ")}`);
    }
  };

  addDirective("default-src", directives.defaultSrc || ["'self'"]);
  addDirective("script-src", directives.scriptSrc || ["'self'", "'unsafe-eval'", "'unsafe-inline'"]);
  addDirective("style-src", directives.styleSrc || ["'self'", "'unsafe-inline'"]);
  addDirective("img-src", directives.imgSrc || ["'self'", "data:"]);
  addDirective("font-src", directives.fontSrc || ["'self'", "data:"]);
  addDirective("connect-src", directives.connectSrc || ["'self'"]);
  addDirective("frame-src", directives.frameSrc || []);
  addDirective("frame-ancestors", directives.frameAncestors || ["'self'"]);
  addDirective("base-uri", directives.baseUri || ["'self'"]);
  addDirective("form-action", directives.formAction || ["'self'"]);

  return cspParts.join("; ");
}

/**
 * Default CSP configuration for the application
 * Customize based on your needs
 */
export function getDefaultCSP(): string {
  return generateCSP({
    defaultSrc: ["'self'"],
    scriptSrc: [
      "'self'",
      "'unsafe-eval'", // Required for Next.js
      "'unsafe-inline'", // Required for Next.js
    ],
    styleSrc: [
      "'self'",
      "'unsafe-inline'", // Required for Tailwind CSS
    ],
    imgSrc: [
      "'self'",
      "data:",
      "https://images.unsplash.com", // Add your image CDN domains here
    ],
    fontSrc: ["'self'", "data:"],
    connectSrc: ["'self'"],
    frameAncestors: ["'self'"],
    baseUri: ["'self'"],
    formAction: ["'self'"],
  });
}

/**
 * Production CSP configuration (stricter)
 * Use this for production environment
 */
export function getProductionCSP(): string {
  return generateCSP({
    defaultSrc: ["'self'"],
    scriptSrc: [
      "'self'",
      // Remove 'unsafe-eval' and 'unsafe-inline' in production if possible
      // This requires careful configuration of Next.js
    ],
    styleSrc: [
      "'self'",
      // Consider removing 'unsafe-inline' and using nonces
    ],
    imgSrc: [
      "'self'",
      "data:",
      "https://images.unsplash.com", // Your CDN domains
    ],
    fontSrc: ["'self'", "data:"],
    connectSrc: ["'self'"],
    frameAncestors: ["'none'"], // Stricter in production
    baseUri: ["'self'"],
    formAction: ["'self'"],
  });
}

