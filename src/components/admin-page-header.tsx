"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface AdminPageHeaderProps {
  title: string;
  subtitle?: string;
  showAddButton?: boolean;
  onAddClick?: () => void;
  addButtonText?: string;
  actions?: React.ReactNode;
}

export function AdminPageHeader({
  title,
  subtitle,
  showAddButton = false,
  onAddClick,
  addButtonText = "Thêm mới",
  actions,
}: AdminPageHeaderProps) {
  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold text-foreground">{title}</h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {actions}
          {showAddButton && (
            <Button onClick={onAddClick}>
              <Plus className="mr-2 h-4 w-4" />
              {addButtonText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
