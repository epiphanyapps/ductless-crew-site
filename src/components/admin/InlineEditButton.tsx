"use client";

import Link from "next/link";
import { useAdminMode } from "@/contexts/AdminModeContext";

interface InlineEditButtonProps {
  href: string;
  label?: string;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  size?: "sm" | "md";
}

export default function InlineEditButton({
  href,
  label = "Edit",
  position = "top-right",
  size = "md",
}: InlineEditButtonProps) {
  const { isAdmin, isEditMode } = useAdminMode();

  if (!isAdmin || !isEditMode) return null;

  const positionClasses = {
    "top-right": "top-2 right-2",
    "top-left": "top-2 left-2",
    "bottom-right": "bottom-2 right-2",
    "bottom-left": "bottom-2 left-2",
  };

  const sizeClasses = {
    sm: "px-2 py-1 text-xs gap-1",
    md: "px-3 py-1.5 text-sm gap-1.5",
  };

  return (
    <Link
      href={href}
      className={`absolute ${positionClasses[position]} ${sizeClasses[size]} z-10 flex items-center bg-[var(--color-orange)] hover:bg-[var(--color-orange-dark)] text-white rounded-lg shadow-lg transition-all opacity-75 hover:opacity-100`}
    >
      <svg
        className={size === "sm" ? "w-3 h-3" : "w-4 h-4"}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
      {label}
    </Link>
  );
}
