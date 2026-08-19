import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, NotebookPen, ListChecks, MessagesSquare, ArrowRight, TrendingUp } from "lucide-react";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { AiBadge, AiDot } from "@/components/brand/AiBadge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WorkFlowAI — Your intelligent work assistant" },
      {
        name: "description",
        content:
          "WorkFlowAI drafts email, summarizes meetings, plans your day and answers questions — one calm AI workspace.",
      },
      { property: "og:title", content: "WorkFlowAI — Your intelligent work assistant" },
      {
        property: "og:description",
        content: "Draft email, summarize meetings and plan your day with WorkFlowAI.",
      },
    ],
  }),
  component: Dashboard,
});

const features = [
  {
    to: "/smart-email",
    name: "Smart Email",
    icon: Mail,
    desc: "Turn a rough thought into a polished, on-brand email in seconds.",
    tint: "bg-primary-soft text-primary",
    cta: "Generate Email",
  },
  {
    to: "/meeting-notes",
    name: "Meeting Notes",
    icon: NotebookPen,
    desc: "Condense long transcripts into decisions, owners and next steps.",
    tint: "bg-ai-soft text-ai",
    cta: "Summarize Notes",
  },
  {
    to: "/task-planner",
    name: "Task Planner",
    icon: ListChecks,
    desc: "Get a prioritized schedule with the reasoning behind every choice.",
    tint: "bg-[color-mix(in_oklab,var(--success)_12%,white)] text-success",
    cta: "Generate Schedule",
  },
  {
    to: "/ai-chat",
    name: "AI Chat",
    icon: MessagesSquare,
    desc: "Ask WorkFlowAI anything about your work, projects and priorities.",
    tint: "bg-ai-wash text-ai",
    cta: "Ask WorkFlowAI",
  },
] as const;

const stats = [
  { label: "Hours saved this week", value: "6.4", trend: "+18%" },
  { label: "Emails drafted", value: "27", trend: "+9%" },
  { label: "Meetings summarized", value: "12", trend: "+31%" },
  { label: "Tasks auto-prioritized", value: "48", trend: "+12%" },
];

function Dashboard() {
  return (
    <AppShell>
      <PageHeader
        title={<>Good morning, Rose 👋</>}
        subtitle="What can WorkFlowAI help you accomplish today?"
        action={
          <Button variant="ai" size="lg" asChild>
            <Link to="/ai-chat">
              Ask WorkFlowAI
              <ArrowRight />
            </Link>
          </Button>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <p className="text-xs font-medium text-muted-foreground">{s.label}</p>
            <div className="mt-3 flex items-end justify-between">
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-success">
                <TrendingUp className="!size-3.5" />
                {s.trend}
              </span>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-10">
        <div className="mb-4 flex items-center gap-2">
          <h2 className="text-lg font-bold text-foreground">Your workspace</h2>
          <AiDot />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {features.map((f) => (
            <article
              key={f.name}
              className="card-lift flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card"
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className={`inline-flex size-11 items-center justify-center rounded-xl ${f.tint}`}
                >
                  <f.icon className="!size-5" />
                </span>
                <AiBadge label="AI powered" />
              </div>
              <h3 className="mt-5 text-base font-bold text-foreground">{f.name}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              <div className="mt-5">
                <Button variant="ai" asChild>
                  <Link to={f.to}>
                    {f.cta}
                    <ArrowRight />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-ai/20 bg-ai-wash p-6 shadow-card">
        <AiBadge />
        <h2 className="mt-3 text-lg font-bold text-foreground">Today's focus suggestion</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Two client deadlines land on Thursday, so WorkFlowAI recommends protecting a 90-minute
          block this morning for the Nordwind proposal before the design review at 14:00.
        </p>
      </section>
    </AppShell>
  );
}
