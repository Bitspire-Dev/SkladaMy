import { cn } from "@/lib/styles";

interface TrustDotProps {
  className?: string;
}

/**
 * Reusable brand-colored dot indicator
 * Used in trust signals, feature highlights, and visual emphasis
 */
export function TrustDot({ className }: TrustDotProps) {
  return (
    <div className={cn("rounded-full bg-[#FFC400]/20 p-3", className)}>
      <div className="h-6 w-6 rounded-full bg-[#FFC400]" />
    </div>
  );
}
