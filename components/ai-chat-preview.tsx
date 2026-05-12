"use client";

import { motion } from "framer-motion";
import { Bot, Mic, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const messages = [
  { role: "user", text: "Find a football turf near Indiranagar for 7 PM." },
  {
    role: "ai",
    text: "Nova Arena has 7:30 PM available, 4.9 rating, and 6 compatible players nearby. I can reserve it and split payment."
  },
  { role: "user", text: "Make two balanced teams too." }
];

export function AiChatPreview() {
  return (
    <div className="glass premium-border rounded-3xl p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Bot className="h-5 w-5" />
          </span>
          <div>
            <p className="font-semibold">TEAMUP Copilot</p>
            <p className="text-xs text-muted-foreground">Context aware sports AI</p>
          </div>
        </div>
        <span className="rounded-full bg-emerald-500/12 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-300">
          Streaming
        </span>
      </div>
      <div className="space-y-3">
        {messages.map((message, index) => (
          <motion.div
            key={message.text}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12 }}
            className={`max-w-[88%] rounded-3xl px-4 py-3 text-sm ${
              message.role === "ai"
                ? "bg-primary/10 text-foreground"
                : "ml-auto bg-slate-950 text-white dark:bg-white dark:text-slate-950"
            }`}
          >
            {message.role === "ai" && <Sparkles className="mb-2 h-4 w-4 text-primary" />}
            {message.text}
          </motion.div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-full border bg-background/70 p-2">
        <Button variant="ghost" size="icon" aria-label="Voice input">
          <Mic className="h-4 w-4" />
        </Button>
        <span className="flex-1 text-sm text-muted-foreground">Ask for turfs, teams, fixtures, workouts...</span>
        <Button size="icon" aria-label="Send prompt">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
