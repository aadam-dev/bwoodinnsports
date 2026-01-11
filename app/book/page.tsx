"use client";

/**
 * Booking Page Component
 * Allows users to book facilities for events, tournaments, or special occasions
 * 
 * Security features:
 * - Client-side validation with Zod schemas
 * - Input sanitization
 * - Length limits to prevent DoS
 * - Server-side validation required (implement in API route)
 */

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Section from "@/components/ui/Section";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { bookingSchema, type BookingFormData } from "@/lib/utils/validation";

export default function BookPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    mode: "onBlur", // Validate on blur for better UX
  });

  /**
   * Handles form submission with proper validation
   * In production, this should send data to a secure API route
   */
  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Send to secure API route with server-side validation
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit booking");
      }

      setSubmitSuccess(true);
      reset(); // Clear form on success

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "An error occurred. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen">
      <Header />
      <Section className="pt-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold font-heading text-gray-900 mb-6">
            Book a Facility
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Reserve your spot for your next event, tournament, or special occasion.
          </p>

          {/* Success message */}
          {submitSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
              Booking request submitted successfully! We'll contact you soon.
            </div>
          )}

          {/* Error message */}
          {submitError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
              {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Input
                  label="Full Name"
                  {...register("name")}
                  error={errors.name?.message}
                  placeholder="John Doe"
                  maxLength={100} // Prevent excessive input
                />
              </div>
              <div>
                <Input
                  label="Email"
                  type="email"
                  {...register("email")}
                  error={errors.email?.message}
                  placeholder="john@example.com"
                  maxLength={255}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Input
                  label="Phone Number"
                  type="tel"
                  {...register("phone")}
                  error={errors.phone?.message}
                  placeholder="+233 XX XXX XXXX"
                  maxLength={20}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Type <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("eventType")}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all"
                >
                  <option value="">Select event type</option>
                  <option value="football">Football Tournament</option>
                  <option value="basketball">Basketball Tournament</option>
                  <option value="event">Special Event</option>
                  <option value="training">Training Session</option>
                  <option value="other">Other</option>
                </select>
                {errors.eventType && (
                  <p className="mt-2 text-sm text-red-600">{errors.eventType.message}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Input
                  label="Date"
                  type="date"
                  {...register("date")}
                  error={errors.date?.message}
                  min={new Date().toISOString().split("T")[0]} // Prevent past dates
                />
              </div>
              <div>
                <Input
                  label="Time"
                  type="time"
                  {...register("time")}
                  error={errors.time?.message}
                />
              </div>
            </div>

            <div>
              <Input
                label="Expected Number of Guests"
                type="number"
                {...register("guests", { valueAsNumber: true })}
                error={errors.guests?.message}
                placeholder="100"
                min={1}
                max={1390} // Maximum capacity
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Message
              </label>
              <textarea
                {...register("message")}
                rows={4}
                maxLength={1000} // Prevent DoS attacks
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all"
                placeholder="Tell us more about your event..."
              />
              {errors.message && (
                <p className="mt-2 text-sm text-red-600">{errors.message.message}</p>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full md:w-auto"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              Submit Booking Request
            </Button>
          </form>
        </div>
      </Section>
      <Footer />
    </main>
  );
}
