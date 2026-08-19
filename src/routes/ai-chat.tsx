import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send, Sparkle } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { LogoMark } from "@/components/brand/Logo";
import { AiBadge, AiDot } from "@/components/brand/AiBadge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/ai-chat")({
  head: () => ({
    meta: [
      { title: "AI Chat — WorkFlowAI" },
      {
        name: "description",
        content:
          "Ask WorkFlowAI about your projects, priorities and drafts in one calm conversation.",
      },
      { property: "og:title", content: "AI Chat — WorkFlowAI" },
      { property: "og:description", content: "The intelligence at the centre of your workspace." },
    ],
  }),
  component: AiChat,
});

type Msg = { role: "user" | "ai"; text: string };

const SUGGESTIONS = [
  "What should I focus on before Thursday?",
  "Summarize the Nordwind account status",
  "Draft a polite deadline extension request",
];

const REPLY =
  "Based on your week, Thursday is the pressure point: the Nordwind proposal and the design review land on the same day. I'd finish the proposal revisions this morning while the feedback is fresh, then keep Wednesday afternoon free as buffer. Everything else on your list can slip a day without consequence.";

function AiChat() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "ai",
      text: "Hi Rose — I have context on your projects, meetings and tasks. What would you like to work through?",
    },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);

  function send(text: string) {
    const value = text.trim();
    if (!value || thinking) return;
    setMessages((m) => [...m, { role: "user", text: value }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "ai", text: REPLY }]);
      setThinking(false);
    }, 1100);
  }

  return (
    <AppShell>
      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
        <header className="bg-ai-gradient flex items-center gap-3 px-6 py-5">
          <span className="inline-flex size-10 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
            <LogoMark className="h-6 w-6" />
          </span>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-primary-foreground">WorkFlowAI</h1>
              <AiDot className="[&>span]:bg-white" />
            </div>
            <p className="text-xs text-primary-foreground/80">
              {thinking ? "Thinking through your workspace…" : "Online · aware of your workspace"}
            </p>
          </div>
          <Sparkle className="size-5 text-primary-foreground/80" />
        </header>

        <div className="space-y-5 px-6 py-7">
          {messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "flex justify-end" : ""}>
              {m.role === "user" ? (
                <p className="max-w-[85%] rounded-2xl rounded-br-md bg-primary px-4 py-3 text-sm leading-relaxed text-primary-foreground">
                  {m.text}
                </p>
              ) : (
                <div className="max-w-[92%]">
                  <p className="text-sm leading-relaxed text-foreground">{m.text}</p>
                  {i > 0 ? <AiBadge className="mt-2.5" /> : null}
                </div>
              )}
            </div>
          ))}

          {thinking ? (
            <div className="flex items-center gap-2.5">
              <span className="ai-sheen h-2 w-28 rounded-full" />
              <span className="text-xs font-medium text-ai">WorkFlowAI is reasoning…</span>
            </div>
          ) : null}
        </div>

        <div className="border-t border-border bg-background/60 px-6 py-5">
          <div className="mb-3 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex items-end gap-3">
            <Textarea
              rows={2}
              placeholder="Ask WorkFlowAI anything…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              className="resize-none bg-card"
            />
            <Button variant="ai" size="icon" onClick={() => send(input)} disabled={thinking}>
              <Send />
            </Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
