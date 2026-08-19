import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Wand2, Copy } from "lucide-react";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { AiBadge } from "@/components/brand/AiBadge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/smart-email")({
  head: () => ({
    meta: [
      { title: "Smart Email — WorkFlowAI" },
      {
        name: "description",
        content: "Turn a rough note into a polished, professional email draft with WorkFlowAI.",
      },
      { property: "og:title", content: "Smart Email — WorkFlowAI" },
      { property: "og:description", content: "Draft professional email in seconds with WorkFlowAI." },
    ],
  }),
  component: SmartEmail,
});

const SAMPLE = `Hi Daniel,

Thanks for the thoughtful feedback on the Nordwind proposal — it helped us tighten the scope considerably.

I've attached the revised version with the updated timeline and a clearer breakdown of the onboarding phase. The delivery date moves to 14 March, which keeps us comfortably ahead of your board review.

Would Thursday at 15:00 work for a short call to confirm the final details?

Best regards,
Rose`;

function SmartEmail() {
  const [subject, setSubject] = useState("Revised Nordwind proposal");
  const [brief, setBrief] = useState(
    "reply to daniel, thank him for feedback, share revised proposal, new date 14 march, ask for a call thursday 3pm",
  );
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  function generate() {
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(SAMPLE);
      setLoading(false);
    }, 900);
  }

  return (
    <AppShell>
      <PageHeader
        title="Smart Email"
        subtitle="Describe what you want to say — WorkFlowAI writes the professional version."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <Mail className="!size-4.5" />
            </span>
            <h2 className="text-sm font-bold text-foreground">Your brief</h2>
          </div>

          <div className="mt-5 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="brief">What should it say?</Label>
              <Textarea
                id="brief"
                rows={7}
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
              />
            </div>
            <Button variant="ai" size="lg" onClick={generate} disabled={loading}>
              <Wand2 />
              {loading ? "Generating…" : "Generate Email"}
            </Button>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-bold text-foreground">Draft</h2>
            {result ? <AiBadge /> : null}
          </div>

          {loading ? (
            <div className="mt-5 space-y-3">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="ai-sheen h-3 rounded-full opacity-30" />
              ))}
            </div>
          ) : result ? (
            <>
              <pre className="mt-5 whitespace-pre-wrap rounded-xl bg-secondary/70 p-4 text-sm leading-relaxed text-foreground">
                {result}
              </pre>
              <Button
                variant="soft"
                className="mt-4"
                onClick={() => {
                  void navigator.clipboard.writeText(result);
                  toast.success("Draft copied to clipboard");
                }}
              >
                <Copy />
                Copy draft
              </Button>
            </>
          ) : (
            <p className="mt-6 text-sm text-muted-foreground">
              Your generated email will appear here, clearly marked as AI-generated.
            </p>
          )}
        </section>
      </div>
    </AppShell>
  );
}
