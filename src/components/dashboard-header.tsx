"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type DashboardHeaderProps = {
  onAddClick: () => void;
};

export function DashboardHeader({ onAddClick }: DashboardHeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground/90 font-headline">
        LinkBoard
      </h1>
      <Button onClick={onAddClick}>
        <Plus className="mr-2 h-4 w-4" />
        Add Link
      </Button>
    </header>
  );
}
