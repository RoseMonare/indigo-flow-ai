import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Mail,
  NotebookPen,
  ListChecks,
  MessagesSquare,
  Settings,
} from "lucide-react";
import type { ReactNode } from "react";
import { LogoLockup } from "@/components/brand/Logo";
import { AiDot } from "@/components/brand/AiBadge";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/smart-email", label: "Smart Email", icon: Mail },
  { to: "/meeting-notes", label: "Meeting Notes", icon: NotebookPen },
  { to: "/task-planner", label: "Task Planner", icon: ListChecks },
  { to: "/ai-chat", label: "AI Chat", icon: MessagesSquare, ai: true },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-[260px] flex-col border-r border-border bg-sidebar px-4 py-5 lg:flex">
        <Link to="/" className="px-2">
          <LogoLockup />
        </Link>

        <nav className="mt-8 flex flex-col gap-1">
          <p className="px-3 pb-2 text-[0.6875rem] font-semibold uppercase tracking-widest text-muted-foreground">
            Workspace
          </p>
          {nav.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                <item.icon
                  className={cn(
                    "size-4.5 transition-colors",
                    active ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
                  )}
                />
                <span className="flex-1">{item.label}</span>
                {"ai" in item && item.ai ? <AiDot /> : null}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto rounded-2xl border border-ai/20 bg-ai-wash p-4">
          <p className="text-xs font-semibold text-foreground">AI credits</p>
          <p className="mt-1 text-xs text-muted-foreground">842 of 1,000 remaining this month</p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/70">
            <div className="bg-ai-gradient h-full w-[84%] rounded-full" />
          </div>
        </div>
      </aside>

      <div className="lg:pl-[260px]">
        <header className="flex items-center justify-between gap-4 border-b border-border bg-card/80 px-5 py-3 backdrop-blur lg:hidden">
          <LogoLockup />
        </header>
        <nav className="flex gap-1 overflow-x-auto border-b border-border bg-card px-3 py-2 lg:hidden">
          {nav.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium",
                  active ? "bg-sidebar-accent text-primary" : "text-muted-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <main className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-10">{children}</main>
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: ReactNode;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-foreground sm:text-[2rem]">{title}</h1>
        {subtitle ? <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}
