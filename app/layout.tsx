import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: {
    default: "TEAMUP AI | AI Turf Booking & Sports Community SaaS",
    template: "%s | TEAMUP AI"
  },
  description:
    "Book turfs, build teams, run tournaments, and grow sports communities with AI-powered recommendations for players and turf owners.",
  keywords: ["turf booking", "sports SaaS", "AI sports", "Razorpay", "tournament platform", "India"],
  openGraph: {
    title: "TEAMUP AI",
    description: "Book. Play. Connect. Powered by AI.",
    url: "/",
    siteName: "TEAMUP AI",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "TEAMUP AI",
    description: "A premium AI-powered sports booking and community platform."
  },
  icons: {
    icon: "/favicon.svg"
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4fbfa" },
    { media: "(prefers-color-scheme: dark)", color: "#07111f" }
  ],
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
