import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={cn("h-9 w-9", className)}
      role="img"
      aria-label="WorkFlowAI logo"
    >
      <defs>
        <linearGradient id="wfai-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill="url(#wfai-g)" />
      <path
        d="M9 12.5 14.5 27 20 17.5 25.5 27 31 12.5"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.95"
      />
      <circle cx="9" cy="12.5" r="2.9" fill="#FFFFFF" />
      <circle cx="31" cy="12.5" r="2.9" fill="#FFFFFF" opacity="0.85" />
      <circle cx="20" cy="17.5" r="2.2" fill="#FFFFFF" opacity="0.7" />
    </svg>
  );
}

export function LogoLockup({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="text-[1.0625rem] font-extrabold tracking-tight text-foreground">
        WorkFlow<span className="text-ai-gradient">AI</span>
      </span>
    </div>
  );
}
