import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("x-razorpay-signature");
  const secret = process.env.RAZORPAY_KEY_SECRET;

  if (!signature || !secret) {
    return Response.json({ error: "Missing Razorpay signature configuration." }, { status: 400 });
  }

  const expected = crypto.createHmac("sha256", secret).update(body).digest("hex");
  if (expected !== signature) {
    return Response.json({ error: "Invalid signature." }, { status: 400 });
  }

  const event = JSON.parse(body) as {
    event: string;
    payload?: { payment?: { entity?: { order_id?: string; id?: string } } };
  };

  if (event.event === "payment.captured") {
    const orderId = event.payload?.payment?.entity?.order_id;
    const paymentId = event.payload?.payment?.entity?.id;
    if (orderId) {
      await prisma.payment.updateMany({
        where: { providerOrderId: orderId },
        data: { status: "PAID", providerPaymentId: paymentId }
      });
    }
  }

  return Response.json({ received: true });
}
