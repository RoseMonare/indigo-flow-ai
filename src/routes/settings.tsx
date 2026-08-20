import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { LogoMark } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — WorkFlowAI" },
      {
        name: "description",
        content: "Manage your WorkFlowAI profile, tone of voice and AI transparency preferences.",
      },
      { property: "og:title", content: "Settings — WorkFlowAI" },
      { property: "og:description", content: "Profile, tone and AI transparency preferences." },
    ],
  }),
  component: Settings,
});

function Settings() {
  const [name, setName] = useState("Rose Monare");
  const [email, setEmail] = useState("rose@workflowai.app");
  const [labelAi, setLabelAi] = useState(true);
  const [reasoning, setReasoning] = useState(true);

  return (
    <AppShell>
      <PageHeader title="Settings" subtitle="Your profile and how WorkFlowAI works alongside you." />

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <h2 className="text-sm font-bold text-foreground">Profile</h2>
          <div className="mt-5 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Work email</Label>
              <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <Button onClick={() => toast.success("Profile saved")}>Save changes</Button>
          </div>
        </section>

        <section className="rounded-2xl border border-ai/20 bg-ai-wash p-6 shadow-card">
          <div className="flex items-center gap-2.5">
            <LogoMark className="h-8 w-8" />
            <h2 className="text-sm font-bold text-foreground">AI preferences</h2>
          </div>

          <div className="mt-5 space-y-4">
            <div className="flex items-start justify-between gap-4 rounded-xl bg-card/80 p-4">
              <div>
                <p className="text-sm font-semibold text-foreground">Label AI-generated content</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Show a violet badge on anything WorkFlowAI writes.
                </p>
              </div>
              <Switch checked={labelAi} onCheckedChange={setLabelAi} />
            </div>
            <div className="flex items-start justify-between gap-4 rounded-xl bg-card/80 p-4">
              <div>
                <p className="text-sm font-semibold text-foreground">Show AI reasoning</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Explain why tasks were prioritized the way they were.
                </p>
              </div>
              <Switch checked={reasoning} onCheckedChange={setReasoning} />
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
