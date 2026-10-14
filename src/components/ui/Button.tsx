import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "cta";
  /** cta は最終導線用。通常より一回り大きく出す。 */
  size?: "default" | "lg";
  className?: string;
  external?: boolean;
}

const variantClass: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-[var(--color-ink-900)] text-[var(--color-paper-050)] hover:bg-[var(--color-accent-600)]",
  secondary:
    "border border-[var(--color-ink-900)] text-[var(--color-ink-900)] hover:bg-[var(--color-ink-900)] hover:text-[var(--color-paper-050)]",
  ghost: "text-[var(--color-ink-900)] hover:text-[var(--color-accent-600)]",
  // 最終CTA。他のボタンと見分けがつくよう黒地＋白文字にし、ホバーで明度を上げる。
  cta: "bg-[var(--color-ink-900)] text-[var(--color-paper-050)] hover:bg-[var(--color-ink-700)]",
};

const sizeClass: Record<NonNullable<ButtonProps["size"]>, string> = {
  default: "px-7 py-3 text-sm",
  lg: "px-9 py-4 text-base md:px-10 md:py-[1.1rem] md:text-lg",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "default",
  className = "",
  external = false,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-colors duration-300 ${sizeClass[size]} ${variantClass[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
