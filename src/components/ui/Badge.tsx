import { cn } from "@/lib/utils";

type BadgeProps = {
  variant?: "handmade" | "sale" | "new" | "expert";
  children: React.ReactNode;
  className?: string;
};

const variants = {
  handmade: "bg-amber-100 text-amber-800 border-amber-300",
  sale: "bg-red-100 text-red-700 border-red-300",
  new: "bg-emerald-100 text-emerald-700 border-emerald-300",
  expert: "bg-purple-100 text-purple-700 border-purple-300",
};

export function Badge({ variant = "handmade", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
