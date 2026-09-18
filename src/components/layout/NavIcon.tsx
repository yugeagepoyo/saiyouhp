import type { ReactNode } from "react";
import type { NavIconName } from "@/data/nav";

const paths: Record<NavIconName, ReactNode> = {
  home: <path d="M3 11.5 12 4l9 7.5M5 10v9h5v-5h4v5h5v-9" />,
  about: <path d="M4 21V6l8-3 8 3v15M9 21v-5h6v5M8 10h1M8 14h1M15 10h1M15 14h1" />,
  people: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M2 21c0-4 3-6 7-6s7 2 7 6" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M22 21c0-3-1.8-5-4.5-5.5" />
    </>
  ),
  work: (
    <>
      <circle cx="12" cy="12" r="2.2" />
      <circle cx="12" cy="4" r="1.6" />
      <circle cx="4" cy="18" r="1.6" />
      <circle cx="20" cy="18" r="1.6" />
      <path d="M12 6v4M10.4 13.2 5.4 16.8M13.6 13.2l5 3.6" />
    </>
  ),
  recruit: <path d="M4 7h16v13H4zM8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M4 12h16" />,
  faq: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.2a2.5 2.5 0 0 1 4.9.7c0 1.8-2.4 1.8-2.4 3.6" />
      <path d="M12 17h.01" />
    </>
  ),
  entry: <path d="M12 3v13m0 0-4-4m4 4 4-4M4 19h16" />,
  departments: (
    <>
      <circle cx="12" cy="5" r="2.2" />
      <circle cx="6" cy="19" r="2.2" />
      <circle cx="18" cy="19" r="2.2" />
      <path d="M12 7.2V11H6v5.8M12 11h6v5.8" />
    </>
  ),
  interview: (
    <>
      <rect x="9" y="3" width="6" height="10" rx="3" />
      <path d="M6 11a6 6 0 0 0 12 0M12 17v3M9 20h6" />
    </>
  ),
  message: <path d="M3 6h18v12H3zM3 7l9 6 9-6" />,
  business: (
    <>
      <rect x="3" y="9" width="18" height="12" rx="1" />
      <path d="M9 9V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3M3 14h18" />
    </>
  ),
  numbers: (
    <>
      <path d="M4 20V10M10 20V4M16 20v-7M4 20h16" />
    </>
  ),
  workplace: (
    <>
      <path d="M4 21V10l8-6 8 6v11" />
      <path d="M9 21v-6h6v6M4 21h16" />
    </>
  ),
  growth: (
    <>
      <path d="M4 19h16" />
      <path d="M6 19v-4M11 19V9M16 19v-7" />
      <path d="M6 11l5-4 5 3 4-4" />
    </>
  ),
  community: (
    <>
      <circle cx="12" cy="7" r="3" />
      <path d="M5 21c0-4 3-7 7-7s7 3 7 7" />
      <path d="M2 21c.4-2.5 1.6-4 3-4.8M22 21c-.4-2.5-1.6-4-3-4.8" />
    </>
  ),
  benefits: (
    <>
      <rect x="3" y="8" width="18" height="12" rx="1.5" />
      <path d="M3 12h18M12 8v12" />
      <path d="M12 8c-1.8 0-3-1-3-2.2A1.8 1.8 0 0 1 10.8 4c1.4 0 2.2 1.6 2.2 4Zm0 0c1.8 0 3-1 3-2.2A1.8 1.8 0 0 0 13.2 4C11.8 4 11 5.6 11 8Z" />
    </>
  ),
};

export function NavIcon({ name, className = "h-5 w-5" }: { name: NavIconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {paths[name]}
    </svg>
  );
}
