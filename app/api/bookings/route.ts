import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { bookingSchema } from "@/lib/validations";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const limited = rateLimit(`booking:${session.user.id}`, 12, 60_000);
  if (!limited.ok) return Response.json({ error: "Too many booking attempts." }, { status: 429 });

  const parsed = bookingSchema.safeParse(await request.json());
  if (!parsed.success) return Response.json({ error: parsed.error.flatten() }, { status: 400 });

  const booking = await prisma.$transaction(async (tx) => {
    const slot = await tx.slot.findUnique({ where: { id: parsed.data.slotId } });
    if (!slot?.available) throw new Error("Slot is no longer available");

    await tx.slot.update({ where: { id: slot.id }, data: { available: false } });
    return tx.booking.create({
      data: {
        userId: session.user.id,
        turfId: parsed.data.turfId,
        slotId: parsed.data.slotId,
        amount: parsed.data.amount,
        qrCode: `TEAMUP-${crypto.randomUUID()}`
      }
    });
  });

  return Response.json({ booking });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bookings = await prisma.booking.findMany({
    where: { userId: session.user.id },
    include: { turf: true, slot: true, payment: true },
    orderBy: { createdAt: "desc" },
    take: 20
  });

  return Response.json({ bookings });
}
