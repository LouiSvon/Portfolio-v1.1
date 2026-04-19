import type { HTMLAttributes, ReactNode } from "react";

type BadgeVariant = "featured" | "neutral" | "technology";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  variant?: BadgeVariant;
};

const badgeClassNames: Record<BadgeVariant, string> = {
  featured: "badge badge-featured",
  neutral: "badge badge-neutral",
  technology: "badge badge-technology",
};

export function Badge({
  children,
  className,
  variant = "neutral",
  ...props
}: BadgeProps) {
  return (
    <span
      className={[badgeClassNames[variant], className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </span>
  );
}
