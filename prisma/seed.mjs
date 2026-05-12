import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("teamupdemo", 12);

  const [player, owner, admin] = await Promise.all([
    prisma.user.upsert({
      where: { email: "player@teamup.ai" },
      update: {},
      create: {
        email: "player@teamup.ai",
        name: "Aarav Player",
        passwordHash,
        role: "PLAYER",
        city: "Bengaluru",
        skillRating: 1480
      }
    }),
    prisma.user.upsert({
      where: { email: "owner@teamup.ai" },
      update: {},
      create: {
        email: "owner@teamup.ai",
        name: "Meera Owner",
        passwordHash,
        role: "TURF_OWNER",
        city: "Bengaluru"
      }
    }),
    prisma.user.upsert({
      where: { email: "admin@teamup.ai" },
      update: {},
      create: {
        email: "admin@teamup.ai",
        name: "TEAMUP Admin",
        passwordHash,
        role: "ADMIN",
        city: "Bengaluru"
      }
    })
  ]);

  const turf = await prisma.turf.upsert({
    where: { id: "seed-nova-arena" },
    update: {},
    create: {
      id: "seed-nova-arena",
      ownerId: owner.id,
      name: "Nova Arena",
      description: "Premium 5v5 football turf with AI-assisted matchmaking and QR entry.",
      address: "Indiranagar, Bengaluru",
      city: "Bengaluru",
      sport: "Football",
      pricePerHr: 1800,
      rating: 4.9,
      latitude: 12.9784,
      longitude: 77.6408,
      amenities: ["Floodlights", "Parking", "Showers", "Cafe"],
      images: ["https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=900&q=80"],
      verified: true
    }
  });

  await prisma.slot.createMany({
    data: [0, 1, 2].map((offset) => {
      const startsAt = new Date();
      startsAt.setDate(startsAt.getDate() + offset);
      startsAt.setHours(18 + offset, 30, 0, 0);
      const endsAt = new Date(startsAt.getTime() + 90 * 60 * 1000);
      return { turfId: turf.id, startsAt, endsAt, price: 1800 + offset * 200 };
    }),
    skipDuplicates: true
  });

  console.log(`Seeded TEAMUP AI users: ${player.email}, ${owner.email}, ${admin.email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
