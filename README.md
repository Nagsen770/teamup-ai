# TEAMUP AI

TEAMUP AI is a production-oriented AI turf booking and sports community SaaS for players, turf owners, and admins.

## Stack

- Next.js 15 App Router, React 19, TypeScript
- Tailwind CSS, shadcn-style Radix primitives, Framer Motion, Lucide icons
- Zustand-ready architecture, TanStack Query provider, React Hook Form, Zod
- PostgreSQL + Prisma + NextAuth with credentials and Google providers
- OpenAI streaming chat route
- Razorpay order creation route
- Google Maps key wiring, SEO metadata, sitemap, robots, manifest, PWA-ready shell

## Quick Start

```bash
cp .env.example .env
npm install
npm run db:generate
npm run db:push
npm run dev
```

Open `http://localhost:3000`.

## Environment

Set these in `.env` locally and in Vercel project settings:

```bash
DATABASE_URL=
NEXTAUTH_URL=
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
OPENAI_API_KEY=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
NEXT_PUBLIC_RAZORPAY_KEY_ID=
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
NEXT_PUBLIC_APP_URL=
```

## Architecture

- `app/page.tsx` is the investor-grade landing product surface.
- `app/dashboard`, `app/discover`, `app/tournaments`, and `app/admin` are role-oriented SaaS modules.
- `app/api/ai/chat` streams OpenAI responses for recommendations, coaching, and fixture generation.
- `app/api/bookings` protects live booking creation with validation, rate limiting, and transactional slot locking.
- `app/api/payments/razorpay/order` creates Razorpay orders and records payment state.
- `prisma/schema.prisma` models users, owners, turfs, slots, bookings, payments, teams, matches, tournaments, chat, notifications, analytics, and AI logs.

## Deployment

1. Create a PostgreSQL database.
2. Add the environment variables in Vercel.
3. Run `npx prisma db push` once against production or use migrations in a managed release flow.
4. Deploy with Vercel. The build script runs `prisma generate && next build`.

## Production Notes

- Replace demo credentials with real signup and seeded users.
- Add Razorpay webhook verification before marking payments as paid.
- Add a managed realtime layer through Supabase Realtime, Pusher, Ably, or Socket.io.
- Add persistent AI chat storage by inserting messages into `ChatThread`, `ChatMessage`, and `AiLog`.
- Add object storage for turf images and owner KYC documents.
