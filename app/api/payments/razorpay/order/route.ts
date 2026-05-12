import Razorpay from "razorpay";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { razorpayOrderSchema } from "@/lib/validations";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const limited = rateLimit(`payment:${session.user.id}`, 20, 60_000);
  if (!limited.ok) return Response.json({ error: "Too many payment attempts." }, { status: 429 });

  const parsed = razorpayOrderSchema.safeParse(await request.json());
  if (!parsed.success) return Response.json({ error: parsed.error.flatten() }, { status: 400 });

  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    return Response.json({ error: "Razorpay keys are not configured." }, { status: 500 });
  }

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });

  const order = await razorpay.orders.create({
    amount: parsed.data.amount * 100,
    currency: parsed.data.currency,
    receipt: parsed.data.bookingId,
    notes: { bookingId: parsed.data.bookingId, userId: session.user.id }
  });

  await prisma.payment.upsert({
    where: { bookingId: parsed.data.bookingId },
    update: { providerOrderId: order.id, amount: parsed.data.amount, status: "CREATED" },
    create: {
      bookingId: parsed.data.bookingId,
      providerOrderId: order.id,
      amount: parsed.data.amount,
      status: "CREATED"
    }
  });

  return Response.json({ order });
}
