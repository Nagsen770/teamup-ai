import { NextRequest } from "next/server";
import OpenAI from "openai";
import { chatSchema } from "@/lib/validations";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "edge";

const systemPrompt = `You are TEAMUP Copilot, an AI assistant for an Indian sports booking SaaS.
Help players book turfs, find teammates, balance teams, generate tournaments, suggest workouts, prevent injuries,
and help turf owners optimize pricing and schedules. Be concise, practical, and location-aware when context exists.`;

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "local";
  const limited = rateLimit(`ai:${ip}`, 20, 60_000);
  if (!limited.ok) {
    return Response.json({ error: "Too many AI requests. Please slow down." }, { status: 429 });
  }

  const parsed = chatSchema.safeParse(await request.json());
  if (!parsed.success) {
    return Response.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return Response.json({
      role: "assistant",
      content:
        "OpenAI is not configured yet. Add OPENAI_API_KEY to enable streaming recommendations, fixture generation, and sports coaching."
    });
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const stream = await client.chat.completions.create({
    model: "gpt-4o-mini",
    stream: true,
    messages: [{ role: "system", content: systemPrompt }, ...parsed.data.messages],
    temperature: 0.7
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const token = chunk.choices[0]?.delta?.content;
        if (token) controller.enqueue(encoder.encode(token));
      }
      controller.close();
    }
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache"
    }
  });
}
