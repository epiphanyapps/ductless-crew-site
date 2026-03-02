"use client";

import { ReactNode } from "react";
import { useAdminMode } from "@/contexts/AdminModeContext";
import InlineEditButton from "./InlineEditButton";

interface EditableSectionProps {
  children: ReactNode;
  editHref: string;
  editLabel?: string;
  className?: string;
}

export default function EditableSection({
  children,
  editHref,
  editLabel = "Edit",
  className = "",
}: EditableSectionProps) {
  const { isAdmin, isEditMode } = useAdminMode();

  const showEditUI = isAdmin && isEditMode;

  return (
    <div className={`relative ${showEditUI ? "outline outline-2 outline-dashed outline-[var(--color-orange)]/30 rounded-lg" : ""} ${className}`}>
      {showEditUI && (
        <InlineEditButton href={editHref} label={editLabel} />
      )}
      {children}
    </div>
  );
}
