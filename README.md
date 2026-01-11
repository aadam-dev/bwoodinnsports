# B Woodinn Sports Complex - Website Project

A modern, professional website platform for B Woodinn Sports Complex in Adenta, Accra, Ghana. Built with Next.js, TypeScript, and Tailwind CSS.

## Project Overview

This website serves as:
- Professional Online Presence - Brand identity and credibility
- 24/7 Booking System - Online facility reservations
- Event Promotion Platform - Showcase tournaments and events
- Information Hub - Central location for all facility information
- Revenue Driver - Increase bookings through online visibility

## Project Status

**Current Phase:** Development  
**Start Date:** January 2025  
**Target Launch:** April 2025

## Project Structure

```
bwoodinn-sports/
├── app/                      # Next.js App Router
├── components/               # React components
│   ├── layout/              # Layout components
│   ├── sections/            # Page sections
│   └── ui/                  # UI components
├── lib/                      # Utilities and helpers
│   └── utils/               # Utility functions
└── public/                   # Static assets
```

## Quick Start

### Prerequisites
- Node.js 18+ or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Email service
RESEND_API_KEY=your_resend_key
# OR
SENDGRID_API_KEY=your_sendgrid_key

# Payment gateway
PAYSTACK_SECRET_KEY=your_paystack_key
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
# OR
FLUTTERWAVE_SECRET_KEY=your_flutterwave_key
NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY=your_flutterwave_public_key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Tech Stack

- Framework: Next.js 14 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Database: Supabase (PostgreSQL)
- Icons: Lucide React
- Forms: React Hook Form
- Hosting: Vercel (recommended)

## Project Phases

### Phase 1: Core Website
- Project setup
- Design system
- Core pages (Home, About, Facilities, Contact, Gallery)

### Phase 2: Booking System
- Booking form and calendar
- Database setup
- Email confirmations

### Phase 3: Events & Admin
- Events page
- Admin portal
- Content management

### Phase 4: Payments & Launch
- Payment integration
- Testing
- Launch

## Key Features

- Responsive design (mobile-first)
- Online booking system
- Event management
- Admin portal
- Payment integration
- Email automation
- Analytics dashboard

