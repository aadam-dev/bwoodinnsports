"use client";

/**
 * Contact Page Component
 * Provides contact form and business information
 * 
 * Security features:
 * - Input validation and sanitization
 * - Length limits
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
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { contactSchema, type ContactFormData } from "@/lib/utils/validation";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
  });

  /**
   * Handles form submission with validation
   * In production, send to secure API route
   */
  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Send to secure API route with server-side validation
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      setSubmitSuccess(true);
      reset();

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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold font-heading text-gray-900 mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Get in touch with us for bookings, inquiries, or more information.
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8">
                Get in Touch
              </h2>

              {/* Success message */}
              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}

              {/* Error message */}
              {submitError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                  {submitError}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                <Input
                  label="Name"
                  {...register("name")}
                  error={errors.name?.message}
                  placeholder="Your name"
                  maxLength={100}
                />
                <Input
                  label="Email"
                  type="email"
                  {...register("email")}
                  error={errors.email?.message}
                  placeholder="your@email.com"
                  maxLength={255}
                />
                <Input
                  label="Phone"
                  type="tel"
                  {...register("phone")}
                  error={errors.phone?.message}
                  placeholder="+233 XX XXX XXXX"
                  maxLength={20}
                />
                <Input
                  label="Subject"
                  {...register("subject")}
                  error={errors.subject?.message}
                  placeholder="What is this regarding?"
                  maxLength={200}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register("message")}
                    rows={5}
                    maxLength={1000}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all"
                    placeholder="Your message..."
                  />
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>
                <Button type="submit" size="lg" isLoading={isSubmitting} disabled={isSubmitting}>
                  Send Message
                </Button>
              </form>
            </div>

            <div>
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8">
                Contact Information
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary-100 rounded-lg">
                    <MapPin className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                    <p className="text-gray-600">
                      Landlord Street, Adenta, Accra, Ghana
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary-100 rounded-lg">
                    <Phone className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                    <p className="text-gray-600">
                      <a href="tel:+233256946466" className="hover:text-primary-600 transition-colors">
                        +233 256 946 466
                      </a>
                      <br />
                      <a href="tel:+233266633697" className="hover:text-primary-600 transition-colors">
                        +233 266 633 697
                      </a>
                      <br />
                      <a href="tel:+233244615202" className="hover:text-primary-600 transition-colors">
                        +233 244 615 202
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary-100 rounded-lg">
                    <Mail className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">
                      <a href="mailto:bwoodinc399@gmail.com" className="hover:text-primary-600 transition-colors">
                        bwoodinc399@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary-100 rounded-lg">
                    <Clock className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Operating Hours</h3>
                    <p className="text-gray-600">
                      Monday - Sunday: 6:00 AM - 10:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Google Maps embed with security attributes */}
              <div className="mt-8 rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.7511050121125!2d-0.1869579!3d5.6037379000000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9b0cab3d92f7%3A0xa1a6977d6c0c91ad!2sBwoodinn%20sports%20complex!5e0!3m2!1sen!2sch!4v1768133945226!5m2!1sen!2sch"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="B Woodinn Sports Complex Location"
                  className="w-full"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            </div>
          </div>
        </div>
      </Section>
      <Footer />
    </main>
  );
}
