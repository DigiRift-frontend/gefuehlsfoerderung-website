import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const variants = {
  primary:
    "bg-lavender text-white hover:bg-lavender-dark shadow-sm hover:shadow-md",
  secondary: "bg-sage text-white hover:bg-sage-dark shadow-sm hover:shadow-md",
  outline:
    "border-2 border-lavender text-lavender-dark hover:bg-lavender/10",
  ghost: "text-charcoal-light hover:bg-lavender/10 hover:text-lavender-dark",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  className,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-200 active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-lavender/50 focus:ring-offset-2 focus:ring-offset-cream",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
