"use client";
import { Button } from "@/components/ui/button";
import { Plus, LayoutGrid } from "lucide-react";

type EmptyStateProps = {
  onAddClick: () => void;
};

export function EmptyState({ onAddClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      <div className="p-6 bg-white/10 backdrop-blur-lg rounded-full mb-6">
        <LayoutGrid className="h-12 w-12 text-primary-foreground/50" />
      </div>
      <h2 className="text-2xl font-semibold text-primary-foreground/80">Your LinkBoard is Empty</h2>
      <p className="mt-2 max-w-sm text-muted-foreground/80">
        Start building your personal dashboard by adding your favorite links. It's your one-stop launchpad!
      </p>
      <Button onClick={onAddClick} className="mt-6">
        <Plus className="mr-2 h-4 w-4" />
        Add Your First Link
      </Button>
    </div>
  );
}
