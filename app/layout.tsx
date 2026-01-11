import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

// Validate environment variables on startup (development only)
if (process.env.NODE_ENV === "development") {
  try {
    // Only validate in development to avoid blocking production
    // In production, validation should happen at build time
    const { validateAppEnv } = require("@/lib/utils/env");
    validateAppEnv();
  } catch (error) {
    // Log but don't block in development
    console.warn("Environment validation warning:", error);
  }
}

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "B Woodinn Sports Complex | Premier Sports Venue in Accra",
  description: "B Woodinn Sports Complex in Adenta, Accra - Your premier destination for football tournaments, basketball events, and venue rentals. Capacity: 1,390 guests.",
  keywords: ["sports complex", "football", "basketball", "venue rental", "Accra", "Ghana"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}

