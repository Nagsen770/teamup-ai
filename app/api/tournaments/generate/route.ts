import { getServerSession } from "next-auth";
import OpenAI from "openai";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";

const schema = z.object({
  title: z.string().min(3),
  sport: z.string().min(2),
  teams: z.array(z.string().min(2)).min(4).max(32),
  format: z.enum(["KNOCKOUT", "ROUND_ROBIN", "HYBRID"]),
  startsAt: z.string()
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const limited = rateLimit(`tournament:${session.user.id}`, 10, 60_000);
  if (!limited.ok) return Response.json({ error: "Too many tournament generations." }, { status: 429 });

  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return Response.json({ error: parsed.error.flatten() }, { status: 400 });

  if (!process.env.OPENAI_API_KEY) {
    const teams = parsed.data.teams;
    return Response.json({
      title: parsed.data.title,
      fixtures: teams.reduce<Array<{ round: string; home: string; away: string }>>((acc, team, index) => {
        if (index % 2 === 0 && teams[index + 1]) acc.push({ round: "Round 1", home: team, away: teams[index + 1] });
        return acc;
      }, [])
    });
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "Generate a realistic sports tournament schedule as JSON with rounds, fixtures, suggested venues, rest windows, and fairness notes."
      },
      { role: "user", content: JSON.stringify(parsed.data) }
    ]
  });

  return Response.json(JSON.parse(completion.choices[0]?.message.content ?? "{}"));
}
