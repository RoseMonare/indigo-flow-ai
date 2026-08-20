# WorkFlowAI

An intelligent AI productivity suite that helps teams draft emails, summarize meetings, plan tasks, and collaborate with an AI assistant — all in one clean, modern workspace.

![WorkFlowAI](public/favicon.svg)

## Features

- **AI Chat** — Conversational assistant for quick answers, brainstorming, and task help.
- **Smart Email** — Generate and refine professional emails with AI-powered suggestions.
- **Meeting Notes** — Paste transcripts and automatically extract summaries, decisions, and action items.
- **Task Planner** — Prioritize work with an AI reasoning engine that explains why tasks matter.
- **Unified Dashboard** — Central hub with stats, recent activity, and one-click access to every tool.
- **Settings & Transparency** — Manage your profile and control AI feature preferences.

## Tech Stack

- [TanStack Start](https://tanstack.com/start) — Full-stack React framework with SSR and server functions
- [React 19](https://react.dev) — UI library
- [TypeScript](https://www.typescriptlang.org/) — Type-safe development
- [Tailwind CSS v4](https://tailwindcss.com) — Utility-first styling
- [shadcn/ui](https://ui.shadcn.com) — Accessible component primitives
- [Lovable Cloud](https://docs.lovable.dev/features/cloud) — Managed backend, auth, and database

## Design System

WorkFlowAI uses a distinctive indigo + violet identity designed to feel intelligent, trustworthy, and slightly futuristic:

- **Primary:** Indigo `#6366F1`
- **Deep Indigo:** `#4338CA`
- **AI Violet:** `#8B5CF6`
- **Background:** `#F8FAFC`
- **Main Text:** `#0F172A`
- **Secondary Text:** `#64748B`

The visual hierarchy follows a 70/20/10 rule: mostly clean whites and cool grays, 20% indigo for product structure, and 10% violet/gradient accents for AI-powered moments.

## Development

```sh
# Install dependencies
bun install

# Start the development server
bun run dev
```

The dev server runs on `http://localhost:8080` by default.

## Project Structure

```
src/
  components/       # Reusable UI components, brand assets, and layout
  hooks/            # Custom React hooks
  lib/              # Utilities, error handling, and server functions
  routes/           # TanStack Start file-based routes
  styles.css        # Global design tokens, theme variables, and animations
public/             # Static assets
```

## Deployment

This project is built and deployed through [Lovable](https://lovable.dev). Connect Git sync to automatically push changes to a GitHub repository.

## License

This project is proprietary and maintained by the WorkFlowAI team.
