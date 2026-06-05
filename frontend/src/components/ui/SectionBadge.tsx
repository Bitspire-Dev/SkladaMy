import { cn } from "@/lib/styles";

interface SectionBadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "accent";
}

export function SectionBadge({ children, className, variant = "default" }: SectionBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase transition-colors",
        variant === "default" && "bg-secondary text-secondary-foreground",
        variant === "outline" && "border border-border bg-transparent text-muted-foreground",
        variant === "accent" && "bg-primary/10 text-primary-foreground border border-primary/20",
        className
      )}
    >
      <span
        className={cn(
          "inline-block size-2 rounded-full",
          variant === "accent" ? "bg-primary" : "bg-primary"
        )}
      />
      {children}
    </div>
  );
}
