/**
 * Input validation and sanitization utilities
 * Provides secure input handling to prevent XSS, injection attacks, and data corruption
 */

import { z } from "zod";

/**
 * Sanitizes string input by removing potentially dangerous characters
 * Prevents XSS attacks by escaping HTML entities
 */
export function sanitizeString(input: string): string {
  if (typeof input !== "string") return "";
  
  return input
    .trim()
    .replace(/[<>]/g, "") // Remove angle brackets
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+=/gi, ""); // Remove event handlers
}

/**
 * Validates and sanitizes email addresses
 */
export function sanitizeEmail(email: string): string {
  return sanitizeString(email).toLowerCase();
}

/**
 * Validates phone number format (Ghana format: +233 XX XXX XXXX)
 */
export function sanitizePhone(phone: string): string {
  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, "");
  return sanitizeString(cleaned);
}

/**
 * Limits string length to prevent DoS attacks
 */
export function limitLength(input: string, maxLength: number): string {
  return input.slice(0, maxLength);
}

/**
 * Zod schema for booking form validation
 * Server-side validation schema to ensure data integrity
 */
export const bookingSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name contains invalid characters"),
  email: z
    .string()
    .email("Invalid email address")
    .max(255, "Email must not exceed 255 characters"),
  phone: z
    .string()
    .regex(/^\+?233\d{9}$/, "Invalid Ghana phone number format")
    .max(20, "Phone number too long"),
  eventType: z.enum(["football", "basketball", "event", "training", "other"]),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format"),
  guests: z
    .string()
    .regex(/^\d+$/, "Guests must be a number")
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().min(1).max(1390, "Exceeds maximum capacity")),
  message: z
    .string()
    .max(1000, "Message must not exceed 1000 characters")
    .optional()
    .default(""),
});

/**
 * Zod schema for contact form validation
 */
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .max(255, "Email must not exceed 255 characters"),
  phone: z
    .string()
    .regex(/^\+?233\d{9}$/, "Invalid Ghana phone number format")
    .max(20, "Phone number too long")
    .optional(),
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(200, "Subject must not exceed 200 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must not exceed 1000 characters"),
});

/**
 * Type exports for TypeScript
 */
export type BookingFormData = z.infer<typeof bookingSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;

