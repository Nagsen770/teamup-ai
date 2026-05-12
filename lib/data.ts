import {
  Activity,
  BadgeIndianRupee,
  Bot,
  CalendarDays,
  ChartNoAxesCombined,
  MapPin,
  Medal,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Zap
} from "lucide-react";

export const stats = [
  { label: "verified turfs", value: "1,280+" },
  { label: "monthly players", value: "82K" },
  { label: "AI matches made", value: "31K" },
  { label: "owner revenue tracked", value: "Rs 18Cr" }
];

export const features = [
  {
    icon: Bot,
    title: "AI Sports Assistant",
    text: "Chat, voice prompts, markdown answers, smart turf picks, team balancing, warmups, and tournament scheduling."
  },
  {
    icon: CalendarDays,
    title: "Real-Time Slot Engine",
    text: "Availability, dynamic pricing, QR confirmations, live booking updates, and Razorpay checkout flows."
  },
  {
    icon: UsersRound,
    title: "Community Network",
    text: "Player profiles, nearby discovery, teams, match invites, communities, comments, likes, and online presence."
  },
  {
    icon: ChartNoAxesCombined,
    title: "Owner SaaS Dashboard",
    text: "Revenue analytics, peak-hour insights, AI pricing suggestions, approvals, reports, and fraud signals."
  },
  {
    icon: Medal,
    title: "Tournament OS",
    text: "Knockout and round-robin brackets, fixtures, live leaderboards, registrations, and AI-generated summaries."
  },
  {
    icon: ShieldCheck,
    title: "Production Guardrails",
    text: "Role permissions, validation, rate limits, protected APIs, secure auth, SEO, PWA, and deploy-ready config."
  }
];

export const turfs = [
  {
    name: "Nova Arena",
    area: "Indiranagar, Bengaluru",
    rating: 4.9,
    price: 1800,
    distance: "1.8 km",
    sport: "Football",
    image:
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=900&q=80",
    slots: ["6:00 PM", "7:30 PM", "9:00 PM"],
    ai: "Best pick for 5v5 tonight. Skill balance: high."
  },
  {
    name: "Pulse Box Cricket",
    area: "Bandra West, Mumbai",
    rating: 4.8,
    price: 2400,
    distance: "3.2 km",
    sport: "Cricket",
    image:
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=900&q=80",
    slots: ["5:30 PM", "8:00 PM", "10:00 PM"],
    ai: "AI predicts 18% lower price after 9 PM."
  },
  {
    name: "Astra Badminton Club",
    area: "Koregaon Park, Pune",
    rating: 4.7,
    price: 700,
    distance: "900 m",
    sport: "Badminton",
    image:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=900&q=80",
    slots: ["6:30 AM", "7:00 PM", "8:00 PM"],
    ai: "Two compatible doubles partners nearby."
  }
];

export const dashboardMetrics = [
  { label: "Bookings", value: "248", delta: "+18%", icon: CalendarDays },
  { label: "Revenue", value: "Rs 4.8L", delta: "+24%", icon: BadgeIndianRupee },
  { label: "Fill rate", value: "86%", delta: "+9%", icon: Activity },
  { label: "AI saves", value: "41 hrs", delta: "+12%", icon: Zap }
];

export const revenueData = [
  { month: "Jan", bookings: 148, revenue: 220000 },
  { month: "Feb", bookings: 169, revenue: 260000 },
  { month: "Mar", bookings: 188, revenue: 310000 },
  { month: "Apr", bookings: 230, revenue: 390000 },
  { month: "May", bookings: 248, revenue: 480000 },
  { month: "Jun", bookings: 294, revenue: 560000 }
];

export const aiRecommendations = [
  "Open a 7:30 PM football mixer at Nova Arena; demand is 32% above baseline.",
  "Offer 10% loyalty credit to returning badminton players before monsoon weeks.",
  "Balance tonight's 8v8 with Aarav, Dev, Ishan, and Kabir as defensive anchors.",
  "Move U17 tournament finals to Sunday 6 PM for highest attendance probability."
];

export const adminRows = [
  { turf: "Nova Arena", owner: "Karthik S.", status: "Verified", risk: "Low", revenue: "Rs 1.8L" },
  { turf: "Pulse Box Cricket", owner: "Meera A.", status: "Review", risk: "Medium", revenue: "Rs 2.4L" },
  { turf: "Astra Badminton Club", owner: "Rohan P.", status: "Verified", risk: "Low", revenue: "Rs 82K" }
];

export const quickActions = [
  { icon: Sparkles, label: "Generate fixtures" },
  { icon: MapPin, label: "Find nearby players" },
  { icon: BadgeIndianRupee, label: "Optimize prices" }
];
