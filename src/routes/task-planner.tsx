import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ListChecks, Wand2, Sparkle, Clock } from "lucide-react";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { AiBadge } from "@/components/brand/AiBadge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/task-planner")({
  head: () => ({
    meta: [
      { title: "Task Planner — WorkFlowAI" },
      {
        name: "description",
        content:
          "WorkFlowAI builds a prioritized daily schedule and explains the reasoning behind every choice.",
      },
      { property: "og:title", content: "Task Planner — WorkFlowAI" },
      {
        property: "og:description",
        content: "A prioritized day plan with transparent AI reasoning.",
      },
    ],
  }),
  component: TaskPlanner,
});

const PLAN = [
  { time: "09:00 – 10:30", task: "Nordwind proposal revisions", level: "High", tone: "text-destructive bg-[color-mix(in_oklab,var(--destructive)_10%,white)]" },
  { time: "10:45 – 11:15", task: "Reply to Daniel and confirm the call", level: "High", tone: "text-destructive bg-[color-mix(in_oklab,var(--destructive)_10%,white)]" },
  { time: "11:30 – 12:30", task: "Onboarding timeline slide review", level: "Medium", tone: "text-warning bg-[color-mix(in_oklab,var(--warning)_12%,white)]" },
  { time: "14:00 – 15:00", task: "Design review with stakeholders", level: "Medium", tone: "text-warning bg-[color-mix(in_oklab,var(--warning)_12%,white)]" },
  { time: "15:30 – 16:00", task: "Tidy Q3 retro notes", level: "Low", tone: "text-success bg-[color-mix(in_oklab,var(--success)_12%,white)]" },
];

function TaskPlanner() {
  const [tasks, setTasks] = useState(
    "Nordwind proposal revisions\nReply to Daniel\nOnboarding slide review\nDesign review 14:00\nQ3 retro notes",
  );
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function generate() {
    setLoading(true);
    setDone(false);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 900);
  }

  return (
    <AppShell>
      <PageHeader
        title="Task Planner"
        subtitle="Drop in your list — WorkFlowAI sequences the day and tells you why."
      />

      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[color-mix(in_oklab,var(--success)_12%,white)] text-success">
              <ListChecks className="!size-4.5" />
            </span>
            <h2 className="text-sm font-bold text-foreground">Today's tasks</h2>
          </div>
          <Textarea
            className="mt-5"
            rows={10}
            value={tasks}
            onChange={(e) => setTasks(e.target.value)}
          />
          <Button variant="ai" size="lg" className="mt-4" onClick={generate} disabled={loading}>
            <Wand2 />
            {loading ? "Planning…" : "Generate Schedule"}
          </Button>
        </section>

        <section className="space-y-6">
          {done ? (
            <div className="relative overflow-hidden rounded-2xl border border-ai/25 bg-ai-wash p-6 shadow-card">
              <div className="flex items-center gap-2.5">
                <span className="bg-ai-gradient inline-flex size-9 items-center justify-center rounded-xl text-primary-foreground shadow-[var(--shadow-ai)]">
                  <Sparkle className="!size-4.5" />
                </span>
                <h2 className="text-sm font-bold text-foreground">AI Reasoning</h2>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/90">
                The Nordwind proposal is first because it blocks Daniel's reply and both share a
                Thursday deadline. Your reply is scheduled straight after so the client has the day
                to respond. The 14:00 review is fixed, so lighter review work sits before it, and
                low-urgency retro notes land at the end of the day when focus naturally dips.
              </p>
              <AiBadge className="mt-4" />
            </div>
          ) : null}

          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h2 className="text-sm font-bold text-foreground">Prioritized schedule</h2>
            {loading ? (
              <div className="mt-5 space-y-3">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="ai-sheen h-3 rounded-full opacity-30" />
                ))}
              </div>
            ) : done ? (
              <ul className="mt-4 divide-y divide-border">
                {PLAN.map((p) => (
                  <li key={p.task} className="flex flex-wrap items-center gap-3 py-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                      <Clock className="!size-3.5" />
                      {p.time}
                    </span>
                    <span className="flex-1 text-sm font-medium text-foreground">{p.task}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[0.6875rem] font-semibold ${p.tone}`}
                    >
                      {p.level}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 text-sm text-muted-foreground">
                Generate a schedule to see your day sequenced with reasoning.
              </p>
            )}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
