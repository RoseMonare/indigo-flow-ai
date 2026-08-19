import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { NotebookPen, Wand2, CheckCircle2 } from "lucide-react";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { AiBadge } from "@/components/brand/AiBadge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/meeting-notes")({
  head: () => ({
    meta: [
      { title: "Meeting Notes — WorkFlowAI" },
      {
        name: "description",
        content:
          "Paste a transcript and WorkFlowAI returns decisions, owners and next steps in seconds.",
      },
      { property: "og:title", content: "Meeting Notes — WorkFlowAI" },
      {
        property: "og:description",
        content: "Summaries, decisions and action items from any meeting transcript.",
      },
    ],
  }),
  component: MeetingNotes,
});

const SUMMARY = [
  "The Nordwind onboarding phase moves from four to three weeks after scope was trimmed.",
  "Design review shifts to Thursday 14:00 so both client stakeholders can attend.",
  "Pricing stays unchanged; the discount request was declined with a rationale to be sent by email.",
];

const ACTIONS = [
  { task: "Send revised proposal to Daniel", owner: "Rose", due: "Today" },
  { task: "Prepare onboarding timeline slide", owner: "Amara", due: "Wed" },
  { task: "Confirm review invite with stakeholders", owner: "Tom", due: "Wed" },
];

function MeetingNotes() {
  const [transcript, setTranscript] = useState(
    "Rose: ... let's trim onboarding to three weeks. Daniel: works, but the review has to move. Tom: Thursday afternoon then. Amara: I'll redo the timeline slide...",
  );
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function summarize() {
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
        title="Meeting Notes"
        subtitle="Paste a transcript — WorkFlowAI extracts the decisions, owners and next steps."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-ai-soft text-ai">
              <NotebookPen className="!size-4.5" />
            </span>
            <h2 className="text-sm font-bold text-foreground">Transcript</h2>
          </div>
          <Textarea
            className="mt-5"
            rows={12}
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
          />
          <Button variant="ai" size="lg" className="mt-4" onClick={summarize} disabled={loading}>
            <Wand2 />
            {loading ? "Summarizing…" : "Summarize Notes"}
          </Button>
        </section>

        <section className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-sm font-bold text-foreground">Summary</h2>
              {done ? <AiBadge /> : null}
            </div>
            {loading ? (
              <div className="mt-5 space-y-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="ai-sheen h-3 rounded-full opacity-30" />
                ))}
              </div>
            ) : done ? (
              <ul className="mt-5 space-y-3">
                {SUMMARY.map((s) => (
                  <li key={s} className="flex gap-3 text-sm leading-relaxed text-foreground">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    {s}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 text-sm text-muted-foreground">
                Your summary will appear here with a clear AI-generated marker.
              </p>
            )}
          </div>

          {done ? (
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h2 className="text-sm font-bold text-foreground">Action items</h2>
              <ul className="mt-4 divide-y divide-border">
                {ACTIONS.map((a) => (
                  <li key={a.task} className="flex items-center gap-3 py-3">
                    <CheckCircle2 className="size-4 shrink-0 text-success" />
                    <span className="flex-1 text-sm text-foreground">{a.task}</span>
                    <span className="text-xs text-muted-foreground">{a.owner}</span>
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-[0.6875rem] font-semibold text-muted-foreground">
                      {a.due}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>
      </div>
    </AppShell>
  );
}
