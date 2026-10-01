import { cn } from "@/lib/styles";
import type { LucideIcon } from "lucide-react";

interface IconBoxProps {
  icon: LucideIcon;
  className?: string;
  iconClassName?: string;
  variant?: "default" | "large" | "outline";
}

export function IconBox({
  icon: Icon,
  className,
  iconClassName,
  variant = "default",
}: IconBoxProps) {
  const isLarge = variant === "large";
  const isOutline = variant === "outline";

  return (
    <div
      className={cn(
        "shrink-0 flex items-center justify-center transition-all duration-300",
        isLarge && "w-14 h-14 rounded-2xl bg-primary/10 text-primary-foreground",
        !isLarge && !isOutline && "w-10 h-10 rounded-lg bg-primary/10 text-primary-foreground",
        isOutline &&
          "w-12 h-12 rounded-xl border border-border bg-background text-muted-foreground hover:border-primary hover:text-primary",
        className
      )}
    >
      <Icon
        className={cn(
          "text-primary-foreground",
          isOutline && "text-current",
          isLarge ? "h-7 w-7" : "h-5 w-5",
          iconClassName
        )}
        strokeWidth={1.5}
      />
    </div>
  );
}
