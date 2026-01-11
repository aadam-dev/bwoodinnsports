/**
 * Environment Variable Validation
 * Validates required environment variables on application startup
 * 
 * Call this function early in the application lifecycle to ensure
 * all required environment variables are set before the app starts
 */

import { validateEnvVars } from "./security";

/**
 * Validates environment variables for the application
 * Throws error if critical variables are missing
 * 
 * @throws Error if required environment variables are missing
 */
export function validateAppEnv() {
  try {
    validateEnvVars();
    
    // Additional app-specific validations
    if (process.env.NODE_ENV === "production") {
      const requiredProdVars: string[] = [];
      
      // Add production-specific required variables here
      // Example:
      // if (!process.env.NEXT_PUBLIC_APP_URL) {
      //   requiredProdVars.push("NEXT_PUBLIC_APP_URL");
      // }
      
      if (requiredProdVars.length > 0) {
        throw new Error(
          `Missing required production environment variables: ${requiredProdVars.join(", ")}`
        );
      }
    }
    
    return true;
  } catch (error) {
    console.error("Environment validation failed:", error);
    throw error;
  }
}

/**
 * Gets environment variable with fallback
 * 
 * @param key - Environment variable key
 * @param fallback - Fallback value if not set
 * @returns Environment variable value or fallback
 */
export function getEnv(key: string, fallback?: string): string {
  const value = process.env[key];
  if (!value && !fallback) {
    console.warn(`Environment variable ${key} is not set and no fallback provided`);
  }
  return value || fallback || "";
}

/**
 * Gets boolean environment variable
 * 
 * @param key - Environment variable key
 * @param fallback - Fallback value if not set
 * @returns Boolean value
 */
export function getEnvBool(key: string, fallback = false): boolean {
  const value = process.env[key];
  if (!value) return fallback;
  return value.toLowerCase() === "true" || value === "1";
}

/**
 * Gets number environment variable
 * 
 * @param key - Environment variable key
 * @param fallback - Fallback value if not set
 * @returns Number value
 */
export function getEnvNumber(key: string, fallback = 0): number {
  const value = process.env[key];
  if (!value) return fallback;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? fallback : parsed;
}

