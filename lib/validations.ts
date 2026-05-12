import { z } from "zod";

export const bookingSchema = z.object({
  turfId: z.string().min(1),
  slotId: z.string().min(1),
  amount: z.number().int().positive()
});

export const chatSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["system", "user", "assistant"]),
        content: z.string().min(1).max(4000)
      })
    )
    .min(1)
    .max(20)
});

export const razorpayOrderSchema = z.object({
  bookingId: z.string().min(1),
  amount: z.number().int().positive(),
  currency: z.literal("INR").default("INR")
});
