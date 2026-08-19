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
  component: MeetingNotes;
});

function MeetingNotes() {
  return null;
}
