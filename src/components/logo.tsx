import { cn } from "@/lib/utils";
import { Leaf } from "lucide-react";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 text-xl font-bold font-headline", className)}>
      <Leaf className="h-6 w-6 text-primary" />
      <span>Bloom</span>
    </div>
  );
}
