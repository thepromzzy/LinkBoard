"use client";

import { useState } from "react";
import type { LinkItem } from "@/lib/types";
import { LinkCard } from "./link-card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";

type LinkGridProps = {
  links: LinkItem[];
  onEditClick: (link: LinkItem) => void;
  deleteLink: (id: string) => void;
  reorderLinks: (draggedId: string, targetId: string) => void;
};

export function LinkGrid({ links, onEditClick, deleteLink, reorderLinks }: LinkGridProps) {
  const [linkToDelete, setLinkToDelete] = useState<LinkItem | null>(null);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };
  
  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (draggedId && draggedId !== targetId) {
      reorderLinks(draggedId, targetId);
    }
    setDraggedId(null);
  };

  const handleDragEnd = () => {
    setDraggedId(null);
  };

  return (
    <>
      <div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4 p-4 md:p-6"
      >
        {links.map((link) => (
          <div
            key={link.id}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, link.id)}
            draggable
            onDragStart={(e) => handleDragStart(e, link.id)}
            onDragEnd={handleDragEnd}
            className={`transition-opacity duration-300 ${draggedId === link.id ? 'opacity-50 cursor-grabbing' : 'opacity-100 cursor-grab'}`}
          >
            <LinkCard
              link={link}
              onEdit={() => onEditClick(link)}
              onDelete={() => setLinkToDelete(link)}
            />
          </div>
        ))}
      </div>

      <AlertDialog open={!!linkToDelete} onOpenChange={() => setLinkToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the link for "{linkToDelete?.label}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              asChild
              onClick={() => {
                if (linkToDelete) deleteLink(linkToDelete.id);
                setLinkToDelete(null);
              }}
            >
              <Button variant="destructive">Delete</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
